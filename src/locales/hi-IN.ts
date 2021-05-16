import component from './hi-IN/component';
import globalHeader from './hi-IN/globalHeader';
import menu from './hi-IN/menu';
import pages from './hi-IN/pages';
import pwa from './hi-IN/pwa';
import request from './hi-IN/request';
import settingDrawer from './hi-IN/settingDrawer';
import settings from './hi-IN/settings';

export default {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  'app.copyright.produced': 'Produced by Ant Financial Experience Department',
  'app.preview.down.block': 'Download this page to your local project',
  'app.welcome.link.fetch-blocks': 'Get all block',
  'app.welcome.link.block-list': 'Quickly build standard, pages based on `block` development',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...pages,
  ...request,
};
