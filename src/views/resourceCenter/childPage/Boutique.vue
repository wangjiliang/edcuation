<template>
	<!-- 精品资源 -->
	<div id="Boutique" class="shadow">
		<div class="titlebox borderbox">
			<span class="lf">精品资源</span>
			<span class="rt Font16 m20 cursor hoverColor">更多</span>
			<ul class="Font16 Newestnav rt">
				<!-- <li>全部</li> -->
				<li v-for="(data,index) in datas" class="base" :class="{on: currentIndex==index}" @click="on(index)">{{data.name}}</li>
			</ul>
		</div>
		<div class="Boutiquebox borderbox">
			<div class="lf"><img src="" class="imagesSize"/></div>
			<div class="rt borderbox BoutiqueRt">
				<ul>
					<li v-for="list in lists" class="lf"><img :src="list.url" class="imagesLi"/></li>
				</ul>
				<div class="clear"></div>
				<ul>
					<li v-for="item in items" class="BoutiqueText lf">
						<span class="dot m5 lf"></span>
						<span class="Font16 Color18 lf text ellipsis hoverColor cursor">{{item.name}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: '',
					datas: [
						{name: '语文'},
						{name: '数学'},
						{name: '英语'},
						{name: '物理'},
						{name: '化学'},
						{name: '生物'},
						{name: '政治'},
						{name: '历史'},
						{name: '地理'}
					],
					lists: [
						{url:''},{url:''},{url:''},{url:''},{url:''},{url:''},{url:''}
					],
					items: [
						{name:'《备战2020年中考真题分类汇编》'},
						{name:'《备战2020年中考真题分类汇编》'},
						{name:'《备战2020年中考真题分类汇编》'},
						{name:'《备战2020年中考真题分类汇编》'},
						{name:'《备战2020年中考真题分类汇编》'},
						{name:'《备战2020年中考真题分类汇编》'},
						{name:'《备战2020年中考真题分类汇编》'},
						{name:'《备战2020年中考真题分类汇编》'},
						{name:'《备战2020年中考真题分类汇编》'},
						{name:'《备战2020年中考真题分类汇编》'},
						{name:'《备战2020年中考真题分类汇编》'},
						{name:'《备战2020年中考真题分类汇编》'},
						{name:'《备战2020年中考真题分类汇编》'},
						{name:'《备战2020年中考真题分类汇编》'},
						{name:'《备战2020年中考真题分类汇编》'},
						{name:'《备战2020年中考真题分类汇编》'},
						{name:'《备战2020年中考真题分类汇编》'},
						{name:'《备战2020年中考真题分类汇编》'}
					]
				}
		},
		mounted() {
			this.datas.unshift({name: '	全部'});
		},
		methods:{
			on(index){
				// if(!(index==1 || index==this.datas.length-2)){
					this.currentIndex=index;
				// }
			}
		}
	}
</script>

<style scoped>
	.on {
		background: #e6be8b;
	}
	.base:hover {
		background: #e6be8b;
	}
	.imagesSize{
		width:248px;
		height:307px;
		background: pink;
		margin-top: 19.5px;
	}
	.imagesLi{
		width: 70px;
		height: 90px;
		background: pink;
		margin: 20px 30.5px;
	}
	.BoutiqueRt{
		width: 918px;
		height: 100%;
		overflow: hidden;
	}
	.BoutiqueText{
		width: 266px;
		height: 16px;
		line-height: 16px;
		margin: 10px 20px;
	}
	.dot{
		width:6px;
		height:6px;
		border-radius: 50%;
		background: #B5B5B5;
	}
	.text{
		width: 250px;
		height: 16px;
	}
</style>
