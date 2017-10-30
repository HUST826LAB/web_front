import { baseUrl } from './env'
import vueResource from 'vue-resource'
import Vue from 'vue'

Vue.use(vueResource)

export default function(url, type = 'get', data) {
  if (type == 'get') {
    return Vue.http.get(baseUrl + url, data)
  } else if (type == 'post') {
    return Vue.http.post(baseUrl + url, data)
  }
}