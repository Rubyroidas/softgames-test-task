import * as PIXI from 'pixi.js';
import 'pixi-tween';

import GoFullscreen from './scenes/GoFullscreen';
import MainMenu from './scenes/MainMenu';
import CardScene from './scenes/CardScene';
import TextToolScene from './scenes/TextToolScene';
import FireScene from './scenes/FireScene';

const app = window.app = new PIXI.Application({
    width: 800, height: 600, backgroundColor: 0x1099bb, resolution: 1,
});
// console.log(app);
app.loader.add('card', 'card.png');
app.loader.add('icons', 'icons.json');
if (/iPad|iPhone|iPod/i.test(navigator.userAgent)) {
    // no fullscreen for iOS
    app.loader.onComplete.add(() => startScene('MainMenu'));
} else {
    app.loader.onComplete.add(() => startScene('GoFullscreen'));
}
app.loader.load();
document.body.appendChild(app.view);
app.ticker.add(() => {
    PIXI.tweenManager.update();
    currentScene && currentScene.update();
});

const scenes = {
    GoFullscreen,
    MainMenu,
    CardScene,
    TextToolScene,
    FireScene,
};

let currentScene = null;

function startScene(key) {
    if (currentScene) {
        currentScene.destroy();
        app.stage.removeChild(currentScene);
    }

    const newScene = new scenes[key](app);
    app.stage.addChild(newScene);
    newScene.on('startScene', startScene);
    window.scene = currentScene = newScene;
    // console.log('current scene is', currentScene);
}
