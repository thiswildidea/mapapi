 import mapconfig from '@/config/mapconfigshare.js';
 import load from '@/utils/jsapi.js';
 import {
   getmaptoken
 } from '@/utils/mapdata.js';

 const mapsenceViewSetting = {
   async mapsenceViewUsingProxy() {
     if (mapconfig.proxyConifg.useProxy === false) return;
     const [
       urlUtils,
       esriConfig,
     ] = await load([
       "esri/core/urlUtils",
       "esri/config",
     ]);
     mapconfig.proxyConifg.httpsDomains.map(function (item, key, ary) {
       urlUtils.addProxyRule({
         proxyUrl: item.proxyurl,
         urlPrefix: item.domainName
       })
     })
     esriConfig.geometryServiceUrl = mapconfig.GISService.geometryService;
   },

   async requestmapToken(tokenType) {
       const maptokenstring = await getmaptoken(tokenType, window.location.host)
       const tokenobject = JSON.parse(maptokenstring);
       return tokenobject.token
   }
 }
 export default mapsenceViewSetting
