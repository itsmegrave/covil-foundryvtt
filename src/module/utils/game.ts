// is the current client the GM?
const isClientGM = (): boolean => game.user.isGM || false;

// localize a string
const localize = (stringId: string) => game.i18n.localize(stringId);

export { isClientGM, localize };
