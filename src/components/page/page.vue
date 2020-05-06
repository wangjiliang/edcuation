<template>
	<div class="page">
		<el-pagination
		  @current-change="handleCurrentChange"
		  :current-page="currentPage"
		  background
		  :page-size="pageSize"
		  layout="prev, pager, next, jumper"
		  :total="total">
		</el-pagination>
	</div>
</template>

<script scoped>
	export default {
		data() {
		  return {
			currentPage: 1,
		  };
		},
		props:{
			total:[Number],
			pageSize:[Number],
			curPage:[Number]
		},
		watch:{
			curPage(){
				this.currentPage=this.curPage
			}
		},
		methods: {
		  handleCurrentChange(val) {
			  this.currentPage=val
			  this.$emit('getCurrentPage',this.currentPage)
		  }
		}
    }
</script>

<style>
	.page{
		text-align: center;
		padding: 20px 0;
	}
	.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
		background: #fff;
	}
	.el-pagination.is-background .el-pager li:not(.disabled).active{
		background-color:#3FBDD4;
	}
	.el-pagination.is-background .el-pager li:not(.disabled):hover{
		color:#3FBDD4;
	}
</style>
