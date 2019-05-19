import * as PIXI from 'pixi.js';

import BaseScene from './BaseScene';

export default class GoFullscreen extends BaseScene {
    constructor(app) {
        super(app);
        this.createWelcomeText();
    }

    createWelcomeText() {
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fontWeight: 'bold',
            fill: '#ffffff',
            stroke: '#4a1850',
            strokeThickness: 2,
        });

        this.background = new PIXI.Graphics();
        this.background.beginFill(0xff0000, 0);
        this.background.drawRect(-this.x, -this.y, this.app.screen.width, this.app.screen.height);
        this.background.endFill();
        this.addChild(this.background);

        const richText = new PIXI.Text('Tap anywhere to go fullscreen', style);
        richText.anchor.set(0.5);
        this.addChild(richText);

        this.background.interactive = true;
        this.background.on('pointerup', () => {
            const element = this.app.view;
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.webkitRequestFullScreen) {
                element.webkitRequestFullScreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            }
            this.emit('startScene', 'MainMenu');
        });
    }
}
