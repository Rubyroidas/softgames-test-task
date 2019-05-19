import BaseScene from './BaseScene';
import TextTool from '../TextTool';
import * as PIXI from "pixi.js";

const SHOW_INTERVAL = 2000;

export default class TextToolScene extends BaseScene {
    constructor(app) {
        super(app);
        this.addBackLink();
        this.addFPSCounter();

        // all icons were taken from https://icons8.com/icons
        // and they're textures or texture names
        this.tokens = {
            dollar: 'dollar.png',
            evil: 'evil.png',
            expensive: 'expensive.png',
            happy: 'happy.png',
            pokemon: 'pokemon.png',
            popcorn: 'popcorn.png',
        };
        this.phrazes = [
            '${dollar}3 - price for ${popcorn}. Worth it',
            '${dollar}734628',
            'Well, it\'s just a text :)',
            '${happy} means :)',
            'Who likes this movie? ${pokemon}',
            'I am ${pokemon} with no ${popcorn}.',
`multiline \${happy}
\${evil}
hey`,
        ];
        this.currentPhrazeIndex = -1;

        this.createText(true);
    }

    createText(force) {
        if (!(this.parent || force)) {
            return;
        }
        if (this.text) {
            this.removeChild(this.text);
        }

        let newPhrazeIndex = this.currentPhrazeIndex;
        if (this.phrazes.length > 1) {
            while ((newPhrazeIndex = Math.floor(Math.random() * this.phrazes.length)) === this.currentPhrazeIndex) ;
        } else {
            newPhrazeIndex = 0;
        }
        this.currentPhrazeIndex = newPhrazeIndex;
        const phraze = this.phrazes[this.currentPhrazeIndex];

        const textStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 16 + Math.floor(Math.random() * 24),
            fontWeight: 'bold',
            fill: '#ffffff',
            stroke: '#4a1850',
            strokeThickness: 1,
            align: 'center',
        });
        this.text = TextTool.createMarkdownText(phraze, this.tokens, textStyle);
        this.addChild(this.text);
        this.nextTime = this.app.ticker.lastTime + SHOW_INTERVAL;
    };

    update() {
        if (this.app.ticker.lastTime >= this.nextTime) {
            this.createText();
        }
        super.update();
    }
}
