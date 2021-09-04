<template>
 <div>
    <Loading :active.sync="isOuterLoading" loader="bars"></Loading>
    <header class="header-bg">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <router-link class="navbar-brand" :to="{name:'CustomerHome'}">
            <h1 class="h3 text-warning">
              <font-awesome-icon icon="american-sign-language-interpreting" class="me-1"/>
              HOLO商城
            </h1>
          </router-link>
          <!-- 購物車 -->
          <div class="dropdown">
            <button class="btn btn-outline-secondary fs-4 border-0 position-relative" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
              <font-awesome-icon icon="shopping-cart" class="text-warning"/>
              <span class="position-absolute start-75 translate-middle badge rounded-pill bg-danger" v-if="cartArray.length">
                {{cartArray.length}}
              </span>
            </button>
            <div class="dropdown-menu dropdown-menu-dark dropdown-menu-end py-3 dropdown-minsize text-nowrap"
              aria-labelledby="navbarDarkDropdownMenuLink">
              <p class="fs-5 mb-2 px-3">已選擇商品</p>
              <div v-for="item in cartArray" :key="item.id" class="d-flex mb-2 align-items-center justify-content-between px-3 py-1 link-hover">
                <a class="d-flex align-items-center justify-content-between text-decoration-none text-light">
                  <div :style="{'background-image': `url(${item.product.imageUrl})`}" style="width:80px;height:80px" class="card-img me-3"></div>
                  <div class="me-2">{{item.product.title}}</div>
                  <div class="me-2">{{item.qty}}{{item.product.unit}}</div>
                  <div class="me-3">{{item.product.price | currencyFilter}}</div>
                </a>
                <button type="button" class="btn btn-outline-danger btn-sm py-1" @click.prevent="delFromCart(item.id)">
                    <font-awesome-icon icon="trash-alt"/>
                </button>
              </div>
              <a class="btn d-block mt-1 fs-5 btn-secondary text-light mx-4" :class="{'disabled':cartArray.length === 0}" href="#" role="button">
                  結帳<font-awesome-icon icon="shopping-cart" class="ms-1"/>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <main class="container">
      <!-- 麵包屑-->
      <nav aria-label="breadcrum">
        <ol class="breadcrumb mb-5">
          <li class="breadcrumb-item fs-5"><a href="#" class="text-decoration-none">首頁</a></li>
          <li class="breadcrumb-item fs-5"><a href="#" class="text-decoration-none">金牌專賣店</a></li>
          <li class="breadcrumb-item active fs-5" aria-current="page">金牌西裝</li>
        </ol>
      </nav>

      <section class="row">
        <div class="col-md-4">
          <div class="sticky-top sticky-top-mt">
            <h1>金牌西裝<span class="h3 text-secondary">（加拉哈德版）</span></h1>
            <div class="d-flex justify-content-between align-items-end border-bottom mb-3">
              <p class="text-secondary text-decoration-line-through">售價 $1299</p>
              <p class="text-danger fs-4">特價 NT$<strong class="fs-3">520</strong></p>
            </div>
            <div class="d-flex align-items-center mb-4">
              <p class="mb-0"> 尺寸：</p>
              <div class="btn-group btn-group-sm" role="group" aria-label="Basic outlined example">
                <button type="button" class="btn btn-outline-secondary">SM</button>
                <button type="button" class="btn btn-outline-secondary">M</button>
                <button type="button" class="btn btn-outline-secondary">L</button>
                <button type="button" class="btn btn-outline-secondary">XL</button>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col">
                <form action="">
                  <select class="form-select" aria-label="Default select example">
                    <option value="1" selected>1件</option>
                    <option value="2">2件</option>
                    <option value="3">3件</option>
                  </select>
                </form>
              </div>
              <div class="col-auto ps-0">
                <button type="button" class="btn btn-primary"><i class="fas fa-cart-arrow-down"></i>加入購物車</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <h2>帥氣的西裝無人能敵</h2>
          <p class="mb-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta, numquam assumenda. Ipsa, suscipit dolor, placeat facilis deserunt minus voluptatem alias soluta a nam voluptas unde facere incidunt quas accusantium ducimus.</p>
          <h3 class="text-center">合身剪裁</h3>
          <img src="https://images.unsplash.com/photo-1472417583565-62e7bdeda490?w=634" class="w-100" alt="">

          <h3 class="text-center mt-3">簡單就好</h3>
          <img src="https://images.unsplash.com/photo-1497339100210-9e87df79c218?w=1500" class="w-100" alt="">

          <h3 class="text-center mt-3">不佔空間</h3>
          <img src="https://images.unsplash.com/photo-1475530060488-75a6de1dca6f?w=675" class="w-100" alt="">

          <div class="my-4 bg-light p-3" role="alert">
              <h2 class="text-center h2">購物說明</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, at! Totam, exercitationem
                  repellat. Saepe facere amet expedita perferendis voluptatem dicta dignissimos tempora ut atque, rerum doloribus? Magni,
                  blanditiis. Assumenda, distinctio!
              </p>
          </div>
        </div>
      </section>
    </main>
    <footer>
        <div class="footer position-absolute end-0 bottom-0 start-0 p-3 text-center fs-4 text-warning">
          <p>@copyright</p>
        </div>
    </footer>
  </div>
</template>
