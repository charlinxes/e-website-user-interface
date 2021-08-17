<template>
  <div class="products">
    <!-- 插入全屏載入效果 -->
    <Loading :active.sync="isOuterLoading" loader="bars"></Loading>
    <div class="alert alert-danger alert-dismissible fade show
      w-auto d-inline-block position-absolute start-50 translate-middle-x" id="myAlert" role="alert" v-if="showAlert">
      <strong>{{alertMessage}}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click.prevent="showModal(true)">建立新的產品</button>
      <!-- <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#productModal">建立新的產品</button> -->
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="20%">分類</th>
          <th>產品名稱</th>
          <th width="10%">原價</th>
          <th width="10%">售價</th>
          <th class="text-center" width="7%">是否啟用</th>
          <th class="text-center" width="10%">編輯 / 刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-end">{{ item.origin_price | currencyFilter }}</td>
          <td class="text-end">{{ item.price | currencyFilter }}</td>
          <td class="text-center">
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td class="text-center">
            <button class="btn btn-outline-primary btn-sm" @click.prevent="showModal(false, item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm ms-2" @click.prevent="showDelModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="productModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="productModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="btn-close" aria-label="Close" @click.prevent="hideModal"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="row">
                  <div class="col-12">
                    <label for="image">輸入圖片網址</label>
                    <input type="text" class="form-control" id="image" placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
                  </div>
                  <div class="col-12 mt-3">
                    <label for="customFile">或 上傳圖片
                      <!-- 加上fontawesome的動畫icon -->
                      <font-awesome-icon v-if="isInnerLoading" icon="spinner" spin/>
                    </label>
                    <input type="file" name="file-to-upload" class="form-control" id="customFile" ref="files" @change="uploadFile">
                  </div>
                  <img :src="tempProduct.imageUrl" class="img-fluid" :alt="tempProduct.image">
                  <div class="text-danger fw-bold text-end" v-if="showInsideAlert">上傳失敗，{{alertMessage}}</div>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="row">
                  <div class="col-12">
                    <label for="title">標題</label>
                    <input type="text" class="form-control" id="title" placeholder="請輸入標題" v-model="tempProduct.title">
                  </div>

                  <div class="col-12 mt-3">
                    <div class="row">
                      <div class="col-md-6">
                        <label for="category">分類</label>
                        <input type="text" class="form-control" id="category" placeholder="請輸入分類" v-model="tempProduct.category">
                      </div>
                      <div class="col-md-6">
                        <label for="price">單位</label>
                        <input type="unit" class="form-control" id="unit" placeholder="請輸入單位" v-model="tempProduct.unit">
                      </div>
                    </div>
                  </div>

                  <div class="col-12 mt-3">
                    <div class="row">
                      <div class="col-md-6">
                      <label for="origin_price">原價</label>
                        <input type="number" class="form-control" id="origin_price" placeholder="請輸入原價" v-model="tempProduct.origin_price">
                      </div>
                      <div class="col-md-6">
                        <label for="price">售價</label>
                        <input type="number" class="form-control" id="price" placeholder="請輸入售價" v-model="tempProduct.price">
                      </div>
                    </div>
                  </div>

                  <hr class="mt-4"/>

                  <div class="col-12">
                    <label for="description">產品描述</label>
                    <textarea type="text" class="form-control" id="description" placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
                  </div>
                  <div class="col-12 mt-3">
                    <label for="content">說明內容</label>
                    <textarea type="text" class="form-control" id="content" placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
                  </div>
                  <div class="col-12 mt-3">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="is_enabled"
                        v-model="tempProduct.is_enabled" true-value="1" false-value="0">
                      <label class="form-check-label" for="is_enabled">
                        是否啟用
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" @click.prevent="hideModal">取消</button>
            <button type="button" class="btn btn-primary" @click.prevent="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- delModal -->
    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog" aria-labelledby="productModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="productModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="btn-close" aria-label="Close" @click.prevent="hideDelModal"></button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" @click.prevent="hideDelModal">取消</button>
            <button type="button" class="btn btn-danger" @click.prevent="updateProduct">確認刪除</button>
          </div>
        </div>
      </div>
    </div>

    <Pagination v-bind="paginationObj" @updateDataList="getProducts"/>

  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
