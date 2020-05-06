export default {
	// 登录
	login:{
    loginUrl: "/user/login",
    loginOut: "/user/logout" //退出
	},
	// 忘记密码
	forgetPasd:{
		pasd: "/user/resetPassword"
	},
	// 微课中心
	lesson:{
		subject:"/subject/queryList", //学科列表
		subjectContent:"/subjectContent/list", //学科目录
		edition:"/edition/list", //版本列表
		grade:"/grade/listForIds", //年级列表
		city:"/city/list" ,//城市列表
		resCategory:'/resCategory/list',//资源分类
    },
	// 资源中心
	Resources:{
		banner:"/index/resBanner", //banner图
	},
	// 个人空间
	perSpace:{
		list:"/resInfo/list",
		detailes:"/resInfo/get",
		uploadData:"/resInfo/add",
		checkFile:"/resInfo/checkFile",
		checkChunk:"/resInfo/checkChunk",
		upload:"/resInfo/upload",
		UploadHead:"/user/uploadHead"  ,//上传头像
		modify:"/user/get",//获取个人资料
		updata:"/user/update"//上传修改资料
	},
	// 资源header
	vheader: {
		name: "/period/list", //学段列表
	},
	// 学科查询年级
	grade:{
		gradelist: "/grade/listForSubjectId"
	},
	// 资讯中心
	news:{
		list:"/cmsInfo/list",
		category:"/cmsCategory/list",
	},
	// 首页最新动态
	newDynamic:{
		IndexPublic:"/index/index",//最新动态//教育动态//教师专区//banner
		studentList:"/index/studentPlaza",//学生广场
		studentPlazaCmsCategory:"/index/studentPlazaCmsCategory",// 学生广场资讯信息分类
		schooList:"/index/schoolMien",//名校风采
		lessonRank:"/index/microRanking",//微课排行榜
		cityRank:"/index/cityRanking",//地区排行榜
		schoolRank:"/index/schoolRanking",//学生排行
		resRank:"/index/resRanking",//资源排行
		resTeacherRank:"/index/userRanking",//资源排行教师排序
		resInfo:"/resInfo/amount"  //最新动态----资源汇总统计
	},
	// 收藏
	collect:{
		add:"/resInfoCollect/add",
		cancel:"/resInfoCollect/cancel"
	},
	// 获取pdfUrl
	pdf:{
		url:"/preview"
	},
	// 评论列表
	resInfoReview: {
		add: "/resInfoReview/add",  //添加评论
		list: "/resInfoReview/list",  //评论列表
	}
}
