---
title: Business component
sidemenu: false
---

> This function is [dumi] (https://d.umijs.org/zh-CN/guide/advanced#umi-%E9%A1%B9%E7%9B%AE%E9%9B%86%E6%88%90%E6%A8%A1%E5%BC%8F) provides, DUMI is a document tool for the development scenario for the assembly, and it has been said.

# Industry group

Here, all the components used in Pro are listed here, which are not suitable as a component library, but it is true in business. So we prepare this document to guide you if you need this component.

## Footer footer component

This component comes with some PRO configuration, you usually need to change its information.

```tsx
/**
 * background: '#f0f2f5'
 */
import React from 'react';
import Footer from '@/components/Footer';

export default () => <Footer />;
```

## HeaderDropdown head drop list

HeaderDropdown is an Antd DropDown package, but it has increased the special processing of the mobile side, and the usage is also the same.

```tsx
/**
 * background: '#f0f2f5'
 */
import { Button, Menu } from 'antd';
import React from 'react';
import HeaderDropdown from '@/components/HeaderDropdown';

export default () => {
  const menuHeaderDropdown = (
    <Menu selectedKeys={[]}>
      <Menu.Item key="center">Personal center</Menu.Item>
      <Menu.Item key="settings">Personal settings</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">sign out</Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <Button>hover Display menu</Button>
    </HeaderDropdown>
  );
};
```

## HeaderSearch Head search box

A input box with complementary data, supports the collection and expand INPUT

```tsx
/**
 * background: '#f0f2f5'
 */
import { Button, Menu } from 'antd';
import React from 'react';
import HeaderSearch from '@/components/HeaderSearch';

export default () => {
  return (
    <HeaderSearch
      placeholder="Site Search"
      defaultValue="umi ui"
      options={[
        { label: 'Ant Design Pro', value: 'Ant Design Pro' },
        {
          label: 'Ant Design',
          value: 'Ant Design',
        },
        {
          label: 'Pro Table',
          value: 'Pro Table',
        },
        {
          label: 'Pro Layout',
          value: 'Pro Layout',
        },
      ]}
      onSearch={(value) => {
        console.log('input', value);
      }}
    />
  );
};
```

### API

| parameter | Description | Types of | Defaults |
| --- | --- | --- | --- |
| value | Enter the value of the box | `string` | - |
| onChange | Trigger after value modification | `(value?: string) => void` | - |
| onSearch | Trigger after query | `(value?: string) => void` | - |
| options | Option menu list | `{label,value}[]` | - |
| defaultVisible | The input box is displayed, only once | `boolean` | - |
| visible | Your input box is displayed | `boolean` | - |
| onVisibleChange | Input box Shows hidden callback functions | `(visible: boolean) => void` | - |

## NoticeIcon Notification tool

The notification tool provides an interface that shows a variety of notification information.

```tsx
/**
 * background: '#f0f2f5'
 */
import { message } from 'antd';
import React from 'react';
import NoticeIcon from '@/components/NoticeIcon/NoticeIcon';

export default () => {
  const list = [
    {
      id: '000000001',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: 'You received 14 new weekly reports',
      datetime: '2017-08-09',
      type: 'notification',
    },
    {
      id: '000000002',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
      title: 'Tenni you recommend has passed the third round of interview',
      datetime: '2017-08-08',
      type: 'notification',
    },
  ];
  return (
    <NoticeIcon
      count={10}
      onItemClick={(item) => {
        message.info(`${item.title} Clicked`);
      }}
      onClear={(title: string, key: string) => message.info('Click to empty more')}
      loading={false}
      clearText="Empty"
      viewMoreText="see more"
      onViewMore={() => message.info('Click to see more')}
      clearClose
    >
      <NoticeIcon.Tab
        tabKey="notification"
        count={2}
        list={list}
        title="Notice"
        emptyText="You have viewed all notifications"
        showViewMore
      />
      <NoticeIcon.Tab
        tabKey="message"
        count={2}
        list={list}
        title="news"
        emptyText="You have read all messages"
        showViewMore
      />
      <NoticeIcon.Tab
        tabKey="event"
        title="Upcoming"
        emptyText="You have completed all to do"
        count={2}
        list={list}
        showViewMore
      />
    </NoticeIcon>
  );
};
```

### NoticeIcon API

| Parameters | Description | Type | Default |
| --- | --- | --- | --- |
| count | How many unread notices have | `number` | - |
| bell | Bell chart | `ReactNode` | - |
| onClear | Click the Clear Data button | `(tabName: string, tabKey: string) => void` | - |
| onItemClick | Unread message column is clicked | `(item: API.NoticeIconData, tabProps: NoticeIconTabProps) => void` | - |
| onViewMore | See more buttons Click | `(tabProps: NoticeIconTabProps, e: MouseEvent) => void` | - |
| onTabChange | Notice Tab Switch | `(tabTile: string) => void;` | - |
| popupVisible | Notification Display Whether to show | `boolean` | - |
| onPopupVisibleChange | Notification information Shows hidden callback functions | `(visible: boolean) => void` | - |
| clearText | Clear button | `string` | - |
| viewMoreText | See more buttons text | `string` | - |
| clearClose | Show emptying button | `boolean` | - |
| emptyImage | List of outlets | `ReactNode` | - |

### NoticeIcon.Tab API

| Parameters   | Description                   | Type                                 | Default |
| ------------ | ----------------------------- | ------------------------------------ | ------- |
| count        | How many unread notices       | `number`                             | -       |
| title        | Notify Tab title              | `ReactNode`                          | -       |
| showClear    | Display Clear button          | `boolean`                            | `true`  |
| showViewMore | Show loading more             | `boolean`                            | `true`  |
| tabKey       | The only one of Tab key       | `string`                             | -       |
| onClick      | Click event                   | `(item: API.NoticeIconData) => void` | -       |
| onClear      | Clear button Click            | `()=>void`                           | -       |
| emptyText    | Test when empty               | `()=>void`                           | -       |
| viewMoreText | See more buttons text         | `string`                             | -       |
| onViewMore   | See more buttons Click        | `( e: MouseEvent) => void`           | -       |
| list         | Notification information list | `API.NoticeIconData`                 | -       |

### NoticeIconData

```tsx | pure
export interface NoticeIconData {
  id: string;
  key: string;
  avatar: string;
  title: string;
  datetime: string;
  type: string;
  read?: boolean;
  description: string;
  clickClose?: boolean;
  extra: any;
  status: string;
}
```

## RightContent

RightContent is a combination of several components, and added Plugins' `SelectLang` plugs.

```tsx | pure
<Space>
  <HeaderSearch
    placeholder="Site Search"
    defaultValue="umi ui"
    options={[
      { label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>, value: 'umi ui' },
      {
        label: <a href="next.ant.design">Ant Design</a>,
        value: 'Ant Design',
      },
      {
        label: <a href="https://protable.ant.design/">Pro Table</a>,
        value: 'Pro Table',
      },
      {
        label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
        value: 'Pro Layout',
      },
    ]}
  />
  <Tooltip title="Use documentation">
    <span
      className={styles.action}
      onClick={() => {
        window.location.href = 'https://pro.ant.design/docs/getting-started';
      }}
    >
      <QuestionCircleOutlined />
    </span>
  </Tooltip>
  <Avatar />
  {REACT_APP_ENV && (
    <span>
      <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
    </span>
  )}
  <SelectLang className={styles.action} />
</Space>
```
