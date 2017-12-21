import { shallow } from 'vue-test-utils';

import CommentInfo from '../src/components/CommentInfo.vue';

const baseTime = 1513879000;

const createComment = ({
  username = 'defaultUsername',
  service = null,
  createdHoursAgo = 7,
  editedHoursAgo = null,
}) => {
  return {
    user: {
      name: username,
      service,
    },
    editedPrettyDate: editedHoursAgo
      ? 1513879000 - 60 * 60 * editedHoursAgo
      : null,
    createdPrettyDate: 1513879000 - 60 * 60 * createdHoursAgo,
  };
};

const createTranslation = ({}) => {
  return {
    commentInfoUserServiceInformation: (comment) => {
      return `from service <b>${comment.user.service}</b>`;
    },
    createdDate: (comment) => {
      const hourDifference = parseInt(
        (baseTime - comment.createdPrettyDate) / 3600,
        10,
      );
      return `${hourDifference} hours ago`;
    },
    editedDate: (comment) => {
      const hourDifference = parseInt(
        (baseTime - comment.editedPrettyDate) / 3600,
        10,
      );
      return `${hourDifference} hours ago`;
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

  it('test created date', () => {
    let wrapper = shallow(CommentInfo, {
      propsData: {
        comment: createComment({ createdHoursAgo: 8 }),
        translations: createTranslation({}),
      },
    });
    let createdContainer = wrapper.find(
      '[data-test="vco-comment-info-created"]',
    );
    expect(createdContainer.text()).toContain('8');
    wrapper.setProps({
      comment: createComment({ createdHoursAgo: 3 }),
    });
    createdContainer = wrapper.find('[data-test="vco-comment-info-created"]');
    expect(createdContainer.text()).toContain('3');
  });

  it('test if edited time difference is not visible', () => {
    let wrapper = shallow(CommentInfo, {
      propsData: {
        comment: createComment({ editedHoursAgo: null }),
        translations: createTranslation({}),
      },
    });
    let createdContainer = wrapper.find(
      '[data-test="vco-comment-info-edited"]',
    );
    expect(createdContainer.exists()).toBeFalsy();
  });

  it('test given edited date', () => {
    let wrapper = shallow(CommentInfo, {
      propsData: {
        comment: createComment({ editedHoursAgo: 6 }),
        translations: createTranslation({}),
      },
    });
    let createdContainer = wrapper.find(
      '[data-test="vco-comment-info-edited"]',
    );
    expect(createdContainer.text()).toContain('6');
    wrapper.setProps({
      comment: createComment({ editedHoursAgo: 3 }),
    });
    createdContainer = wrapper.find('[data-test="vco-comment-info-edited"]');
    expect(createdContainer.text()).toContain('3');
  });
});
