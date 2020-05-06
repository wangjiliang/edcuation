<template>
	<div class="fast-news">
		<div class="news-content">
			<div class="content-topic">
				<span style="font-size:30px;">最新动态</span>
				<span style="font-size:16px;">&nbsp;/ &nbsp;FAST NEWS</span>
			</div>
			<div class="main-content">
				<div class="main-content-left">
					<div class="main-content-left-top cursor" v-if="fastnews[0]" @click="toDetail(fastnews[0].body,fastnews[0].title)">
						<div class="top-left-image"><img :src="baseUrl + fastnews[0].img" alt="" /></div>
						<div class="top-right-text">
							<p class="title" @click="toDetail(fastnews[0].body)">{{ fastnews[0].title }}</p>
							<div class="time">{{ basedata.timeShift(Number(fastnews[0].createTime)) }}</div>
							<div class="text">{{ fastnews[0].remark }}</div>
						</div>
					</div>
					<ul class="main-content-left-bottom">
						<li v-for="(list, index) in fastnews.slice(1)" :key="index" @click="toDetail(list.body,list.title)">{{ list.title }}</li>
					</ul>
				</div>
				<div class="main-content-right">
					<div>
						<div class="main-content-right-item lf">
							<div class="bottom textCenter">上传量</div>
							<div class="top textCenter">
								<span class="num">{{ uploadCount }}</span>
								<span class="unit">条</span>
							</div>
						</div>
						<div class="main-content-right-item rt mlf10">
							<div class="bottom textCenter">收藏量</div>
							<div class="top textCenter">
								<span class="num">{{ collectCount }}</span>
								<span class="unit">条</span>
							</div>
						</div>
					</div>
					<div>
						<div class="main-content-right-item lf">
							<div class="bottom textCenter">评论量</div>
							<div class="top textCenter">
								<span class="num">{{ reviewsCount }}</span>
								<span class="unit">条</span>
							</div>
						</div>
						<div class="main-content-right-item rt mlf10">
							<div class="bottom textCenter">下载量</div>
							<div class="top textCenter">
								<span class="num">{{ downCount }}</span>
								<span class="unit">条</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script scoped>
	import {mapMutations } from 'vuex'
export default {
	data() {
		return {
			uploadCount: '',
			collectCount: '',
			reviewsCount: '',
			downCount: ''
		};
	},
	props: {
		fastnews: Array,
		renowned: Array
	},
	mounted() {
		this.getStatistics();
		// console.log(this.renowned)
	},
	methods: {
		...mapMutations(['SET_CRUMB_SEC','SET_NAV_PATH','SET_DETAIL_TITLE','SET_DETAIL_PATH']),
		toDetail(data,title) {
			if (data == '') {
				this.$message.error('该资源不支持预览');
			} else {
				this.SET_CRUMB_SEC("资讯中心")
				this.SET_NAV_PATH("/news")
				this.SET_DETAIL_TITLE(title)
				this.SET_DETAIL_PATH("/newsDetail")
				this.$router.push({
					name: 'newsDetail',
					query: {
						body: data
					}
				});
			}
		},
		getStatistics() {
			this.$http.get(this.$api.newDynamic.resInfo).then(res => {
				var data = res.data;
				this.uploadCount = data.uploadCount;
				this.collectCount = data.collectCount;
				this.reviewsCount = data.reviewsCount;
				this.downCount = data.downCount;
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
>
