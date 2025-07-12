import { showForgeDialog } from '../../dialog/forge-dialog';
import { localize, isClientGM } from './game';

/**
 * Renders a forge button in the Item Directory for GMs
 * @param app - The Application instance (ItemDirectory)
 * @param html - The rendered HTML content
 */
const renderForgeButton = (app: Application, html: HTMLElement): void => {
  const htmlElement = html instanceof HTMLElement ? html : html[0];
  if (!isClientGM()) {
    return;
  }

  if (html.querySelector('.forge-item-button')) return;

  const section = document.createElement('header');
  section.classList.add('character-generator');
  section.classList.add('directory-header');

  const dirHeader = htmlElement.querySelector('.directory-header');

  if (!dirHeader?.parentNode) {
    console.warn('Directory header not found, cannot add forge button');
    return;
  }

  dirHeader.parentNode.insertBefore(section, dirHeader);
  section.insertAdjacentHTML(
    'afterbegin',
    `
    <div class="header-actions action-buttons flexrow">
      <button class="forge-item-button" type="button">
        <i class="fa-solid fa-hammer"></i>
        ${localize('covil-velho-dragao.forge')}
      </button>
    </div>
    `,
  );

  const forgeButton = section.querySelector('.forge-item-button') as HTMLButtonElement;
  if (forgeButton) {
    forgeButton.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();
      console.log('forjando');
      showForgeDialog();
    });
  }
};

export default renderForgeButton;
