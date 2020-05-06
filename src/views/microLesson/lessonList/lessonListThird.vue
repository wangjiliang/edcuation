<template>
	<div>
		<ul class="listThird">
			<li class="cursor" v-for="(thirdList,index) in thirdLists" :key="index" @click="preview(thirdList)">
				<div class="lf title_content">
					<img :src="thirdList.icon" style="margin-top: -11px;" />
					<!-- <img src="../../../assets/images/subjectList/ppt.png" style="margin-top: -11px;"/> -->
					<span class="ltContentTitle">{{thirdList.title}}</span>
				</div>
				<div class="datePage rt">
					<button class="btn" v-if="thirdList.isAudit==3?true:false">未通过</button>
					<button class="btn" v-if="thirdList.isAudit==0?true:false">审核中</button>
					<span>{{basedata.timeShift(Number(thirdList.createTime))}}</span>
					<span>页数：{{thirdList.page}}</span>
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
				this.thirdLists=this.listData
				// console.log(this.thirdLists)
			}
		},
		data(){
			return{
				thirdLists:[]
			}
		},
		methods: {
			...mapMutations(['SET_DETAIL_TITLE','SET_DETAIL_PATH']),
			preview(item) {
				var params={
					id: item.id
				}
				this.$http.get(this.$api.pdf.url,params).then(res=>{
					var str = res.data;
					if(res.msg=="成功"){
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
						this.$message.warning("该资源不支持预览");
					}
				})
			}
		},
	}
</script>

<style scoped>
	.listThird{
		padding: 20px;
		background: #fff;
		min-height: 815px;
	}
	.listThird>li{
		color: #191919;
		padding-top: 20px;
		overflow: hidden;
	}
	.title_content:hover{
		color: #0080FF;
	}
	.listThird>li:first-child{
		border-top:1px dashed #BFBFBF;
	}
	.ltContentTitle{
		display: inline-block;
		font-size: 16px;
		max-width: 510px;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		margin-left: 10px;
		cursor: pointer;
	}
	.datePage>span{
		font-size: 16px;
		margin-left: 20px;
	}
	.btn{
		padding: 3px 16px;
		border: none;
		background: #3FBDD4;
		color: #fff;
		border-radius: 12px;
	}
</style>
