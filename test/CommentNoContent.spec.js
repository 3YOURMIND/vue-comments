import { shallow } from 'vue-test-utils';

import CommentNoContent from '../src/components/CommentNoContent.vue';

describe('comment no content module', () => {
  it('test', () => {
    const wrapper = shallow(CommentNoContent, {
      propsData: {
        translations: {
          noCommentWarning: 'No Comments found',
        },
      },
    });
    const span = wrapper.find('[data-test="vco-no-content-text"]');
    expect(span.text()).toBe('No Comments found');
  });
});
