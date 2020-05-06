<template>
  <div class="partner">
    <div class="head">
      <div class="title">名校风采</div>
      <div class="desc cursor" @click="go">更多</div>
    </div>
    <div class="container">
      <div class="box">
				<div class="leftbox borderbox">
					<p class="text">
						国运兴衰，系于教育；教育振兴，全民有责；薪火相传，在于学校。我们必须全面贯彻党的教育方针，坚持教育为社会主义为人民服务，坚持教育与社会实践相结合，以提高国民素质为根本宗旨，以培养学生的创新精神和实践能力为重点，努力造就“有理想、有道德、有文化、有纪律”的，德育、智育、体育、美育等全面发展的社会主义事业建设者和接班人。
					</p>
				</div>
        <div class="center">
          <div class="item" :class="{mb10: index == 0 || index == 1}" v-for="(item, index) in schools" :key="item.id">
            <img :src="baseUrl+item.img" alt="">
            <div class="desc">{{item.title}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
	import { mapMutations } from 'vuex'
export default {
	mounted(){
		this.getData()
	},
  data () {
    return {
      schools: [],
    }
  },
	methods:{
		...mapMutations(['SET_CRUMB_SEC','SET_NAV_PATH']),
		getData(){
			this.$http.get(this.$api.newDynamic.IndexPublic).then(res=>{
				this.schools=res.data.schoolMien
			})
		},
		go(){
			this.SET_CRUMB_SEC('资讯中心')
			this.SET_NAV_PATH('/news')
			this.$router.push({
				name:"news",
				query:{
					index: 2,
				}
			});
		}
	}
}
</script>

<style lang="scss" scoped>
  @import './style.scss'
</style>
