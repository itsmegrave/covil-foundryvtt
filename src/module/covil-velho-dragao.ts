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
import { Covil } from './config';

import { registerHooks } from './hooks';

// Initialize module
Hooks.once('init', async () => {
  console.log(`${Covil.logPrefix} Initializing covil-velho-dragao`);

  // Assign custom classes and constants here

  // Register custom module settings
  registerSettings();

  // Register custom sheets (if any)

  registerHooks();
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

// Add any additional hooks if necessary
