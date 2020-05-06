<template>
		<!-- 学科列表 -->
		<div id="subjectList">
			<!-- 左侧 -->
			<div class="listbox borderbox lf">
				<div class="listTitle textCenter">学科列表</div>
				<ul class="listContent">
					<li class="borderbox cursor" v-for="(list,index) in subject" :key="list.name" @mouseenter="enter(index,list.id)" @mouseleave="leave()">
						<div @click="SubjectGo(list,index)">
							<img :src="list.icon" class="IoconSize lf OnImg" />
							<img :src="list.selectedIcon" class="IoconSize lf OnImgs" />
							{{ list.name }}
							<img src="../../../assets/images/subjectList/rt.png" class="rtSize rt switchRt" />
							<img src="../../../assets/images/subjectList/rt_on.png" class="rtSize rt" />
						</div>
						<subjectBox :subjectIndex='index' v-show="showSubject && index==current"></subjectBox>
					</li>
				</ul>
			</div>
			<!-- 右侧 -->
			<div class="rt">
				<div class="top borderbox">
					<div class="mySwiper lf">
						<!-- 轮播图 -->
						<div class="SwiperBox">
							<swiper></swiper>
						</div>
						<ul class="projectbox">
							<li v-for="(project,index) in projects" :class="{on : currentIndex === index}" @click="handleClick(index)" class="lf Font14 textCenter cursor Color18 borderbox">{{project.name}}</li>
						</ul>
					</div>
					<div class="TopicInfo rt">
						<div class="TopicTop Color18 borderbox Font16">
							<div class="lf textCenter">
								<p class="Font14">今日更新（套）</p>
								<p class="TopicTopfont">6465</p>
							</div>
							<div class="rt textCenter">
								<p class="m5">
									昨日（套）
									<span>11512716</span>
								</p>
								<p class="m5">
									总共（套）
									<span>11512716</span>
								</p>
							</div>
						</div>
						<div class="TipsInfo Color18 borderbox">
							<img class="lf TipsImg" src="../../../assets/images/subjectList/Tips.png" />
							<span class="Font14 Tips ellipsis">小学一年级入学年龄须满6周岁小学一年级入学年龄须满6周岁小学一年级入学年龄须满6周岁小学一年级入学年龄须满6周岁</span>
							<span class="rt Font14 cursor hoverColor">更多</span>
						</div>
						<div class="TopicBot clear borderbox">
							<ul>
								<li class="TopicBotFont ColorF17 textCenter">2019-2020学年上学期第一次月考试题汇总</li>
								<li v-for="data in datas" class="TopicBotInfo lf m5 ellipsis">
									<span class="colorbf">{{ data.title }}</span>
									<span class="pad5 colorbf">|</span>
									<span class="Color18 cursor hoverColor">{{ data.name }}</span>
								</li>
							</ul>
							<div class="clear"></div>
							<ul style="margin-top: 15px;">
								<li class="TopicBotFont ColorF17 textCenter">2019-2020学年上学期第一次月考试题汇总</li>
								<li v-for="Topic in Topics" class="TopicBotInfo lf m5 ellipsis">
									<span class="colorbf">{{ Topic.title }}</span>
									<span class="pad5 colorbf">|</span>
									<span class="Color18 cursor hoverColor">{{ Topic.name }}</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="bottom borderbox shadow">
					<ul class="subjectBottom">
						<li class="lf" v-for="item in items" :key="item.name">
							<div class="textCenter" :class="item.bgcolor">{{ item.name }}</div>
							<p class="cursor infoText Color18 ellipsis Font16 hoverColor" v-for="data in item.datas">{{ data.info }}</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
</template>

<script>
import swiper from './swiper.vue'
import subjectBox from './subjectBox.vue'

import { mapState, mapActions } from 'vuex'

