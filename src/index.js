import * as PIXI from 'pixi.js';

import MainMenu from './scenes/MainMenu';
import CardScene from './scenes/CardScene';
import TextToolScene from './scenes/TextToolScene';
import FireScene from './scenes/FireScene';

const app = new PIXI.Application({
    width: 800, height: 600, backgroundColor: 0x1099bb, resolution: 1,
});
// console.log(app);
app.loader.add('card', 'card.png');
app.loader.onComplete.add(() => startScene('MainMenu'));
app.loader.load();
document.body.appendChild(app.view);

const scenes = {
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
    currentScene = newScene;
    console.log('current scene is', currentScene);
}
