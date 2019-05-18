import * as PIXI from 'pixi.js';

import BaseScene from './BaseScene';

export default class FireScene extends BaseScene {
    constructor(app) {
        super(app);
        this.addBackLink();

        const richText = new PIXI.Text('FireScene', new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 24,
            fontWeight: 'bold',
            fill: ['#ffffff'],
            stroke: '#4a1850',
            strokeThickness: 1,
        }));
        richText.anchor.set(0.5);
        this.addChild(richText);
    }

    destroy() {
        // TODO
    }
}
