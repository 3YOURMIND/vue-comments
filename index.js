import VueCommentsComponent from './src/components/CommentContainer.vue';

const VueComments = {};

/* eslint-disable no-param-reassign */
VueComments.install = function install(Vue) {
  if (this.installed) {
    return;
  }
  this.installed = true;

  Vue.component('VueComments', VueCommentsComponent);
};
/* eslint-enable no-param-reassign */

export default VueComments;
