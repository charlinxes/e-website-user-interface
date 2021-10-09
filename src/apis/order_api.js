import apiHelper from '../axios';

export default {
  get(orderId) {
    return apiHelper.get(`/order/${orderId}`);
  },
  postOrder(form) {
    return apiHelper.post('/order', { data: form });
  },
  postPayment(orderId) {
    return apiHelper.post(`/pay/${orderId}`);
  },
};
