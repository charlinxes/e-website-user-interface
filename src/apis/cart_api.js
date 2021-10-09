import apiHelper from '../axios';

export default {
  get() {
    return apiHelper.get('/cart');
  },
  post(id, qty) {
    return apiHelper.post('/cart', { data: { product_id: id, qty } });
  },
  delete(id) {
    return apiHelper.delete(`/cart/${id}`);
  },
};
