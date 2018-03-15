/* eslint import/no-extraneous-dependencies:0 no-console:0 */
const jsonServer = require('json-server');
const ip = require('ip');
const { get } = require('lodash');
const randomstring = require('random-string');
const { isActivated, insertActivation, logout, getMe } = require('./helpers');

const server = jsonServer.create();
const router = jsonServer.router('dataSet.json');
const middlewares = jsonServer.defaults();

const PORT = 3000;
const IP = ip.address();
const DELAY = 1000;

server.use(middlewares);
server.use((req, res, next) => setTimeout(next, DELAY));

server.get('/me', (req, res) => {
  const uuid = get(req, 'headers.uuid', null);
  if (!uuid) {
    res.sendStatus(400);
  } else {
    getMe(uuid, me => {
      if (!me) {
        res.sendStatus(401);
      } else {
        res.json(me);
      }
    });
  }
});

server.get('/activation-code', (req, res) => {
  const uuid = get(req, 'headers.uuid', null);
  if (!uuid) {
    res.sendStatus(400);
  } else {
    const activationCode = randomstring({ length: 6 }).toUpperCase();
    const newDevice = {
      activationCode,
      uuid,
      activated: false,
    };

    insertActivation(newDevice, () => {
      res.json(activationCode);
    });
  }
});

server.get('/logout', (req, res) => {
  const uuid = get(req, 'headers.uuid', null);
  if (!uuid) {
    res.sendStatus(400);
  } else {
    logout(uuid, result => {
      if (!result) {
        res.sendStatus(400);
      } else {
        res.sendStatus(204);
      }
    });
  }
});

server.use((req, res, next) => {
  const uuid = get(req, 'headers.uuid', null);
  if (uuid && isActivated(uuid)) {
    next();
  } else {
    res.sendStatus(401);
  }
});

server.use(router);
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://${IP}:${PORT}`);
});
