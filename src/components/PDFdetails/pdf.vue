<template>
	<div class="PDFbox">
	 <div ref="showheight" class="pdf borderbox">
		 <pdf
			 v-for="i in numPages"
			 :key="i"
			 :src="pdfUrl"
			 :page="i">
		 </pdf>
	 </div>
	 <div class="More textCenter cursor" v-if="show" @click="getmore()">
		 <div class="Morebtn">查看更多</div>
	 </div>
 </div>
 </template>
 <script>
 import pdf from 'vue-pdf'
 export default {
   name: 'Pdf',
   components:{
       pdf
   },
   data(){
       return {
			 show:'',
       pdfList:[],
       pdfUrl: '',
       numPages:1,
       activeIndex:0,
       }
   },
   mounted() {
		 this.pdfUrl =this.baseUrl + this.$route.query.pdfUrl;
     this.pdfTask(this.pdfUrl);
   },
   methods: {
       pdfTask(pdfUrl){
         var self = this
         let loadingTask = pdf.createLoadingTask(pdfUrl)
         loadingTask.then(pdf => {
           self.pdfUrl = loadingTask
						 self.numPages = pdf.numPages
						 if(self.numPages>=5){
							this.show = true;
						 }else{
							 this.show = false;
						 }
					 console.log(self.numPages)
         }).catch((err) => {
           console.error('pdf加载失败')
				})
       },
			 getmore(){
					this.$refs.showheight.style.height="auto"
			 }
   }
 }
 </script>

 <style>
	 .PDFbox{
			position: relative;
			padding: 10px;
	 }
	 .PDFbox .pdf{
		 height: 2000px;
	 }
	 .pdf{
		 overflow: hidden;
	 }
	 .pdf span{
		 display: block !important;
		 margin-bottom: 10px !important;
	 }
	 .More{
		 width: 880px;
		 height: 500px;
		 background: linear-gradient(to bottom, transparent, rgba(241,238,239,1));
		 color: #fff;
		 font-size: 18px;
		 position: absolute;
		 bottom: 0px;
	 }
	 .Morebtn{
		 width: 250px;
		 height: 50px;
		 line-height: 50px;
		 border-radius: 20px;
		 background: rgba(63, 189, 212, 1);
		 position: absolute;
		 bottom: 30px;
		 left: 325.5px;
	 }
 </style>
