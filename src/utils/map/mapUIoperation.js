import load from '@/utils/jsapi.js';
import JSON from 'json3';
import {
  Message
} from 'element-ui';
const mapUIoperation = {

  async toggleMapUI(Parameters) {
    const [
      BMapGallery_Control,
      MeasureMent3DTool,
      MapSceneSwitch_Control,
      LayerList,
      Expand,
      Home,
      Fullscreen,
      Zoom,
      HoloGraphicButton,
      GridButton,
      BaseMapSwitchButton,
      AboveBelowModeSwitch
    ] = await load([
      "esri/widgets/BMapGallery_Control",
      "esri/widgets/MeasureMent3DTool",
      "esri/widgets/MapSceneSwitch_Control",
      "esri/widgets/LayerList",
      "esri/widgets/Expand",
      "esri/widgets/Home",
      "esri/widgets/Fullscreen",
      "esri/widgets/Zoom",
      "esri/widgets/HoloGraphicButton",
      "esri/widgets/GridButton",
      "esri/widgets/BaseMapSwitchButton",
      "esri/widgets/AboveBelowModeSwitch",
    ]);
    Parameters.UIName.map(function (item, key, ary) {
      if (Parameters.Action.toUpperCase() === "ADD") {
        switch (item.toUpperCase()) {
          case 'BASEMAPGALLERY':
            if (window.BMapGallerysExpand != null) {} else {
              window.BMapGallerysExpand = new Expand({
                expandIconClass: "esri-icon-basemap",
                expandTooltip: "底图切换",
                view: window.sceneView,
                content: window.BMapGallery_Control.domNode,
                group: "top-right"
              });
            }
            if (Parameters.UIlocation === null || Parameters.UIlocation === undefined || Parameters.UIlocation === '{}') {
              window.sceneView.ui.add(window.BMapGallerysExpand, "top-right");
            } else {
              window.sceneView.ui.add(window.BMapGallerysExpand, Parameters.UIlocation);
            }
            break;
          case 'MEASUREMENT3DTOOL':
            if (window.MeasureMent3DToolExpand != null) {} else {
              window.MeasureMent3DToolTExpand = new Expand({
                expandIconClass: "esri-icon-Rulers",
                expandTooltip: "地图测量",
                view: window.sceneView,
                content: window.MeasureMent3DTool.domNode,
                group: "top-right"
              });
            }
            if (Parameters.UIlocation === null || Parameters.UIlocation === undefined || Parameters.UIlocation === '{}') {
              window.sceneView.ui.add(window.MeasureMent3DToolExpand, "top-right");
            } else {
              window.sceneView.ui.add(window.MeasureMent3DToolExpand, Parameters.UIlocation);
            }
            break;
          case 'LAYERLIST':
            if (window.LayerListExpand != null) {} else {
              window.LayerListExpand = new Expand({
                view: window.sceneView,
                content: window.LayerList.domNode,
                expandIconClass: "esri-icon-layers",
                expandTooltip: "图层框",
                group: "top-right"
              });
            }
            if (Parameters.UIlocation === null || Parameters.UIlocation === undefined || Parameters.UIlocation === '{}') {
              window.sceneView.ui.add(window.LayerListExpand, "top-right");
            } else {
              window.sceneView.ui.add(window.LayerListExpand, Parameters.UIlocation);
            }
            break;
          case 'MAPSCENESWITCH':
            if (window.MapSceneSwitch != null) {} else {
              window.MapSceneSwitch = new MapSceneSwitch_Control({
                container: document.createElement("div"),
                view: window.sceneView,
                camera: window.camera
              });
            }
            if (Parameters.UIlocation === null || Parameters.UIlocation === undefined || Parameters.UIlocation === '{}') {
              window.sceneView.ui.add(window.MapSceneSwitch, "top-right");
            } else {
              window.sceneView.ui.add(window.MapSceneSwitch, Parameters.UIlocation);
            }
            break;
          case 'HOME':
            if (window.homeWidget != null) {} else {
              window.homeWidget = new Home({
                view: window.sceneView
              });
            }
            if (Parameters.UIlocation === null || Parameters.UIlocation === undefined || Parameters.UIlocation === '{}') {
              window.sceneView.ui.add(window.homeWidget, "top-right");
            } else {
              window.sceneView.ui.add(window.homeWidget, Parameters.UIlocation);
            }
            break;
          case 'FULLSCREEN':
            if (window.fullscreen != null) {} else {
              window.fullscreen = new Fullscreen({
                container: document.createElement("div"),
                view: window.sceneView
              });
            }
            if (Parameters.UIlocation === null || Parameters.UIlocation === undefined || Parameters.UIlocation === '{}') {
              window.sceneView.ui.add(window.fullscreen, "top-right");
            } else {
              window.sceneView.ui.add(window.fullscreen, Parameters.UIlocation);
            }
            break;
          case 'ZOOM':
            if (window.Zoom != null) {} else {
              window.Zoom = new Zoom({
                container: document.createElement("div"),
                view: window.sceneView
              });
            }
            if (Parameters.UIlocation === null || Parameters.UIlocation === undefined || Parameters.UIlocation === '{}') {
              window.sceneView.ui.add(window.Zoom, "top-right");
            } else {
              window.sceneView.ui.add(window.Zoom, Parameters.UIlocation);
            }
            break;
          case 'HOLOGRAPHICBUTTON':
            if (window.HoloGraphicButton != null) {} else {
              window.HoloGraphicButton = new HoloGraphicButton({
                container: document.createElement("div"),
                view: window.sceneView,
              });
            }
            if (Parameters.UIlocation === null || Parameters.UIlocation === undefined || Parameters.UIlocation === '{}') {
              window.sceneView.ui.add(window.HoloGraphicButton, "top-right");
            } else {
              window.sceneView.ui.add(window.HoloGraphicButton, Parameters.UIlocation);
            }
            break;
            case 'GRID':
            if (window.GridButton != null) {} else {
              window.GridButton = new GridButton({
                container: document.createElement("div"),
                view: window.sceneView,
              });
            }
            if (Parameters.UIlocation === null || Parameters.UIlocation === undefined || Parameters.UIlocation === '{}') {
              window.sceneView.ui.add(window.GridButton, "top-right");
            } else {
              window.sceneView.ui.add(window.GridButton, Parameters.UIlocation);
            }
            break;
             case 'BASEMAPSWITCHBUTTON':
             if (window.BaseMapSwitchButton != null) {} else {
               window.BaseMapSwitchButton = new BaseMapSwitchButton({
                 container: document.createElement("div"),
                 view: window.sceneView,
               });
             }
             if (Parameters.UIlocation === null || Parameters.UIlocation === undefined || Parameters.UIlocation === '{}') {
               window.sceneView.ui.add(window.BaseMapSwitchButton, "top-right");
             } else {
               window.sceneView.ui.add(window.BaseMapSwitchButton, Parameters.UIlocation);
             }
             break;
              case 'ABOVEBELOWMODESWITCH':
              if (window.AboveBelowModeSwitch != null) {} else {
                 window.AboveBelowModeSwitch = new AboveBelowModeSwitch({
                  container: document.createElement("div"),
                  view: window.sceneView,
                });
              }
              if (Parameters.UIlocation === null || Parameters.UIlocation === undefined || Parameters.UIlocation === '{}') {
                window.sceneView.ui.add(window.AboveBelowModeSwitch, "top-right");
              } else {
                window.sceneView.ui.add(window.AboveBelowModeSwitch, Parameters.UIlocation);
              }
              break;
          default:
            Message({
              message: "当前" + item + "组件不存在",
              type: 'warning',
              duration: 2 * 1000
            })
        }
      } else {
        switch (item.toUpperCase()) {
          case 'BASEMAPGALLERY':
            if (window.BMapGallerysExpand != null)
              window.sceneView.ui.remove(window.BMapGallerysExpand);
            break;
          case 'MEASUREMENT3DTOOL':
            if (window.MeasureMent3DToolExpand != null)
              window.sceneView.ui.remove(window.MeasureMent3DToolExpand);
            break;

          case 'LAYERLIST':
            if (window.LayerListExpand != null)
              window.sceneView.ui.remove(window.LayerListExpand);
            break;
          case 'MAPSCENESWITCH':
            if (window.MapSceneSwitch != null)
              window.sceneView.ui.remove(window.MapSceneSwitch);
            break;

          case 'HOME':
            if (window.homeWidget != null)
              window.sceneView.ui.remove(window.homeWidget);
            break;

          case 'FULLSCREEN':
            if (window.fullscreen != null)
              window.sceneView.ui.remove(window.fullscreen);
            break;
          case 'ZOOM':
            if (window.Zoom != null)
              window.sceneView.ui.remove(window.Zoom);
            break;
          case 'HOLOGRAPHICBUTTON':
            if (window.HoloGraphicButton != null)
              window.sceneView.ui.remove(window.HoloGraphicButton);
            break;
           case 'GRID':
           if (window.GridButton != null)
             window.sceneView.ui.remove(window.GridButton);
           break;
           case 'BASEMAPSWITCHBUTTON':
           if (window.BaseMapSwitchButton != null)
             window.sceneView.ui.remove(window.BaseMapSwitchButton);
           break;
            case 'ABOVEBELOWMODESWITCH':
            if (window.AboveBelowModeSwitch != null)
              window.sceneView.ui.remove(window.AboveBelowModeSwitch);
            break;
          default:
            break;
        }
      }
    })
  },
  toggleBaseMapGallery(Parameters) {
    if (Parameters.Action.toUpperCase() === 'ADD') {
      if (window.BMapGallerysExpand != null) {} else {
        window.BMapGallerysExpand = new Expand({
          expandIconClass: "esri-icon-basemap",
          expandTooltip: "底图切换",
          view: window.sceneView,
          content: window.BMapGallery_Control.domNode,
          group: "bottom-right"
        });
      }
      if (Parameters.UIlocation === null || Parameters.UIlocation === undefined || Parameters.UIlocation === '{}') {
        window.sceneView.ui.add(window.BMapGallerysExpand, "top-right");
      } else {
        window.sceneView.ui.add(window.BMapGallerysExpand, Parameters.UIlocation);
      }
    } else {
      if (window.BMapGallerysExpand != null)
        window.sceneView.ui.remove(window.BMapGallerysExpand);
    }
  },
  toggleMeasureMent3DTool(Parameters) {
    if (Parameters.Action.toUpperCase() === 'ADD') {
      if (window.MeasureMent3DToolExpand != null) {} else {
        window.MeasureMent3DToolTExpand = new Expand({
          expandIconClass: "esri-icon-Rulers",
          expandTooltip: "地图测量",
          view: window.sceneView,
          content: window.MeasureMent3DTool.domNode,
          group: "bottom-right"
        });
      }
      if (Parameters.UIlocation === null || Parameters.UIlocation === undefined || Parameters.UIlocation === '{}') {
        window.sceneView.ui.add(window.MeasureMent3DToolExpand, "top-right");
      } else {
        window.sceneView.ui.add(window.MeasureMent3DToolExpand, Parameters.UIlocation);
      }
    } else {
      if (window.MeasureMent3DToolExpand != null)
        window.sceneView.ui.remove(window.MeasureMent3DToolExpand);
    }
  },
 
   setmapuipadding(Parameters)
   {
       if (Parameters.uiPadding != null && Parameters.uiPadding!=undefined)
         window.sceneView.ui.padding = Parameters.uiPadding;
   }

};
export default mapUIoperation
