import { shallow } from 'vue-test-utils';

import Button from '@/components/Button.vue';

describe('Button.vue', () => {
  it('check if just one div is visible', () => {
    const items = ['', ''];
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
});
