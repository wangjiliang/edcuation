<template>
	<!-- 中高考 -->
	<div id="exam" class="shadow">
		<div class="titlebox borderbox">
			<span class="lf">中高考</span>
			<span class="rt Font16 m20 cursor hoverColor">更多</span>
			<ul class="Font16 Newestnav rt">
				<li v-for="(list,index) in lists" class="base" :class="{on: currentIndex==index}" @click="on(index)">{{list.name}}</li>
			</ul>
			<span class="rt Font16">科目：</span>
			<ul class="m20 rt">
				<li v-for="(item,index) in items" class="lf borderbox Font16 grade textCenter base cursor" :class="{bgColor: currentIndex01==index}" @click="onSelect(index)">{{item.name}}</li>
			</ul>
		</div>
		<div class="exambox">
			<div class="examboxlf lf borderbox">
				<div class="lf"><img src="" class="imagesSize"/></div>
				<ul class="rt examtext borderbox">
					<li v-for="Newest in Newests" class="Newestli lf">
						<span class="Color9">高考</span>
						<span class="Font16 Color18 NewestText ellipsis cursor hoverColor">{{Newest.text}}</span>
						<span class="Font16 ColorF17">{{Newest.time}}</span>
					</li>
				</ul>
			</div>
			<div class="examboxrt rt borderbox">
				<ul>
					<li class="title Font16">历年真题</li>
					<li v-for="time in times" class="info lf Font16 Color18 cursor hoverColor">{{time.time}}</li>
					<li class="clear"></li>
					<li class="title Font16">猜你在找</li>
					<li v-for="data in datas" class="info lf Font16 Color18 cursor hoverColor">{{data.name}}</li>
					<li class="clear"></li>
					<li class="title Font16">高考工具箱</li>
					<li v-for="list in lists" class="info lf Font16 Color18 cursor hoverColor">{{list.name}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
					currentIndex: 0,
					currentIndex01: 0,
					lists: [
						{name: '语文'},{name: '数学'},{name: '英语'},{name: '物理'},{name: '生物'},{name: '化学'}
					],
					Newests: [
						{text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'},
						{text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'},
						{text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'},
						{text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'},
						{text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'},
						{text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'},
						{text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'},
						{text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'}
					],
					items: [
						{name: '中考'},
						{name: '高考'}
					],
					times: [
						{time:'2019'},{time:'2018'},{time:'2017'},{time:'2016'},{time:'2015'},{time:'2014'}
					],
					datas: [
						{name:'高考真题'}
					],
					lists: [
						{name:'高考真题'},
						{name:'高考真题'},
						{name:'高考真题'}
					]
				}
		},
		methods:{
			on(index){
				this.currentIndex=index;
			},
			onSelect(index){
				this.currentIndex01=index;
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
	.Color9{
		color: #999999;
	}
	.examtext{
		width: 608px;
		padding: 0px 10px;
	}
	.grade{
		width: 69px;
		height: 32px;
		line-height: 32px;
		margin-right: 20px;
		margin-top: 24px;
		border-radius:10px;
	}
	.bgColor{
		background: #E6BE8B;
	}
	.exambox{
		width: 100%;
		height: 380px;
	}
	.examboxlf{
		width: 876px;
		height: 100%;
		padding: 17px 10px;
	}
	.imagesSize{
		width:248px;
		height:307px;
		background: pink;
		margin-top: 19.5px;
	}
	.Newestli{
		height: 16px;
		line-height: 16px;
		margin-top: 24.5px;
	}
	.Newestli:first-child{
		margin-top: 21px;
	}
	.Newestli span{
		display: inline-block;
	}
	.NewestText{
		width: 490px;
		margin: 0px 10px;
	}
	.examboxrt{
		width: 324px;
		height: 100%;
		background: #faf2eb;
		padding: 0px 17px;
	}
	.title{
		color: #F17779;
		margin: 35px 0 10px 0;
	}
	.info{
		margin-top: 5px;
		margin-right: 15px;
	}
</style>
