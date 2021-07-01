/*
 * doest-react
 *
 * constants.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

export const AM_URL = 'https://api.doest.test:9443';
export const APP_URL = 'https://react.doest.test:7443';
export const API_URL = 'https://api.doest.test:9443';
export const PATHS = {
  authenticate: 'auth/authenticate',
  authorize: 'auth/authorize',
  accessToken: 'auth/tokenExchange',
  endSession: 'auth/endSession',
  userInfo: 'auth/userInfo',
  revoke: 'auth/revoke',
  sessions: 'auth/sessions',
};
export const REALM_PATH = 'alpha';
export const SESSION_URL = `${AM_URL}json/realms/root/sessions`;
