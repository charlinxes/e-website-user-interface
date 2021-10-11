<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <div class="row justify-content-center text-light">
      <form class="col-lg-7 col-md-9 col-10" @submit.prevent="handleSubmit(submitForm)" novalidate>
        <div class="row">
          <div class="col-12 h2 text-light text-center personalInformation__title--bgcolor mt-5 mb-4 py-2">訂購人資訊</div>
          <div class="col-12">
            <ValidationProvider name="email" rules="required|email" v-slot="{ errors, classes }">
              <label for="userEmail" class="fs-6 mb-2">電子信箱</label>
              <input type="email" class="form-control bg-transparent text-light" :class="classes" name="email" id="userEmail"
                v-model="form.user.email" placeholder="請輸入 Email" required>
              <p class="text-danger fw-bold mt-1 mb-1">{{errors[0]}}</p>
            </ValidationProvider>
          </div>
        </div>

        <div class="row mt-2">
          <div class="col-12">
            <ValidationProvider name="userName" rules="required" v-slot="{ errors, classes }">
              <label for="userName" class="fs-6 mb-2">收件人姓名</label>
              <input type="text" class="form-control bg-transparent text-light" :class="classes" name="userName" id="userName"
                v-model="form.user.name" placeholder="輸入姓名">
              <p class="text-danger fw-bold mt-1 mb-1">{{errors[0]}}</p>
            </ValidationProvider>
          </div>
        </div>

        <div class="row mt-2">
          <div class="col-12">
            <ValidationProvider name="userTel" rules="required|digits:10" v-slot="{ errors, classes }">
              <label for="userTel" class="fs-6 mb-2">收件人電話</label>
              <input type="text" class="form-control bg-transparent text-light" :class="classes" id="userTel" v-model="form.user.tel" placeholder="請輸入電話">
              <p class="text-danger fw-bold mt-1 mb-1">{{errors[0]}}</p>
            </ValidationProvider>
          </div>
        </div>

        <div class="row mt-2">
          <div class="col-12">
            <ValidationProvider name="userAddress" rules="required" v-slot="{ errors, classes }">
              <label for="userAddress" class="fs-6 mb-2">收件人地址</label>
              <input type="text" class="form-control bg-transparent text-light" :class="classes" name="address" id="userAddress" v-model="form.user.address"
                placeholder="請輸入地址">
              <p class="text-danger fw-bold mt-1 mb-1">{{errors[0]}}</p>
            </ValidationProvider>
          </div>
        </div>

        <div class="row mt-2 mb-3">
          <div class="col-12">
            <label for="comment" class="fs-6 mb-2">備註</label>
            <textarea name="comment" id="comment" class="form-control bg-transparent text-light" rows="6" v-model="form.message"></textarea>
          </div>
        </div>

        <div class="text-end fs-6 mb-2">
          <button type="submit" class="btn btn-outline-warning">下一步</button>
        </div>
      </form>
    </div>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'InformationForm',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    submitForm() {
      this.$emit('update-form', this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
  .invalid {
    border-color: red;
  }
</style>
