import apiHelper from '../axios';

export default {
  post(couponCode) {
    return apiHelper.post('/coupon', { data: { code: couponCode } });
  },
};
