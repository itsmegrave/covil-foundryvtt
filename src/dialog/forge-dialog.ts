import { ForgeItem } from '../interactors/forge-item';
import { localize } from '../module/utils/game';

export const showForgeDialog = async () => {
  await foundry.applications.api.DialogV2.confirm({
    window: { title: localize('covil-velho-dragao.forge') },
    content: localize('covil-velho-dragao.dialogs.forge.content'),
    yes: {
      icon: 'fas fa-fire',
      callback: () => {
        const interactor = new ForgeItem();
        interactor.call();
      },
    },
    no: {
      icon: 'fas fa-times',
    },
  });
};
