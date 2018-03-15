import DeviceInfo from 'react-native-device-info';

export default {
  uuid: DeviceInfo.getUniqueID(),
  model: DeviceInfo.getModel(),
  name: DeviceInfo.getDeviceName(),
  country: DeviceInfo.getDeviceCountry(),
  bundleId: DeviceInfo.getBundleId(),
  version: DeviceInfo.getVersion(),
  build: DeviceInfo.getBuildNumber(),
  locale: DeviceInfo.getDeviceLocale(),
  systemName: DeviceInfo.getSystemName(),
  systemVersion: DeviceInfo.getSystemVersion(),
  isEmulator: DeviceInfo.isEmulator(),
};
