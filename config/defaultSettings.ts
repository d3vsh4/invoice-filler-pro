import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'dark',
  // Dawn
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fixed',
  fixedHeader: false,
  fixSiderbar: true,
  splitMenus: false,
  colorWeak: false,
  title: 'Invoice Filler Pro',
  pwa: true,
  logo: 'https://svgur.com/i/XKG.svg',
  iconfontUrl: '',
};

export default Settings;
