import Vue from 'vue';
import {} from 'vant';
import header from '../components/header.vue'
import myModal from '../components/my-modal.vue'
import myProgress from '../components/progress.vue';
Vue.component('my-header', header);
Vue.component('MyModal', myModal);
Vue.component('myProgress', myProgress);
import {
  Button,
  Lazyload, 
  Swipe,
  SwipeItem,
  Field,
  Notify,
  Checkbox,
  CheckboxGroup,
  Tab,
  Tabs,
  Stepper,
  Step,
  Steps,
  Pagination,
  Picker,
  Popup,
  Dialog,
  Loading,
  NoticeBar,
  PullRefresh,
  List,
  Cell,
  Slider,
  Collapse,
  CollapseItem,
  Radio,
  RadioGroup,
  DropdownMenu,
  DropdownItem
} from 'vant';

Vue.use(Button).use(Field).use(Collapse).use(Radio).use(RadioGroup).use(DropdownMenu).use(DropdownItem).use(CollapseItem).use(Slider).use(List).use(Cell).use(PullRefresh).use(NoticeBar).use(Loading).use(Dialog).use(Notify).use(Popup).use(Checkbox).use(CheckboxGroup).use(Stepper).use(Step).use(Steps).use(Tab).use(Tabs).use(Pagination).use(Picker).use(Swipe).use(SwipeItem).use(Lazyload)

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import dialogs from './dialogs';

Vue.use(dialogs);
