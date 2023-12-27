// SPDX-FileCopyrightText: 2022 Johannes Loher
//
// SPDX-License-Identifier: MIT

/**
 * This is your TypeScript entry file for Foundry VTT.
 * Register custom settings, sheets, and constants using the Foundry API.
 * Change this heading to be more descriptive to your module, or remove it.
 * Author: [your name]
 * Content License: [copyright and-or license] If using an existing system
 * 					you may want to put a (link to a) license or copyright
 * 					notice here (e.g. the OGL).
 * Software License: [your license] Put your desired license here, which
 * 					 determines how others may use and modify your module.
 */

// Import TypeScript modules
import { registerSettings } from './settings';
import { preloadTemplates } from './preloadTemplates';
import { Covil } from './config';
import { isClientGM, localize } from './utils/game';

// @ts-expect-error need to refactor this class
import { CovilLayer } from './covil-layer';
import { showForgeDialog } from '../dialog/forge-dialog';

// Initialize module
Hooks.once('init', async () => {
  console.log(`${Covil.logPrefix} Initializing covil-velho-dragao`);

  // Assign custom classes and constants here

  // Register custom module settings
  registerSettings();

  // Preload Handlebars templates
  await preloadTemplates();

  // Register custom sheets (if any)

  const layers = { covil: { layerClass: CovilLayer, group: 'interface' } };
  CONFIG.Canvas.layers = foundry.utils.mergeObject(Canvas.layers, layers);
});

// Setup module
Hooks.once('setup', async () => {
  // Do anything after initialization but before
  // ready
});

// When ready
Hooks.once('ready', async () => {
  // Do anything once the module is ready
});

Hooks.on('getSceneControlButtons', (buttons: SceneControl[]) => {
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
        icon: 'fas fa-fire',
        title: localize('covil-velho-dragao.forge'),
        button: true,
        onClick: () => {
          showForgeDialog();
        },
      },
    ],
  };

  buttons.push(covilTools);
});

// Add any additional hooks if necessary
