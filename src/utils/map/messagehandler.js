import JSON from 'json3';
import mapoperation from '@/utils/map/mapoperation.js';
import mapUIoperation from '@/utils/map/mapUIoperation.js';
import clientLayersOperate from '@/utils/map/clientLayersOperate.js';
import findNearpointsOperate from '@/utils/map/findNearpointsOperate.js';
import maplayerquery from '@/utils/map/maplayerquery.js';
import mapHeatmapLayerUtils from '@/utils/maputils/mapHeatmapLayerUtils.js';
import {
  Message
} from 'element-ui';
const messagehandler = {
  mapReadyMessage() {
    window.parent.postMessage(JSON.stringify({
      "action": "MapReady"
    }), '*')
  },

  mapOperationMessage() {
    window.addEventListener('message', async function (e) {
      if (e.source != window.parent)
        return;
      if (e.data) {
        var message = JSON.parse(e.data);
        if (message.ActionName === null || message.ActionName === "" || message.ActionName === undefined)
          Message({
            message: "当前地图操作不存在",
            type: 'warning',
            duration: 2 * 1000
          })
        // this.console.log(message.ActionName);
        switch (message.ActionName.toUpperCase()) {
          case 'GOTOPOSITION': //goToPosition
            await mapoperation.goToPosition(JSON.parse(message.Parameters));
            break;
          case "TOGGLEMAPUI": // toggleMapUI:
            await mapUIoperation.toggleMapUI(JSON.parse(message.Parameters));
            break;
          case "DISPLAYJSONDATA": // displayJsonData:
            await clientLayersOperate.displayJSONData(JSON.parse(message.Parameters));
            break;
          case "TOGGLELAYERVISIBLE": // toggleLayerVisbile: 未使用
            mapoperation.toggleLayerVisbile(JSON.parse(message.Parameters));
            break;
          case "SETLAYERVISIBLE": // setLayerVisible:
            await mapoperation.setLayerVisible(JSON.parse(message.Parameters));
            break;
          case "REMOVELAYERBYNAME": // removeLayerbyName: //接口未开放
            mapoperation.removeLayerbyName(JSON.parse(message.Parameters));
            break;

          case "ADDLAYERBYNAME": // AddLayerbyName:
            await mapoperation.addLayerbyName(JSON.parse(message.Parameters));
            break;

          case 'TOGGLEBASEMAPGALLERY': //toggleBaseMapGallery: 未开放使用
            mapUIoperation.toggleBaseMapGallery(JSON.parse(message.Parameters));
            break;
          case "TOGGLEMEASUREMENT3DTOOL": //toggleMeasureMent3DTool:未开放使用
            mapUIoperation.toggleMeasureMent3DTool(JSON.parse(message.Parameters));
            break;
          case "SETMAPUIPADDING": //setmapuipadding 
            mapUIoperation.setmapuipadding(JSON.parse(message.Parameters));
            break;
          case "FINDNEARPOINTSBYDISTANCE": //findNearpointsbydistance
            await findNearpointsOperate.findNearpointsbydistance(JSON.parse(message.Parameters))
            break;
          case "DISPLAYPOINTBUFFER": //displaypointbuffer
            await clientLayersOperate.displaypointbuffer(JSON.parse(message.Parameters))
            break;
            case "LAYERQUERY": //layerquery
            await maplayerquery.layerquery(JSON.parse(message.Parameters))
            break;
          case "SETHEATMAPLAYER": //setHeatmapLayer
           mapHeatmapLayerUtils.setHeatmapLayer(JSON.parse(message.Parameters));
          break;
          default:
            Message({
              message: "当前地图操作不存在",
              type: 'warning',
              duration: 2 * 1000
            })
        }
      }
    })
  }
};
export default messagehandler;
