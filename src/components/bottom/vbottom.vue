<template>
  <!-- bottom -->
  <div id="bottombox">
    <div class="containerbox">
      <!-- <ul class="linkbox">
        <li class="link borderbox lf" v-for="(list,i) in lists">
          <p class="borderbox">{{list.name}}</p>
          <a v-for="(item,j) in list.items" :href="item.link" target="_blank">{{item.name}}</a>
        </li>
      </ul> -->
			<div class="link">
				<a v-for="(item,j) in lists" :href="item.link" target="_blank">{{item.title}}</a>
			</div>
      <div class="clear"></div>
      <div class="info textCenter">
        <p>版权所有：山西***公共教育科技有限公司 山西****科技有限公司 晋ICP备1******5号-2 </p>
        <p>地址：山西省**市南**街**科技园A座11层</p>
        <p>技术支持：山西****科技有限公司</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return{
        // lists:[
        //   {name: '政府网站',items:[{name:'中国政府网'},{name:'山西省教育厅'},{name:'山西省教科院'}]},
        //   {name: '教育门户',items:[{name:'网易教育'},{name:'搜狐教育'},{name:'腾讯教育'}]},
        //   {name: '资源网站',items:[{name:'中国教育资源网'},{name:'国家教育公共服务平台'},{name:'山西省教育资源网'}]},
        //   {name: '友情链接',items:[{name:'作业盒子'},{name:'山西基础教育网'},{name:'太原教育公共服务平台'}]},
        //   {name: '联系我们',items:[{name:'客服热线   3520123'},{name:'学习交流群'},{name:'书香三晋客服群'}]},
        // ]
				lists:[]
      }
    },
		mounted() {
			this.$http.get(this.$api.newDynamic.IndexPublic).then(res=>{
				var data = res.data;
				this.lists = data.links;
			})
		}
  }
</script>

<style scoped>
  #bottombox,
  .containerbox{
    overflow: hidden;
  }
  #bottombox{
    width: 100%;
    min-width: 1200px;
    height: 371px;
    background:  #2B3031;
  }
  .containerbox{
    width: 1200px;
    margin: 0 auto;
  }
  .linkbox{
    margin-top: 73px;
  }
  .link{
    width: 100%;
    padding: 0 15px;
		margin-top: 100px;
    font-size: 16px;
    color: #fff;
    text-align: left;
  }
  /* .link p{
    width:auto;
    display:inline-block;
    padding-bottom: 5px;
    border-bottom: 1px solid #35D7B7;
    margin-bottom: 20px;
  } */
  .link a{
		display: inline-block;
		width: 20%;
    margin-bottom: 5px;
		color: #fff;
  }
  .info{
    margin-top: 84px;
    font-size: 12px;
    color: #fff;
  }
  .info p{
    margin-bottom: 5px;
  }
</style>
