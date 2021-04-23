import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import store from './store'
import StuCenter from "@/components/StuMain/StuCenter";
// eslint-disable-next-line no-unused-vars
import router from './router';
import './assets/css/global.css';
import 'muse-ui/lib/styles/base.less';
//import Helpers from 'muse-ui/lib/Helpers';
import {
    Alert,
    AppBar,
    AutoComplete,
    Avatar,
    Badge,
    BottomNav,
    BottomSheet,
    Breadcrumbs,
    Button,
    Card,
    Carousel,
    Checkbox,
    Chip,
    DataTable,
    DateInput,
    Dialog,
    Divider,
    Drawer,
    ExpansionPanel,
    Form,
    Grid,
    GridList,
    Helpers,
    Icon,
    List,
    LoadMore,
    Menu,
    Pagination,
    Paper,
    Picker,
    Popover,
    Progress,
    Radio,
    Select,
    SlidePicker,
    Slider,
    Snackbar,
    Stepper,
    SubHeader,
    Switch,
    Tabs,
    TextField,
    Tooltip,
} from 'muse-ui';
import 'muse-ui/lib/styles/theme.less';
import axios from "axios";
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Loading from 'muse-ui-loading';

Vue.prototype.$axios = axios;
axios.defaults.withCredentails = true;
Vue.config.productionTip = false;


Vue.use(Helpers);
Vue.use(Alert);
Vue.use(AppBar);
Vue.use(AutoComplete);
Vue.use(Avatar);
Vue.use(Badge);
Vue.use(BottomNav);
Vue.use(BottomSheet);
Vue.use(Breadcrumbs);
Vue.use(Button);
Vue.use(Card);
Vue.use(Checkbox);
Vue.use(Chip);
Vue.use(Carousel);
Vue.use(DateInput);
Vue.use(DataTable);
Vue.use(Dialog);
Vue.use(Divider);
Vue.use(Drawer);
Vue.use(ExpansionPanel);
Vue.use(Form);
Vue.use(Grid);
Vue.use(GridList);
Vue.use(Helpers);
Vue.use(Icon);
Vue.use(List);
Vue.use(LoadMore);
Vue.use(Menu);
Vue.use(Pagination);
Vue.use(Paper);
Vue.use(Picker);
Vue.use(Popover);
Vue.use(Progress);
Vue.use(Radio);
Vue.use(Select);
Vue.use(SlidePicker);
Vue.use(Slider);
Vue.use(Snackbar);
Vue.use(Stepper);
Vue.use(SubHeader);
Vue.use(Switch);
Vue.use(Tabs);
Vue.use(TextField);
Vue.use(Tooltip);
Vue.use(store);
Vue.use(Vuex);
Vue.use(StuCenter);
Vue.use(Loading);
new Vue({
    render: h => h(App),
    store:store,
    router,//与3.0不同 必须是router 3.0是routes
}).$mount('#app')
