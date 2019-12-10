import load from '@/utils/jsapi.js';

const maplayersaddutils = {

  async initiallayers(layers, maptoken) {
    const [
      TileLayer,
      SceneLayer,
      VectorTileLayer,
      MapImageLayer,
      SHCDMapImageLayer,
      IntegratedMeshLayer,
      PointCloudLayer,
      SHCTiledMapServiceLayer,
      SHCMapServiceLayer,
      GroupLayer,
      FeatureLayer,
      GraphicsLayer,
      Extent,
      SpatialReference
    ] = await load([
      "esri/layers/TileLayer",
      "esri/layers/SceneLayer",
      "esri/layers/VectorTileLayer",
      "esri/layers/MapImageLayer",
      "esri/layers/SHCDMapImageLayer",
      "esri/layers/IntegratedMeshLayer",
      "esri/layers/PointCloudLayer",
      "esri/layers/SHCTiledMapServiceLayer",
      "esri/layers/SHCMapServiceLayer",
      "esri/layers/GroupLayer",
      "esri/layers/FeatureLayer",
      "esri/layers/GraphicsLayer",
      "esri/geometry/Extent",
      "esri/geometry/SpatialReference"
    ]);

    return layers.map(function (item, key, ary) {
      switch (item.maptype) {
        case "MapImageLayer":
          return new MapImageLayer(item.url, {
            id: item.id,
            visible: item.visible,
            opacity: item.opacity,
            listMode: item.listMode,
            title: item.title
          });
          break;
          case "FeatureLayer":
          return new FeatureLayer(item.url, {
            id: item.id,
            visible: item.visible,
            opacity: item.opacity,
            listMode: item.listMode,
            title: item.title,
            screenSizePerspectiveEnabled: item.screenSizePerspectiveEnabled
          });
          break;
        case "TileLayer":
          return new TileLayer(item.url, {
            id: item.id,
            visible: item.visible,
            opacity: item.opacity,
            listMode: item.listMode,
            title: item.title
          });
          break;
          case "GraphicsLayer":
          return new GraphicsLayer({
            id: item.id,
            visible: item.visible,
            opacity: item.opacity,
            listMode: item.listMode,
            title: item.title
          });
          break;
        case "PointCloudLayer":
          return new PointCloudLayer(layer.url, {
            id: layer.id,
            title: layer.title,
            visible: layer.visible,
            listMode: item.listMode,
            //  opacity: layer.opacity,
            listMode: layer.listMode
          });
          break;
        case "SceneLayer":
          return new SceneLayer(item.url, {
            id: item.id,
            title: item.title,
            visible: item.visible,
            opacity: item.opacity,
            renderer: item.renderer,
            listMode: item.listMode,
            popupEnabled: item.popupEnabled
          });
          break;
        case "SHCTiledMapServiceLayer":
          const fExtent = new Extent({
            "xmin": -65000,
            "ymin": -76000,
            "xmax": 75000.00000000003,
            "ymax": 72000.00000000003,
            "spatialReference": SpatialReference.WebMercator
          });
          if (item.istoken === true) {
            return new SHCTiledMapServiceLayer({
              url: item.url,
              token: maptoken,
              fullExtent: fExtent,
              opacity: item.opacity,
              title: item.title,
              id: item.id,
              visible: item.visible
            });
          } else {
            return new SHCTiledMapServiceLayer({
              url: item.url,
              fullExtent: fExtent,
              opacity: item.opacity,
              title: item.title,
              id: item.id,
              visible: item.visible
            });
          }
          break;
        case "SHCMapServiceLayer":
          const fuExtent = new Extent({
            "xmin": -65000,
            "ymin": -76000,
            "xmax": 75000.00000000003,
            "ymax": 72000.00000000003,
            "spatialReference": SpatialReference.WebMercator
          });
          if (item.istoken === true) {
            return new SHCMapServiceLayer({
              url: item.url,
              token: maptoken,
              fullExtent: fuExtent,
              opacity: item.opacity,
              title: item.title,
              id: item.id,
              visible: item.visible
            });
          } else {
            return new SHCMapServiceLayer({
              url: item.url,
              fullExtent: fuExtent,
              opacity: item.opacity,
              title: item.title,
              id: item.id,
              visible: item.visible
            });
          }
          break;
      }
    });
  },

  async initial_kz_layers(layers, maptoken) {
      const [
        TileLayer,
        SceneLayer,
        VectorTileLayer,
        MapImageLayer,
        SHCDMapImageLayer,
        IntegratedMeshLayer,
        PointCloudLayer,
        SHCTiledMapServiceLayer,
        SHCMapServiceLayer,
        GroupLayer,
        FeatureLayer,
        Extent,
        SpatialReference
      ] = await load([
        "esri/layers/TileLayer",
        "esri/layers/SceneLayer",
        "esri/layers/VectorTileLayer",
        "esri/layers/MapImageLayer",
        "esri/layers/SHCDMapImageLayer",
        "esri/layers/IntegratedMeshLayer",
        "esri/layers/PointCloudLayer",
        "esri/layers/SHCTiledMapServiceLayer",
        "esri/layers/SHCMapServiceLayer",
        "esri/layers/GroupLayer",
        "esri/layers/FeatureLayer",
        "esri/geometry/Extent",
        "esri/geometry/SpatialReference"
      ]);

     return layers.map(function (item, key, ary) {
         switch (item.maptype) {
           case "MapImageLayer":
           window[item.id + '_legend'] = new MapImageLayer(item.url, {
             id: item.id + '_legend',
             url: item.url,
             title: item.title,
            //  definitionExpression: '1==1',
             visible: item.visible,
             opacity: item.opacity,
             listMode: item.listMode
           })
           window.map.add(window[item.id + '_legend']);
           break;
           case "SHCDMapImageLayer":
             const fuxExtent = new Extent({
               "xmin": -65000,
               "ymin": -76000,
               "xmax": 75000.00000000003,
               "ymax": 72000.00000000003,
               "spatialReference": SpatialReference.WebMercator
             });
             window[item.id] = new SHCDMapImageLayer({
               url: item.url,
               fullExtent: fuxExtent,
               opacity: item.opacity,
               title: item.title,
               id: item.id,
               tileurl: item.tileurl,
               visible: item.visible,
               listMode: item.listMode,
               legendEnabled: false,
               sublayers: item.sublayers,
               dLayer: window[item.id + '_legend']
             });
             window.map.add(window[item.id]);
             break;
              case "SceneLayer":
             window[item.id]=new SceneLayer(item.url, {
                id: item.id,
                title: item.title,
                visible: item.visible,
                opacity: item.opacity,
                renderer: item.renderer,
                listMode: item.listMode,
                popupEnabled: item.popupEnabled
              });
              window.map.add(window[item.id]);
              break;
         }
     })
  },

  async initalGroupsORlayers(layerGroups, maptoken) {
    const [
      TileLayer,
      SceneLayer,
      VectorTileLayer,
      MapImageLayer,
      IntegratedMeshLayer,
      PointCloudLayer,
      SHCTiledMapServiceLayer,
      SHCMapServiceLayer,
      GroupLayer,
      FeatureLayer,
      Extent,
      SpatialReference
    ] = await load([
      "esri/layers/TileLayer",
      "esri/layers/SceneLayer",
      "esri/layers/VectorTileLayer",
      "esri/layers/MapImageLayer",
      "esri/layers/IntegratedMeshLayer",
      "esri/layers/PointCloudLayer",
      "esri/layers/SHCTiledMapServiceLayer",
      "esri/layers/SHCMapServiceLayer",
      "esri/layers/GroupLayer",
      "esri/layers/FeatureLayer",
      "esri/geometry/Extent",
      "esri/geometry/SpatialReference"
    ]);

    return layerGroups.reverse().map(function (itemsgroup, key, ary) {
      let grouplayer = new GroupLayer({
        id: itemsgroup.id,
        title: itemsgroup.title,
        visible: itemsgroup.visible,
      });
      if (itemsgroup.layerGroups != null) {
        const groupslayers = itemsgroup.layerGroups.reverse().map(function (items, key, ary) {
          let grouplayer2 = new GroupLayer({
            id: items.id,
            title: items.title,
            visible: items.visible,
          });
          items.layers.reverse().map(function (layer, key, art) {
            switch (layer.maptype) {
              case "MapImageLayer":
                grouplayer2.add(new MapImageLayer(layer.url, {
                  id: layer.id,
                  title: layer.title,
                  visible: layer.visible,
                  opacity: layer.opacity
                }));
                break;
              case "PointCloudLayer":
                grouplayer2.add(new PointCloudLayer(layer.url, {
                  id: layer.id,
                  title: layer.title,
                  visible: layer.visible,
                  //  opacity: layer.opacity,
                  listMode: layer.listMode
                }));
                break;
              case "TileLayer":
                grouplayer2.add(new TileLayer(layer.url, {
                  id: layer.id,
                  title: layer.title,
                  visible: layer.visible,
                  opacity: layer.opacity
                }));
                break;
              case "FeatureLayer":
                grouplayer2.add(new FeatureLayer(layer.url, {
                  id: layer.id,
                  title: layer.title,
                  visible: layer.visible,
                  opacity: layer.opacity,
                  renderer: layer.renderer,
                  popupTemplate: layer.popupTemplate
                }));
                break;
              case "SceneLayer":
                grouplayer2.add(new SceneLayer(layer.url, {
                  id: layer.id,
                  title: layer.title,
                  visible: layer.visible,
                  opacity: layer.opacity,
                  renderer: layer.renderer
                }));
                break;
            }

          })
          return grouplayer2;
        })
        grouplayer.addMany(groupslayers)
        return grouplayer;
      } else {
        const layers = itemsgroup.layers.reverse().map(function (layer, key, ary) {
          switch (layer.maptype) {
            case "MapImageLayer":
              return new MapImageLayer(layer.url, {
                id: layer.id,
                title: layer.title,
                visible: layer.visible,
                opacity: layer.opacity
              });
              break;
            case "PointCloudLayer":
              return new PointCloudLayer(layer.url, {
                id: layer.id,
                title: layer.title,
                visible: layer.visible,
                //  opacity: layer.opacity,
                listMode: layer.listMode
              });
              break;
            case "TileLayer":
              return new TileLayer(layer.url, {
                id: layer.id,
                title: layer.title,
                visible: layer.visible,
                opacity: layer.opacity
              });
              break;
            case "FeatureLayer":
              return new FeatureLayer(layer.url, {
                id: layer.id,
                title: layer.title,
                visible: layer.visible,
                opacity: layer.opacity,
                renderer: layer.renderer,
                popupTemplate: layer.popupTemplate
              });
              break;
            case "SceneLayer":
              return new SceneLayer(layer.url, {
                id: layer.id,
                title: layer.title,
                visible: layer.visible,
                opacity: layer.opacity,
                renderer: layer.renderer
              });
              break;
          }
        })
        grouplayer.addMany(layers);
        return grouplayer
      }
    })
  },

  async initalLayersinGroups(layerGroups, maptoken) {
    const [
      TileLayer,
      SceneLayer,
      VectorTileLayer,
      MapImageLayer,
      IntegratedMeshLayer,
      PointCloudLayer,
      SHCTiledMapServiceLayer,
      SHCMapServiceLayer,
      GroupLayer,
      FeatureLayer,
      Extent,
      SpatialReference
    ] = await load([
      "esri/layers/TileLayer",
      "esri/layers/SceneLayer",
      "esri/layers/VectorTileLayer",
      "esri/layers/MapImageLayer",
      "esri/layers/IntegratedMeshLayer",
      "esri/layers/PointCloudLayer",
      "esri/layers/SHCTiledMapServiceLayer",
      "esri/layers/SHCMapServiceLayer",
      "esri/layers/GroupLayer",
      "esri/layers/FeatureLayer",
      "esri/geometry/Extent",
      "esri/geometry/SpatialReference"
    ]);

    return layerGroups.map(function (itemgroup, key, ary) {
      let grouplayer = new GroupLayer({
        id: itemgroup.id,
        title: itemgroup.title,
        visible: itemgroup.visible,
        listMode: itemgroup.listMode
      });

      itemgroup.layers.reverse().map(function (layer, key, ary) {
        switch (layer.maptype) {
          case "MapImageLayer":
            grouplayer.add(new MapImageLayer(layer.url, {
              id: layer.id,
              title: layer.title,
              visible: layer.visible,
              opacity: layer.opacity,
              listMode: layer.listMode
            }));
            break;
          case "PointCloudLayer":
            grouplayer.add(new PointCloudLayer(layer.url, {
              id: layer.id,
              title: layer.title,
              visible: layer.visible,
              // opacity: layer.opacity,
              listMode: layer.listMode
            }));
            break;
          case "TileLayer":
            grouplayer.add(new TileLayer(layer.url, {
              id: layer.id,
              title: layer.title,
              visible: layer.visible,
              opacity: layer.opacity,
              listMode: layer.listMode
            }));
            break;
          case "localFeatureLayer":
            grouplayer.add(new FeatureLayer({
              id: layer.id,
              title: layer.title,
              visible: layer.visible,
              opacity: layer.opacity,
              objectIdField: layer.objectIdField,
              geometryType: layer.geometryType,
              renderer: layer.renderer,
              listMode: layer.listMode,
              popupTemplate: layer.popupTemplate,
              fields: layer.fields
            }));
            break;
          case "FeatureLayer":
            grouplayer.add(new FeatureLayer(layer.url, {
              id: layer.id,
              title: layer.title,
              visible: layer.visible,
              opacity: layer.opacity,
              renderer: layer.renderer,
              listMode: layer.listMode,
              popupTemplate: layer.popupTemplate

            }));
            break;
          case "SceneLayer":
            grouplayer.add(new SceneLayer(layer.url, {
              id: layer.id,
              title: layer.title,
              visible: layer.visible,
              opacity: layer.opacity,
              listMode: layer.listMode,
              renderer: layer.renderer,
              definitionExpression: layer.definitionExpression,
              popupTemplate: layer.popupTemplate,
              popupEnabled: layer.popupEnabled,
              elevationInfo: layer.elevationInfo
            }));
            break;
          case "SHCTiledMapServiceLayer":
            var fullExtent = new Extent({
              "xmin": -65000,
              "ymin": -76000,
              "xmax": 75000.00000000003,
              "ymax": 72000.00000000003,
              "spatialReference": SpatialReference.WebMercator
            });
            grouplayer.add(SHCTiledMapServiceLayer({
              url: layer.url,
              fullExtent: fullExtent,
              opacity: layer.opacity,
              title: layer.title,
              id: layer.id,
              visible: layer.visible
            }));

            break;
          case "SHCMapServiceLayer":
            var fullExtent = new Extent({
              "xmin": -65000,
              "ymin": -76000,
              "xmax": 75000.00000000003,
              "ymax": 72000.00000000003,
              "spatialReference": SpatialReference.WebMercator
            });
            grouplayer.add(SHCMapServiceLayer({
              url: layer.url,
              fullExtent: fullExtent,
              opacity: layer.opacity,
              title: layer.title,
              id: layer.id,
              visible: layer.visible
            }));
            break;
        }
      })
      return grouplayer;
    })
  },

  async initalGroupAndlayers(layerGroups, maptoken) {
    const [
      TileLayer,
      SceneLayer,
      VectorTileLayer,
      MapImageLayer,
      IntegratedMeshLayer,
      PointCloudLayer,
      SHCTiledMapServiceLayer,
      SHCMapServiceLayer,
      GroupLayer,
      FeatureLayer,
      Extent,
      SpatialReference
    ] = await load([
      "esri/layers/TileLayer",
      "esri/layers/SceneLayer",
      "esri/layers/VectorTileLayer",
      "esri/layers/MapImageLayer",
      "esri/layers/IntegratedMeshLayer",
      "esri/layers/PointCloudLayer",
      "esri/layers/SHCTiledMapServiceLayer",
      "esri/layers/SHCMapServiceLayer",
      "esri/layers/GroupLayer",
      "esri/layers/FeatureLayer",
      "esri/geometry/Extent",
      "esri/geometry/SpatialReference"
    ]);

    return layerGroups.map(function (itemsgroup, key, ary) {
      let grouplayer = new GroupLayer({
        id: itemsgroup.id,
        title: itemsgroup.title,
        visible: itemsgroup.visible,
        listMode: itemsgroup.listMode
      });
      if (itemsgroup.layerGroups != null) {
        const groupslayers = itemsgroup.layerGroups.reverse().map(function (items, key, ary) {
          let grouplayer2 = new GroupLayer({
            id: items.id,
            title: items.title,
            visible: items.visible,
            listMode: items.listMode
          });
          items.layers.reverse().map(function (layer, key, art) {
            switch (layer.maptype) {
              case "MapImageLayer":
                grouplayer2.add(new MapImageLayer(layer.url, {
                  id: layer.id,
                  title: layer.title,
                  visible: layer.visible,
                  opacity: layer.opacity
                }));
                break;
              case "PointCloudLayer":
                grouplayer2.add(new PointCloudLayer(layer.url, {
                  id: layer.id,
                  title: layer.title,
                  visible: layer.visible,
                  // opacity: layer.opacity,
                  listMode: layer.listMode
                }));
                break;
              case "TileLayer":
                grouplayer2.add(new TileLayer(layer.url, {
                  id: layer.id,
                  title: layer.title,
                  visible: layer.visible,
                  opacity: layer.opacity
                }));
                break;
              case "FeatureLayer":
                grouplayer2.add(new FeatureLayer(layer.url, {
                  id: layer.id,
                  title: layer.title,
                  visible: layer.visible,
                  opacity: layer.opacity,
                  renderer: layer.renderer,
                  popupTemplate: layer.popupTemplate
                }));
                break;
              case "SceneLayer":
                grouplayer2.add(new SceneLayer(layer.url, {
                  id: layer.id,
                  title: layer.title,
                  visible: layer.visible,
                  opacity: layer.opacity,
                  renderer: layer.renderer,
                  popupTemplate: layer.popupTemplate,
                  popupEnabled: layer.popupEnabled,
                }));
                break;
            }
          })
          return grouplayer2;
        })
        grouplayer.addMany(groupslayers)
      }
      if (itemsgroup.layers != null) {
        const layers = itemsgroup.layers.reverse().map(function (layer, key, ary) {
          switch (layer.maptype) {
            case "MapImageLayer":
              return new MapImageLayer(layer.url, {
                id: layer.id,
                title: layer.title,
                visible: layer.visible,
                opacity: layer.opacity
              });
              break;
            case "PointCloudLayer":
              return new PointCloudLayer(layer.url, {
                id: layer.id,
                title: layer.title,
                visible: layer.visible,
                //  opacity: layer.opacity,
                listMode: layer.listMode
              });
              break;
            case "TileLayer":
              return new TileLayer(layer.url, {
                id: layer.id,
                title: layer.title,
                visible: layer.visible,
                opacity: layer.opacity
              });
              break;
            case "FeatureLayer":
              return new FeatureLayer(layer.url, {
                id: layer.id,
                title: layer.title,
                visible: layer.visible,
                opacity: layer.opacity,
                renderer: layer.renderer,
                popupTemplate: layer.popupTemplate
              });
              break;
            case "SceneLayer":
              return new SceneLayer(layer.url, {
                id: layer.id,
                title: layer.title,
                visible: layer.visible,
                opacity: layer.opacity,
                renderer: layer.renderer,
                popupTemplate: layer.popupTemplate,
                popupEnabled: layer.popupEnabled,
              });
              break;
          }
        })
        grouplayer.addMany(layers);
      }
      return grouplayer
    })
  },

  async addpointstolocalfeaturelayer(layername, points) {
    const [LabelClass, array, Graphic, Point, SpatialReference] = await load(["esri/layers/support/LabelClass", "dojo/_base/array", "esri/Graphic", "esri/geometry/Point", "esri/geometry/SpatialReference"]);

    const points_featurelocallayer = window.map.findLayerById(layername);
    var points_featurelocallayer_Graphics = [];
    array.map(points, function (item, index, ary) {
      var point = new Point({
        x: item.x,
        y: item.y,
        z: item.z,
        spatialReference: SpatialReference.WebMercator
      });
      var PointGraphic = new Graphic({
        geometry: point,
        attributes: item.attrs
      });
      points_featurelocallayer_Graphics.push(PointGraphic)
    })

    var points_featurelocallayer_statesLabelClass = new LabelClass({
      labelExpressionInfo: {
        expression: "$feature.NAME"
      },
      symbol: {
        type: "text",
        color: "black",
        haloSize: 5,
        haloColor: "white"
      }
    });
    points_featurelocallayer.labelingInfo = [points_featurelocallayer_statesLabelClass];
  },

  async addpolylinestolocalfeaturelayer(layername, polylines) {
    const [LabelClass, array, Graphic, Polyline, SpatialReference] = await load(["esri/layers/support/LabelClass", "dojo/_base/array", "esri/Graphic", "esri/geometry/Polyline", "esri/geometry/SpatialReference"]);
    const polylines_featurelocallayer = window.map.findLayerById(layername);
    var polylines_featurelocallayer_Graphics = [];
    array.map(polylines, function (polylineitem, index, ary) {
      let paths = [];
      array.map(polylineitem.points, function (pointitem, index, ary) {
        paths.push([pointitem.x, pointitem.y, pointitem.z])
      })

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
      polylines_featurelocallayer_Graphics.push(PointGraphic)
    })
    polylines_featurelocallayer_Graphics.source = polylines_featurelocallayer_Graphics;

    var polylines_featurelocallayer_statesLabelClass = new LabelClass({
      labelExpressionInfo: {
        expression: "$feature.NAME"
      },
      symbol: {
        type: "text",
        color: "black",
        haloSize: 5,
        haloColor: "white"
      }
    });
    polylines_featurelocallayer.labelingInfo = [polylines_featurelocallayer_statesLabelClass];
  },

  async addlayergrouplegend(layername) {

    const [Legend] = await load(["esri/widgets/Legend"]);
    const layer = window.map.findLayerById(layername);
    if (window.legend != null) window.sceneView.ui.remove(window.legend);
    window.legend = new Legend({
      view: window.sceneView,
      layerInfos: [{
        layer: layer,
        // title: "图例"
      }]
    });
    window.sceneView.ui.add(window.legend, "bottom-right");
  }
}
export default maplayersaddutils;
