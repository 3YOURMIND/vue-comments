import { shallow } from 'vue-test-utils';

import CommentDropdownOption from '../src/components/CommentDropdownOption.vue';

const createProps = ({ editMode = false, type = 'main' }) => {
  return {
    id: '1',
    editMode,
    type,
    translations: {
      deleteComments: 'Delete Comment',
      areYouSureDeleteComment: 'Are you sure to delete this comment?',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
    },
  };
};

describe('comment dropwdown option module', () => {
  it('test toggling of menu icon', () => {
    const wrapper = shallow(CommentDropdownOption, {
      propsData: createProps({ editMode: false, type: 'main' }),
    });
    const openMenuButton = wrapper.find(
      '[data-test="vco-comment-dropdown-option-open-menu"]',
    );
    expect(openMenuButton.exists()).toBe(true);
    openMenuButton.trigger('click');
    const closeMenuButton = wrapper.find(
      '[data-test="vco-comment-dropdown-option-close-menu"]',
    );
    expect(closeMenuButton.exists()).toBe(true);
  });

  it('test if menu is visible', () => {
    const wrapper = shallow(CommentDropdownOption, {
      propsData: createProps({ editMode: false, type: 'main' }),
    });
    const openMenuButton = wrapper.find(
      '[data-test="vco-comment-dropdown-option-open-menu"]',
    );
    expect(openMenuButton.exists()).toBe(true);
    openMenuButton.trigger('click');
    const menu = wrapper.find('[data-test="vco-comment-dropdown-option-menu"]');
    expect(menu.exists()).toBeTruthy();
  });
});
