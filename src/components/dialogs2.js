import Popup from '../components/my-modal.vue';

import Vue from 'vue'

let arr = []

Popup.install = function (opt) {
  let vm = null;

  //   document.body.removeChild(item);

  var elements = document.getElementsByClassName('my-modal');
  for (var i = elements.length - 1; i >= 0; i--) {
    elements[i].parentNode.removeChild(elements[i]);
  }

  let defaultOpt = {
    type: 'success',
    title: '',
    desc: '',
    btnText: "确定",
    cb: null
  };

  if (typeof opt == 'string') {
    defaultOpt.desc = opt;
  }
  opt = {
    ...defaultOpt,
    ...opt
  };
  const PopupBox = Vue.extend(Popup)
  vm = new PopupBox({
    // data
    el: document.createElement('div')
  }).$mount()
  document.body.appendChild(vm.$el)
  arr.push(vm.$el)

  Object.assign(vm, opt);
  Vue.nextTick(() => {
    vm.show = true
    // show 和弹窗组件里的show对应，用于控制显隐
  })
  vm.$on('close', () => {
    document.body.removeChild(vm.$el);
    vm.$destroy();
    arr.pop()
    typeof opt.cb == 'function' && opt.cb();
    this.vm = null;
    // 查看栈中有无未执行的弹窗
  });
  vm.$on('done', () => {
    document.body.removeChild(vm.$el);
    vm.$destroy();
    arr.pop()
    typeof opt.cb == 'function' && opt.cb();
    this.vm = null;
    // 查看栈中有无未执行的弹窗
  });
}

export default Popup
