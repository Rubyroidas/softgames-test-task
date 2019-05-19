import * as PIXI from 'pixi.js';

export default class TextTool {
    /**
     * @param {string} format
     * @param {object} tokens
     * @param {PIXI.TextStyle} textStyle
     * @return {PIXI.Container}
     */
    static createMarkdownText(format, tokens, textStyle) {
        const regex = /\$\{(.+?)\}/;
        const parts = [];
        const lines = format.split('\n');
        let match;
        for (let str of lines) {
            const partLine = [];
            while (match = regex.exec(str)) {
                partLine.push(str.substring(0, match.index));
                partLine.push({token: match[1]});
                str = str.substring(match.index + match[0].length);
            }
            if (str.length) {
                partLine.push(str);
            }
            parts.push(partLine);
        }

        const {lineHeight} = PIXI.TextMetrics.measureText('', textStyle);

        const linesOfObjects = parts.map(line => {
            const objects = line.map(part => {
                if (typeof part === 'string') {
                    const object = new PIXI.Text(part, textStyle);
                    object.anchor.set(0.5);
                    return object;
                } else {
                    const object = PIXI.Sprite.from(tokens[part.token]);
                    object.anchor.set(0.5);
                    object.scale.set(textStyle.fontSize / 32);
                    return object;
                }
            });

            const lineObject = new PIXI.Container();
            const widths = objects.map(object => object.getLocalBounds().width);
            const lineWidth = widths.reduce((p, c) => p + c, 0);

            objects
                .forEach((object, index) => {
                    object.x = -lineWidth / 2 + widths.slice(0, index + 1).reduce((p, c) => p + c, 0) - widths[index] / 2;
                    lineObject.addChild(object);
                });

            return lineObject;
        });

        const wholeHeight = (linesOfObjects.length - 1) * lineHeight;
        const result = new PIXI.Container();

        linesOfObjects
            .forEach((object, index) => {
                object.y = -wholeHeight / 2 + index * lineHeight;
                result.addChild(object);
            });

        return result;
    }
}
