export default [
  {
    path: "",
    redirect: "/home"
  },
  {
    path: "/home",
	name:"首页",
    component: () => import('@/views/home/home.vue'),
    meta: { showHeader: true, showxqHeader: true, showgrHeader: true}
  },
  {
    path: "/about",
	name:"about",
    component: () => import('@/views/about/about.vue')
  },
  {
    path: "/lesson",
	name: "lesson",
    component: () => import('@/views/microLesson/lesson.vue'),
	meta: { showxqHeader: true, showgrHeader: true}
  },
  {
    path: "/resource",
	name:"resource",
    component: () => import('@/views/resourceCenter/resource.vue'),
	meta: { showxqHeader: true, showgrHeader: true}
  },
  {
    path: "/login",
		name:"login",
    component: () => import('@/views/login/login.vue'),
    meta: { showHeader: true, showxqHeader: true, showgrHeader: true,  showFooter: true }
  },
	{
	  path: "/details",
	  name:'details',
	  component: () => import('@/views/microLesson/lessonDetails/details.vue'),
	  meta: { showHeader: true, showgrHeader: true}
	},
	{
	  path: "/personalHome",
	  name:"personalHome",
	  component: () => import('@/views/personalSpace/home/personalHome.vue'),
	  meta: { showHeader: true, showxqHeader: true, showFooter: true }
	},
	{
		path: "/informationList",
		name:"informationList",
		component: () => import('@/views/personalSpace/informationList.vue'),
		meta: { showHeader: true, showxqHeader: true, showFooter: true }
	},// 个人空间微课列表
	{
		path: "/uploadData",
		name:"uploadData",
		component: () => import('@/views/personalSpace/uploadData.vue'),
		meta: { showHeader: true,showxqHeader: true, showFooter: true }
	},
	{
		path: "/PDFdetails",
		name: "PDFdetails",
		component: () => import('@/components/PDFdetails/PDFdetails.vue'),
		meta: { showHeader: true, showgrHeader: true }
	},
	{
		path: "/news",
		name:"news",
		component: () => import('@/views/news/news.vue'),
		meta: { showHeader: true, showgrHeader: true}
	},// 资讯中心列表
	{
		path: "/newsDetail",
		name:"newsDetail",
		component: () => import('@/views/news/details/newsdetails.vue'),
		meta: { showHeader: true, showgrHeader: true}
	},// 资讯中心详情
	{
		path: "/list",
		name:"list",
		component: () => import('@/components/list/list.vue'),
		meta: { showHeader: true, showgrHeader: true}
	},
	// 404
	{
	  path: '/404',
	  name: '404',
	  component: () => import('@/components/404.vue'),
		meta: { showHeader: true, showxqHeader: true, showgrHeader: true,  showFooter: true }
	},
	{
	path: "*", // 此处需特别注意置于最底部
	redirect: "/404"
	}
]
