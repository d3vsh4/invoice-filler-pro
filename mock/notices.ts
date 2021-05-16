import { Request, Response } from 'express';

const getNotices = (req: Request, res: Response) => {
  res.json({
    data: [
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
      {
        id: '000000003',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
        title: 'This template can distinguish a variety of notification types',
        datetime: '2017-08-07',
        read: true,
        type: 'notification',
      },
      {
        id: '000000004',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: 'Left icon for distinguishing different types',
        datetime: '2017-08-07',
        type: 'notification',
      },
      {
        id: '000000005',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: 'Do not exceed both lines of words, automatic truncation',
        datetime: '2017-08-07',
        type: 'notification',
      },
      {
        id: '000000006',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: 'Jusi Li commented you',
        description: 'Description Information Description Information Description Information',
        datetime: '2017-08-07',
        type: 'message',
        clickClose: true,
      },
      {
        id: '000000007',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: 'Zhu Xiang replied to you',
        description: 'This template is used to remind you to interact with you, put "Who" on the left side',
        datetime: '2017-08-07',
        type: 'message',
        clickClose: true,
      },
      {
        id: '000000008',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: 'title',
        description: 'This template is used to remind you to interact with you, put "Who" on the left side',
        datetime: '2017-08-07',
        type: 'message',
        clickClose: true,
      },
      {
        id: '000000009',
        title: 'mission name',
        description: 'Task needs to start before 2017-01-12 20:00',
        extra: 'has not started',
        status: 'todo',
        type: 'event',
      },
      {
        id: '000000010',
        title: 'Third party emergency code change',
        description: 'Guan Lin is submitted to 2017-01-06, you need to complete the code change task before 2017-01-07',
        extra: 'Immediately expire',
        status: 'urgent',
        type: 'event',
      },
      {
        id: '000000011',
        title: 'Information security test',
        description: 'Refers to the completion of the renewal and release Zambale before 2017-01-09',
        extra: 'Already 8 days',
        status: 'doing',
        type: 'event',
      },
      {
        id: '000000012',
        title: 'ABCD version released',
        description: 'Guan Lin is submitted to 2017-01-06, you need to complete the code change task before 2017-01-07',
        extra: 'processing',
        status: 'processing',
        type: 'event',
      },
    ],
  });
};

export default {
  'GET /api/notices': getNotices,
};
