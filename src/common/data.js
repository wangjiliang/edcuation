import http from '../api/http.js'
import api from '../api/api.js'
export default {
	 periodId: 1,
	 // 获取学段
	 getPeriodData() {
		 return new Promise(function (resolve, reject) {
		 	http.get(api.vheader.name).then(res=>{
		 		resolve(res.data);
		 	},err => {
		 	   reject(err)
		    })
		 });
	 },
	 // 获取学科
	 getSubjectData(params){
		return new Promise(function (resolve, reject) {
			http.get(api.lesson.subject,params).then(res=>{
				resolve(res.data);
			},err => {
			   reject(err)
		   })
		});
	 },
	 // 获取版本
	 getEditionData(params){
		 return new Promise(function (resolve, reject) {
		 	http.get(api.lesson.edition,params).then(res=>{
		 		resolve(res.data);
		 	},err => {
		 	   reject(err)
		    })
		 });
	 },
	 // 获取年级
	 getGradeData(params){
		 return new Promise(function (resolve, reject) {
		 	http.get(api.lesson.grade,params).then(res=>{
		 		resolve(res.data);
		 	},err => {
		 	   reject(err)
		    })
		 });
	 },
	 // 学科目录
	 getSubjectContent(params){
		 return new Promise(function (resolve, reject) {
		 	http.get(api.lesson.subjectContent,params).then(res=>{
		 		resolve(res.data);
		 	},err => {
		 	   reject(err)
		    })
		 });
	 },
	 // 毫秒数转日期格式
	timeShift(date){
		 var oDate = new Date(date),
	     oYear = oDate.getFullYear(),
	     oMonth = oDate.getMonth()+1,
	     oDay = oDate.getDate(),
	     oTime = oYear +'/'+ this.addZero(oMonth) +'/'+ this.addZero(oDay);
	     return oTime;
	},
	addZero(num){
	     if(parseInt(num) < 10){
	         num = '0'+num;
	     };
	     return num;
	},
	// 添加收藏 
	addCollect(params){
		return new Promise(function (resolve, reject) {
			http.post(api.collect.add,params).then(res=>{
				resolve(res);
			},err => {
			   reject(err)
		   })
		});
	},
	// 取消收藏
	cancelCollect(params){
		return new Promise(function (resolve, reject) {
			http.get(api.collect.cancel,params).then(res=>{
				resolve(res);
			},err => {
			   reject(err)
		   })
		});
	},
	// 资源分类
	getCategoryData() {
		return new Promise(function (resolve, reject) {
			http.get(api.lesson.resCategory).then(res=>{
				resolve(res);
			},err => {
			   reject(err)
		   })
		});
	},
}
