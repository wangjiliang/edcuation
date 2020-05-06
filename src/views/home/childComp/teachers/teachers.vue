<template>
  <div id="teachers">
    <div class="topic">
      <p>教师专区</p>
      <span>Education dynamic</span>
      <div class="line"></div>
    </div>
    <div class="teachers-main">
      <div class="top">
        <div class="teacher cursor" v-for="(item,index) in teacher" :key="index" @click="golist(item.id,item.uploadCount,item.name)">
          <div class="icon">
            <img :src="baseUrl+item.headUrl" alt="">
            <div class="info">
              <h3>{{item.name}}</h3>
              <p>{{item.schoolName}}</p>
              <p>上传资源：{{item.uploadCount}}</p>
            </div>
          </div>
          <div class="content">
            {{item.intro}}
          </div>
        </div>
      </div>
      <div class="bottom">
				<div class="excellent"><p>优秀教师空间</p></div>
				<div class="teacherlist cursor" v-for="icon in renowned">
					<div class="textCenter borderbox">
						<p>{{icon.name}}</p>
					</div>
					<img :src="baseUrl+icon.headUrl" alt="" :key="icon.id" @click="golist(icon.id,icon.uploadCount,item.name)"/>
				</div>
      </div>
    </div>
  </div>
</template>

<script scoped>
	import { mapMutations } from 'vuex'
export default {
  data() {
    return {
    }
  },
	props:{
		teacher:Array,
		renowned:Array,
	},
	methods:{
		...mapMutations(['SET_CRUMB_SEC','SET_NAV_PATH']),
		golist(id,upload,name){
			this.SET_CRUMB_SEC(name)
			this.SET_NAV_PATH('/list')
			if(upload!=0){
				this.$router.push({
					name:"list",
					query:{
						id:id
					}
				})
			}else{
				this.$message.warning("资源上传中，敬请期待。");
			}
		},
	}
}
</script>

<style lang="scss" scoped>
  @import './style.scss'
</style>
