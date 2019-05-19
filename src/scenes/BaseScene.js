import * as PIXI from 'pixi.js';

export default class BaseScene extends PIXI.Container {
    constructor(app) {
        super();
        this.position.set(app.screen.width / 2, app.screen.height / 2);
        this.app = app;
    }

    update() {
        if (this.fpsCounter) {
            this.fpsCounter.text = `FPS: ${Math.floor(this.app.ticker.FPS)}`;
        }
    }

    addFPSCounter() {
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 16,
            fill: '#ffffff',
        });

        const richText = new PIXI.Text('---', style);
        richText.interactive = true;
        richText.on('pointerdown', () => {
            this.emit('startScene', 'MainMenu');
        });
        richText.anchor.set(0, 0);
        richText.position.set(-this.x + 5, -this.y + 5);
        this.fpsCounter = richText;
        this.addChild(richText);
    }

    addBackLink() {
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 24,
            // fontWeight: 'bold',
            fill: '#ffff00',
            stroke: '#4a1850',
            strokeThickness: 4,
        });

        const richText = new PIXI.Text('< back to main menu', style);
        richText.interactive = true;
        richText.on('pointerdown', () => {
            this.emit('startScene', 'MainMenu');
        });
        richText.anchor.set(0, 1);
        richText.position.set(-this.x + 5, this.y - 5);
        this.addChild(richText);
    }

    destroy() {
        // console.warn('destroy method should be implemented');
    }
}
