import { CovilConfig } from '../types/covil-config';

export const Covil: CovilConfig = {
  logPrefix: 'covil-velho-dragao | ',
  baseUrl: 'https://covil.karlz.com.br/api/',
  forgeUrl: 'criaitem/A', //para retornar apenas armas. depois remover o `/A` para retornar qualquer item
};
