<template>
	<!-- 最新最热 -->
	<!-- 最新最热 -->
	<div id="Newest" class="shadow">
		<div class="titlebox borderbox">
			<span class="lf">最新最热</span>
			<span class="Font16 rt cursor m20 hoverColor">更多</span>
			<span class="Font16 rt cursor m20" @click="OnChange">换一批</span>
			<ul class="Font16 Newestnav rt">
				<!-- <li id="first" @click="bghover('first')">同步备课</li> -->
				<!-- <li>|</li> -->
				<li v-for="(exam,index) in exams"  :class="{on: currentIndex==index , base: (index != 1) && (index != exams.length-2)}" @click="on(index)">{{ exam.name }}</li>
				<!-- <li>|</li> -->
				<!-- <li id="last" @click="bghover('last')">知识点</li> -->
			</ul>
		</div>
		<div class="Newestbox borderbox">
			<ul>
				<li v-for="Newest in Newests" class="Newestli lf">
					<img :src="Newest.img" alt="" />
					<span class="Font16 Color18 NewestText ellipsis cursor hoverColor">{{ Newest.text }}</span>
					<span class="Font16 ColorF17">{{ Newest.time }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			currentIndex: '',
			exams: [
				{name: '月考'},{name: '期中'},{name: '期末'},{name: '联考'},{name: '中考'},{name: '高考'}
			],
			Newests: [
				{img: require('assets/images/subjectList/word.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'},
				{img: require('assets/images/subjectList/ppt.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'},
				{img: require('assets/images/subjectList/word.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'},
				{img: require('assets/images/subjectList/ppt.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'},
				{img: require('assets/images/subjectList/word.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'},
				{img: require('assets/images/subjectList/ppt.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'},
				{img: require('assets/images/subjectList/word.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'},
				{img: require('assets/images/subjectList/ppt.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'},
				{img: require('assets/images/subjectList/word.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'},
				{img: require('assets/images/subjectList/ppt.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'},
				{img: require('assets/images/subjectList/word.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'},
				{img: require('assets/images/subjectList/ppt.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'},
				{img: require('assets/images/subjectList/word.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'},
				{img: require('assets/images/subjectList/ppt.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'},
				{img: require('assets/images/subjectList/word.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'},
				{img: require('assets/images/subjectList/ppt.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-25'},
				// {img: require('assets/images/subjectList/word.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-28'},
				// {img: require('assets/images/subjectList/ppt.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-28'},
				// {img: require('assets/images/subjectList/word.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-28'},
				// {img: require('assets/images/subjectList/ppt.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-28'},
				// {img: require('assets/images/subjectList/word.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-28'},
				// {img: require('assets/images/subjectList/ppt.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-28'},
				// {img: require('assets/images/subjectList/word.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-28'},
				// {img: require('assets/images/subjectList/ppt.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-28'},
				// {img: require('assets/images/subjectList/word.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-28'},
				// {img: require('assets/images/subjectList/ppt.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-28'},
				// {img: require('assets/images/subjectList/word.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-28'},
				// {img: require('assets/images/subjectList/ppt.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-28'},
				// {img: require('assets/images/subjectList/word.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-28'},
				// {img: require('assets/images/subjectList/ppt.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-28'},
				// {img: require('assets/images/subjectList/word.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-28'},
				// {img: require('assets/images/subjectList/ppt.png'), text: '上海市鲁迅中学高三数学复习课件：任意角和弧度制及任意任意角和弧度制及任意', time:'09-28'}
			],
		}
	},
	mounted(){
		this.exams.unshift({name: '同步课堂'},{name: '|'});
		this.exams.push({name: '|'},{name: '知识点'});
	},
	methods:{
		// bghover(id){
		// 	var bg=document.getElementById(id);
		// 	var parent=document.getElementById(id).parentNode;
		// 	var child=parent.childNodes;
		// 	console.log(child)
		// 	if(bg.classList.contains('on')){
		// 	  return
		// 	}else{
		// 		bg.setAttribute("class","on");
		// 		for(var i =0;i<child.length;i++){
		// 			if (child[i] !== bg) {
		// 				child[i].classList.remove("on");
		// 			}
		// 		}
		// 	}
		// },
		on(index){
			if(!(index==1 || index==this.exams.length-2)){
				this.currentIndex=index;
			}
			// var first=document.getElementById('first');
			// var last=document.getElementById('last');
			// first.classList.remove("on");
			// last.classList.remove("on");
		},
		OnChange() {

		}
	}
}
</script>

<style scoped>
.Newestnav li {
	padding: 0 12px !important;
}
.on {
	background: #e6be8b;
}
.base:hover {
	background: #e6be8b;
}
.NewestnavBg {
	background: #e6be8b;
}
.Newestli {
	width: 575px;
	height: 16px;
	line-height: 16px;
	margin: 13.5px 5px;
}
.Newestli img,
.Newestli span {
	display: inline-block;
}
.Newestli img {
	width: 16px;
	height: 16px;
	margin-top: -7px;
}
.NewestText {
	width: 490px;
	margin: 0px 10px;
}
</style>
