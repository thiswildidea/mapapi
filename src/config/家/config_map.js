import mapconfigshare from '@/config/mapconfigshare.js';

const mapconfig = {
  jsApiUrl: mapconfigshare.jsApiUrl,
  cssUrl: mapconfigshare.cssUrl,
  proxyConifg: mapconfigshare.proxyConifg,
  PgHightlightsymbol: mapconfigshare.PgHightlightsymbol,
  PolylineHightsymbol: mapconfigshare.PolylineHightsymbol,
  PolylineHightsymbol: mapconfigshare.PolylineHightsymbol,
  extent: {
    center: {
      x: 13537077.385854049,
      y: 3652270.2172402227,
      z: 0
    },
    camera: {
      fov: 55,
      heading: 0,
      tilt: 0.49999999998674155,
      x: 13537076.851320172,
      y: 3649178.5062483237,
      z: 354103.4783871001
    },
    zoom: 5,
    wkt: 'PROJCS["shanghaicity",GEOGCS["GCS_Beijing_1954",DATUM["D_Beijing_1954",SPHEROID["Krasovsky_1940",6378245.0,298.3]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Transverse_Mercator"],PARAMETER["False_Easting",-3457147.81],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",121.2751921],PARAMETER["Scale_Factor",1.0],PARAMETER["Latitude_Of_Origin",0.0],UNIT["Meter",1.0]]'
  },
  Gridcamera: mapconfigshare.Gridcamera,
  gisTokenServer: mapconfigshare.gisTokenServer,
  GISService: {
    geometryService: mapconfigshare.GISService.geometryService,
    baseMapServices: {
      serverurl: "http://map.geoq.cn/ArcGIS/rest/services",
      istoken: false,
      tokenType: "onemap",
      layers: [{
        url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer",
        id: "basemap_Air",
        istoken: false,
        visible: false,
        opacity: 1.0,
        maptype: "TileLayer",
        tag: "影像底图",
        title: "影像",
        type: "image",
        imageUrl: require("../assets/basemap/mapType_img.jpg"),
      }, {
        url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer",
        id: "basemap_zw",
        istoken: false,
        visible: true,
        opacity: 1.0,
        maptype: "TileLayer",
        tag: "政务图",
        title: "政务",
        type: "zw",
        imageUrl: require("../assets/basemap/mapType_zw.jpg"),
      }, {
        url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
        id: "basemap_as",
        istoken: false,
        visible: false,
        opacity: 1.0,
        maptype: "TileLayer",
        tag: "暗色版",
        title: "暗色",
        type: "dark",
        imageUrl: require("../assets/basemap/mapType_as.jpg")
      }]
    },

    operationLayers: {
      serverurl: "http://10.108.3.48/changsanjiao/rest/services",
      istoken: false,
      tokenType: "arcgis",
      topGroup: {
        id: "bussiness_layer_kjjc",
        title: "空间基础",
        tag: "bussiness_layer_kjjc",
        listMode: 'show',
        visible: true,
        sencondaryGroup: {
          id: "bussiness_layer_kjjc_underground",
          title: "地下",
          tag: "bussiness_layer_kjjc_underground",
          visible: false,
        }
      },
      layerGroups: [{
        id: "bussiness_layer_kjjc_overground",
        title: "地上",
        tag: "bussiness_layer_kjjc_overground",
        visible: true,
        listMode: 'show',
        layerGroups: null,
        layers: [{
            url: "https://tiles.arcgis.com/tiles/z2tnIkrLQ2BRzr6P/arcgis/rest/services/New_York_LoD2_3D_Buildings/SceneServer",
            id: "basemap_Air_readmodel",
            istoken: false,
            visible: false,
            opacity: 1.0,
            maptype: "SceneLayer",
            tag: "影像底图精模",
            title: "影像底图精模",
            type: "basemap_Air_readmodel",
            popupEnabled: false,
            // listMode: "hide",
            imageUrl: require("../assets/basemap/mapType_as.jpg")
          },
          {
            url: "https://tiles.arcgis.com/tiles/z2tnIkrLQ2BRzr6P/arcgis/rest/services/New_York_LoD2_3D_Buildings/SceneServer",
            id: "basemap_zw_baimodel",
            istoken: false,
            visible: false,
            opacity: 1.0,
            maptype: "SceneLayer",
            tag: "政务白模型",
            title: "政务白模型",
            type: "basemap_zw_baimodel",
            popupEnabled: false,
            // listMode: "hide",
            renderer: {
              type: "simple",
              symbol: {
                type: "mesh-3d",
                symbolLayers: [{
                  type: "fill",
                  material: {
                    color: [255, 255, 255, 0.6],
                    colorMixMode: "replace"
                  },
                  edges: {
                    type: "solid",
                    color: [0, 0, 0, 0.6],
                    size: 1
                  }
                }]
              }
            },
            imageUrl: require("../assets/basemap/mapType_as.jpg")
          },
          {
            url: "https://tiles.arcgis.com/tiles/z2tnIkrLQ2BRzr6P/arcgis/rest/services/New_York_LoD2_3D_Buildings/SceneServer",
            id: "basemap_as_baimodel",
            istoken: false,
            visible: false,
            opacity: 1.0,
            maptype: "SceneLayer",
            tag: "暗色白模型",
            title: "暗色白模型",
            type: "basemap_as_baimodel",
            popupEnabled: false,
            // listMode: "hide",
            renderer: {
              type: "simple",
              symbol: {
                type: "mesh-3d",
                symbolLayers: [{
                  type: "fill",
                  material: {
                    color: [77, 126, 176, 1],
                    colorMixMode: "replace"
                  },
                  edges: {
                    type: "solid",
                    color: [0, 0, 0, 1],
                    size: 0.2
                  }
                }]
              }
            },
            imageUrl: require("../assets/basemap/mapType_as.jpg")
          }
        ]
      }],

    },

    xuhuilayers: {
       serverurl: "http://hostserver.xhbd.local/arcgis/rest/services",
       istoken: false,
       tokenType: "arcgis",
       layers: [{
         id: "XH_Graphiclayer",
         istoken: false,
         visible: true,
         opacity: 1.0,
         maptype: "GraphicsLayer",
         tag: "辅助显示图层",
         title: "辅助显示图层",
         type: "image",
         listMode: 'hide',
         imageUrl: require("../assets/basemap/mapType_img.jpg"),
       }]
     }
  }
};
export default mapconfig;
