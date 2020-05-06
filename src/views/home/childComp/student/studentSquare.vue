<template>
  <div class="students">
    <div class="topic">
      <p>学生广场</p>
      <span>Student square</span>
      <div class="line"></div>
      <span class="more cursor" @click="go()">MORE</span>
    </div>
    <div class="students-main">
      <div class="top">
        <div class="left">
          <div style="margin-top: 10px;">
            <span class="fs24">爱阅读 </span>
            <span class="fs16"> DISCUSSION</span>
          </div>
        </div>
        <div class="right">
          <div class="item" :class="{ 'active':schoolId == item.id}" v-for="item in school"
            @click="clickHandler(item.id)"
           :key="item.id">
            {{item.name}}
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="container">
          <div class="bottom-item cursor" v-for="(item,index) in lists" :key="item.id" @click="goDetail(item.id,item.title)">
            <img :src="baseUrl+item.img" alt="" />
            <div>
              <p>{{item.title}}</p>
              <p>{{item.author}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
	import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      school:[],
      schoolId: 1,
			lists:[]
    }
  },
	mounted(){
		this.getPeriod()
	},
  methods:{
	  ...mapMutations(['SET_CRUMB_SEC','SET_NAV_PATH','SET_DETAIL_TITLE','SET_DETAIL_PATH']),
		go(){
			this.SET_CRUMB_SEC('资讯中心')
			this.SET_NAV_PATH('/news')
			this.$router.push({
				name:"news",
				query:{
					index: 1,
				}
			});
		},
		goDetail(data,title){
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
		},
		clickHandler(id) {
		  this.schoolId = id
				this.getData()
		},
		getPeriod(){
			this.$http.get(this.$api.newDynamic.studentPlazaCmsCategory).then(res=>{
				this.school=res.data
				this.schoolId=res.data[0].id
				this.getData()
			})
		},
		getData(){
			this.$http.get(this.$api.newDynamic.studentList,{periodId:this.schoolId}).then(res=>{
				this.lists=res.data
				// console.log(res.data)
			})
		}
  }
}
</script>

<style lang="scss" scoped>
  @import './student.scss'
</style>>
