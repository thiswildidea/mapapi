import esriLoader from 'esri-loader'
import mapconfig from '../config/mapconfigshare'

const pathRegex = new RegExp(/\/[^\/]+$/);
const locationPath = location.pathname.replace(pathRegex, '');
const dojoConfig = {
  async: true,
   packages: [/* {
    //  location: "http://powergis.smi.sh.cegn.cn/dist" + '/arcgis/dojo-bootstrap',
      location: locationPath + '/arcgis/dojo-bootstrap',
     name: 'bootstrap'
   },{
      // location: "http://powergis.smi.sh.cegn.cn/dist" + '/arcgis/Utils',
      location: locationPath + '/arcgis/Utils',
      name: 'Utils'
   } */],
  deps:['@dojo/framework/shim/main'],
  has: {
    'esri-promise-compatibility': 1, 
    'esri-featurelayer-webgl': 1 
  }
}

function configEsriLoader() {
  esriLoader.utils.Promise = Promise
}

export default function load(modules) {
  configEsriLoader()
  return esriLoader.loadModules(modules, {
    dojoConfig,
    // version: '4.12',
    url: mapconfig.jsApiUrl
  })
}