import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { notification } from 'antd';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { getIntl, getLocale, history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import type { ResponseError } from 'umi-request';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** Get user information is slower when it is slow一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
type InitialStateType = {
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
};
export async function getInitialState(): Promise<InitialStateType> {
  const fetchUserInfo = async () => {
    try {
      const currentUser = await queryCurrentUser();
      return currentUser;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  //If it is a login page, do not execute
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

/**
 *Abnormal handler
 const codeMessage = {
    200: 'The server successfully returns the requested data. ',
    201: 'New or modify the data success. ',
    202: 'A request has entered the background queue (asynchronous task). ',
    204: 'Delete data success. ',
    400: 'The request issued has an error, and the server does not have new or modified data. ',
    401: 'Users no permissions (token, user name, password error). ',
    403: 'User is authorized, but access is disabled. ',
    404: 'The request for issued is a record that does not exist, and the server does not operate. ',
    405: 'The request method is not allowed. ',
    406: 'The format requested is not available. ',
    410: 'The requested resource is permanently deleted and will not be obtained. ',
    422: 'When an object is created, a verification error occurs. ',
    500: 'The server has an error, please check the server. ',
    502: 'Gateway error. ',
    503: 'The service is not available, the server temporarily overloads or maintains. ',
    504: 'Gateway timeout. ',
 };
 * @see https://beta-pro.ant.design/docs/request-cn
 */
export const request: RequestConfig = {
  errorHandler: (error: ResponseError) => {
    const { messages } = getIntl(getLocale());
    const { response } = error;

    if (response && response.status) {
      const { status, statusText, url } = response;
      const requestErrorMessage = messages['app.request.error'];
      const errorMessage = `${requestErrorMessage}`;
      const errorDescription = messages[`app.request.${status}`] || statusText;
      notification.error({
        message: errorMessage,
        description: errorDescription,
      });
    }

    if (!response) {
      notification.error({
        description: 'Your network is abnormal, unable to connect to the server ',
        message: 'Network Abnormal',
      });
    }
    throw error;
  },
};

// ProLayout Supported API https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    // waterMarkProps: {
    //   content: initialState?.currentUser?.name,
    // },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // If you don't log in, redirectlogin
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>openAPI Documentation</span>
          </Link>,
          <Link to="/~docs">
            <BookOutlined />
            <span>Business component documentation</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    //Custom 403 page
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};
