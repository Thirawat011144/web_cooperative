import News from '../components/news/News.vue';
import NewsDetails from '../components/news/NewsDetails.vue'

const routeNews = [
  {
    path: '/news',
    name: 'news',
    component: News
  }
  ,
  {
    path: '/news-detail/:id',
    name: 'news-detail',
    component: NewsDetails
  }
]

export default routeNews