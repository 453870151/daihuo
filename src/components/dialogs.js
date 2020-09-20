import Dialog from '../components/my-modal.vue';
const dialogs = {
  vm: null, // 保存当前实例
  queue: [],
  create(Vue, installOptions, opt) {
    if (this.vm) {
      this.queue.push({
        type: 'confirm',
        opt
      });
      return;
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
      ...installOptions,
      ...opt
    };

    let Dialogs = Vue.extend(Dialog);
    let vm = new Dialogs({
      el: document.createElement('div')
    });
    this.vm = vm;
    document.body.appendChild(vm.$el);

    // 赋props值给弹窗组件
    Object.assign(vm, opt);

    vm.show = true;
    vm.$on('close', () => {
      document.body.removeChild(vm.$el);
      vm.$destroy();
      // typeof opt.cb == 'function' && opt.cb();
      this.vm = null;
      // 查看栈中有无未执行的弹窗
      if (this.queue.length > 0) {
        let cur = this.queue.shift();
        Vue.prototype[cur.type](cur.opt);
      }
    });

    vm.$on('done', () => {
      document.body.removeChild(vm.$el);
      vm.$destroy();
      typeof opt.cb == 'function' && opt.cb();
      this.vm = null;
      // 查看栈中有无未执行的弹窗
      if (this.queue.length > 0) {
        let cur = this.queue.shift();
        Vue.prototype[cur.type](cur.opt);
      }
    });
  },
  install(Vue, options, opt) {
    Vue.prototype.$confirm = (opt = {}) => {
      this.create(Vue, options, opt);
    };
  }
};

export default dialogs;
