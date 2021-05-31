import moment from 'moment';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// Use the official demonstration site to close the characteristics that the real development environment does not need to use
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};
const helper = {
  getOnes: function (number: number) {
    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    return ones[number] || '';
  },
  getTeens: function (number: number) {
    const teens = [
      'ten',
      'eleven',
      'twelve',
      'thirteen',
      'fourteen',
      'fifteen',
      'sixteen',
      'seventeen',
      'eighteen',
      'nineteen',
    ];
    return teens[number] || '';
  },
  getTens: function (number: number) {
    const tens = [
      '',
      '',
      'twenty',
      'thirty',
      'forty',
      'fifty',
      'sixty',
      'seventy',
      'eighty',
      'ninety',
    ];
    return tens[number] || '';
  },
  getHundreds: function (num: number) {
    if (num > 0 && num < 10) {
      return this.getOnes(num);
    }
    if (num >= 10 && num < 20) {
      return this.getTeens(num % 10);
    }
    if (num >= 20 && num < 100) {
      return `${this.getTens(Math.floor(num / 10))} ${this.getOnes(num % 10)}`;
    }
    return '';
  },
};
export const convertRupeeToWords = (input: string): string => {
  const rupees = Number(parseInt(input, 10));
  const output = [];

  if (rupees === 0) {
    output.push('zero');
  } else if (rupees === 1) {
    output.push('one');
  } else {
    const crores = Math.floor(rupees / 10000000) % 100;
    if (crores > 0) {
      output.push(`${helper.getHundreds(crores)} crore`);
    }

    const lakhs = Math.floor(rupees / 100000) % 100;
    if (lakhs > 0) {
      output.push(`${helper.getHundreds(lakhs)} lakh`);
    }

    const thousands = Math.floor(rupees / 1000) % 100;
    if (thousands > 0) {
      output.push(`${helper.getHundreds(thousands)} thousand`);
    }

    const hundreds = Math.floor((rupees % 1000) / 100);
    if (hundreds > 0 && hundreds < 10) {
      output.push(`${helper.getOnes(hundreds)} hundred`);
    }

    const tens = rupees % 100;
    if (tens > 0) {
      if (rupees > 100) output.push('and');
      output.push(`${helper.getHundreds(tens)}`);
    }
  }

  return ['Rupees', ...output, 'only']
    .join(' ')
    .split(/\s/)
    .filter((e) => e)
    .map((e) => e.substr(0, 1).toUpperCase() + e.substr(1))
    .join(' ');
};

export const getFiscalYear = () => {
  if (moment().quarter() === 2) {
    var thisFiscalStart = moment().month('April').startOf('month').format('YYYY-MM-DD');
    var thisFiscalEnd = moment().add(1, 'year').month('March').endOf('month').format('YYYY-MM-DD');
  } else {
    var thisFiscalStart = moment()
      .subtract(1, 'year')
      .month('April')
      .startOf('month')
      .format('YYYY-MM-DD');
    var thisFiscalEnd = moment().month('March').endOf('month').format('YYYY-MM-DD');
  }
  //in formate 21-22...
  var year = thisFiscalStart.slice(2, 4) + '-' + thisFiscalEnd.slice(2, 4);
  return year;
};

export const toFixDec = (num: number, p: number): number =>
  Math.round((num + Number.EPSILON) * Math.pow(10, p)) / Math.pow(10, p);

export const gst18 = (taxable_amount_in_float: number): number => {
  return Math.round((Math.round(taxable_amount_in_float) * 18) / 100);
};

export const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
