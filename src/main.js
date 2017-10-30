// (function() {

//   document.addEventListener('DOMContentLoaded', function() {

//     var deviceWidth = document.documentElement.clientWidth;

//     document.documentElement.style.fontSize = deviceWidth / 6.4 + 'px';

//   }, false);

//   window.onresize = function() {

//     var deviceWidth = document.documentElement.clientWidth;

//     document.documentElement.style.fontSize = deviceWidth / 6.4 + 'px';

//   };

// })();
(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 80 * (clientWidth / 320) + 'px';
    };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import store from '@/store/vuex'


fastClick.attach(document.body);
Vue.config.productionTip = false
  /* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})