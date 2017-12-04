import { shallow } from 'vue-test-utils';

import Button from '@/components/Button.vue';

describe('Button.vue', () => {
  it('test if just one div is visible', () => {
    const wrapper = shallow(Button);
    wrapper.setProps({
      text: 'bar',
      warning: false,
      disabled: false,
      black: false,
      gray: false,
      onClick: () => {},
    });
    expect(wrapper.findAll('div')).toHaveLength(1);
  });

  it('test if text is rendered right', () => {
    const wrapper = shallow(Button);
    wrapper.setProps({
      text: 'foo',
      warning: false,
      disabled: false,
      black: false,
      gray: false,
      onClick: () => {},
    });
    expect(wrapper.find('div').text()).toBe('foo');
    wrapper.setProps({
      text: 'bar',
      warning: false,
      disabled: false,
      black: false,
      gray: false,
      onClick: () => {},
    });
    expect(wrapper.find('div').text()).toBe('bar');
  });

  it('test if button has default btn class', () => {
    const wrapper = shallow(Button);
    wrapper.setProps({
      text: 'foo',
      warning: false,
      disabled: false,
      black: false,
      gray: false,
      onClick: () => {},
    });
    expect(wrapper.find('div').hasClass('vco-button')).toBe(true);
  });

  it('test if button is primary', () => {
    const wrapper = shallow(Button);
    wrapper.setProps({
      text: 'foo',
      warning: false,
      disabled: false,
      black: false,
      gray: false,
      onClick: () => {},
    });
    expect(wrapper.find('div').hasClass('vco-button--primary')).toBe(true);
    wrapper.setProps({
      text: 'foo',
      warning: true,
      disabled: false,
      black: false,
      gray: false,
      onClick: () => {},
    });
    expect(wrapper.find('div').hasClass('vco-button--primary')).toBe(false);
  });

  it('test if button click event is propagated right', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(Button);
    wrapper.setProps({
      text: 'foo',
      warning: false,
      disabled: false,
      black: false,
      gray: false,
      onClick: mockCallback,
    });
    wrapper.find('div').trigger('click');
    expect(mockCallback).toHaveBeenCalled();
  });
});
