<template>
	<!-- 教育咨询 -->
	<div id="Consultation" class="shadow">
		<div class="titlebox borderbox">
			<span class="lf">教育咨询</span>
			<span class="Font16 rt cursor m20 hoverColor">更多</span>
			<ul class="Font16 Newestnav rt">
				<li v-for="(exam,index) in exams" :class="{on : currentIndex === index}" @click="handleClick(index)">{{exam.name}}</li>
			</ul>
		</div>
		<div class="Consultationbox borderbox">
			<ul>
				<li class="lf contentLf textCenter Font16 cursor">
					<div v-for="(list,index) in lists" :class="{current : listIndex === index}" @click="onClick(index)">{{list.name}}</div>
				</li>
				<li class="rt contentRt">
					<div v-for="data in datas" class="ImgText lf">
						<div class="lf"><img :src="data.image"/></div>
						<div class="rt">
							<p class="Font18 Color18">{{data.title}}</p>
							<p class="Font12 Color97 mtop12 taxtHidden">{{data.text}}</p>
						</div>
					</div>
					<div class="clear"></div>
					<ul class="mtop20">
						<li v-for="item in items" class="BoutiqueText lf">
							<span class="dot m5 lf"></span>
							<span class="Font16 Color97 lf text ellipsis hoverColor cursor">{{item.name}}</span>
						</li>
					</ul>
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
				listIndex: 0,
					exams: [
						{name: '月考'},{name: '期中'},{name: '期末'},{name: '联考'},{name: '中考'},{name: '高考'}
					],
					lists: [
						{name: '高考动态'},
						{name: '报考指南'},
						{name: '热点关注'},
						{name: '备战高考'},
						{name: '互动社区'},
						{name: '各地咨询'}
					],
					datas: [
						{image: require('assets/images/subjectList/word.png'), title: '高考干货｜高三学生在9月、10.', text: '对于大多数的高三生，可能在8月份左右就 开学。对于大多数的高三生，可能在8月份左右就 开学。对于大多数的高三生，可能在8月份左右就 开学。但是9.1正对于大多数的高三生，可 8月份左右就已经开学。但是9.1正对于大 的高三生，可能在8月份左右就已经 开学。但是9.1正对于大 的高三生，可能在8月份左右就已经 开学。'},
						{image: require('assets/images/subjectList/word.png'), title: '高考干货｜高三学生在9月、10.', text: '对于大多数的高三生，可能在8月份左右就 开学。对于大多数的高三生，可能在8月份左右就 开学。对于大多数的高三生，可能在8月份左右就 开学。但是9.1正对于大多数的高三生，可 8月份左右就已经开学。但是9.1正对于大 的高三生，可能在8月份左右就已经 开学。但是9.1正对于大 的高三生，可能在8月份左右就已经 开学。'}
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
		methods: {
		  handleClick(index){
		    this.currentIndex = index
		  },
			onClick(index){
				this.listIndex = index
			}
		}
	}
</script>

<style scoped>
	.on{
		background: #E6BE8B;
	}
	.current{
		background: #FEF1F1;
	}
	.mtop12{
		margin-top: 12px;
	}
	.mtop20{
		margin-top: 20px;
	}
	.taxtHidden{
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 5;
		overflow: hidden;
	}
	.Consultationbox{
		width: 100%;
		height: 380px;
		padding: 8px;
	}
	.contentLf{
		width: 101px;
		height: 364px;
	}
	.contentLf div{
		height: 45px;
		line-height: 45px;
	}
	.contentRt{
		width: 1083px;
		height: 364px;
		background: #FEF1F1;
	}
	.contentRt img,
	.contentRt .rt,
	.ImgText{
		height: 117px;
	}
	.contentRt img{
		width: 215px;
	}
	.contentRt .rt{
		width: 270px;
	}
	.ImgText{
		width: 501px;
		margin-left: 25px;
		margin-top: 10px;
	}
	.BoutiqueText{
		width: 280px;
		height: 16px;
		line-height: 16px;
		margin: 10px 40px;
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
