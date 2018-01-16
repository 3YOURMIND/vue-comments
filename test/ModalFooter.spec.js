import { shallow } from '@vue/test-utils';

import Modal from '../src/components/Modal.vue';

describe('modal footer module', () => {
  it('test default footer text', () => {
    const wrapper = shallow(Modal);
    const modalFooter = wrapper.find('[data-test="vco-modal-footer"]');
    expect(modalFooter.text()).toContain('default footer');
  });

  it('test default footer class', () => {
    const wrapper = shallow(Modal);
    const modalFooter = wrapper.find('[data-test="vco-modal-footer"]');
    expect(modalFooter.classes()).toContain('vco-modal__footer');
  });

  it('test slot footer', () => {
    const wrapper = shallow(Modal, {
      slots: {
        footer: '<h2>New footer</h2>',
      },
    });
    const modalFooterText = wrapper.find('[data-test="vco-modal-footer"] h2');
    expect(modalFooterText.exists()).toBeTruthy();
    expect(modalFooterText.text()).toBe('New footer');
  });

  it('test closing modal', () => {
    const wrapper = shallow(Modal);
    const spy = jest.fn();
    wrapper.vm.$on('close', spy);
    const closeElement = wrapper.find('[data-test="close"]');
    closeElement.trigger('click');
    expect(spy).toHaveBeenCalled();
  });
});
