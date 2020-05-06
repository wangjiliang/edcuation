<template>
	<!-- head -->
	<div id="headbox">
		<div class="content">
			<div class="top">
				<!-- logo -->
				<div class="logoname cursor lf" @click="goHome" title="点此返回首页">
					<!-- <img src="" class="logo lf" />
					<div class="logo-text lf">
						<p class="f23">教育资源公共服务平台</p>
						<p class="f10">Education resource public service platform</p>
					</div> -->
					<img class="logoImg" src="../../assets/images/logo.png"/>
				</div>
				<!-- 搜索 -->
				<div class="searchbox borderbox lf">
					<input class="search borderbox" type="text" placeholder="请输入关键字" />
					<button class="searchbtn btn rt">搜索</button>
				</div>
				<!-- 头像 -->
				<div class="headbox rt">
					<img :src="baseUrl+headUrl" class="headimg cursor lf" @click="goPersonalSpace" v-if="isTeacher!=''?true:false"/>
					<img src="../../assets/images/HeadLogo.png" class="headimg cursor lf" @click="goPersonalSpace" v-if="isTeacher==''?true:false"/>
					<p class="f23 lf textCenter cursor" v-if="isTeacher==1" @click="upload">上传</p>
				</div>
			</div>
			<div class="bottom">
				<!-- nav -->
				<ul class="headerNav lf">
					<li class="lf" :class="{on: periodId == item.id}" v-for="item in period" :key="item.id" @click="switchId(item.id)">{{ item.name }}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>

import { mapState, mapMutations, mapActions } from 'vuex'


export default {
	data() {
		return {

		};
  },
  computed: {
    ...mapState(['period','periodId','isTeacher','headUrl'])
  },
	mounted(){
    this.getPeriodList()
	},
	methods: {
    ...mapMutations(['SET_PERIOD_ID' ]),
    ...mapActions(['getPeriodList','getSubjectList']),
		goHome() {
			this.$router.push('/home');
		},
		goPersonalSpace() {
      if( this.isTeacher === ''){
				this.$router.push('/login');
			}else{
				this.$router.push('/personalHome');
			}
		},
		switchId(id) {
      this.SET_PERIOD_ID(id)
      this.getSubjectList(id)
		},
		upload(){
			this.$router.push("/uploadData")
		}
	}
};
</script>

<style scoped>
#headbox,
.headerNav,
.content,
.top,
.bottom {
	overflow: hidden;
}
#headbox {
	width: 100%;
	min-width: 1200px;
	height: 242px;
	background: #3fbdd4;
}
.content {
	width: 1200px;
	margin: 0 auto;
}
.logoname,
.searchbox,
.headbox {
	margin-top: 74px;
}
/* .logo, */
.headimg {
	width: 50px;
	height: 50px;
	border-radius: 50%;
}
/* .logo-text {
	color: #fff;
	margin-left: 12px;
} */
.logoImg{
	width: 262px;
	height: 46px;
}
.f23 {
	font-size: 23px;
}
.f10 {
	font-size: 10px;
}
.searchbox {
	margin-left: 85px;
	width: 584px;
	height: 50px;
	line-height: 50px;
	background: #fff;
	border-radius: 10px;
}
.search {
	width: 469px;
	border-radius: 10px 0px 0px 10px;
	padding: 0 23px;
	font-size: 14px;
	color: #999;
}
.searchbtn {
	width: 115px;
	height: 50px;
	background: #f79393;
	border-radius: 0px 10px 10px 0px;
	font-size: 18px;
	color: #fff;
}
.headbox {
	color: #fff;
	line-height: 50px;
}
.headimg {
	margin-right: 16px;
}
.headerNav {
	margin-left: 210px;
	margin-top: 67px;
}
.headerNav li {
	font-size: 16px;
	color: #fff;
	margin-left: 20px;
	cursor: pointer;
	padding: 10px 15px 20px 15px;
}
.headerNav li.on{ color: #ffe21d; background: #108ba1;}
.headerNav li:not(.on):hover {
	color: #ffe21d;
}
</style>
