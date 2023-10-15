import Auth from './pages/Auth';
import MainTable from './pages/MainTable';
import Registration from './pages/Registration';

export const authorizedRoutes = [ {
    path: '/',
    Component: MainTable
}];

export const publicRoutes = [{
    path: '/auth',
    Component: Auth
}, {
    path: '/registration',
    Component: Registration
}];
