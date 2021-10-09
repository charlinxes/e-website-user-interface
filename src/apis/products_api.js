import apiHelper from '../axios';

export default {
  getList(page) {
    return apiHelper.get(`/products?page=${page}`);
  },
  get(productId) {
    return apiHelper.get(`product/${productId}`);
  },
};
