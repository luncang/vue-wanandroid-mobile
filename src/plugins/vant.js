// 按需全局引入 vant组件
import Vue from 'vue'
import {
  Button,
  List,
  Cell,
  Tabbar,
  TabbarItem,
  Icon,
  Field,
  Image as VanImage,
  Lazyload,
  Checkbox,
  CheckboxGroup,
  Toast,
  Swipe,
  SwipeItem,
  Search
} from 'vant'

Vue.use(Button)
Vue.use(Cell)
Vue.use(List)
Vue.use(Tabbar).use(TabbarItem).use(Icon).use(Field).use(VanImage).use(Lazyload)
  .use(Checkbox).use(CheckboxGroup).use(Toast).use(Swipe).use(SwipeItem).use(Search)
