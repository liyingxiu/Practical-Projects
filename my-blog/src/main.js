// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './router/index'

Vue.config.productionTip = false
Vue.use(VueResource);
Vue.use(VueRouter);

//自定义指令

// Vue.directive('rainbow',{
//   bind(el,binging,vnode){
//     el.style.color = "#" + Math.random().toString(16).slice(2,8);
//   }
// });

Vue.directive('theme',{
  bind(el,binging,vnode){
    if(binging.value=="wide"){
      el.style.maxWidth = '1260px';
    }else if(binging.value=="narrow"){
      el.style.maxWidth='560px';
    }
    if(binging.arg=='column'){
      el.style.background = '#6677cc';
      el.style.padding = '20px';
    }
  }
})

//自定义过滤器

// Vue.filter('to-uppercase',function(value){
//   return value.toUpperCase();
// })

Vue.filter('sinppet',function(value){
  return value.slice(0,100) + '...';
})

//创建路由
const router = new VueRouter({
  routes:Routes,
  mode:'history'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router:router
})
