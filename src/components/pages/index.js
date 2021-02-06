import Home01 from './Home01';
import Blog from './Blog';
import BlogSingle from './BlogSingle';

const routes = [
    { path: "/", component: Home01},
    { path: "/blog", component: Blog},
    { path: "/blog-single", component: BlogSingle},
]

export default routes;