import * as PIXI from 'pixi.js';

import BaseScene from './BaseScene';

const CARD_COUNT = 144;
const CARD_Y_OFFSET = 3;
const ANIMATION_DELAY_STEP = 1000;
const ANIMATION_DURATION = 2000;

export default class CardScene extends BaseScene {
    constructor(app) {
        super(app);
        this.tweens = [];
        this.createMenuItems();
        this.addBackLink();
        this.addFPSCounter();
        this.animateCards();
    }

    createMenuItems() {
        // this should be at bottom
        this.destinationStack = this.addChild(new PIXI.Container());
        this.destinationStack.position.set(this.app.screen.width / 4, -this.y + 100);
        // this should be atop
        this.sourceStack = this.addChild(new PIXI.Container());
        this.sourceStack.position.set(-this.app.screen.width / 4, -this.y + 100);
        for (let index = 0; index < CARD_COUNT; index++) {
            const card = this.addChild(PIXI.Sprite.from('card'));
            card.anchor.set(0.5);
            card.position.copy(this.getCoordsByIndex(index));
            card.scale.set(0.6);
            this.sourceStack.addChild(card);
        }
    }

    animateCards() {
        for (let index = CARD_COUNT - 1; index >= 0; index--) {
            this.animateCard(
                this.sourceStack.children[index], index,
                ANIMATION_DELAY_STEP * (CARD_COUNT - 1 - index)
            );
        }
    }

    animateCard(card, index, delay) {
        const tween = PIXI.tweenManager.createTween(card);
        tween.stop().clear();
        tween.delay = delay;
        tween.time = ANIMATION_DURATION;
        tween.easing = PIXI.tween.Easing.inOutSine();
        // start point
        tween.from({ x: card.x, y: card.y });
        // end point
        const dstOrigin = this.destinationStack.getGlobalPosition();
        const coordsByIndex = this.getCoordsByIndex(CARD_COUNT - 1 - index);
        tween.to(
            this.sourceStack.toLocal(
                new PIXI.Point(dstOrigin.x + coordsByIndex.x, dstOrigin.y + coordsByIndex.y)
            )
        );
        tween.on('end', () => {
            card.position.copy(this.getCoordsByIndex(CARD_COUNT - 1 - index));
            this.destinationStack.addChild(card);
        });
        tween.start();
        this.tweens.push(tween);
    }

    getCoordsByIndex(index) {
        return {
            x: Math.sin(index / 10 * Math.PI) * 100,
            y: index * CARD_Y_OFFSET,
        }
    }

    destroy() {
        for (const tween of this.tweens) {
            tween.remove();
        }
    }
}
