import { shallow } from '@vue/test-utils';

import CommentText from '../src/components/CommentText.vue';

describe('comment text module', () => {
  it('test single line text', () => {
    const wrapper = shallow(CommentText, {
      propsData: {
        text: 'adwadwwad',
      },
    });
    const spanContainer = wrapper.findAll(
      '[data-test="text-container"] > span',
    );
    expect(spanContainer).toHaveLength(1);
  });

  it('test multi line text', () => {
    const wrapper = shallow(CommentText, {
      propsData: {
        text: 'adwadwwad \n awddwawda \n \nd awdwda',
      },
    });
    const spanContainer = wrapper.findAll(
      '[data-test="text-container"] > span',
    );
    expect(spanContainer).toHaveLength(4);
  });
});
