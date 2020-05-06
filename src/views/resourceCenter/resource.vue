<template>
  <!-- 资源中心 -->
  <div>
    <!-- content -->
    <div class="contentBox">
      <!-- 学科列表 -->
      <subjectList></subjectList>
			<!-- 最新最热 -->
			<Newest></Newest>
			<!-- 精品资源 -->
			<Boutique></Boutique>
			<!-- 名校资源 -->
			<schools></schools>
			<!-- 中高考 -->
			<exam></exam>
			<!-- 精彩视频 -->
			<WonderfulVideo></WonderfulVideo>
			<!-- 教育咨询 -->
			<Consultation></Consultation>
			<!-- 合作校风采 -->
			<cooperation></cooperation>
    </div>
  </div>
</template>

<script>
	import vheader from 'components/header/vheader.vue'
  import vbottom from 'components/bottom/vbottom.vue'
  import subjectList from './childPage/subjectList.vue'
	import Newest from './childPage/Newest.vue'
	import Boutique from './childPage/Boutique.vue'
	import schools from './childPage/schools.vue'
	import exam from './childPage/exam.vue'
	import WonderfulVideo from './childPage/WonderfulVideo.vue'
	import Consultation from './childPage/Consultation.vue'
	import cooperation from 'components/partner/partner.vue'
	export default {
    components:{
      vheader,
      vbottom,
      subjectList,
			Newest,
			Boutique,
			schools,
			exam,
			WonderfulVideo,
			Consultation,
			cooperation
    }
	}
</script>

<style>
.contentBox{
  width: 1200px;
  height: auto;
  overflow: hidden;
  margin: 0 auto;
}
.m5 {
	margin: 5px;
}
.m20{
	margin: 0px 20px;
}
.pad5 {
	padding: 0 5px;
}
.Font14 {
	font-size: 14px;
}
.Font16 {
	font-size: 16px;
}
.Font12{
	font-size: 12px;
}
.Font18{
	font-size: 18px;
}
.bgF17{
	background: #F17779;
}
.Color18 {
	color: #181818;
}
.ColorF17{
	color: #F17779;
}
.Color97{
	color:  #979797;
}
.ellipsis {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.shadow{
	box-shadow: 0px 3px 7px 0px rgba(169,169,169,0.21);
}
#Newest .titlebox,
#schools .titlebox,
#WonderfulVideo .titlebox,
#cooperation .titlebox{
	background:  #6EAED4;
}

#Boutique .titlebox,
#exam .titlebox,
#Consultation .titlebox{
	background:  #F17779;
}
#Newest,
#Boutique,
#schools,
#exam,
#WonderfulVideo,
#Consultation,
#cooperation{
	width: 100%;
	height: 460px;
	background: #fff;
	margin: 15px 0px;
}
.titlebox{
	width: 100%;
	height: 80px;
	line-height: 80px;
	font-size: 23px;
	color: #fff;
	padding: 0 15px;
}
.Newestbox,
.Boutiquebox{
	width: 100%;
	height: 380px;
	padding: 17px 10px;
}
.Newestnav li{
	float: left;
	font-size: 16px;
	padding: 0 25px;
	cursor: pointer;
	box-shadow: borderbox;
}
/* .Newestnav li:hover{
	background: #E6BE8B;
} */
.NewestnavBg{
	background: #E6BE8B;
}
.hoverColor:hover{
	color: #0080FF;
}
</style>
