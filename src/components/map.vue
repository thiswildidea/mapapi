<template>
  <div class="map">
      <div id="viewDiv"  class="calcite-map calcite-map-absolute calcite-widgets-dark" v-loading="maploaded" element-loading-text="地图加载中。。。" element-loading-spinner="el-icon-loading" element-loading-background="rgba(13, 26, 58, 1)">
     
     </div> 
  </div>
</template>

<script>
import mapctx  from  '@/utils/map/mapctx.js';
import messagehandler from '@/utils/map/messagehandler.js';
export default {
  name: 'map',
  data () {
    return {
       maploaded:true,
    }
  },
   components: { },
   
    methods: { 
        async createMap() {
         const isload=  await mapctx.initmap();
         this.maploaded=isload;
           messagehandler.mapOperationMessage();
          if(!this.maploaded) messagehandler.mapReadyMessage();
       }

       
   },
  computed: {  
   },
  async mounted() {
     this.createMap();

  },
    beforeDestroy() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
