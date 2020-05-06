<template>
	<!-- 精彩视频 -->
	<div id="WonderfulVideo" class="shadow">
		<div class="titlebox borderbox">
			<span class="lf">精彩视频</span>
			<span class="rt Font16 m20 cursor hoverColor">更多</span>
			<span class="rt Font16">猜你喜欢： 部编版同步课堂 学易精品课系列</span>
		</div>
		<div class="lf VideoShow ColorF18">
			<div class="videobox"></div>
			<p class="ellipsis Font18 mtop15">上海市鲁迅中学高三数学复习课件上海市鲁迅中学高三数学复习课件</p>
			<p class="mtop20">
				<span class="lf Font16 Color97">播放量：340次</span>
				<span class="rt ColorF17 Font16 hoverColor cursor">查看全部</span>
			</p>
		</div>
		<ul class="lf VideoList">
			<li v-for="list in lists" class="lf">
				<div class="videoSize"></div>
				<p class="ellipsis Font12 mtop8">{{list.title}}</p>
				<p class="mtop8">
					<span class="lf Font12 Color97">播放量：{{list.number}}次</span>
					<span class="rt ColorF17 Font12 hoverColor cursor">查看全部</span>
				</p>
			</li>
		</ul>
		<ul class="lf VideoInfo">
			<li v-for="(item,index) in items" class="cursor" :class="{bgColor : currentIndex === index}" @mouseenter="enter(index)">
				<div class="numberbox textCenter lf">{{index + 1}}</div>
				<span class="ellipsis Font14 lf">{{item.name}}</span>
				<div class="clear"></div>
				<div class="videoSmall" v-show="state&&index==currentIndex">

				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
					currentIndex: 0,
					state: true,
					lists: [
						{title: '上海市鲁迅中学高三数学复习课件上海市鲁迅中学高三数学复习课件', number: '340'},
						{title: '上海市鲁迅中学高三数学复习课件上海市鲁迅中学高三数学复习课件', number: '340'},
						{title: '上海市鲁迅中学高三数学复习课件上海市鲁迅中学高三数学复习课件', number: '340'},
						{title: '上海市鲁迅中学高三数学复习课件上海市鲁迅中学高三数学复习课件', number: '340'},
						{title: '上海市鲁迅中学高三数学复习课件上海市鲁迅中学高三数学复习课件', number: '340'},
						{title: '上海市鲁迅中学高三数学复习课件上海市鲁迅中学高三数学复习课件', number: '340'}
					],
					items: [
						{name: '上海市鲁迅中学高三数上海市鲁迅中学高三数', video: ''},
						{name: '上海市鲁迅中学高三数上海市鲁迅中学高三数', video: ''},
						{name: '上海市鲁迅中学高三数上海市鲁迅中学高三数', video: ''},
						{name: '上海市鲁迅中学高三数上海市鲁迅中学高三数', video: ''},
						{name: '上海市鲁迅中学高三数上海市鲁迅中学高三数', video: ''},
						{name: '上海市鲁迅中学高三数上海市鲁迅中学高三数', video: ''},
						{name: '上海市鲁迅中学高三数上海市鲁迅中学高三数', video: ''},
						{name: '上海市鲁迅中学高三数上海市鲁迅中学高三数', video: ''}
					],
				}
		},
		methods:{
			enter(index){
				this.state = true;
				this.currentIndex = index;
			},
			getData(){
				
			}
		}
	}
</script>

<style scoped>
	.mtop15{
		margin-top: 15px;
	}
	.mtop20{
		margin-top: 20px;
	}
	.mtop8{
		margin-top: 8px;
	}
	.bgColor{
		background: #E2EFF6;
	}
	.bgColor .numberbox{
		background: #6EAED4;
	}
	.VideoShow{
		width: 359px;
		margin: 15px 8px 15px 10px;
	}
	.videobox{
		width: 359px;
		height: 270px;
		background: pink;
	}
	.VideoList{
		width: 600px;
	}
	.VideoList li{
		width: 192px;
		height: 166px;
		margin-right: 8px;
		margin-top: 15px;
	}
	.videoSize{
		width: 100%;
		height: 120px;
		background: #eee;
	}
	.VideoInfo{
		width: 210px;
		height: 350px;
		margin: 15px 10px 15px 0px;
	}
	.VideoInfo li{
		overflow: hidden;
		margin-bottom: 15px;
	}
	.VideoInfo li:nth-child(8){
		margin-bottom: 0px;
	}
	.VideoInfo span{
		width: 164px;
		margin-left: 15px;
	}
	.numberbox{
		display: block;
		width: 19px;
		height: 19px;
		line-height: 19px;
		color: #fff;
		background: #F17779;
	}
	.videoSmall{
		width: 200px;
		height: 70px;
		background: pink;
		margin: 10px auto;
	}
</style>
