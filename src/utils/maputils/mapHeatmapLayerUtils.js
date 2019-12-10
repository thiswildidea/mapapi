import load from '@/utils/jsapi.js';
import h337 from 'heatmapjs';

const mapHeatmapLayerUtils = {
  async setHeatmapLayer(Parameters) {
    const [
      HeatMapLayer
    ] = await load([
      'userPlugins/HeatMapLayer'
    ]);

    var config = {
      container: document.getElementById("viewDiv"),
      radius: Parameters.radius || 30,
      maxOpacity: Parameters.maxOpacity || 0.8,
      minOpacity: Parameters.minOpacity || 0,
      blur: Parameters.blur7 || .7,
      gradient: Parameters.gradient || {
        0: "rgb(0,0,0)",
        0.3: "rgb(0,0,255)",
        0.8: "rgb(0,255,0)",
        0.98: "rgb(255,255,0)",
        1: "rgb(255,0,0)"
      }
    };
    if (window[Parameters.layerId]) {
      window[Parameters.layerId].setVisible(Parameters.visible);
      window[Parameters.layerId].freshenLayerData(Parameters.dataArray);
    } else {
      window[Parameters.layerId] = new HeatMapLayer(
        window.sceneView,
        config,
        Parameters.dataArray,
        h337
      );
      window[Parameters.layerId].addData();
    }
  }
}
export default mapHeatmapLayerUtils;
