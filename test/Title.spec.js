import { shallow } from 'vue-test-utils';

import Title from '@/components/Title.vue';

const createProps = (title = 'Test title', showLine = false) => {
  return {
    showLine,
    translations: {
      title,
    },
  };
};

describe('Title Module', () => {
  it('test if one div is visible', () => {
    const wrapper = shallow(Title, {
      propsData: createProps(),
    });
    expect(wrapper.findAll('div')).toHaveLength(1);
  });

  it('test if title is included', () => {
    const wrapper = shallow(Title, {
      propsData: createProps('Test title'),
    });
    expect(wrapper.find('div').text()).toContain('Test title');
  });

  it('test if default class is shown always', () => {
    let wrapper = shallow(Title, {
      propsData: createProps(),
    });
    expect(wrapper.find('div').hasClass('vco-title__heading')).toBe(true);
    wrapper = shallow(Title, {
      propsData: createProps('a', true),
    });
    expect(wrapper.find('div').hasClass('vco-title__heading')).toBe(true);
  });

  it('test if default class is shown always', () => {
    let wrapper = shallow(Title, {
      propsData: createProps(),
    });
    expect(wrapper.find('div').hasClass('vco-title__line')).toBe(false);
    wrapper = shallow(Title, {
      propsData: createProps('a', true),
    });
    expect(wrapper.find('div').hasClass('vco-title__line')).toBe(true);
  });
});