export default {
	components:{
	  swiper,
		subjectBox
	},
	data() {
		return {
			currentIndex: 0,
			current: '',
			showSubject:false,
			lists: [
			],
			items: [
				{
					name: '今日优选',
					bgcolor: 'red-bg',
					datas: [
						{ info: '[高三语文]2020高三第一次月考语文试题第一次月考语文试题第一次月考语文试题' },
						{ info: '[高三语文]2020高三第一次月考语文试题' },
						{ info: '[高三语文]2020高三第一次月考语文试题' },
						{ info: '[高三语文]2020高三第一次月考语文试题' }
					]
				},
				{
					name: '专题速递',
					bgcolor: 'blue-bg',
					datas: [
						{ info: '[高三语文]2020高三第一次月考语文试题' },
						{ info: '[高三语文]2020高三第一次月考语文试题' },
						{ info: '[高三语文]2020高三第一次月考语文试题' },
						{ info: '[高三语文]2020高三第一次月考语文试题' }
					]
				},
				{
					name: '最佳原创',
					bgcolor: 'yellow-bg',
					datas: [
						{ info: '[高三语文]2020高三第一次月考语文试题' },
						{ info: '[高三语文]2020高三第一次月考语文试题' },
						{ info: '[高三语文]2020高三第一次月考语文试题' },
						{ info: '[高三语文]2020高三第一次月考语文试题' }
					]
				}
			],
			datas: [
				{ title: '精品', name: '2020年高考一轮复习2020年高考一轮复习' },
				{ title: '精品', name: '2020年高考一轮复习2020年高考一轮复习' },
				{ title: '精品', name: '2020年高考一轮复习2020年高考一轮复习' },
				{ title: '精品', name: '2020年高考一轮复习2020年高考一轮复习' },
				{ title: '精品', name: '2020年高考一轮复习2020年高考一轮复习' },
				{ title: '精品', name: '2020年高考一轮复习2020年高考一轮复习' },
				{ title: '精品', name: '2020年高考一轮复习2020年高考一轮复习' },
				{ title: '精品', name: '2020年高考一轮复习2020年高考一轮复习' }
			],
			Topics: [
				{ title: '精品', name: '2020年高考一轮复习2020年高考一轮复习' },
				{ title: '精品', name: '2020年高考一轮复习2020年高考一轮复习' },
				{ title: '精品', name: '2020年高考一轮复习2020年高考一轮复习' },
				{ title: '精品', name: '2020年高考一轮复习2020年高考一轮复习' },
				{ title: '精品', name: '2020年高考一轮复习2020年高考一轮复习' },
				{ title: '精品', name: '2020年高考一轮复习2020年高考一轮复习' },
				{ title: '精品', name: '2020年高考一轮复习2020年高考一轮复习' },
				{ title: '精品', name: '2020年高考一轮复习2020年高考一轮复习' }
			],
			projects: [
				{name:'入学摸底考试'},{name:'入学摸底考试'},{name:'入学摸底考试'},{name:'入学摸底考试'},{name:'入学摸底考试'},{name:'入学摸底考试'},{name:'入学摸底考试'},{name:'入学摸底考试'},{name:'入学摸底考试'}
			]
		};
  },
  computed: {
		...mapState(['subject'])
		// subject:function(){
		// 	let list = this.$store.state.subject;
		// 	list.map((item)=>{
		// 		item.icon = "/api/" + item.icon
		// 	});
		// 	return list;
		// }
  },
	mounted() {
		let id = this.$store.state.periodId
    this.getSubjectList(id);
	},
	methods: {
    ...mapActions(['getSubjectList','getGradeList']),
	  handleClick(index){
	    this.currentIndex = index
	  },
		enter(index,id){
			this.showSubject = true;
			this.current = index;
			this.getGradeList(id);
			// let list = this.$store.state.subject;
			// console.log(list)
			// list.map((item)=>{
			// 	item.icon = item.icon
			// });
			// return list;
			// this.list.icon==list.selectedIcon
		},
		leave(){
			this.showSubject = false;
		},
		// 通过学科跳转列表
		SubjectGo(data,index){
			this.$router.push({
				name:"lesson",
				params:{
					subjectIndex:index
				}
			});
		}
	}
};
</script>

