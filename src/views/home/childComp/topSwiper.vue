<template>
  <div class="swiper-container" id="topswiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="slide in banner" :key="slide.index" @click="getCurData(slide.body,slide.title)">
		<img :src="baseUrl+slide.img" style="width: 100%;"/>
	  </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script scoped>
import Swiper from 'swiper'
import {mapMutations } from 'vuex'
export default {
  data() {
    return {
    }
  },
	props:{
		banner:Array
	},
	watch:{
		banner(){
			this.$nextTick(function () {
			    let mySwiper = new Swiper ('#topswiper', {
			       loop: true, // 循环模式选项
			       autoplay: {
			         delay: 2500,
			         disableOnInteraction: false, //设置为false，用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay。
			       },
			       // 如果需要分页器
			       pagination: {
			         el: '.swiper-pagination',
			         clickable: true
			       },
			     })
			})
		},
	},
	methods:{
		...mapMutations(['SET_CRUMB_SEC','SET_NAV_PATH','SET_DETAIL_TITLE','SET_DETAIL_PATH']),
		getCurData(data,title){
			if(data==""){
				this.$message.error("该资源不支持预览");
			}else{
				this.SET_CRUMB_SEC("资讯中心")
				this.SET_NAV_PATH("/news")
				this.SET_DETAIL_TITLE(title)
				this.SET_DETAIL_PATH("/newsDetail")
				this.$router.push({
					name:'newsDetail',
					query:{
						body: data,
						index:0
					}
				});
			}
		}
	}
}
</script>

<style scoped >

  @import '../../../../node_modules/swiper/css/swiper.min.css';

  .swiper-slide {
    height: 480px;
  }

</style>
