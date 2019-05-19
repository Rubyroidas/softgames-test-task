import * as PIXI from 'pixi.js';

import BaseScene from './BaseScene';
import Utils from '../Utils';

const MAX_LIFETIME = 1000;
const MIN_VELOCITY = 100;
const MAX_VELOCITY = 200;
const MAX_DELAY = 200;
const MAX_ANGLE_DIV = Math.PI / 4;

export default class FireScene extends BaseScene {
    constructor(app) {
        super(app);
        this.createFire();
        this.addBackLink();
        this.addFPSCounter();
    }

    createFire() {
        // particle texture
        const particleCanvas = document.createElement('canvas');
        particleCanvas.width = 10;
        particleCanvas.height = 10;
        const ctx = particleCanvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(5, 5, 5, 0, 2 * Math.PI);
        ctx.fill();
        const particleBaseTexture = PIXI.BaseTexture.from(particleCanvas);
        const particleTexture = new PIXI.Texture(particleBaseTexture);

        this.sprites = new PIXI.particles.ParticleContainer(10000, {
            scale: true,
            position: true,
            rotation: true,
            uvs: true,
            alpha: true
        });
        this.addChild(this.sprites);

        this.totalSprites = app.renderer instanceof PIXI.WebGLRenderer ? 10000 : 100;

        // particles creation
        for (let i = 0; i < this.totalSprites; i++) {
            // create a new Sprite
            const particle = new PIXI.Sprite(particleTexture);

            // set the anchor point so the texture is centerd on the sprite
            particle.anchor.set(0.5);

            // different maggots, different sizes
            particle.scale.set(0.8 + Math.random() * 0.3);

            // initial position
            particle.position.set(0, 0);

            // ms
            // TODO: more natural start
            particle.delay = this.getRandomDelay();
            if (particle.delay > 0) {
                particle.scale.set(0);
            }
            // ms
            particle.lifetime = 0;

            particle.direction = this.getRandomDirection();
            particle.maxLifetime = this.getMaxLifetime(particle.direction);
            particle.velocity = this.getRandomVelocity();

            this.sprites.addChild(particle);
        }
    }

    /**
     * Moving all particles
     */
    update() {
        super.update();

        const {elapsedMS} = this.app.ticker;
        const fireColors = [0x6F1C00, 0xFF4300, 0xFAF800, 0xFFFFFF].reverse();

        // iterate through the sprites and update their position
        for (let i = 0; i < this.sprites.children.length; i++) {
            const particle = this.sprites.children[i];

            if (particle.delay > 0) {
                // waiting for respawn
                particle.delay -= elapsedMS;
            }
            if (particle.delay < 0) {
                // bring to life
                particle.delay = 0;
                particle.lifetime = 0;
            } else {
                particle.lifetime += elapsedMS;
                if (particle.lifetime > particle.maxLifetime) {
                    particle.scale.set(0);
                    particle.lifetime = 0;
                    particle.delay = this.getRandomDelay();
                    particle.position.set(0, 0);
                    particle.direction = this.getRandomDirection();
                    particle.maxLifetime = this.getMaxLifetime(particle.direction);
                    particle.velocity = this.getRandomVelocity();
                }
            }

            if (particle.delay !== 0) {
                continue;
            }

            // updating this particle
            const lifetimePercent = particle.lifetime / particle.maxLifetime;
            particle.tint = Math.floor(Utils.linearColorInterpolation(fireColors, lifetimePercent));
            particle.scale.set(Math.cos(Math.PI / 2 * lifetimePercent - 0.1));

            // TODO: research for more natural distribution
            const deltaMove = elapsedMS / 1000 * particle.velocity;
            particle.x += deltaMove * Math.cos(particle.direction);
            particle.y += deltaMove * Math.sin(particle.direction);

            particle.alpha = lifetimePercent > 0.6
                ? Math.pow((1 - lifetimePercent) * 2.5, 2)
                : 1;
        }
    }

    getRandomDelay() {
        return Math.floor(Math.random() * MAX_DELAY);
    }

    getRandomDirection() {
        const sign = Math.random() > 0.5 ? 1 : -1;
        const random = Math.pow(Math.random(), 2); // closer to 0 than to 1
        return -Math.PI / 2 + random * MAX_ANGLE_DIV * sign;
    }

    getRandomVelocity() {
        return MIN_VELOCITY + Math.random() * (MAX_VELOCITY - MIN_VELOCITY);
    }

    getMaxLifetime(direction) {
        // console.log(direction / Math.PI * 180);
        return Math.pow(Math.abs(Math.sin(direction)), 6) * MAX_LIFETIME;
    }

    destroy() {
        // TODO
    }
}
