import { shallow } from '@vue/test-utils';

import CommentEditOptionBar from '../src/components/CommentEditOptionBar.vue';

const createWrapper = ({ editLoading = false }) => {
  return shallow(CommentEditOptionBar, {
    propsData: {
      translations: {
        cancel: 'Cancel',
        save: 'Save',
      },
      comment: {
        editLoading,
      },
    },
  });
};

describe('comment edit option bar module', () => {
  it('test save button class', () => {
    const wrapper = createWrapper({});
    let saveButton = wrapper.find(
      '[data-test="vco-comment-edit-option-bar-save"]',
    );
    expect(saveButton.classes()).not.toContain('vco-button--disabled');
    wrapper.setProps({
      comment: {
        editLoading: true,
      },
    });
    saveButton = wrapper.find('[data-test="vco-comment-edit-option-bar-save"]');
    expect(saveButton.classes()).toContain('vco-button--disabled');
  });

  it('test cancel click event', () => {
    const wrapper = createWrapper({});
    const cancelButton = wrapper.find(
      '[data-test="vco-comment-edit-option-bar-cancel"]',
    );
    cancelButton.trigger('click');
    expect(
      wrapper.emitted('comment-edit-option-bar-cancel-edit-text'),
    ).toBeTruthy();
  });

  it('test cancel key up event', () => {
    const wrapper = createWrapper({});
    const cancelButton = wrapper.find(
      '[data-test="vco-comment-edit-option-bar-cancel"]',
    );
    cancelButton.trigger('keyup.enter');
    expect(
      wrapper.emitted('comment-edit-option-bar-cancel-edit-text'),
    ).toBeTruthy();
  });

  it('test cancel click event', () => {
    const wrapper = createWrapper({});
    const cancelButton = wrapper.find(
      '[data-test="vco-comment-edit-option-bar-save"]',
    );
    cancelButton.trigger('click');
    expect(
      wrapper.emitted('comment-edit-option-bar-save-edit-text'),
    ).toBeTruthy();
  });

  it('test cancel key up event', () => {
    const wrapper = createWrapper({});
    const cancelButton = wrapper.find(
      '[data-test="vco-comment-edit-option-bar-save"]',
    );
    cancelButton.trigger('keyup.enter');
    expect(
      wrapper.emitted('comment-edit-option-bar-save-edit-text'),
    ).toBeTruthy();
  });
});
