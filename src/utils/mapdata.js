import request from '@/utils/request.js';

// 获取token
export function getmaptoken(type, domian) {
  const params = {
    type: type,
    domian: domian
  };
  return request({
    // url: '/api/microgistoken/gis/gtoken',
    url: '/microgistoken/gis/gtoken',
    method: 'get',
    params
  });
}
