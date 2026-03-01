export const getDeviceId = async (): Promise<string> => {
  let deviceId = sessionStorage.getItem('deviceId');
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    sessionStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
};
