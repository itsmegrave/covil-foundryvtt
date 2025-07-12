const _getGame = function (): foundry.Game {
  if (!game || !(game as object instanceof foundry.Game)) {
    throw new Error('Game is not initialized yet!');
  }
  return game as foundry.Game;
};

// is the current client the GM?
const isClientGM = (): boolean => {
  try {
    return _getGame().user?.isGM || false;
  } catch {
    return false;
  }
};

// localize a string
const localize = (stringId: string): string => {
  try {
    return _getGame().i18n?.localize(stringId) || stringId;
  } catch {
    return stringId;
  }
};

export { isClientGM, localize };