<style scoped>
#subjectList {
	width: 100%;
	height: 762px;
	margin: 15px 0px;
	position: relative;
}
/* 滚动条样式 */
::-webkit-scrollbar{background-color:#fff;}
::-webkit-scrollbar-thumb{background:rgba(63,189,212,0.8);}
.listbox {
	width: 212px;
	height: 100%;
	background: #fff;
	border-radius: 10px;
	border: 1px solid #3fbdd4;
	overflow: hidden;
}
.listContent{
	width: 225px;
	color: #3fbdd4;
	max-height: 712px;
	overflow-x: hidden;
}
.listTitle{
	height: 50px;
	font-size: 18px;
	line-height: 50px;
}
.listTitle{
	color: #fff;
	background: #3fbdd4;
	border-radius: 8px 8px 0px 0px;
}
.listLast{
	height: 47px;
	line-height: 47px;
	color: #3fbdd4;
	font-size: 18px;
	border-radius: 0 0 8px 8px;
}
.listLast span{
	margin: 0 2px;
}
.listLast:hover{
	color: #fff;
	background: #3fbdd4;
}
.listLast span:hover{
	color: #fff;
}
.listContent li:hover{
	color: #fff;
	background: #3FBDD4;
}
.listContent li:hover .switchRt{
	display: none;
}
.listContent li:hover .OnImg{
	display: none;
}
.listContent li:hover .OnImgs{
	display: block;
}
.OnImgs{
	display: none;
}
.listContent div {
	width: 195px;
	height: 50px;
	line-height: 50px;
	margin-left: 8px;
	font-size: 16px;
	overflow: hidden;
}
.listContent div {
	border-bottom: 1px solid #3fbdd4;
}
.listContent li:last-child div{
	border-bottom:none !important;
}
.IoconSize {
	margin-top: 7px;
	margin-right: 5px;
	width: 36px;
	height: 36px;
}
.rtSize {
	width: 8px;
	height: 12px;
	margin-top: 20px;
	margin-right: 5px;
}
.top,
.bottom {
	width: 980px;
	background: #fff;
	padding: 14px;
}
.top {
	height: 495px;
}
.bottom {
	height: 258px;
	margin-top: 9px;
}
.subjectBottom li {
	width: 33%;
}
.subjectBottom li:nth-child(2) {
	margin: 0 4.5px;
}
.subjectBottom li div {
	color: #fff;
	font-size: 23px;
	height: 100px;
	line-height: 100px;
}
.red-bg {
	background: #f17779;
}
.blue-bg {
	background: #6eaed4;
}
.yellow-bg {
	background: #e6be8b;
}
.infoText {
	margin: 6px;
	line-height: 29px;
}
.mySwiper {
	width: 541px;
	height: 100%;
}
.SwiperBox{
	width: 100%;
	height: 283px;
}
.projectbox{
	height: 184px;
}
.projectbox li{
	width:130px;
	height:45px;
	line-height: 45px;
	border: 1px solid #717171;
	border-radius:10px;
	margin: 10px 2.5px;
}
.projectbox li:nth-child(4n){
	margin: 10px 0px 10px 4px;
}
.on{
	border: none !important;
	color: #FFF !important;
	background: #3FBDD4;
}
.projectbox li:hover{
	border: none;
	color: #FFF !important;
	background: #3FBDD4;
}
.TopicInfo {
	width: 403px;
	height: 100%;
}
.TopicTop {
	width: 100%;
	height: 106px;
	padding: 25px 30px;
	background: #effcfe;
}
.TopicTop div {
	width: 171.5px;
	height: 56px;
}
.TopicTop div span,
.TopicTopfont {
	color: #e14a3b;
}
.TopicTopfont {
	font-size: 30px;
}
.TipsInfo {
	width: 100%;
	height: 36px;
	line-height: 36px;
	padding: 0 8px;
}
.Tips {
	display: inline-block;
	width: 325px;
	margin-left: 15px;
}
.TipsImg {
	width: 15px;
	height: 15px;
	margin-top: 10px;
}
.TopicBot {
	width: 100%;
	height: 325px;
	overflow: hidden;
	padding: 16px;
	background: #effcfe;
}
.TopicBotFont {
	font-size: 18px;
	margin-bottom: 15px;
}
.TopicBotInfo {
	font-size: 12px;
	width: 175px;
}
.colorbf{
	color: #BFBFBF;
}
</style>
