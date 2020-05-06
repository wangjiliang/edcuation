<template>
	<!-- 学科列表 -->
	<div id="subjectBox" class="borderbox">
		<ul class="gradelist">
			<li v-for="(list,index) in grade" :key="list.name" class="lf" @click="GradeGo(index)">{{list.name}}</li>
		</ul>
	</div>
</template>

<script>
import { mapState , mapMutations } from 'vuex'
export default {
	props:['subjectIndex'],
	data() {
		return {
		}
	},
	computed: {
	  ...mapState(['grade'])
	},
	methods:{
		...mapMutations(['SET_CRUMB_SEC','SET_NAV_PATH']),
		// 通过学科年级跳转列表
		GradeGo(index){
			this.SET_CRUMB_SEC("资源中心")
			this.SET_NAV_PATH("/lesson")
			this.$router.push({
				name:"lesson",
				params:{
					subjectIndex: this.subjectIndex,
					gradeIndex:index
				}
			});
		}
	}
}
</script>

<style scoped>
#subjectBox{
	width: 987px;
	height: 710px;
	position: absolute;
	z-index: 3;
	top: 50px;
	left: 201px;
	background:rgba(255,255,255,1);
	border:1px solid rgba(63,189,212,1);
	/* border-left: none; */
	padding: 27px;
}
.gradelist li{
	font-size: 16px;
	color: #464646;
	margin: 6px;
}
</style>
