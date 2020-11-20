// import qs from 'qs'
// axios
// import request from '@/utils/request'
//home api

import api from './index'
import request from '@/utils/request'
import { format } from '@/utils/string'

export function getBanners() {
  return request({
    url: api.Banner,
    method: 'get'
  })
}

export function getHotKey() {
  return request({
    url: api.HotKey,
    method: 'get',
    hideloading: true
  })
}

export function search(k, page) {
  return request({
    url: format(api.Search, page),
    method: 'post',
    params: { k: k }
  })
}

export function getArticleList(page,cid) {
  return request({
    url: String.format(api.ArticleList,page,cid),
    method: 'get',
    hideloading: true
  })
}


export function getArticleTree() {
  return request({
    url:api.ActicleTree,
    method:'get'
  })
}
