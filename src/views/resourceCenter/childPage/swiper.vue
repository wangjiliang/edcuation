<template>
	<div>
		<div class="swiper-container" id="swiper01">
			<div class="swiper-wrapper">
				<div v-for="list in lists" :key="list.index" class="swiper-slide swiperBig">
					<img :src="baseUrl+list.img" style="width: 100%;"/>
				</div>
			</div>
		</div>
		<!-- Swiper -->
		<div class="swiper-container" id="swiper02">
			<div class="swiper-wrapper borderbox">
				<div v-for="data in datas" :key="data.index" class="swiper-slide swiperSmall">
					<img :src="baseUrl+data.img" style="width: 100%;"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Swiper from 'swiper';
export default {
	data() {
		return {
			datas: [],
			lists: []
		};
	},
	mounted() {
		this.getbanner();
	},
	methods:{
		getbanner(){
			this.$http.get(this.$api.Resources.banner).then(res=>{
				this.lists = res.data.slice(0,4)
				this.datas = res.data.slice(4)
				// 大banner
				this.$nextTick(function () {
					var swiper = new Swiper('#swiper01', {
						autoplay: {
							disableOnInteraction: false, //设置为false，用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay。
							delay: 2500 //1秒切换一次
						},
						loop: true,
						mousewheel: true,
						keyboard: true
					});
				});
				// 小banner
				this.$nextTick(function () {
					var swiper = new Swiper('#swiper02', {
						autoplay: {
							disableOnInteraction: false, //设置为false，用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay。
							delay: 2000 //1秒切换一次
						},
						loop: true,
						slidesPerView: 3,
						spaceBetween: 2,
						freeMode: true
					});
				});
			})
		}
	}
};
</script>

<style scoped>
.swiperBig {
	width: 541px;
	height: 195px;
}
.swiperSmall {
	width: 179px;
	height: 85px;
	margin-top: 3px;
}
</style>
