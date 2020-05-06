<template>
	<!-- 名校资源 -->
	<div id="schools" class="shadow">
		<div class="titlebox borderbox">
			<span class="lf">名校资源</span>
			<span class="rt Font16 m20 cursor hoverColor">更多</span>
			<ul class="Font16 Newestnav rt">
				<li v-for="(data,index) in datas" class="base" :class="{on : currentIndex === index}" @click="handleClick(index)">{{data.name}}</li>
			</ul>
		</div>
		<div class="Boutiquebox borderbox">
			<ul>
				<li class="schoolbox lf" v-for="list in lists">
					<div class="schoolTop"><img :src="list.url" class="schoolimg"/></div>
					<div class="schoolBot textCenter borderbox">
						<p class="Font16">{{list.name}}</p>
						<p class="Font14">{{list.number}}份</p>
					</div>
				</li>
			</ul>
			<ul class="mtop15">
				<li v-for="Newest in Newests" class="Newestli lf">
					<img :src="Newest.img" alt="">
					<span class="Font16 Color18 NewestText ellipsis cursor hoverColor">{{Newest.text}}</span>
					<span class="Font16 ColorF17">{{Newest.time}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 0,
					datas: [
						{name: '苏'},
						{name: '沪'},
						{name: '粤'},
						{name: '鲁'},
						{name: '浙'},
						{name: '京'},
						{name: '湘'},
						{name: '闽'},
						{name: '皖'},
						{name: '鄂'}
					],
					lists: [
						{ulr: require('assets/images/subjectList/word.png'), name: '启东中学', number: '888'},
						{ulr: require('assets/images/subjectList/word.png'), name: '启东中学', number: '888'},
						{ulr: require('assets/images/subjectList/word.png'), name: '启东中学', number: '888'},
						{ulr: require('assets/images/subjectList/word.png'), name: '启东中学', number: '888'},
						{ulr: require('assets/images/subjectList/word.png'), name: '启东中学', number: '888'},
						{ulr: require('assets/images/subjectList/word.png'), name: '启东中学', number: '888'},
						{ulr: require('assets/images/subjectList/word.png'), name: '启东中学', number: '888'},
						{ulr: require('assets/images/subjectList/word.png'), name: '启东中学', number: '888'},
					],
					Newests: [
						{img: require('assets/images/subjectList/word.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'},
						{img: require('assets/images/subjectList/ppt.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'},
						{img: require('assets/images/subjectList/word.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'},
						{img: require('assets/images/subjectList/ppt.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'},
						{img: require('assets/images/subjectList/word.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'},
						{img: require('assets/images/subjectList/ppt.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'},
						{img: require('assets/images/subjectList/word.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'},
						{img: require('assets/images/subjectList/ppt.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'}
					]
				}
		},
		methods: {
		  handleClick(index){
		    this.currentIndex = index
		  }
		}
	}
</script>

<style scoped>
	ul{
		overflow: hidden;
	}
	.base:hover {
		background: #e6be8b;
	}
	.mtop15{
		margin-top: 15px;
	}
	.on{
		background: #E6BE8B;
	}
	.schoolbox{
		width: 142px;
		height: 158px;
		background: pink;
		margin-right: 6px;
	}
	.schoolbox:last-child{
		margin-right: 0px;
	}
	.schoolTop{
		width: 100%;
		height: 112px;
		line-height: 112px;
		background: #DCDCDC;
	}
	.schoolimg{
		width: 87px;
		height: 87px;
		border-radius: 50%;
		background: #fff;
		margin-left: 27.5px;
	}
	.schoolBot{
		width: 100%;
		height: 46px;
		color: #fff;
		background: #6EAED4;
		padding: 3px;
	}
	.Newestli{
		width: 575px;
		height: 16px;
		line-height: 16px;
		margin: 13.5px 5px;
	}
	.Newestli img,
	.Newestli span{
		display: inline-block;
	}
	.Newestli img{
		width: 16px;
		height: 16px;
		margin-top: -7px;
	}
	.NewestText{
		width: 490px;
		margin: 0px 10px;
	}
</style>
