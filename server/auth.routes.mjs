import redis from 'redis';
import request from 'superagent';
import { v4 } from 'uuid';
import { key, cert } from './certs.mjs';
import { AM_PATHS, COOKIE_NAME, COOKIE_OPTS, AM_URL } from './constants.mjs';

const redisClient = redis.createClient();
const appTracker = {};
const availableApps = {
  a: 'https://react.doest.local:8443',
  b: 'https://react.doest.test:7443',
};
let ssoTokens = [];

export default function (app) {
  app.get('/sso/:app', async (req, res) => {
    const ssoToken = v4();
    ssoTokens.push({ token: ssoToken, uuid: req.cookies[COOKIE_NAME] });
    res.redirect(`${availableApps[req.params.app]}/login?sso=${ssoToken}`);
  });

  app.post('/auth/authenticate', async (req, res) => {
    const fullUrl = `${AM_URL}${AM_PATHS.authenticate}`;
    const [_, queryString] = req.url.split('?');
    let response;
    let uuid;

    if (req.query.sso) {
      let item = ssoTokens.find((item) => req.query.sso === item.token);
      uuid = item.uuid;
      ssoTokens = ssoTokens.filter((item) => req.query.sso !== item.token);
    } else {
      uuid = req.cookies[COOKIE_NAME];
    }

    redisClient.get(uuid, async (err, data) => {
      const cookie = `${data ? `${COOKIE_NAME}=${data}`: ''}`;
      try {
        response = await request
          .post(fullUrl)
          .key(key)
          .cert(cert)
          .set('cookie', cookie)
          .set('accept-api-version', 'protocol=1.0,resource=2.1')
          .query(queryString)
          .send(req.body);
      } catch (err) {
        console.log(err);
      }
      if (response.body && response.body.tokenId) {
        const tokenId = response.body.tokenId;
        const origin = req.headers.origin;
        uuid = uuid || v4();
        redisClient.set(uuid, tokenId, 'EX', 900000, (err, data) => {
          const [ _, root, tdl ] = req.hostname.split('.');
          const domain = `${root}.${tdl}`;
          res.cookie(COOKIE_NAME, uuid, { ...COOKIE_OPTS, domain });
          let userApps = appTracker[tokenId];
          if (userApps) {
            if (Array.isArray(userApps.apps)) {
              userApps.apps.push(origin);
            } else {
              userApps.apps = [origin];
            }
          } else {
            appTracker[tokenId] = { apps: [origin], uuid: uuid };
          }
          res.json(response.body);
        });
      } else {
        res.json(response.body);
      }
    });
  });

  app.get('/auth/authorize', async (req, res) => {
    const fullUrl = `${AM_URL}${AM_PATHS.authorize}`;
    const [_, queryString] = req.url.split('?');
    let response;

    redisClient.get(req.cookies[COOKIE_NAME], async (err, data) => {
      try {
        response = await request
          .get(fullUrl)
          .key(key)
          .cert(cert)
          .set('cookie', `${COOKIE_NAME}=${data}`)
          .query(queryString)
          .send();
      } catch (err) {
        console.log(err);
      }
      res.redirect(response.redirects[0]);
    });
  });

  app.post('/auth/tokenExchange', async (req, res) => {
    const fullUrl = `${AM_URL}${AM_PATHS.tokenExchange}`;
    const [_, queryString] = req.url.split('?');
    let response;
    try {
      response = await request
        .post(fullUrl)
        .key(key)
        .cert(cert)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .type('form')
        .query(queryString)
        .send(req.body);
    } catch (err) {
      console.log(err);
    }
    res.json(response.body);
  });

  app.post('/auth/sessions', async (req, res) => {
    redisClient.del(req.cookies[COOKIE_NAME], async (err, data) => {
      const [ _, root, tdl ] = req.hostname.split('.');
      const domain = `${root}.${tdl}`;
      res.cookie(COOKIE_NAME, '', { ...COOKIE_OPTS, domain });
      res.send('OK');
    });
  });
}
