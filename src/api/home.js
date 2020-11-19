// import qs from 'qs'
// axios
// import request from '@/utils/request'
//home api

import api from './index'
import request from '@/utils/request'

export function getBanners() {
  return request({
    url: api.Banner,
    method: 'get',
  })
}

export function getHotKey() {
  return request({
    url: api.HotKey,
    method: 'get',
    hideloading:true
  })
}

export function search(k, page) {
  return request({
    url: String.format(api.Search, page),
    method: 'post',
    params: { k: k }
  })
}

export function getArticleList(page) {
  return request({
    url: api.ArticleList,
    method: 'get',
    hideloading:true
  })
}
