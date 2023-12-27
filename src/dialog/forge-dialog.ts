import { ForgeItem } from '../interactors/forge-item';
import { localize } from '../module/utils/game';

export const showForgeDialog = () => {
  const dialog = new Dialog({
    title: localize('covil-velho-dragao.forge'),
    content: localize('covil-velho-dragao.dialogs.forge.content'),
    buttons: {
      yes: {
        icon: `<i class="fas fa-fire"></i>`,
        label: localize('covil-velho-dragao.common.yes'),
        callback: () => {
          const interactor = new ForgeItem();
          interactor.call();
        },
      },
      no: {
        icon: `<i class="fas fa-times"></i>`,
        label: localize('covil-velho-dragao.common.no'),
      },
    },
    default: 'no',
  });

  dialog.render(true);
};
