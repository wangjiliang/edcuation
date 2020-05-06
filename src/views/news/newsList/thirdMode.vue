<template>
	<div>
		<ul class="list">
			<li v-for="(list,index) in curData" :key="index" @click="go(list.body,list.title)">
				<div class="lf title_content">
					<span class="ltContentTitle">{{list.title}}</span>
				</div>
				<div class="datePage rt">
					<span>{{basedata.timeShift(Number(list.createTime))}}</span>
				</div>
			</li>
		</ul>
	</div>
</template>

<script scoped>
	import {mapMutations } from 'vuex'
	export default {
		props:{
			curData:[Array]
		},
		data(){
			return{
				lists:[]
			}
		},
		methods:{
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
		background: #fff;
	}
	.list>li{
		color: #191919;
		padding-top: 20px;
		overflow: hidden;
	}
	.title_content:hover{
		color: #0080FF;
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
</style>
