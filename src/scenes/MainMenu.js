import * as PIXI from 'pixi.js';

import BaseScene from './BaseScene';

export default class MainMenu extends BaseScene {
    constructor(app) {
        super(app);
        this.createMenuItems();
    }

    createMenuItems() {
        const itemTexts = {
            'CardScene': 'Task #1 (cards)',
            'TextToolScene': 'Task #2 (text + images)',
            'FireScene': 'Task #3 (fire particles)',
        };

        Object.entries(itemTexts)
            .forEach(([scene, text], index) => {
                const style = new PIXI.TextStyle({
                    fontFamily: 'Arial',
                    fontSize: 36,
                    fontWeight: 'bold',
                    fill: ['#ffffff'], // gradient
                    stroke: '#4a1850',
                    strokeThickness: 2,
                });

                const richText = new PIXI.Text(text, style);
                richText.interactive = true;
                richText.on('pointerdown', () => {
                    this.emit('startScene', scene);
                });
                richText.y = index * 50;
                richText.anchor.set(0.5);
                this.addChild(richText);
            });
    }

    destroy() {
        // TODO
    }
}
