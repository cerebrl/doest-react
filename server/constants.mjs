/*
 * doest-react
 *
 * server.constants.mjs
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
export const AM_PATHS = {
  tokenExchange: 'oauth2/realms/root/realms/alpha/access_token',
  authenticate: 'json/realms/root/realms/alpha/authenticate',
  authorize: 'oauth2/realms/root/realms/alpha/authorize',
  endSession: 'oauth2/realms/root/realms/alpha/connect/endSession',
  userInfo: 'oauth2/realms/root/realms/alpha/userinfo',
  revoke: 'oauth2/realms/root/realms/alpha/token/revoke',
  sessions: 'json/realms/root/realms/alpha/sessions',
};
export const AM_URL = 'https://openam-crbrl-01.forgeblocks.com/am/';
export const COOKIE_NAME = 'e1babb394ea5130';
export const COOKIE_OPTS = {
  secure: true,
  httpOnly: true,
  maxAge: 900000
};
export const CONFIDENTIAL_CLIENT = 'UmVzdE9BdXRoQ2xpZW50OjB0ZzhzM3MzNUw3ekhyMGRmMzRrWlo=';
export const REALM_PATH = 'alpha';
