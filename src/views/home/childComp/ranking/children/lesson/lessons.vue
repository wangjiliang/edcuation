<template>
  <div class="lessons">
    <div class="head">
      <div class="title">微课排行榜</div>
      <ul class="list">
        <li class="list-item" :class="{on : currentIndex === index}"
          @click="handleClick(index,item)"
          v-for="(item, index) in types" :key="item.type">
          {{item.text}}
        </li>
				<li class="list-item cursor" @click="go('微课中心','/lesson')">更多</li>
      </ul>
    </div>
    <div class="content">
      <ul class="top">
        <li class="top-item" v-for="(item, index) in list" :key="item.id" @click="goDetails(item.title,item.id)" v-if="curChangeTab<3?true:false">
          <span class="serial">{{index + 1}}</span>
          <img :src="baseUrl+item.img" alt="">
          <div>
            <p class="title ellipsis">{{item.title}}</p>
            <span class="views">评论数：{{item.viewCount}}</span>
            <span class="views">时间：{{basedata.timeShift(Number(item.startTime))}}</span>
          </div>
        </li>
		<li class="top-item" v-for="(item, index) in list" :key="item.id" @click="go('教学专区','/list')" v-if="curChangeTab==3?true:false">
		  <span class="serial">{{index + 1}}</span>
		  <img :src="baseUrl+item.headUrl" alt="">
		  <div>
		    <p class="title ellipsis">{{item.name}}</p>
		    <span class="views">上传量：{{item.uploadCount}}</span>
		  </div>
		</li>
      </ul>
      <ul class="bottom">
        <li class="bottom-item" v-for="(item, index) in list2" :key="item.id" @click="goDetails(item.title,item.id)" v-if="curChangeTab<3?true:false">
          <span class="serial">{{index + 4}}</span>
		  <span class="title ellipsis">{{item.title}}</span>
          <span class="views" v-if="curChangeTab==1?true:false">评论数：{{item.reviewCount}}</span>
          <span class="views" v-else>时间:{{basedata.timeShift(Number(item.startTime))}}</span>
        </li>
		<li class="bottom-item" v-for="(item, index) in list2" :key="item.id" @click="go('教学专区','/list')" v-if="curChangeTab==3?true:false">
		  <span class="serial">{{index + 4}}</span>
		  <span class="title ellipsis">{{item.name}}</span>
		  <span class="views">上传量：{{item.uploadCount}}</span>
		</li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapMutations } from 'vuex'
export default {
  data () {
    return {
      types: [
        {type: 1, text: "按评论数排行"},
        {type: 2, text: "按时间排行"},
        {type: 3, text: "按教师上传量排序"},
      ],
		curChangeTab:1,
        currentIndex: 0,
      list: [],
      list2: []
    }
  },
	mounted() {
		this.getData()
	},
  methods: {
	  ...mapMutations(['SET_CRUMB_SEC','SET_NAV_PATH','SET_DETAIL_TITLE','SET_DETAIL_PATH']),
    handleClick(index,item){
      this.currentIndex = index
			this.curChangeTab=item.type
			if(this.curChangeTab!==5){
				this.getData()
			}
    },
		getData(){
			if(this.curChangeTab==3){
				this.$http.get(this.$api.newDynamic.resTeacherRank, this.params).then(res => {
					this.list=res.data.slice(0,3)
					this.list2=res.data.slice(3)
				});
			}else{
				this.$http.get(this.$api.newDynamic.lessonRank,{sort:this.curChangeTab}).then(res=>{
					this.list=res.data.slice(0,3)
					this.list2=res.data.slice(3)
				})
			}
			
		},
		go(name,path){
			this.SET_CRUMB_SEC(name)
			this.SET_NAV_PATH(path)
			this.$router.push(path)
		},
		goDetails(title,curId){
			var params={
				id: curId,
			}
			this.$http.get(this.$api.pdf.url,params).then(res=>{
				if(res.msg=="成功"){
					this.SET_CRUMB_SEC("微课中心")
					this.SET_NAV_PATH("/lesson")
					this.SET_DETAIL_TITLE(title)
					this.SET_DETAIL_PATH("/PDFdetails")
					this.$router.push({
						name:"PDFdetails",
						query:{
							curId: curId,
							pdfUrl: res.data,
						}
					});
				}else{
					this.$message.error("该资源不支持预览");
				}
			})
		}
  }
}
</script>

<style lang="scss" scoped>
 @import '../../style.scss';
 @import './style.scss';
</style>
