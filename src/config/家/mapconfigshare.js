const mapconfigshare = {
  jsApiUrl: "http://powergis.smi.sh.cegn.cn/arcgis_js/4.13/4.13/init.js",
  cssUrl: "http://powergis.smi.sh.cegn.cn/arcgis_js/4.13/4.13/esri/themes/light/main.css",
  //light (default)  dark  light-blue dark-blue light-green  dark-green light-purple dark-purple light-red dark-red

  extent: {
    center: {
      x: 1304.6439308887818,
      y: -1562.243589495095,
      z: 0
    },
    camera: {
      fov: 55,
      heading: 357.4933096463027,
      tilt: 59.93596337963188,
      x: -728.389844656444,
      y: -36272.693421941156,
      z: 16310.025608934411
    },
    zoom: 5,
    wkt: 'PROJCS["shanghaicity",GEOGCS["GCS_Beijing_1954",DATUM["D_Beijing_1954",SPHEROID["Krasovsky_1940",6378245.0,298.3]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Transverse_Mercator"],PARAMETER["False_Easting",-3457147.81],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",121.2751921],PARAMETER["Scale_Factor",1.0],PARAMETER["Latitude_Of_Origin",0.0],UNIT["Meter",1.0]]'
  },

  Gridcamera: {
    fov: 55,
    heading: 345.67605512172946,
    tilt: 68.55784695630796,
    x: -1571.9553292199612,
    y: -7903.619645387306,
    z: 632.2643924065151
  },
  proxyConifg: {
    useProxy: false,
    url: "/mapkProx/proxy.jsp",
    httpsDomains: [{
      proxyurl: "/mapkProx/proxy.jsp",
      domainName: "map.smi.sh.cegn.cn"
    }, {
      proxyurl: "/mapkProx/proxy.jsp",
      domainName: "10.108.3.48"
    }]
  },

  gisTokenServer: {
    usebackendtoken: true,
    backend: {
      tokenserverp: "https://powergis.smi.sh.cegn.cn/microgistoken/gis/ptoken",
      tokenserverg: "https://powergis.smi.sh.cegn.cn/microgistoken/gis/gtoken"
    },
    frontend: {
      useDefaultUser: true,
      ArcGIS: {
        tokenUrl: "http://192.168.100.166:6080/arcgis/admin/generateToken",
        tokenType: "ArcGIS",
        tokenUser: "siteadmin",
        tokenPassword: "esri@123",
        expiration: 1440
      },
      OneMap: {
        tokenUrl: "http://map.smi.sh.cegn.cn/RemoteTokenServer",
        tokenType: "OneMap",
        tokenUser: "super",
        tokenPassword: "11111111",
        expiration: 1440
      },
      Portal: {
        tokenUrl: "",
        tokenType: "",
        tokenUser: "",
        tokenPassword: "",
        expiration: 1440
      },
      expiration: 1440
    }
  },

  PgHightlightsymbol: {
    type: "simple-fill",
    color: [128, 128, 128, 0],
    outline: {
      color: [255, 255, 0, 1],
      width: "5px"
    }
  },

  PointHightlightsymbol: {
    type: "simple-marker",
    color: [226, 119, 40]
  },
  PolylineHightsymbol: {
    type: "simple-line",
    color: [255, 0, 0, 1],
    width: 2
  },


  PointSelectedHight: {
    type: "point-3d", // autocasts as new PointSymbol3D()
    symbolLayers: [{
      type: "icon", // autocasts as new ObjectSymbol3DLayer()
      size: 8,
      resource: {
        primitive: "circle"
      },
      material: {
        color: [14, 153, 251, 1]
      }
    }],

    verticalOffset: {
      screenLength: 150
    },

    callout: {
      type: "line", // autocasts as new LineCallout3D()
      color: [14, 153, 251, 0.4],
      size: 2,
      border: {
        color: "red"
      }
    }
  },

  GISService: {
    geometryService: "http://map.smi.sh.cegn.cn/OneMapServer/rest/services/Geometry/GeometryServer",
    baseMapServices: {
      serverurl: "http://map.smi.sh.cegn.cn/arcgis/rest/services",
      istoken: true,
      tokenType: "onemap",
      layers: [{
        url: "http://map.smi.sh.cegn.cn/OneMapServer/rest/services/Air/MapServer",
        id: "basemap_Air",
        istoken: true,
        visible: false,
        opacity: 1.0,
        maptype: "SHCTiledMapServiceLayer",
        tag: "影像底图",
        title: "影像",
        type: "image",
        imageUrl: require("../assets/basemap/mapType_img.jpg"),
      }, {
        url: "http://map.smi.sh.cegn.cn/OneMapServer/rest/services/BaseMap/MapServer",
        id: "basemap_zw",
        istoken: true,
        visible: false,
        opacity: 1.0,
        maptype: "SHCTiledMapServiceLayer",
        tag: "政务图",
        title: "政务",
        type: "zw",
        imageUrl: require("../assets/basemap/mapType_zw.jpg"),
      }, {
        url: "http://map.smi.sh.cegn.cn/OneMapServer/rest/services/shmap_as2/MapServer",
        id: "basemap_as",
        istoken: true,
        visible: true,
        opacity: 1.0,
        maptype: "SHCTiledMapServiceLayer",
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
        layerGroups: [],
        layers: [{
            url: "http://10.108.3.48/changsanjiao/rest/services/Hosted/%E9%BB%84%E6%B5%A6%E5%8C%BA%E5%A4%A7%E5%9C%BA%E6%99%AF%E6%A8%A1%E5%9E%8B/SceneServer",
            id: "basemap_Air_readmodel",
            istoken: false,
            visible: false,
            opacity: 1.0,
            maptype: "SceneLayer",
            tag: "影像底图精模",
            title: "影像底图精模",
            type: "basemap_Air_readmodel",
            popupEnabled: false,
            listMode: "hide",
            imageUrl: require("../assets/basemap/mapType_as.jpg")
          },
          {
            url: "http://10.108.3.48/changsanjiao/rest/services/Hosted/%E9%BB%84%E6%B5%A6%E5%8C%BA%E7%99%BD%E6%A8%A1%E5%9E%8B3/SceneServer",
            id: "basemap_zw_baimodel",
            istoken: false,
            visible: false,
            opacity: 1.0,
            maptype: "SceneLayer",
            tag: "政务白模型",
            title: "政务白模型",
            type: "basemap_zw_baimodel",
            popupEnabled: false,
            listMode: "hide",
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
            url: "http://10.108.3.48/changsanjiao/rest/services/Hosted/%E9%BB%84%E6%B5%A6%E5%8C%BA%E7%99%BD%E6%A8%A1%E5%9E%8B3/SceneServer",
            id: "basemap_as_baimodel",
            istoken: false,
            visible: false,
            opacity: 1.0,
            maptype: "SceneLayer",
            tag: "暗色白模型",
            title: "暗色白模型",
            type: "basemap_as_baimodel",
            popupEnabled: false,
            listMode: "hide",
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


  }
}
export default mapconfigshare;
