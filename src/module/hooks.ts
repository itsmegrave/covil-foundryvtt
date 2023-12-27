import { showForgeDialog } from '../dialog/forge-dialog';
import { localize, isClientGM } from './utils/game';

export const registerHooks = () => {
  Hooks.on('getSceneControlButtons', onGetSceneControlButtons);
};

const onGetSceneControlButtons = (buttons: SceneControl[]) => {
  const covilTools = {
    activeTool: 'select',
    icon: 'cvd-main-icon',
    layer: 'covil',
    name: 'covil',
    title: localize('covil-velho-dragao.title'),
    visible: isClientGM(),
    tools: [
      {
        name: 'forge',
        icon: 'ra ra-anvil',
        title: localize('covil-velho-dragao.forge'),
        button: true,
        onClick: () => {
          showForgeDialog();
        },
      },
    ],
  };

  buttons.push(covilTools);
};
