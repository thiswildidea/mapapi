import mapconfig from '@/config/config_map.js'
import request from '@/utils/request.js';
import mapsenceViewPopup from '@/utils/maputils/mapsenceViewPopup.js';
import mapsenceViewSetting from '@/utils/maputils/mapsenceViewSetting.js';
import * as esriloader from "esri-loader";
import maplayersaddutils from '@/utils/maputils/maplayersaddutils.js';
import load from '@/utils/jsapi.js';
import $ from "jquery";
import {
  getmaptoken,
} from '@/utils/mapdata.js';
import JSON from 'json3';
import {
  cpus
} from 'os';

async function requestmapToken() {
  if (mapconfig.gisTokenServer.usebackendtoken === true) {
    const maptokenstring = await getmaptoken("onemap", window.location.host)
    const tokenobject = JSON.parse(maptokenstring);
    return tokenobject.token
  } else {
    return "";
  }
}

const mapctx = {
  async initmap() {
    esriloader.loadCss(mapconfig.cssUrl); //添加样式
    window.mapmodel = "2D";
    const [Map,
      Basemap,
      TileLayer,
      SceneLayer,
      VectorTileLayer,
      MapImageLayer,
      IntegratedMeshLayer,
      PointCloudLayer,
      SHCTiledMapServiceLayer,
      SHCMapServiceLayer,
      MapView,
      SceneView,
      Home,
      Fullscreen,
      HoloGraphicButton,
      GridButton,
      BaseMapSwitchButton,
      AboveBelowModeSwitch,
      Compass,
      NavigationToggle,
      Zoom,
      Expand,
      LayerList,
      BasemapGallery,
      LocalBasemapsSource,
      DirectLineMeasurement3D,
      AreaMeasurement3D,
      CoordinateConversion,
      watchUtils,
      urlUtils,
      esriConfig,
      Point,
      Extent,
      SpatialReference,
      IdentityManager,
      MapSceneSwitch_Control,
      Camera,
      GroupLayer,
      FeatureLayer,
      BMapGallery_Control,
      QueryTask,
      Query,
      MeasureMent3DTool,
      Collection,
      IdentifyTask,
      IdentifyParameters,
      Graphic,
      array,
      query
    ] = await load([
      "esri/Map",
      "esri/Basemap",
      "esri/layers/TileLayer",
      "esri/layers/SceneLayer",
      "esri/layers/VectorTileLayer",
      "esri/layers/MapImageLayer",
      "esri/layers/IntegratedMeshLayer",
      "esri/layers/PointCloudLayer",
      "esri/layers/SHCTiledMapServiceLayer",
      "esri/layers/SHCMapServiceLayer",
      "esri/views/MapView",
      "esri/views/SceneView",
      "esri/widgets/Home",
      "esri/widgets/Fullscreen",
      "esri/widgets/HoloGraphicButton",
      "esri/widgets/GridButton",
      "esri/widgets/BaseMapSwitchButton",
      "esri/widgets/AboveBelowModeSwitch",
      "esri/widgets/Compass",
      "esri/widgets/NavigationToggle",
      "esri/widgets/Zoom",
      "esri/widgets/Expand",
      "esri/widgets/LayerList",
      "esri/widgets/BasemapGallery",
      "esri/widgets/BasemapGallery/support/LocalBasemapsSource",
      "esri/widgets/DirectLineMeasurement3D",
      "esri/widgets/AreaMeasurement3D",
      "esri/widgets/CoordinateConversion",
      "esri/core/watchUtils",
      "esri/core/urlUtils",
      "esri/config",
      "esri/geometry/Point",
      "esri/geometry/Extent",
      "esri/geometry/SpatialReference",
      "esri/identity/IdentityManager",
      "esri/widgets/MapSceneSwitch_Control",
      "esri/Camera",
      "esri/layers/GroupLayer",
      "esri/layers/FeatureLayer",
      "esri/widgets/BMapGallery_Control",
      "esri/tasks/QueryTask",
      "esri/tasks/support/Query",
      "esri/widgets/MeasureMent3DTool",
      "esri/core/Collection",
      "esri/tasks/IdentifyTask",
      "esri/tasks/support/IdentifyParameters",
      "esri/Graphic",
      "dojo/_base/array",
      "dojo/query"
    ]);

    await mapsenceViewSetting.mapsenceViewUsingProxy();

    let maptoken;
    if (mapconfig.GISService.baseMapServices.istoken) {
      maptoken = await mapsenceViewSetting.requestmapToken('onemap');
      IdentityManager.registerToken({
        server: mapconfig.GISService.baseMapServices.serverurl,
        token: maptoken
      });
    } else {
      maptoken = "";
    }

    const basemaplayers = await maplayersaddutils.initiallayers(mapconfig.GISService.baseMapServices.layers, maptoken);
    const bmap = new Basemap({
      baseLayers: basemaplayers,
      title: "底图",
      id: "myBasemap"
    });

    window.map = new Map({
      basemap: bmap
    });


    IdentityManager.on('dialog-create', function () {
      IdentityManager.dialog.open = true;
    })

    let kjjcgroup = new GroupLayer({
      id: mapconfig.GISService.operationLayers.topGroup.id,
      title: mapconfig.GISService.operationLayers.topGroup.title,
      visible: mapconfig.GISService.operationLayers.topGroup.visible,
      listMode: mapconfig.GISService.operationLayers.topGroup.listMode,
    });

    const operationlayerslist = await maplayersaddutils.initalGroupAndlayers(mapconfig.GISService.operationLayers.layerGroups, "");
    kjjcgroup.addMany(operationlayerslist);

    window.map.add(kjjcgroup);


    // await maplayersaddutils.initial_kz_layers(mapconfig.GISService.bussinesslayer.layers, "");

    const xuhuilayers = await maplayersaddutils.initiallayers(mapconfig.GISService.xuhuilayers.layers, maptoken);
    window.map.addMany(xuhuilayers);

    window.camera = new Camera({
      fov: mapconfig.extent.camera.fov,
      heading: mapconfig.extent.camera.heading,
      position: {
        x: mapconfig.extent.camera.x,
        y: mapconfig.extent.camera.y,
        z: mapconfig.extent.camera.z,
        spatialReference: 102100
      },
      tilt: mapconfig.extent.camera.tilt
    })

    window.Gridcamera = new Camera({

      fov: mapconfig.Gridcamera.fov,
      heading: mapconfig.Gridcamera.heading,
      position: {
        x: mapconfig.Gridcamera.x,
        y: mapconfig.Gridcamera.y,
        z: mapconfig.Gridcamera.z,
        spatialReference: 102100
      },
      tilt: mapconfig.Gridcamera.tilt
    })

    window.sceneView = new SceneView({
      map: map,
      container: "viewDiv",
      spatialReference: {
        wkid: 102100
      },
      center: {
        x: mapconfig.extent.center.x,
        y: mapconfig.extent.center.y,
        z: mapconfig.extent.center.z,
        spatialReference: 102100
      },
      camera: window.camera,
      zoom: mapconfig.extent.zoom,
      viewingMode: "local",
      environment: {
        // atmosphere:null,
        // background: {
        //   type: "color",
        //   color: [0, 0, 0, 0]
        // },
        // starsEnabled: false,
        // atmosphereEnabled: false,
        lighting: {
          date: new Date("August 1, 2019 12:00:00 GMT +0000"),
          directShadowsEnabled: true,
          ambientOcclusionEnabled: true,
        }
      }
    });


    window.homeWidget = new Home({
      view: window.sceneView
    });
    window.fullscreen = new Fullscreen({
      container: document.createElement("div"),
      view: window.sceneView
    });

    window.HoloGraphicButton = new HoloGraphicButton({
      container: document.createElement("div"),
      id: "HoloGraphicButton",
      view: window.sceneView,
    });

    window.GridButton = new GridButton({
      container: document.createElement("div"),
      id: "GridButton",
      view: window.sceneView,
    });

    window.BaseMapSwitchButton = new BaseMapSwitchButton({
      container: document.createElement("div"),
      id: "BaseMapSwitchButton",
      view: window.sceneView,
    });

    window.AboveBelowModeSwitch = new AboveBelowModeSwitch({
      container: document.createElement("div"),
      id: "AboveBelowModeSwitch",
      view: window.sceneView,
    });


    window.LayerList = new LayerList({
      container: document.createElement("div"),
      id: "maplayerlist",
      view: window.sceneView,
    });

    window.LayerListExpand = new Expand({
      id: "layerlistonly",
      view: window.sceneView,
      content: window.LayerList.domNode,
      expandIconClass: "esri-icon-layers",
      expandTooltip: "专题图层框",
      group: "top-left"
    });

    window.MapSceneSwitch = new MapSceneSwitch_Control({
      container: document.createElement("div"),
      view: window.sceneView,
      camera: window.camera
    });

    window.BMapGallery_Control = new BMapGallery_Control({
      container: document.createElement("div"),
      view: window.sceneView,
    });


    window.BMapGallerysExpand = new Expand({
      expandIconClass: "esri-icon-basemap",
      expandTooltip: "底图切换",
      view: window.sceneView,
      content: window.BMapGallery_Control.domNode,
      group: "bottom-right"
    });


    window.MeasureMent3DTool = new MeasureMent3DTool({
      container: document.createElement("div"),
      view: window.sceneView,
    });

    window.MeasureMent3DToolExpand = new Expand({
      expandIconClass: "esri-icon-Rulers",
      expandTooltip: "地图测量",
      view: window.sceneView,
      content: window.MeasureMent3DTool.domNode,
      group: "bottom-right"
    });

    window.sceneView.ui.remove("attribution");
    window.sceneView.ui.empty('top-left');
    window.sceneView.ui.empty('top-right');
    window.sceneView.ui.empty('bottom-left');
    window.sceneView.ui.empty('bottom-right');
    // window.sceneView.ui.add(BMapGallerysExpand, "top-right");
    // window.sceneView.ui.add(LayerListExpand, "top-right");
    // window.sceneView.ui.add(homeWidget, "top-right");
    // window.sceneView.ui.add(fullscreen, "top-right");
    // window.sceneView.ui.move(["zoom", "compass"], 'top-right');
    // window.sceneView.ui.remove(["attribution", "navigation-toggle"]);
    // window.sceneView.ui.add(MeasureMent3DToolExpand, "top-right");
    // window.sceneView.ui.add(MapSceneSwitch, "top-right");
    window.sceneView.on("click", function (event) {
      // console.log(window.sceneView.camera);
      // console.log(window.sceneView.center);
      sceneView.hitTest(event).then(async function (response) {
        if (response.results.length > 0) {
          const layername = response.results[0].graphic.layer.id;
          const objectid = response.results[0].graphic.attributes.objectid
          let returnresult;
          let returnactionname;
          switch (layername) {
            case "XH_VideoCamera":
              let cameraQuery = response.results[0].graphic.layer.createQuery();
              cameraQuery.where = "objectid =" + objectid;
              await response.results[0].graphic.layer.queryFeatures(cameraQuery).then(function (response) {
                if (response.features.length > 0) {
                  returnresult = response.features[0].attributes;
                  returnactionname = layername;
                  window.sceneView.goTo([response.features[0]]);


                }
              });
            case "XH_JD":
            case "XH_JWH":
              let layerQuery = response.results[0].graphic.layer.createQuery();
              layerQuery.where = "objectid =" + objectid;
              await response.results[0].graphic.layer.queryFeatures(layerQuery).then(function (response) {
                if (response.features.length > 0) {
                  returnresult = response.features[0].attributes;
                  returnactionname = layername;

                  window.sceneView.goTo([response.features[0]]);

                  const XH_Graphiclayer = window.map.findLayerById("XH_Graphiclayer");
                  const layercount = window.map.layers.length;

                  window.map.reorder(XH_Graphiclayer, layercount + 2)

                  let hightlightgraphic = new Graphic({
                    geometry: response.features[0].geometry,
                    symbol: mapconfig.PgHightlightsymbol
                  });
                  if (XH_Graphiclayer != null) {
                    XH_Graphiclayer.removeAll();
                    XH_Graphiclayer.add(hightlightgraphic);
                  }
                }
              });
              break;
            default:
              const graphiclayer = window.map.findLayerById(response.results[0].graphic.layer.id);
              if (graphiclayer != null && graphiclayer != undefined) {
                const graphiclist = graphiclayer.source.items.find(function (result) {
                  return result.attributes.OBJECTID === response.results[0].graphic.attributes.OBJECTID
                })
                if (graphiclist != undefined) {
                  window.sceneView.goTo([response.results[0].graphic]);
                  returnresult = graphiclist;
                  returnactionname = "finished";
                }
              }
          }
          window.parent.postMessage(JSON.stringify({
            "action": returnactionname,
            "layername": layername,
            "screenX": event.x,
            "screenY": event.y,
            "data": returnresult
          }), '*')



          window.parent.postMessage(JSON.stringify({
            "action": "senceviewcamera",
            "data": window.sceneView.camera
          }), '*')
        }
      });

      const XH_DT_Newlayer = window.map.findLayerById('XH_DT_New')
      if (XH_DT_Newlayer != undefined && XH_DT_Newlayer.visible === true) {
        let identifyTask = new IdentifyTask(XH_DT_Newlayer.url);
        let params = new IdentifyParameters();
        params.tolerance = 20;
        let layerIds = [];
        window.currentSubLayerArray.map(item => {
          layerIds.push(item.id)
        })
        // console.log(window.currentSubLayerArray);
        params.layerIds = layerIds;
        params.layerOption = "top";
        params.width = window.sceneView.width;
        params.height = window.sceneView.height;
        params.geometry = event.mapPoint;
        params.mapExtent = window.sceneView.extent;
        params.returnGeometry = true;
        identifyTask.execute(params).then(function (response) {
          if (response.results.length > 0) {
            window.parent.postMessage(JSON.stringify({
              "action": XH_DT_Newlayer.id,
              "layername": XH_DT_Newlayer.id,
              "screenX": event.x,
              "screenY": event.y,
              "data": response.results[0].feature.attributes
            }), '*')


            let ttsymbol;
            if (response.results[0].feature.geometry.type === "point") {
              ttsymbol = mapconfig.PointHightlightsymbol
            } else if (response.results[0].feature.geometry.type === "polyline") {
              ttsymbol = mapconfig.PolylineHightsymbol
            } else {
              ttsymbol = mapconfig.PgHightlightsymbol
            }
            
            const XH_Graphiclayer = window.map.findLayerById("XH_Graphiclayer");
            const layercount = window.map.layers.length;
            window.map.reorder(XH_Graphiclayer, layercount + 2)
            let hightlightgraphic = new Graphic({
              geometry: response.results[0].feature.geometry,
              symbol: ttsymbol,
              spatialReference: SpatialReference.WebMercator
            });
            if (XH_Graphiclayer != null) {
              XH_Graphiclayer.removeAll();
              XH_Graphiclayer.add(hightlightgraphic);
                window.sceneView.goTo([hightlightgraphic]);
            }
          }
        })
      }
    });


    window.sceneView.on("layerview-create", function (event) {
      return false;
    });
  },
}
export default mapctx
