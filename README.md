# HOLO購物網前台
一個基於 Vue 2 和 BootStrap 構建的響應式電商網站，可於對應的[後台網站](https://github.com/chartlines/e-website-manage-interface)控制商品呈現內容和優惠卷，並查看訂單記錄

<a name="table-of-contents"></a>
## 目錄
  1. [內容](#content)
  1. [使用工具](#resources)

<a name="content"></a>
## 內容

  - [1.1](#1.1) <a name='1.1'></a> **產品展示**：<br>
  將所有後台新增並啟動的產品按類別劃分為服飾、食品和家居三個部分羅列，點擊產品則可分別查閱其具體介紹

  - [1.2](#1.2) <a name='1.2'></a> **購物車**：<br>
  可從商品列表中快速添加單件商品到購物車，或是從商品詳情頁中設置要添加到購物車的商品的具體件數。而當前購物車的情況，可在所有頁面中透過navbar右上角的icon確認

  - [1.3](#1.3) <a name='1.3'></a> **結帳**：<br>
  在購物車單擊結帳按鈕可前往結帳頁面，按步驟填入購物人資訊和確認付款後則會清空購物車並將訂單信息送往後台管理頁面

  **[⬆ 回到頂端](#table-of-contents)**

<a name="resources"></a>
## 使用工具

  - [2.1](#2.1) <a name='2.1'></a> **六角學院API**：<br>
  串接[六角學院開放的API](https://github.com/hexschool/vue-course-api-wiki/wiki/%E7%99%BB%E5%85%A5%E5%8F%8A%E9%A9%97%E8%AD%89)來模擬向後端伺服器請求資料的行為

  - [2.2](#2.2) <a name='2.2'></a> **BootStrap 5**：<br>
  使用BootStrap 5提供的元件為基底，來客製化所需樣式細節。由於BootStrap整體內容過於龐大，因此僅從Bootstrap引入部分使用到的CSS和JavaScript來最優化文件大小

  - [2.3](#2.3) <a name='2.3'></a> **Vue 2**：<br>
  使用Vue CLI來快速建置環境，並通過Vue-Router來劃分前端路由。而對於不同頁面下的共用狀態，則透過Vuex來統一管理。此外，網頁內填寫的表單使用了Vee-validate下的元件來做表單驗證和自訂錯誤提示

  **[⬆ 回到頂端](#table-of-contents)**
