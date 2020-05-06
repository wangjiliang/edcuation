<template>
	<div>
		<ul class="listFirst">
			<li v-for="(firList,index) in firstLists" :key="index" @click="preview(firList)" class="cursor">
				<div class="listTitle">
					<div class="lt_name lf">
						<img :src="firList.icon" style="margin-top: -13px;" />
						<!-- <img src="../../../assets/images/subjectList/word.png" style="margin-top: -13px;" /> -->
						<span>{{firList.title}}</span>
					</div>
					<div class="lt_operate rt">
						<span>预览</span>
						<span>收藏</span>
					</div>
				</div>
				<div class="listFirstContent" style="position: relative;">
					<div class="left_info">
						<p>教材：{{firList.subjectName}}</p><!-- 物理 >> 中考 -->
						<p>年级：{{firList.gradeName}}</p>
						<p v-if="firList.categoryName">分类：{{firList.categoryName}}</p>
						<p>
							<img src="../../../assets/images/lesson/date.png" style="margin: -4px 5px 0 0;"/>
							{{basedata.timeShift(Number(firList.createTime))}}
						</p>
					</div>
					<div class="right_btn">
						<!-- <button v-if="firList.isAudit==2?true:false">点击下载</button> -->
						<button v-if="firList.isAudit==0?true:false" >审核中</button>
						<button v-if="firList.isAudit==3?true:false">审核未通过</button>
					</div>
				</div>
			</li>
			<li class="textCenter" v-if="listData.length==0?true:false">暂未开放，敬请期待</li>
		</ul>
	</div>
</template>

<script scoped>
	import {mapMutations } from 'vuex'
	export default {
		props:{
			isShade: {
			    type: Boolean,
			    default: false
			},
			listData:[Array]
		},
		watch:{
			listData(){
				this.firstLists=this.listData
			}
		},
		data() {
			return {
				firstLists: []
			}
		},
		methods: {
			...mapMutations(['SET_DETAIL_TITLE','SET_DETAIL_PATH']),
			preview(item) {
				var params={
					id: item.id
				}
				this.$http.get(this.$api.pdf.url,params).then(res=>{
					if(res.msg=="成功"){
						var str = res.data;
						var index = str.lastIndexOf(".");
						str  = str .substring(index + 1, str.length);
						this.SET_DETAIL_TITLE(item.title)
						if(str=="pdf"){
							this.SET_DETAIL_PATH("/PDFdetails")
							this.$router.push({
								name:"PDFdetails",
								query:{
									curId: item.id,
									pdfUrl: res.data
								}
							});
						}else if(str=="m3u8"){
							this.SET_DETAIL_PATH("/details")
							this.$router.push({
								name:"details",
								query:{
									curId: item.id,
									src: res.data,
									title: item.title,
									description: item.description,
									studyAdvisor: item.studyAdvisor,
									exercise: item.exercise,
									collectCount: item.collectCount,
									readCount: item.readCount
								}
							});
						}else{
							this.$message.warning("该资源不支持预览");
						}
					}else{
						this.$message.error("该资源不支持预览");
					}
				})
			}
		},
	}
</script>

<style scoped>
	.listFirst{
		padding: 20px;
		background: #fff;
		min-height: 700px;
	}
	.listFirst>li {
		border-top: 1px dashed #BFBFBF;
		padding: 20px 10px;
		background: #fff;
	}
	.listTitle{
		background: #F8F8F8;
		overflow: hidden;
		padding: 5px 10px;
	}
	.lt_name>span {
		display: inline-block;
		max-width: 680px;
		font-weight: 700;
		font-size: 16px;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		margin-left: 10px;
	}

	.lt_operate>span {
		margin-left: 10px;
	}

	.left_info {
		width: 680px;
	}

	.left_info>p {
		color: #999;
		margin-top: 10px;
	}

	.right_btn {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	.right_btn button {
		border: none;
		outline: none;
		width: 98px;
		height: 32px;
		line-height: 32px;
		color: #fff;
		text-align: center;
		background: #3FBDD4;
		border-radius: 10px;
	}
</style>
