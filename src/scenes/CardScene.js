import * as PIXI from 'pixi.js';

import BaseScene from './BaseScene';

export default class CardScene extends BaseScene {
    constructor(app) {
        super(app);
        this.createMenuItems();
        this.addBackLink();
    }

    createMenuItems() {
        const card = this.addChild(PIXI.Sprite.from('card'));
        card.anchor.set(0.5);
    }

    destroy() {
        // TODO
    }
}
