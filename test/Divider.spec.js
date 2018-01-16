import { shallow } from '@vue/test-utils';

import Divider from '../src/components/Divider.vue';

describe('divider module', () => {
  it('test divider', () => {
    const wrapper = shallow(Divider);
    expect(wrapper.is('div')).toBe(true);
  });
});
