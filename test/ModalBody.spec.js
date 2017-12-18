import {
  shallow
} from 'vue-test-utils';

import Modal from '../src/components/Modal.vue';

describe('modal body module', () => {
  it('test default body text', () => {
    const wrapper = shallow(Modal);
    const modalBody = wrapper.find('[data-test="vco-modal-body"]');
    expect(modalBody.text()).toBe('default body');
  });

  it('test default body class', () => {
    const wrapper = shallow(Modal);
    const modalBody = wrapper.find('[data-test="vco-modal-body"]');
    expect(modalBody.classes()).toContain('vco-modal__body');
  });

  it('test slot body', () => {
    const wrapper = shallow(Modal, {
      slots: {
        body: '<h2>New body</h2>',
      },
    });
    const modalBodyText = wrapper.find('[data-test="vco-modal-body"] h2');
    expect(modalBodyText.exists()).toBeTruthy();
    expect(modalBodyText.text()).toBe('New body');
  });
});
