import {
  shallow
} from 'vue-test-utils';

import Modal from '../src/components/Modal.vue';

describe('Modal Module', () => {
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
});
