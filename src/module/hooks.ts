import renderForgeButton from './utils/render-forge-button';

export const registerHooks = () => {
  // Hooks.on('getSceneControlButtons', onGetSceneControlButtons);
  Hooks.on('renderItemDirectory', renderForgeButton);
};
