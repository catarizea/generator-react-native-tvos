const fs = require('fs');
const { find, filter, findIndex } = require('lodash');

const sourceFile = `${__dirname}/activation.json`;

const getDb = () => {
  const activationDbString = fs.readFileSync(sourceFile, 'utf8');
  return JSON.parse(activationDbString);
};

const getActivation = uuid => find(getDb().devices, { uuid });

module.exports = {
  isActivated: uuid => {
    const device = getActivation(uuid);
    return device && device.activated;
  },

  insertActivation: (newDevice, cb) => {
    const db = getDb();

    const device = { id: db.devices.length + 1, ...newDevice };
    db.devices.push(device);

    fs.writeFile(sourceFile, JSON.stringify(db, null, 2), 'utf8', cb);
  },

  logout: (uuid, cb) => {
    const db = getDb();

    const filteredDevices = filter(db.devices, device => device.uuid !== uuid);

    if (!db.devices.length || filteredDevices.length === db.devices.length) {
      cb(null);
    } else {
      db.devices = filteredDevices;
      fs.writeFile(sourceFile, JSON.stringify(db, null, 2), 'utf8', () => cb(true));
    }
  },

  getMe: (uuid, cb) => {
    const db = getDb();

    const idx = findIndex(db.devices, device => device.uuid === uuid && device.activated);

    if (idx === -1) {
      cb(null);
    } else {
      cb(db.devices[idx]);
    }
  },
};
