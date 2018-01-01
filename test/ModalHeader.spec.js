import { shallow } from 'vue-test-utils';

import Modal from '../src/components/Modal.vue';

describe('modal header module', () => {
  it('test default header text', () => {
    const wrapper = shallow(Modal);
    const modalHeader = wrapper.find('[data-test="vco-modal-header"]');
    expect(modalHeader.text()).toBe('default header');
  });

  it('test default header class', () => {
    const wrapper = shallow(Modal);
    const modalHeader = wrapper.find('[data-test="vco-modal-header"]');
    expect(modalHeader.classes()).toContain('vco-modal__header');
  });

  it('test slot header', () => {
    const wrapper = shallow(Modal, {
      slots: {
        header: '<h2>New Header</h2>',
      },
    });
    const modalHeaderText = wrapper.find('[data-test="vco-modal-header"] h2');
    expect(modalHeaderText.exists()).toBeTruthy();
    expect(modalHeaderText.text()).toBe('New Header');
  });
});
