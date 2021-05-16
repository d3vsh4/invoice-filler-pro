// @ts-ignore
/* eslint-disable */
import {BASE_URL} from '@/constants';

import { request } from 'umi';

export async function createInvoice(invoice: INVOICES.Invoice) {
  return request<any>(BASE_URL+'/api/create', {
    method: 'POST',
    data: invoice,
  });
}

