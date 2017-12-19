import { shallow } from 'vue-test-utils';

import CommentInfo from '../src/components/CommentInfo.vue';

const createComment = ({ username = 'defaultUsername', service = null }) => {
  return {
    user: {
      name: username,
      service,
    },
    editedPrettyDate: 1513719024,
    createdPrettyDate: 1513719024,
  };
};

const createTranslation = ({}) => {
  return {
    commentInfoUserServiceInformation: comment => {
      return `from service <b>${comment.user.service}</b>`;
    },
    createdDate: comment => {
      return 'before 5 hours';
    },
    editedDate: comment => {
      return 'before 2 hours';
    },
  };
};

describe('comment info module', () => {
  it('test username', () => {
    const wrapper = shallow(CommentInfo, {
      propsData: {
        comment: createComment({ username: 'username 1' }),
        translations: createTranslation({}),
      },
    });
    const username = wrapper.find('[data-test="vco-comment-info-username"]');
    expect(username.text()).toBe('username 1');
  });

  it('test no service given', () => {
    const wrapper = shallow(CommentInfo, {
      propsData: {
        comment: createComment({}),
        translations: createTranslation({}),
      },
    });
    const serviceContainer = wrapper.find(
      '[data-test="vco-comment-info-service"]',
    );
    expect(serviceContainer.exists()).toBeFalsy();
  });

  it('test service given', () => {
    const wrapper = shallow(CommentInfo, {
      propsData: {
        comment: createComment({ service: '3YOURMIND Printing Service' }),
        translations: createTranslation({}),
      },
    });
    const serviceContainer = wrapper.find(
      '[data-test="vco-comment-info-service"]',
    );
    expect(serviceContainer.exists()).toBeTruthy();
    expect(serviceContainer.text()).toBe(
      'from service 3YOURMIND Printing Service',
    );
  });
});
