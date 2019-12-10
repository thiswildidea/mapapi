const mapModelColorGet = {

  basemapmodelColor() {
    var len = window.sceneView.map.basemap.baseLayers.length;
    while (len--) {
      if ($.inArray(window.sceneView.map.basemap.baseLayers.items[len].id, ['basemap_Air']) > -1) {
        if (window.sceneView.map.basemap.baseLayers.items[len].visible ==true){
            return [30,144,255,1]
        }
      }
      if ($.inArray(window.sceneView.map.basemap.baseLayers.items[len].id, ['basemap_zw']) > -1) {
        if (window.sceneView.map.basemap.baseLayers.items[len].visible == true) {
          return [255, 255, 255, 1]
        }
      }
      if ($.inArray(window.sceneView.map.basemap.baseLayers.items[len].id, ['basemap_as']) > -1) {
        if (window.sceneView.map.basemap.baseLayers.items[len].visible == true) {
          return [77, 126, 176, 1]
        }
      }
    }
    return  [255, 255, 255, 0.6]
  }
}
export default mapModelColorGet;
