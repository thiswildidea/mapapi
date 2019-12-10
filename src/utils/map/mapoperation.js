import load from '@/utils/jsapi.js';
import JSON from 'json3';
import {
  Message,
  Tree
} from 'element-ui';
const mapoperation = {

  async goToPosition(Parameters) {
    const [
      Camera
    ] = await load([
      "esri/Camera"
    ]);
    const camera = new Camera({
      fov: Parameters.fov,
      heading: Parameters.heading,
      position: {
        x: Parameters.position.x,
        y: Parameters.position.y,
        z: Parameters.position.z,
        spatialReference: Parameters.position.spatialReference
      },
      tilt: Parameters.tilt
    });

    if (camera != null)
      window.sceneView.goTo(camera)
  },

  //接口未开放
  toggleLayerVisbile(Parameters) {
    const toggleLayer = window.map.findLayerById(Parameters.layerName);
    if (toggleLayer != null || toggleLayer != undefined) {
      if (Parameters.Action.toUpperCase() === "SHOW") {
        toggleLayer.visible = true;
        toggleLayer.listMode = "show";
      } else if (Parameters.Action.toUpperCase() === "HIDE") {
        toggleLayer.visible = false;
        toggleLayer.listMode = "hide";
      } else {
        Message({
          message: "当前图层操作接口不存在",
          type: 'warning',
          duration: 2 * 1000
        })
      }
    } else {
      Message({
        message: "图层" + Parameters.layerName + "不存在",
        type: 'warning',
        duration: 2 * 1000
      })
    }
  },

 async setLayerVisible(Parameters) {
    const [Legend] = await load(["esri/widgets/Legend"]);
    const toggleLayer = window.map.findLayerById(Parameters.layerName);
    if (toggleLayer != null || toggleLayer != undefined) {
      if (Parameters.visible === true) {
        if (Parameters.sublayers != null && Parameters.sublayers != undefined) {
          window.currentSubLayerArray = Parameters.sublayers;
          toggleLayer.sublayers = Parameters.sublayers;
          let legendlayer = window.map.findLayerById(Parameters.layerName + "_legend");
          legendlayer.sublayers = Parameters.sublayers;
          legendlayer.visible = true;
          legendlayer.opacity = 1;
          legendlayer.listMode = "hide";
          legendlayer.sublayers.map(function(sublayer,index,ary) {
           sublayer.definitionExpression = "1=2";
          });
          if (window.legend != null) window.sceneView.ui.remove(window.legend);
          window.legend = new Legend({
            view: window.sceneView,
            layerInfos: [{
              layer: legendlayer,
            }]
          });
          window.sceneView.ui.add(window.legend, "bottom-left");
        }
        toggleLayer.visible = true;
        toggleLayer.listMode = "show";
      } else if (Parameters.visible === false) {
        toggleLayer.visible = false;
        // toggleLayer.listMode = "hide";
      } else {
        Message({
          message: "当前图层操作接口不存在",
          type: 'warning',
          duration: 2 * 1000
        })
      }
    } else {
      Message({
        message: "图层" + Parameters.layerName + "不存在",
        type: 'warning',
        duration: 2 * 1000
      })
    }
  },


  //接口未开放
  removeLayerbyName(Parameters) {
    const Layer = window.map.findLayerById(Parameters.layerName);
    if (Layer != null || Layer != undefined) {
      window.map.remove(Layer)
    } else {
      Message({
        message: "图层" + Parameters.layerName + "不存在",
        type: 'warning',
        duration: 2 * 1000
      })
    }
  },

  ////接口未开放
  async addLayerbyName(Parameters) {
    const [Legend] = await load(["esri/widgets/Legend"]);

    let Layer = window.map.findLayerById(Parameters.layerName);
    if (Layer === null || Layer === undefined)
      Layer = window[Parameters.layerName];
    window.map.add(Layer)
    if (Parameters.sublayers != null && Parameters.sublayers != undefined)
      Layer.sublayers = Parameters.sublayers;
    Layer.visible = true;
    Layer.listMode = "show";

    let legendlayer = window.map.findLayerById(Parameters.layerName + "_legend");
    if (legendlayer === null || legendlayer === undefined)
      legendlayer = window[Parameters.layerName + "_legend"];

    if (Parameters.sublayers != null && Parameters.sublayers != undefined)
      legendlayer.sublayers = Parameters.sublayers;
    legendlayer.visible = true;
    legendlayer.opacity = 0.5;
    legendlayer.listMode = "hide";

    if (window.legend != null) window.sceneView.ui.remove(window.legend);
    window.legend = new Legend({
      view: window.sceneView,
      layerInfos: [{
        layer: legendlayer,
      }]
    });
    window.sceneView.ui.add(window.legend, "bottom-right");
  }
};
export default mapoperation
