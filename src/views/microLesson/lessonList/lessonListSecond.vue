<template>
	<div>
		<ul class="listSecond">
			<li style="float: none;"></li>
			<li v-for="(secList, index) in secondLists" class="cursor" @click="goDetail(secList)">
				<div class="lsVideo">
					<img :src="baseUrl + secList.img" style="width: 100%;height: 100%;" />
					<!-- <img src="../../../assets/images/home/lesson.png" style="width: 100%;height: 100%;"/> -->
					<div class="playBtn" v-if="secList.mediatypeName == '视频' ? true : false"><img src="../../../assets/images/lesson/play_icon.png" style="width: 50px;height: 50px;" /></div>
					<div class="audit">
						<div class="inAudit" v-show="secList.isAudit == 0 ? true : false">审核中</div>
						<div class="noPass" v-show="secList.isAudit == 3 ? true : false"><span>审核未通过</span></div>
					</div>
				</div>
				<p class="lsTitle">{{ secList.title }}</p>
				<p class="lsCount" v-if="secList.mediatypeName == '视频' ? true : false">播放次数:&nbsp;&nbsp;{{ secList.count }}</p>
				<p class="lsCount" v-if="secList.mediatypeName != '视频' ? true : false">观看次数:&nbsp;&nbsp;{{ secList.count }}</p>
			</li>
			<li class="textCenter" v-if="listData.length==0?true:false" style="float: none;">暂未开放，敬请期待</li>
			<div class="clear"></div>
		</ul>
	</div>
</template>

<script scoped>
	import {mapMutations } from 'vuex'
export default {
	props: {
		isShade: {
			type: Boolean,
			default: false
		},
		listData: [Array]
	},
	watch: {
		listData() {
			this.secondLists = this.listData;
			console.log(this.secondLists)
		}
	},
	data() {
		return {
			secondLists: []
		};
	},
	methods: {
		...mapMutations(['SET_DETAIL_TITLE','SET_DETAIL_PATH']),
		goDetail(item) {
			var params = {
				id: item.id
			};
			this.$http.get(this.$api.pdf.url, params).then(res => {
				var str = res.data;
				if (res.msg == '成功') {
					var index = str.lastIndexOf('.');
					str = str.substring(index + 1, str.length);
					this.SET_DETAIL_TITLE(item.title)
					if(str=="pdf"){
						this.SET_DETAIL_PATH("/PDFdetails")
						this.$router.push({
							name: 'PDFdetails',
							query: {
								curId: item.id,
								pdfUrl: res.data
							}
						});
					} else if (str == 'm3u8') {
						this.SET_DETAIL_PATH("/details")
						this.$router.push({
							name: 'details',
							query: {
								curId: item.id,
								src: res.data,
								title: item.title,
								description: item.description,
								studyAdvisor: item.studyAdvisor,
								exercise: item.exercise,
								collectCount: item.collectCount,
								readCount: item.readCount
							},
						});
					} else {
						this.$message.warning('该资源不支持预览');
					}
				} else {
					this.$message.warning('该资源不支持预览');
				}
			});
		}
	}
};
</script>

<style scoped>
.listSecond {
	padding: 0 20px 20px 0;
	background: #fff;
	min-height: 700px;
}
.listSecond > li {
	float: left;
	margin: 20px 0 0 18px;
}
.listSecond > li:first-child {
	margin: 0 0 0 20px;
	padding-top: 20px;
	border-bottom: 1px dashed #bfbfbf;
}
.lsVideo {
	width: 212px;
	height: 117px;
	/* background: red; */
	position: relative;
}
.playBtn {
	width: 212px;
	height: 117px;
	line-height: 117px;
	text-align: center;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 99;
}
.lsTitle {
	max-width: 125px;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	margin-top: 8px;
}
.lsCount {
	color: #979797;
	margin-top: 8px;
}
.audit {
	width: 100%;
	position: absolute;
	top: 0;
	z-index: 100;
}
.inAudit {
	background: rgba(68, 227, 251, 0.5);
	z-index: 100;
	color: #fff;
	height: 117px;
	line-height: 117px;
	text-align: center;
}
.noPass {
	width: 100%;
	height: 117px;
	text-align: center;
	color: #fff;
}
.noPass > span {
	display: inline-block;
	width: 100%;
	height: 31px;
	line-height: 31px;
	background: red;
	margin-top: 43px;
}
</style>
