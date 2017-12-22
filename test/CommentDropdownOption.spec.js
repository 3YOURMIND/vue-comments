import { shallow } from 'vue-test-utils';

import CommentDropdownOption from '../src/components/CommentDropdownOption.vue';

describe('comment dropwdown option module', () => {
  it('test toggling of menu icon', () => {
    const wrapper = shallow(CommentDropdownOption, {
      propsData: {
        id: '1',
        editMode: false,
        type: 'main',
        translations: {
          deleteComments: 'Delete Comment',
          areYouSureDeleteComment: 'Are you sure to delete this comment?',
          cancel: 'Cancel',
          delete: 'Delete',
          edit: 'Edit',
        },
      },
    });
    const openMenuButton = wrapper.find('[data-test="vco-comment-dropdown-option-open-menu"]');
    expect(openMenuButton.exists()).toBe(true);
    openMenuButton.trigger('click');
    const closeMenuButton = wrapper.find('[data-test="vco-comment-dropdown-option-close-menu"]');
    expect(closeMenuButton.exists()).toBe(true);
  });
});
