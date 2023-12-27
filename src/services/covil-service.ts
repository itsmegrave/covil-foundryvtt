import { Covil } from '../module/config';

export class CovilService {
  async forgeItem() {
    const url = `${Covil.baseUrl}${Covil.forgeUrl}`;
    try {
      console.debug(`${Covil.logPrefix} Retrieving JSON from URL: `, url);

      const response = await fetch(url);

      return response.json();
    } catch (error) {
      console.error(error);
      ui.notifications?.error(`Error making external request. Check console for error log.`);
    }
  }
}
