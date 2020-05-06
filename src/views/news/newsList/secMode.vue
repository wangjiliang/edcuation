<template>
	<div>
		<ul class="list">
			<li v-for="(list,index) in curData" @click="go(list.body,list.title)">
				<div class="thumbnail">
					<img :src="baseUrl+list.img" style="width: 100%;height: 100%;display: block;"/>
				</div>
				<p class="introTitle">{{list.title}}</p>
				<p class="introDate">{{list.date}}</p>
			</li>
			<div class="clear"></div>
		</ul>
	</div>
</template>

<script scoped>
	import {mapMutations } from 'vuex'
	export default {
		props:{
			curData:[Array]
		},
	    data() {
			return {
				lists:[],
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
		padding: 0 20px 20px 0;
		background: #fff;
	}
	.list>li{
		float: left;
		margin:20px 0 0 20px;
	}
	.list>li:first-child{
		margin:0 0 0 20px;
		padding-top: 20px;
	}
	.thumbnail{
		width: 210px;
		height: 117px;
	}
	.introTitle{
		max-width: 210px;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.introDate{
		font-size: 12px;
		color: #2E3E4E;
	}
</style>
