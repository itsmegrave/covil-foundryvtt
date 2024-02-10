import { showForgeDialog } from '../../dialog/forge-dialog';
import { localize, isClientGM } from './game';

/**
 * @param {Application} app
 * @param {jQuery} html
 */

export const renderForgeButton = (app, html) => {
  if (isClientGM()) {
    const section = document.createElement('header');
    section.classList.add('character-generator');
    section.classList.add('directory-header');

    const dirHeader = html[0].querySelector('.directory-header');
    dirHeader.parentNode.insertBefore(section, dirHeader);
    section.insertAdjacentHTML(
      'afterbegin',
      `
      <div class="header-actions action-buttons flexrow">
        <button class="forge-item-button"><i class="ra ra-anvil"></i>${localize('covil-velho-dragao.forge')}</button>
      </div>
      `,
    );
    section.querySelector('.forge-item-button').addEventListener('click', () => {
      console.log('forjando');
      showForgeDialog();
    });
  }
};
