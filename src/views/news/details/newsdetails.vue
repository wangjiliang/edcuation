<template>
	<!-- PDF详情 -->
	<div id="pdfBox">
		<div class="pdfNav">
			<breadcrumbNav></breadcrumbNav>
		</div>
		<div id="content"></div>
	</div>
</template>

<script scoped>
import breadcrumbNav from 'components/Breadcrumb/Breadcrumb.vue'
export default {
	components:{
	  breadcrumbNav
	},
	mounted(){
		document.getElementById("content").innerHTML=this.$route.query.body
	},
	data() {
		return {
	};
  },
}
</script>

<style scoped>
/* @import './style.css'; */
.ellipsis {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.pdfNav{
	margin: 15px 0px;
}
#pdfBox{
	width: 1200px;
	margin: 0 auto;
}
#content{
	min-height: 250px;
	padding: 20px 144px;
	background: #fff;
	margin-bottom: 20px;
}
/* .pdfTitle,
.pdfDetails,
.commentBox{
	background: #fff;
	border-radius:5px;
}
.pdfTitle{
	height: 103px;
	line-height: 103px;
}
.pdfTitle img{
	width: 16px;
	height: 16px;
	margin-right: 10px;
}
.pdfTitle p{
	color: #191919;
	font-size:24px;
}
.pdfDetails{
	height: auto;
	margin: 20px 0px;
} */
</style>
