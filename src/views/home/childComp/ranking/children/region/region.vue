<template>
	<div class="region">
		<div class="head">
			<div class="title">名校资源排行榜</div>
			<ul class="list">
				<li class="list-item" :class="{ on: currentIndex === index }" @click="changeType(index, item)" v-for="(item, index) in types" :key="item.type">{{ item.text }}</li>
			</ul>
		</div>
		<div class="content">
			<div class="swiper">
				<div class="swiper-container" id="region">
					<div class="swiper-wrapper">
						<div class="swiper-slide cursor" v-for="(item, index) in schools" :key="item.num" @click="showMessage(item)">
							<div class="image"><img :src="baseUrl + item.img" /></div>
							<div class="desc">
								<p>
									<span>{{ index + 1 }}</span>
									{{ item.name }}
								</p>
								<span>{{ item.uploadCount }}条</span>
							</div>
						</div>
					</div>
				</div>
				<div class="swiper-button-prev"></div>
				<div class="swiper-button-next"></div>
			</div>
			<ul class="news-list">
				<li class="news-item" v-for="(item, index) in newsList" :key="index" v-if="sort == 1 ? true : false" @click="godetails(item.id,item.title)">
					<img :src="item.icon" alt="" />
					<span class="text">{{ item.title }}</span>
					<span class="time">{{ item.reviewCount }}</span>
				</li>
				<li class="news-item" v-for="(item, index) in newsList" :key="index" v-if="sort == 2 ? true : false" @click="godetails(item.id,item.title)">
					<img :src="item.icon" alt="" />
					<span class="text">{{ item.title }}</span>
					<span class="time">{{ basedata.timeShift(Number(item.createTime)) }}</span>
				</li>
				<li class="news-item" v-for="(item, index) in newsList" :key="index" v-if="sort == 3 ? true : false" @click="golist(item)">
					<span class="index">{{ index + 1 }}</span>
					<span class="text">{{ item.nickname }}</span>
					<span class="time">{{ item.uploadCount }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import Swiper from 'swiper';
import {mapMutations } from 'vuex'
export default {
	data() {
		return {
			currentIndex: 0,
			types: [{ type: 1, text: '按评论数排序' }, { type: 2, text: '按时间排序' }, { type: 3, text: '教师排序' }],
			typeIndex: 0,
			schools: [],
			newsList: [],
			schoolId: 1,
			sort: 1
		};
	},
	mounted() {
		this.getSchoolRank();
	},
	methods: {
		...mapMutations(['SET_CRUMB_SEC','SET_NAV_PATH','SET_DETAIL_TITLE','SET_DETAIL_PATH']),
		// 跳转列表页
		golist(item){
			if(item.uploadCount!=0){
				this.SET_CRUMB_SEC('教师专区')
				this.SET_NAV_PATH('/list')
				this.$router.push({
					name:"list",
					query:{
						id:item.id
					}
				})
			}else{
				this.$message.warning("资源上传中，敬请期待。");
			}
		},
		// 跳转pdf/视频详情页
		godetails(curId,title){
			var params={
				id: curId,
			}
			this.$http.get(this.$api.pdf.url,params).then(res=>{
				var str = res.data;
				if(res.msg=="成功"){
					var index = str.lastIndexOf(".");
					str  = str .substring(index + 1, str.length);
					this.SET_CRUMB_SEC('资源中心')
					this.SET_NAV_PATH('/lesson')
					this.SET_DETAIL_TITLE(title)
					if(str=="pdf"){
						this.SET_DETAIL_PATH("/PDFdetails")
						this.$router.push({
							name:"PDFdetails",
							query:{
								curId: curId,
								pdfUrl: res.data,
							}
						});
					}else if(str=="m3u8"){
						this.SET_DETAIL_PATH("/details")
						this.$router.push({
							name:"details",
							query:{
								curId: curId,
								src: res.data,
								title: name
							}
						});
					}
				}else{
					this.$message.warning("该资源不支持预览");
				}
			})
		},
		// 获取地区下学校排行
		getSchoolRank() {
			this.$http.get(this.$api.newDynamic.schoolRank).then(res => {
				this.schools = res.data;
				this.schoolId = this.schools[0].id;
				this.getresRanking();
				this.$nextTick(function() {
					this.initSwiper();
				});
			});
		},
		// 获取资源排行榜
		getresRanking() {
			var params = {
				sort: this.sort,
				schoolId: this.schoolId
			};
			// console.log(params);
			if (this.sort == 3) {
				this.$http.get(this.$api.newDynamic.resTeacherRank, this.params).then(res => {
					this.newsList = res.data;
				});
			} else {
				this.$http.get(this.$api.newDynamic.resRank, this.params).then(res => {
					this.newsList = res.data;
					// console.log(res);
				});
			}
		},
		initSwiper() {
			let regionSwiper = new Swiper('#region', {
				slidesPerView: 7,
				spaceBetween: 8,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				}
			});
		},
		showMessage(item) {
			this.schoolId = item.id;
			this.getresRanking();
		},
		//  handleClick(index,item){
		//    this.currentIndex = index
		// this.cityId=item.id
		// this.getSchoolRank()
		//  },
		changeType(index, item) {
			this.currentIndex = index;
			this.sort = item.type;
			this.getresRanking();
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../style.scss';
@import './style.scss';
</style>
