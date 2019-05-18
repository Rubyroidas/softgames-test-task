import * as PIXI from 'pixi.js';

export default class BaseScene extends PIXI.Container {
    constructor(app) {
        super();
        this.position.set(app.screen.width / 2, app.screen.height / 2);
        this.app = app;
    }

    addBackLink() {
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 24,
            fontWeight: 'bold',
            fill: ['#ffffff'], // gradient
            stroke: '#4a1850',
            strokeThickness: 1,
        });

        const richText = new PIXI.Text('< back to main menu', style);
        richText.interactive = true;
        richText.on('pointerdown', () => {
            this.emit('startScene', 'MainMenu');
        });
        richText.position.set(-this.x + 5, -this.y + 5);
        this.addChild(richText);
    }

    destroy() {
        console.warn('destroy method should be implemented');
    }
}
