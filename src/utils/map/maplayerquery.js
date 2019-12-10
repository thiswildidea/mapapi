import load from '@/utils/jsapi.js';
import JSON from 'json3';
import mapconfig from '@/config/config_map.js'

const maplayerquery = {
  async layerquery(Parameters) {
    const [
      Graphic,
      QueryTask,
      Query,
      Camera,
      SpatialReference
    ] = await load([
      "esri/Graphic",
      "esri/tasks/QueryTask",
      "esri/tasks/support/Query",
      "esri/Camera",
      "esri/geometry/SpatialReference",
    ]);
    const layername = Parameters.name;
    const queryField = Parameters.queryField;
    const queryvalue = Parameters.queryvalue;
    const querylayer = window.map.findLayerById(layername);

    let querystr = queryField +"= '" + queryvalue[0] + "'";
    queryvalue.map(function (item, key, ary) {
      if (key > 0) {
        querystr += " OR " + queryField+"= '" + item + "'"
      }
    });
    let layerQuery = querylayer.createQuery();
    layerQuery.where = querystr;

    querylayer.queryFeatures(layerQuery).then(function (response) {
      if (response.features.length > 0) {
        const XH_Graphiclayer = window.map.findLayerById("XH_Graphiclayer");
        const layercount = window.map.layers.length;
        window.map.reorder(XH_Graphiclayer, layercount + 2)
        let Graphiclist=[];
        response.features.map(function(item,key,index){
            let hightlightgraphic = new Graphic({
              geometry: item.geometry,
              symbol: mapconfig.PgHightlightsymbol
            });
            Graphiclist.push(hightlightgraphic)
        })
        console.log(Graphiclist);
        if (XH_Graphiclayer != null) {
          XH_Graphiclayer.removeAll();
          XH_Graphiclayer.addMany(Graphiclist);
          window.sceneView.goTo(response.features);
        }
        //  window.sceneView.goTo(fullExtent);
      }
    });
  }
};
export default maplayerquery
