<template>
	<div class="bg_Ps borderbox">
		<div class="lesson_wrap" style="min-height: calc(100vh - 100px);">
			<div class="nav_crumbs" style="padding: 15px 20px 0;">
				<breadcrumbNav></breadcrumbNav>
			</div>
			<div class="lessonList spacing">
				<div class="listShowType">
					<span v-for="(src,index) in iconSrc" @click="switchList(index,src.src)">
						<img :src="src.src"/>
					</span>
				</div>
				<div class="lessonTab">
					<div v-for="(tab,index) in lessonTab">
						<span :class="{Tabactive:index==tabActive}" @click="tabClick(index,tab)">{{tab.name}}</span>
					</div>
				</div>
				<div class="lessonTabContent">
					<lessonListFirst v-show="TypeShow[0]" :listData='listData' :isShade="isShade"></lessonListFirst>
					<lessonListSecond v-show="TypeShow[1]" :listData='listData' :isShade="isShade"></lessonListSecond>
					<lessonListThird  v-show="TypeShow[2]" :listData='listData' :isShade="isShade"></lessonListThird>
				</div>
			</div>
			<page  :total="total" :pageSize="pageSize" :curPage="curPage" v-on:getCurrentPage="getCurrentPage"></page>
			<div class="clear"></div>
		</div>
	</div>
</template>

<script scoped>
	import lessonListFirst from 'views/microLesson/lessonList/lessonListFirst.vue'
	import lessonListSecond from 'views/microLesson/lessonList/lessonListSecond'
	import lessonListThird from 'views/microLesson/lessonList/lessonListThird'
	import page from '../../components/page/page.vue'
	import breadcrumbNav from '../Breadcrumb/Breadcrumb.vue'
	export default {
		components: {
			lessonListFirst,
			lessonListThird,
			lessonListSecond,
			page,
			breadcrumbNav
		},
		data() {
			return{
				tabActive:'1',
				lessonTab:[{name:'课件',id:9},{name:'教学设计',id:13},{name:'试卷（练习）',id:6}],
				lessonTabCur:'',
				TypeShow:[true,false,false],
				iconSrc:[{
					src:require('../../assets/images/lesson/lessonlist0-1.png'),
				},{
					src:require('../../assets/images/lesson/lessonlist1.png'),
				},{
					src:require('../../assets/images/lesson/lessonlist2.png'),
				}],
				isShade:false,
				listData:[],
				total:0,
				curPage:1,
				eachPageSize:[8,16,15],
				pageSize:8,
				isAudit:1
			}
		},
		mounted(){
			this.lessonTabCur=this.lessonTab[1]
			this.getListData()
		},
		methods:{
			switchList(index,src){
				var _this=this;
				this.iconSrc[index].src=require(`../../assets/images/lesson/lessonlist${index}-1.png`);
				this.TypeShow[index]=true;
				this.iconSrc.forEach(function(val,i){
					if(i!==index){
						val.src=require(`../../assets/images/lesson/lessonlist${i}.png`)
						_this.TypeShow[i]=false
					}
				})
				this.curPage=1
				this.pageSize=this.eachPageSize[index]
				this.listData=[]
				this.getListData()
			},
			tabClick(index,item){
				this.tabActive=index;
				this.lessonTabCur=item
				this.TypeShow=[true,false,false],
				this.iconSrc=[{
					src:require('../../assets/images/lesson/lessonlist0-1.png'),
				},{
					src:require('../../assets/images/lesson/lessonlist1.png'),
				},{
					src:require('../../assets/images/lesson/lessonlist2.png'),
				}]
				this.listData=[]
				this.getListData()
			},
			getCurrentPage(curPage){
				this.curPage=curPage
				this.getListData()
			},
			getListData(){
				let type=this.$route.query.type
				if(type==undefined){
					var params={
						userId:this.$route.query.id,
						pageSize:this.pageSize,
						pageNum:this.curPage,
						isAudit:2,
						categoryId:this.lessonTabCur.id
					}
				}else if(type=='collectCount'){
					var params={
						userId:this.$route.query.id,
						pageSize:this.pageSize,
						pageNum:this.curPage,
						collectCount:1,
						categoryId:this.lessonTabCur.id
					}
				}else if(type=='readCount'){
					var params={
						userId:this.$route.query.id,
						pageSize:this.pageSize,
						pageNum:this.curPage,
						readCount:1,
						categoryId:this.lessonTabCur.id
					}
				}
				this.$http.get(this.$api.perSpace.list,params).then(res=>{
					this.listData=res.data.list;
					this.total=res.data.total;
				})
			}
		}
	}
</script>
<style scoped>
	@import "../../assets/css/style.css";
	.spacing{
		margin: 0 !important;
		padding: 10px 0px;
	}
</style>
