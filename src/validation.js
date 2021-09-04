import { extend, localize } from 'vee-validate';
import { required, email, digits } from 'vee-validate/dist/rules';
import zhTaiwan from 'vee-validate/dist/locale/zh_TW.json';

extend('email', email);
extend('required', required);
extend('digits', digits);

localize({
  zhTaiwan: {
    messages: {
      ...zhTaiwan.messages,
      required: '此項為必填項目，請勿留空',
      email: '請輸入有效的電子信箱',
      digits: '此項必須由十個數字構成',
    },
  },
});

localize('zhTaiwan');
