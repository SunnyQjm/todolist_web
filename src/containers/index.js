import {
    LoadingComponent
} from '../components';
import Loadable from 'react-loadable';

// const HeaderContainer = Loadable({
//     loader: () => import('./header'),
//     loading: LoadingComponent
// });
import HeaderContainer from './header';
// const FooterContainer = Loadable({
//     loader: () => import('./footer'),
//     loading: LoadingComponent
// });
import FooterContainer from './footer';

import HomeContainer from './home'

export {
    HeaderContainer,
    FooterContainer,
    HomeContainer,
}