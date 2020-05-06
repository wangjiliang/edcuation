<template>
	<div class="bg_Ps grpad borderbox">
		<div class="lesson_wrap ps_wrap" style="min-height: calc(100vh - 100px);">
			<div class="nav_crumbs" style="margin: 0 20px 15px;">
				<breadcrumbNav></breadcrumbNav>
			</div>
			<div class="leftTree ps_left">
				<ul>
					<li v-for="(item,index) in leftTab" :class="{ps_leftActive:index==leftActive}" @click="clickLeftTab(index,item)"><em></em><span>{{item.name}}</span></li>
				</ul>
			</div>
			<!-- 右边 列表-->
			<div class="lessonList">
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
	import lessonListFirst from '../microLesson/lessonList/lessonListFirst.vue'
	import lessonListSecond from '../microLesson/lessonList/lessonListSecond'
	import lessonListThird from '../microLesson/lessonList/lessonListThird'
	import page from '../../components/page/page.vue'
	import breadcrumbNav from 'components/Breadcrumb/Breadcrumb.vue'
	import { mapState } from 'vuex'
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
				tabActive:1,
				leftActive:'0',
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
				leftTab:[{name:'已审核资料'},{name:'待审核'}],
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
			this.leftActive=this.$store.state.personActive
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
				this.getListData()
			},
			// toDetails(){
			// 	this.$router.push({
			// 		path:'/details'
			// 	})
			// },
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
			clickLeftTab(index,item){
				this.leftActive=index
				if(item.name=="待审核"){
					this.isShade=true;
					this.isAudit=0;
				}else{
					this.isShade=false;
					this.isAudit=1;
				}
				this.listData=[]
				this.getListData();
			},
			getCurrentPage(curPage){
				this.curPage=curPage
				this.getListData()
			},
			getListData(){
				var _this=this
				var params={
					userId:this.$store.state.userid,
					pageNum:this.curPage,
					pageSize:this.pageSize,	
					isAudit:this.isAudit,
					categoryId:this.lessonTabCur.id
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
</style>
