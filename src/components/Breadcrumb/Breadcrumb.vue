<template>
	<div class="navbar clearfix" :class="{'crumbColor':fontColor}">
        <el-breadcrumb class="breadcrumb-container" separator-class="el-icon-arrow-right" style="display: inline-block;">
            <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="$store.state.navPath">{{$store.state.crumbSec}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="$store.state.detailPath" v-if="$route.path==$store.state.detailPath?true:false">{{$store.state.detailTitle}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
 export default {
        name: 'Breadcrumb',
        data() {
            return {
                
            }
        },
		props:['fontColor'],
    }
</script>
<style scoped>
	
</style>
