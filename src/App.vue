<template>
  <div id="app">
    <!-- header -->
		<!-- 资源 -->
    <vheader v-if="!$route.meta.showHeader"/>
		<!-- 个人空间 -->
		<grHeader v-if="!$route.meta.showgrHeader"/>
		<!-- 详情 -->
		<xqHeader v-if="!$route.meta.showxqHeader"/>
		<router-view v-if="isRouterAlive"></router-view>
    <!-- bottom -->
    <vbottom v-if="!$route.meta.showFooter"/>
  </div>
</template>

<script>
	import vheader from 'components/header/vheader.vue'
	import grHeader from 'components/header/grHeader.vue'
	import xqHeader from 'components/header/xqHeader.vue'
  import vbottom from 'components/bottom/vbottom.vue'
	export default {
		name: 'app',
		provide(){
			return{
				reload: this.reload
			}
		},
		data () {
	    return {
	      isRouterAlive: true
	    }
  	},
    components:{
      vheader,
      vbottom,
			grHeader,
			xqHeader
    },
    methods: {
    	reload (){
    		this.isRouterAlive = false
    		this.$nextTick(function(){
    			this.isRouterAlive = true
    		})
    	}
    }
	}
</script>

<style lang="scss">
  *{margin:0;padding: 0;}
  @import 'assets/css/reset.css'
</style>
