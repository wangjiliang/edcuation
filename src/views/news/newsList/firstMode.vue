<template>
	<div>
		<ul class="list">
			<li class="cursor" v-for="(list,index) in curData" @click="go(list.body,list.title)">
				<div class="lf thumbnail">
					<!-- <img :src="list.src" style="width: 100%;height: 100%;"/> -->
					<img :src="baseUrl+list.img" style="width: 100%;height: 100%;"/>
				</div>
				<div class="intro">
					<p class="introTitle">{{list.title}}</p>
					<p class="introDate">{{basedata.timeShift(Number(list.createTime))}}</p>
					<p class="introContent">{{list.remark}}</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script scoped>
	import {mapMutations } from 'vuex'
	export default {
		props:{
			curData:[Array],
		},
		data() {
			return{
			}
		},
		methods: {
			...mapMutations(['SET_DETAIL_TITLE','SET_DETAIL_PATH']),
			go(info,title) {
				if(info==""){
					this.$message.error("该资源不支持预览");
				}else{
					this.SET_DETAIL_TITLE(title)
					this.SET_DETAIL_PATH("/newsDetail")
					this.$router.push({
						name:'newsDetail',
						query:{
							body: info,
						}
					});
				}
			}
		}
	}
</script>

<style scoped>
	.list{
		padding: 20px;
	}
	.list>li{
		padding-bottom: 20px;
		border-bottom: 1px solid #BCBCBC;
		overflow: hidden;
		margin-bottom: 20px;
	}
	.list>li:last-child{
		border: none;
	}
	.thumbnail{
		width: 186px;
		height: 112px;
	}
	.intro{
		margin-left: 216px;

	}
	.introTitle{
		font-size: 18px;
		font-weight: bold;
		color: #303F4B;
	}
	.introDate,.introContent{
		font-size: 14px;
		color: #747474;
		margin-top: 5px;
	}
	.introContent{
		width: 360px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
		line-height: 21px;
		margin-top: 3px;
	}
</style>
