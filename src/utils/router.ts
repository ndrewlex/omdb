import searchMovie from 'pages/search-movie';
import searchMovieDetail from 'pages/search-movie/detail';
import myFavourite from 'pages/my-favourite';
import myFavouriteDetail from 'pages/my-favourite/detail';

export const defaultRouter = '/search-movie';

export interface IRouter {
  title: string;
  path: string;
  component: any;
  withTab?: boolean;
  exact?: boolean;
}

export const routerPath = {
  searchMovie: '/search-movie',
  myFavourite: '/my-favourite',
};

const router: IRouter[] = [
  {
    title: 'Search Movie Detail',
    path: `${routerPath.searchMovie}/:id`,
    withTab: false,
    component: searchMovieDetail,
  },
  {
    title: 'Search Movie',
    path: `${routerPath.searchMovie}`,
    withTab: true,
    component: searchMovie,
  },
  {
    title: 'Favourite Movie Detail',
    path: `${routerPath.myFavourite}/:id`,
    withTab: false,
    component: myFavouriteDetail,
  },
  {
    title: 'My Favourite',
    path: `${routerPath.myFavourite}`,
    withTab: true,
    component: myFavourite,
  },
];

export const routerTab = router.filter((item) => item.withTab);

export default router;
