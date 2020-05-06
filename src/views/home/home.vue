<template>
  <div class="home">
    <div id="header">
      <nav-bar class="home-nav"/>
      <top-swiper class="top-swiper" :banner="banner"/>
    </div>
    <educ-dynamic :educ="educ"/>
    <fast-news :fastnews="fastnews"/>
    <student-square />
    <Teachers :teacher="teacher" :renowned="renowned"/>
    <Ranking/>
  </div>
</template>

<script>

import NavBar from './childComp/navBar/navBar'
import TopSwiper from './childComp/topSwiper'
import EducDynamic from './childComp/education/education'
import FastNews from './childComp/fastNews/fastNews'
import StudentSquare from './childComp/student/studentSquare'
import Teachers from './childComp/teachers/teachers'
import Ranking from './childComp/ranking/ranking'

export default {
  components: {
    NavBar,
    TopSwiper,
    EducDynamic,
    FastNews,
    StudentSquare,
    Teachers,
    Ranking
  },
	data () {
	  return {
			banner:[],
			educ: [],
			fastnews:[],
			teacher:[],
			renowned:[]
	  }
	},
	methods:{
		getData(){
			this.$http.get(this.$api.newDynamic.IndexPublic).then(res=>{
				var data = res.data;
				this.banner = data.cmsBanner;
				this.educ = data.teachDynamic;
				this.fastnews = data.newDynamic;
				this.teacher = data.teacherPlaza;
				this.renowned = data.renowned;
			})
		}
	},
  mounted(){
		this.getData();
  }
}
</script>

<style lang="scss">
  @import './style.scss';
</style>