import Alert from 'bootstrap/js/dist/alert';
import Pagination from '../components/Pagination.vue';

export default {
  name: 'Products',
  data() {
    return {
      products: [],
      tempProduct: {},
      myModal: {},
      modalState: '',
      isOuterLoading: false,
      isInnerLoading: false,
      showAlert: false,
      showInsideAlert: false,
      alertMessage: '',
      paginationObj: {
        total_pages: 1,
        current_page: 1,
        has_pre: false,
        has_next: false,
      },
    };
  },
  components: {
    Pagination,
  },
  created() {
    this.getProducts();
  },
  mounted() {
    this.myModal = new Modal(document.getElementById('productModal'));
    this.delMyModal = new Modal(document.getElementById('delProductModal'));
    this.myAlert = new Alert(document.getElementById('myAlert'));
  },
  methods: {
    getProducts(page = 1) {
      this.isOuterLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      this.$http.get(api).then((response) => {
        this.isOuterLoading = false;
        this.products = response.data.products;
        this.paginationObj = response.data.pagination;
      });
    },
    showModal(judge, item) {
      if (judge) {
        document.getElementById('customFile').value = '';
        this.tempProduct = {};
        this.modalState = 'add';
        this.myModal.show();
      } else {
        document.getElementById('customFile').value = '';
        this.tempProduct = { ...item };
        this.modalState = 'revise';
        this.myModal.show();
      }
    },
    showDelModal(item) {
      this.tempProduct = { ...item };
      this.modalState = 'delete';
      this.delMyModal.show();
    },
    hideModal() {
      this.myModal.hide();
    },
    hideDelModal() {
      this.delMyModal.hide();
    },
    updateProduct() {
      if (this.modalState === 'add') {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
        this.$http.post(api, { data: this.tempProduct }).then((response) => {
          if (response.data.success) {
            this.hideModal();
            this.getProducts();
          } else {
            this.hideModal();
            this.alertMessage = response.data.message;
            this.showAlert = true;
            setTimeout(() => {
              this.showAlert = false;
            }, 5000);
            // alert('新增失敗');
          }
        });
      } else if (this.modalState === 'revise') {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${this.tempProduct.id}`;
        this.$http.put(api, { data: this.tempProduct }).then((response) => {
          if (response.data.success) {
            this.hideModal();
            this.getProducts();
          } else {
            this.hideModal();
            this.alertMessage = response.data.message;
            this.showAlert = true;
            setTimeout(() => {
              this.showAlert = false;
            }, 5000);
            // alert('修改失敗');
          }
        });
      } else if (this.modalState === 'delete') {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${this.tempProduct.id}`;
        this.$http.delete(api, { data: this.tempProduct }).then((response) => {
          if (response.data.success) {
            this.hideDelModal();
            this.getProducts();
          } else {
            this.hideDelModal();
            this.alertMessage = response.data.message;
            this.showAlert = true;
            setTimeout(() => {
              this.showAlert = false;
            }, 5000);
            // alert('刪除失敗');
          }
        });
      }
    },
    uploadFile(event) {
      this.isInnerLoading = true;
      const uploadedFile = event.target.files[0];
      // 或是 const uploadedFile = this.$refs.files.files[0];
      // event.target 相當於 this.refs.files(HTML要設置 ref="files")
      console.log(uploadedFile);
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile); // file-to-upload 這個名稱是根據API規定的識別名稱
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
      this.$http.post(api, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          this.tempProduct = { ...this.tempProduct, imageUrl: response.data.imageUrl };
        } else {
          this.alertMessage = response.data.message;
          this.showInsideAlert = true;
          setTimeout(() => {
            this.showInsideAlert = false;
          }, 5000);
          // alert('上傳圖片失敗');
        }
        this.isInnerLoading = false;
      });
    },
  },
};
</script>
