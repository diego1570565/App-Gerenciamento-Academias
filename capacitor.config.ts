import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.academia.app',
  appName: 'AppAcademia',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
