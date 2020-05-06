<template>
  <div class="edu-dynamic">
    <div class="topic">
      <p>教育动态</p>
      <span>Education dynamics</span>
      <div class="line"></div>
      <span class="more cursor" @click="go('资讯中心','/news')">MORE</span>
    </div>
    <div class="edu-content">
      <div class="content-left cursor" v-if="educ[0]" @click="toDetail(educ[0].body,educ[0].title)">
        <div class="left-pic">
          <img :src="baseUrl+educ[0].img" alt="">
        </div>
        <div class="left-text">
          <p class="ellipsis">{{educ[0].title}}</p>
          <span class="textclip">{{educ[0].remark}}</span>
        </div>
      </div>
      <div class="content-right">
        <div class="right-item cursor" v-for="item in educ.slice(1)" :key="item.id" @click="toDetail(item.body,item.title)">
          <div class="right-pic">
            <img :src="baseUrl+item.img" alt="">
            <!-- <img :src="item.img" alt=""> -->
          </div>
          <div class="right-item-text">
            <p class="ellipsis">{{item.title}}</p>
            <span> {{item.remark}} </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
	import {mapMutations } from 'vuex'
export default {
  data () {
    return {

    }
  },
	props:{
		educ:Array
	},
	methods:{
		...mapMutations(['SET_CRUMB_SEC','SET_NAV_PATH','SET_DETAIL_TITLE','SET_DETAIL_PATH']),
		go(name,path){
			this.SET_CRUMB_SEC(name)
			this.SET_NAV_PATH(path)
			this.$router.push("/news");
		},
		toDetail(data,title){
			if(data==""){
				this.$message.error("该资源不支持预览");
			}else{
				this.SET_CRUMB_SEC("资讯中心")
				this.SET_NAV_PATH("/news")
				this.SET_DETAIL_TITLE(title)
				this.SET_DETAIL_PATH("/newsDetail")
				this.$router.push({
					name:'newsDetail',
					query:{
						body: data,
						index:0
					}
				});
			}
		}
	}
}
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>
