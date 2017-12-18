import {
  shallow
} from 'vue-test-utils';

import Divider from '../src/components/Divider.vue';

describe('modal body module', () => {
  it('test default body text', () => {
    const wrapper = shallow(Divider);
    expect(wrapper.is('div')).toBe(true);
  });
});
