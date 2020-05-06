<template>
	<div>
		<div class="swiper-container">
		    <div class="swiper-wrapper">
          <div class="swiper-slide cursor" :class="slide.id+ '-slide'" v-for="slide in slides" :key="slide.id">
            <p class="Font60" :data="slide.category">{{slide.title}}</p>
            <p class="Font30" :data="slide.category">{{slide.desc}}</p>
          </div>
				</div>
		</div>
	</div>
</template>

<script>
import Swiper from 'swiper';
import { mapState , mapMutations} from 'vuex'

export default {
	data() {
		return {
      slides: null
    };
	},
  computed: {
    ...mapState(['isTeacher'])
  },
  created () {
    this.initData()
  },
  mounted() {
    this.initSwiper()
	},
	methods: {
		...mapMutations(['SET_CRUMB_SEC','SET_NAV_PATH','SET_PERSON_ACTIVE']),
    //初始化数据
    initData(){
      if(this.isTeacher==0){
        this.slides = [
          { id: 'red', category: 'seen', title: '内容2', desc: '看过的资源汇总' },
          { id: 'orange', category: 'favorite', title: '内容3', desc: '收藏的资源汇总' }
        ]
      } else {
        this.slides = [
          { id: 'blue', category: 'upload', title: '内容1', desc: '上传的资源汇总' },
          { id: 'red', category: 'seen', title: '内容2', desc: '看过的资源汇总' },
          { id: 'orange', category: 'favorite', title: '内容3', desc: '收藏的资源汇总' }
        ]
      }
    },
    //初始化轮播图
    initSwiper() {
      const _this = this
		  const mySwiper = new Swiper('.swiper-container',{
		    loop : true, // 形成环路，不断循环， 跟autoplay可组成轮播图
		    autoplay: {
		      delay: 2500,//1秒切换一次
		    },
		    initialSlide: 0, // 一开始就放到所有中间的位置
		    slidesPerView: 2, // slider容器能够同时显示的slides数量
		    centeredSlides: true, // 默认状态下slide居左，但是居左有问题，取到的slide下标有误，一般设为true:居中
		    slideToClickedSlide: true, // 点击slide会过渡到这个slide
		    effect : 'coverflow', // 切换效果, coverflow:3D流 (可选)
		    coverflowEffect: { // 切换效果的参数
		      rotate: 0,
		      stretch: 1,
		      depth: 60,
		      modifier: 2,
		      slideShadows : true
		    },
		    on:{
		      click(e) {
				let data = e.target.getAttribute('data')
				if( data == 'upload') {
				  _this.goUpload()
				}else if(data=='favorite'){
				  _this.go('收藏的资源汇总','collectCount')
				}else if(data=='seen'){
					_this.go('看过的资源汇总','readCount')
				}
		      }
		    }
		  });
		},
		goUpload(toPath) {
			this.SET_CRUMB_SEC("个人中心")
			this.SET_NAV_PATH("/informationList")
			this.SET_PERSON_ACTIVE("0")
			this.$router.push('/informationList');
		},
		go(secNav,type){
			this.SET_CRUMB_SEC(secNav)
			this.SET_NAV_PATH("/list")
			this.$router.push({
				name:"list",
				query:{
					type: type,
				}
			});
		}
	}
	
};
</script>

<style scoped>
	.Font60{
		font-size: 60px;
		line-height: 534px;
	}
	.Font30{
		font-size: 30px;
		width:121px;
		height:82px;
		overflow: hidden;
		margin-top: -150px;
		margin-left: 153px;
	}
	.swiper-container {
		width: 90%;
		height: 534px;
		margin: 150px auto;
	}
	.swiper-slide{
		height: 534px;
		color: #fff;
		font-size: 36px;
		text-align: center;
		border-radius: 5px;
	}
  .swiper-slide .box {
    width: 100%;
    height: 100%;
  }
	.blue-slide {
			background: url(../../../assets/images/PersonalSpace/swiper03.png) no-repeat;
			background-size: cover;
	}
	.red-slide {
			background: url(../../../assets/images/PersonalSpace/swiper02.png) no-repeat;
			background-size: cover;
	}
	.orange-slide {
			background: url(../../../assets/images/PersonalSpace/swiper01.png) no-repeat;
			background-size: cover;
	}
</style>
