import load from '@/utils/jsapi.js';
import JSON from 'json3';
import mapconfig from '@/config/config_map.js'

const findNearpointsOperate = {
  async findNearpointsbydistance(Parameters) {
    const [LabelClass,
      array,
      Graphic,
      Point,
      geometryEngine,
      Polyline,
      Polygon,
      SpatialReference,
      FeatureLayer,
      Legend
    ] = await load(["esri/layers/support/LabelClass",
      "dojo/_base/array",
      "esri/Graphic",
      "esri/geometry/Point",
      "esri/geometry/geometryEngine",
      "esri/geometry/Polyline",
      "esri/geometry/Polygon",
      "esri/geometry/SpatialReference",
      "esri/layers/FeatureLayer",
      "esri/widgets/Legend"
    ]);

    let codX = 0;
    if (Parameters.codX != undefined && Parameters.codX != null) {
      codX = parseFloat(Parameters.codX)
    } else {
      return;
    }

    let codY = 0;
    if (Parameters.codY != undefined && Parameters.codY != null) {
      codY = parseFloat(Parameters.codY)
    } else {
      return;
    }

    let distance = 0;
    if (Parameters.distance != undefined && Parameters.distance != null) {
      distance = parseFloat(Parameters.distance)
    } else {
      return;
    }

    let layername;
    if (Parameters.layername != undefined && Parameters.layername != null) {
      layername = Parameters.layername;
    } else {
      return;
    }

    const findpointsinlayer = window.map.findLayerById(layername);
    if (findpointsinlayer == undefined || findpointsinlayer == null)
      return;

    let point = new Point({
      x: codX,
      y: codY,
      spatialReference: SpatialReference.WebMercator
    });

    const pointbuffer = geometryEngine.geodesicBuffer(point, distance, 'meters');
    const XH_Graphiclayer = window.map.findLayerById("XH_Graphiclayer");
     let pointbufferGraphic = new Graphic({
       geometry: pointbuffer,
       symbol: mapconfig.PgHightlightsymbol
     });
     if (XH_Graphiclayer!=null)
     {
       XH_Graphiclayer.removeAll();
       XH_Graphiclayer.add(pointbufferGraphic);
     }
      const graphicsource = findpointsinlayer.source;
      const nearpoints = graphicsource.map(function (item, index, ary) {
      const isinterest = geometryEngine.intersects(pointbuffer, new Point({
        x: item.geometry.x,
        y: item.geometry.y,
        spatialReference: SpatialReference.WebMercator
      }))
      if (isinterest === true) {
        return item
      }
    })

    if (nearpoints != undefined) {
      window.parent.postMessage(JSON.stringify({
        "action": "findnearpointsbydistance",
        "data": nearpoints
      }), '*')
    }
  }
};
export default findNearpointsOperate
