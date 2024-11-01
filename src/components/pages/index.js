import Home from './Home';
import NotFound from './NotFound';
import Marriage from './Marriage';

const routes = [
    { path: "/", component: Home},
    { path: "*", component: NotFound},
    { path: "/marriage", component: Marriage},
]

export default routes;