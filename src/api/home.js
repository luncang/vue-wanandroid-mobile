// import qs from 'qs'
// axios
// import request from '@/utils/request'
//home api

import api from './index'
import request from '@/utils/request'

export function getBanners() {
  return request({
    url: api.Banner,
    method: 'get'
  })
}

export function getHotKey() {
  return request({
    url: api.HotKey,
    method: 'get'
  })
}

