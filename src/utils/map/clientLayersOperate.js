import load from '@/utils/jsapi.js';
import JSON from 'json3';
const clientLayersOperate = {
  async displayJSONData(Parameters) {

    const [LabelClass,
      array,
      Graphic,
      Point,
      Polyline,
      Polygon,
      SpatialReference,
      FeatureLayer,
      Legend
    ] = await load(["esri/layers/support/LabelClass",
      "dojo/_base/array",
      "esri/Graphic",
      "esri/geometry/Point",
      "esri/geometry/Polyline",
      "esri/geometry/Polygon",
      "esri/geometry/SpatialReference",
      "esri/layers/FeatureLayer",
      "esri/widgets/Legend"
    ]);

    if (Parameters.mode.toUpperCase() === 'DELETE') {
      const deleteLayer = window.map.findLayerById(Parameters.name);
      if (deleteLayer != undefined || clientoperateLayer != null)
        window.map.remove(deleteLayer)
    } else {
      let clientoperateLayer;
      let geometrytype;
      let graphicsource = [];

      switch (Parameters.type.toUpperCase()) {
        case "POINT":
          geometrytype = "point";
          Parameters.dataArray.map(function (pointitem, ary, index) {
            let point = new Point({
              x: pointitem.codX,
              y: pointitem.codY,
              z: pointitem.codZ,
              spatialReference: SpatialReference.WebMercator
            });
            let PointGraphic = new Graphic({
              geometry: point,
              attributes: pointitem.attrs
            });
            graphicsource.push(PointGraphic);
          })
          break;
        case "POLYLINE":
          geometrytype = "polyline";
          Parameters.dataArray.map(function (polylineitem, index, ary) {
            var paths = [];
            polylineitem.points.map(function (pointitem, indx, ary) {
              paths.push([pointitem.codX, pointitem.codY, pointitem.codZ])
            });
            var line = new Polyline({
              hasZ: true,
              hasM: true,
              paths: paths,
              spatialReference: {
                wkid: 102100
              }
            });
            var lineGraphic = new Graphic({
              geometry: line,
              attributes: polylineitem.attrs
            });
            graphicsource.push(lineGraphic);
          });
          break;
        case "POLYGON":
          geometrytype = "polygon";
          Parameters.dataArray.map(function (polygonitem, index, ary) {
            var rings = [];
            polygonitem.points.map(function (pointitem, indexx, arry) {
              rings.push([pointitem.codX, pointitem.codY, pointitem.codZ])
            });
            var pgon = new Polygon({
              hasZ: true,
              hasM: true,
              rings: rings,
              spatialReference: {
                wkid: 102100
              }
            });
            var polygonGraphic = new Graphic({
              geometry: pgon,
              attributes: polygonitem.attrs
            });
            graphicsource.push(polygonGraphic);
          });
          break;
      }
      if (Parameters.mode.toUpperCase() === 'REPLACE') {
        clientoperateLayer = window.map.findLayerById(Parameters.name);
        if (clientoperateLayer != undefined || clientoperateLayer != null)
          clientoperateLayer.source = null;
      } else {
        clientoperateLayer = window.map.findLayerById(Parameters.name);
        if (clientoperateLayer === undefined || clientoperateLayer === null) {
          clientoperateLayer = new FeatureLayer({
            id: Parameters.name,
            title: Parameters.name,
            objectIdField: "OBJECTID",
            geometryType: geometrytype,
            renderer: Parameters.renderer,
            screenSizePerspectiveEnabled: true,
            popupEnabled: Parameters.popupEnabled,
            popupTemplate: Parameters.popupTemplate,
            fields: Parameters.fieldJsonArray,
            spatialReference: SpatialReference.WebMercator
          });
          window.map.add(clientoperateLayer);
        }
      }
      clientoperateLayer.source = graphicsource;
      var statesLabelClass = new LabelClass({
        labelExpressionInfo: {
          expression: "$feature.NAME"
        },
        symbol: Parameters.labelsymbol.symbol,
        labelPlacement: Parameters.labelsymbol.labelPlacement
      });
      clientoperateLayer.labelingInfo = [statesLabelClass];
      if (graphicsource.length > 0)
        window.sceneView.goTo(graphicsource);

      if (Parameters.legendVisible != undefined || Parameters.legendVisible === true) {
        if (window.legend != null) window.sceneView.ui.remove(window.legend);
        window.legend = new Legend({
          view: window.sceneView,
          layerInfos: [{
            layer: clientoperateLayer
            //  title: Parameters.legendOptions.title
          }]
        });
        window.sceneView.ui.add(window.legend, "bottom-left");
      }
    }
  },

  async displaypointbuffer(Parameters) {
    console.log(Parameters);
    const [LabelClass,
      array,
      geometryEngine,
      Graphic,
      Point,
      Polyline,
      Polygon,
      SpatialReference,
      FeatureLayer,
      Legend,
      GraphicsLayer
    ] = await load(["esri/layers/support/LabelClass",
      "dojo/_base/array",
      "esri/geometry/geometryEngine",
      "esri/Graphic",
      "esri/geometry/Point",
      "esri/geometry/Polyline",
      "esri/geometry/Polygon",
      "esri/geometry/SpatialReference",
      "esri/layers/FeatureLayer",
      "esri/widgets/Legend",
      "esri/layers/GraphicsLayer",
    ]);

    if (Parameters.mode.toUpperCase() === 'DELETE') {
      const deleteLayer = window.map.findLayerById(Parameters.name);
      if (deleteLayer != undefined || clientoperateLayer != null)
        window.map.remove(deleteLayer)
      
        const deletegraphicLayer = window.map.findLayerById(Parameters.name + "pointbuffergraphiclayer");
        if (deletegraphicLayer != undefined || deletegraphicLayer != null)
          window.map.remove(deletegraphicLayer)

    } else {
      let graphicsource = [];
      let bufferpolygon = [];
      let clientoperateLayer;
      const geometrytype = "point";
      Parameters.dataArray.map(function (pointitem, ary, index) {
        let point = new Point({
          x: pointitem.codX,
          y: pointitem.codY,
          z: pointitem.codZ,
          spatialReference: SpatialReference.WebMercator
        });
        let PointGraphic = new Graphic({
          geometry: point,
          attributes: pointitem.attrs
        });
        graphicsource.push(PointGraphic);

        const pointbuffer = geometryEngine.geodesicBuffer(point, Parameters.bufferdistance, 'meters');
        let pointbufferGraphic = new Graphic({
          geometry: pointbuffer,
          symbol: Parameters.buffersymbol,
          spatialReference: SpatialReference.WebMercator
        });
        bufferpolygon.push(pointbufferGraphic);

      })
      if (Parameters.mode.toUpperCase() === 'REPLACE') {
        clientoperateLayer = window.map.findLayerById(Parameters.name);
        if (clientoperateLayer != undefined || clientoperateLayer != null)
          clientoperateLayer.source = null;
      } else {
        clientoperateLayer = window.map.findLayerById(Parameters.name);
        if (clientoperateLayer === undefined || clientoperateLayer === null) {
          clientoperateLayer = new FeatureLayer({
            id: Parameters.name,
            title: Parameters.name,
            objectIdField: "OBJECTID",
            geometryType: geometrytype,
            renderer: Parameters.renderer,
            screenSizePerspectiveEnabled: true,
            popupEnabled: Parameters.popupEnabled,
            popupTemplate: Parameters.popupTemplate,
            fields: Parameters.fieldJsonArray,
            spatialReference: SpatialReference.WebMercator
          });
          window.map.add(clientoperateLayer);
        }
      }
      clientoperateLayer.source = graphicsource;
      var statesLabelClass = new LabelClass({
        labelExpressionInfo: {
          expression: "$feature.NAME"
        },
        symbol: Parameters.labelsymbol.symbol,
        labelPlacement: Parameters.labelsymbol.labelPlacement
      });
      clientoperateLayer.labelingInfo = [statesLabelClass];

      let XH_Graphiclayer = window.map.findLayerById(Parameters.name+"pointbuffergraphiclayer");
      if (XH_Graphiclayer != null) {
        XH_Graphiclayer.removeAll();
        XH_Graphiclayer.addMany(bufferpolygon);
      }else{
         XH_Graphiclayer = new GraphicsLayer({
           id: Parameters.name + "pointbuffergraphiclayer",
           title: Parameters.name + "pointbuffergraphiclayer",
           elevationInfo:{
             mode: "absolute-height",
             offset:2,
             unit: "meters",
           },
           listMode:"hide"
         })
         window.map.add(XH_Graphiclayer);
         XH_Graphiclayer.addMany(bufferpolygon);
      }

      if (graphicsource.length > 0)
        window.sceneView.goTo(graphicsource);
      if (Parameters.legendVisible != undefined || Parameters.legendVisible === true) {
        if (window.legend != null) window.sceneView.ui.remove(window.legend);
        window.legend = new Legend({
          view: window.sceneView,
          layerInfos: [{
            layer: clientoperateLayer
            // title: Parameters.legendOptions.title
          }]
        });
        window.sceneView.ui.add(window.legend, "bottom-left");
      }
    }
  }
};
export default clientLayersOperate
