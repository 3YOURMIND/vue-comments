import { storiesOf } from 'storybook-vue';
import Vue from 'vue';
import Vuex from 'vuex';
import stringifyObject from 'stringify-object';
import VcoTitle from '../src/components/Title.vue';
import VcoTextarea from '../src/components/Textarea.vue';
import Modal from '../src/components/Modal.vue';
import Divider from '../src/components/Divider.vue';
import CommentDropdownOption from '../src/components/CommentDropdownOption';
import CommentEditOptionBar from '../src/components/CommentEditOptionBar';
import CommentContainer from '../src/components/CommentContainer';

Vue.use(Vuex);

storiesOf('CommentContainer', module).add(
  'Default version of comment container',
  () => {
    const translationsObject = {
      title: 'Comments',
      noCommentWarning: 'This Project has no comments',
      commentInfoUserServiceInformation: (comment) => ` from <b>${service}</b>`,
      createdDate: (comment) => comment.createdPrettyDate,
      editedDate: (comment) => `(edited ${comment.editedPrettyDate})`,
      reply: 'Reply',
      edit: 'Edit',
      delete: 'Delete',
      deleteComments: 'Delete Comments',
      areYouSureDeleteComment: 'Are you sure you want to delete this comment?',
      cancel: 'Cancel',
      save: 'Save',
      leaveAComment: 'Leave a comment',
      comment: 'Comment',
    };
    const translations = stringifyObject(translationsObject);

    const httpInterfaceActionsObject = {
      fetchComments: (projectId) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({ value: [] });
          }, 250);
        });
      },
      addComment: (projectId, parentId, text) => {
        return null;
      },
      deleteComment: (projectId, commentId) => {
        return null;
      },
      updateComment: (projectId, id, text) => {
        return null;
      },
    };
    const httpInterfaceActions = stringifyObject(httpInterfaceActionsObject);

    const entityObject = {
      id: 24489,
    };
    const entity = stringifyObject(entityObject);

    const userContextObject = {
      requestUser: {
        email: 'test@gmail.com',
        isAuthenticated: true,
        userId: 1923,
        userProfile: 'test@gmail.com',
      },
    };
    const userContext = stringifyObject(userContextObject);

    return {
      components: {
        CommentContainer,
      },
      template: `
      <div>
        <CommentContainer
          :translations="${translations}"
          :httpInterfaceActions="${httpInterfaceActions}"
          :entity="${entity}"
          :userContext="${userContext}"
        />
      </div>
    `,
      store: new Vuex.Store({}),
    };
  },
);

storiesOf('CommentDropdownOption', module).add(
  'Simple version of dropdown option',
  () => {
    const translationsObject = {
      edit: 'Edit',
      delete: 'Delete',
      deleteComments: 'Delete Comment',
      areYouSureDeleteComment:
        'Are you sure that you want to delete this comment?',
      cancel: 'Cancel',
      delete: 'Delete',
    };
    const translation = stringifyObject(translationsObject);

    return {
      components: {
        CommentDropdownOption,
      },
      template: `
        <div>
          <CommentDropdownOption
            :id="'1241'"
            :editMode="false"
            :type="'main'"
            :translations="${translation}"
          />
        </div>
      `,
    };
  },
);

const createCommentEditOptionBarProps = ({ editLoading = false }) => {
  const translationsObject = {
    save: 'Save',
    cancel: 'Cancel',
  };
  const translations = stringifyObject(translationsObject);

  const commentObject = {
    editLoading,
  };
  const comment = stringifyObject(commentObject);
  return {
    translations,
    comment,
  };
};

storiesOf('CommentEditOptionBar', module)
  .add('edit loading enabled', () => {
    const { translations, comment } = createCommentEditOptionBarProps({
      editLoading: true,
    });
    return {
      components: {
        CommentEditOptionBar,
      },
      template: `
          <div>
            <CommentEditOptionBar
              :translations="${translations}"
              :comment="${comment}"
            />
          </div>
        `,
    };
  })
  .add('edit loading disabled', () => {
    const { translations, comment } = createCommentEditOptionBarProps({
      editLoading: false,
    });
    return {
      components: {
        CommentEditOptionBar,
      },
      template: `
          <div>
            <CommentEditOptionBar
              :translations="${translations}"
              :comment="${comment}"
            />
          </div>
        `,
    };
  });

storiesOf('Divider', module)
  .add('With long texts', () => {
    return {
      components: {
        Divider,
      },
      template: `
        <div>
          <p>Lorem ipsum dolor sit amet, eos augue delectus constituam ei. Dicta liber ad usu, ponderum eleifend adolescens eu sed. Eum no tibique adipisci contentiones. Mea tamquam tibique eu. Pertinacia mnesarchum ne vix, quis copiosae liberavisse ad sed, vel ut aeterno patrioque suscipiantur. Ex vix mandamus scripserit, quo ferri mucius ex.</p>
          <Divider/>
          <p>Lorem ipsum dolor sit amet, eos augue delectus constituam ei. Dicta liber ad usu, ponderum eleifend adolescens eu sed. Eum no tibique adipisci contentiones. Mea tamquam tibique eu. Pertinacia mnesarchum ne vix, quis copiosae liberavisse ad sed, vel ut aeterno patrioque suscipiantur. Ex vix mandamus scripserit, quo ferri mucius ex.</p>
        </div>`,
    };
  })
  .add('With div boxes', () => {
    return {
      components: {
        Divider,
      },
      template: `
        <div>
          <div style="width: 100%; height: 120px; background-color: blue;"></div>
          <Divider/>
          <div style="width: 100%; height: 73px; background-color: red;"></div>
        </div>`,
    };
  });

storiesOf('Modal', module)
  .add('Slots provided', () => {
    return {
      components: {
        Modal,
      },
      template: `<Modal>
        <h4 slot="header">Delete Comments</h4>
        <div slot="body">Are you sure to delete this comment?</div>
        <div slot="footer">
          <button class="vco-button--black" @click="hideModal">Close</button>
          <button class="vco-button" @click="deleteComment">Delete Comment</button>
        </div>
      </Modal>`,
    };
  })
  .add('No slots provided', () => {
    return {
      components: {
        Modal,
      },
      template: `<Modal />`,
    };
  });

storiesOf('Textarea', module)
  .add('Default textarea', () => {
    return {
      components: {
        VcoTextarea,
      },
      template: `<VcoTextarea
        :emitInputEvents="true"
        :placeholder="'default placeholder'"
      />`,
    };
  })
  .add('With type subcommentEdit', () => {
    return {
      components: {
        VcoTextarea,
      },
      template: `<VcoTextarea
        :type="'subcommentEdit'"
        :emitInputEvents="true"
        :placeholder="'default placeholder'"
      />`,
    };
  })
  .add('With type subcommentReply', () => {
    return {
      components: {
        VcoTextarea,
      },
      template: `<VcoTextarea
        :type="'subcommentReply'"
        :emitInputEvents="true"
        :placeholder="'default placeholder'"
      />`,
    };
  });

storiesOf('Title', module).add('Title with no line', () => {
  const translationsObject = {
    title: 'Whatever',
  };
  const translation = stringifyObject(translationsObject);
  return {
    components: {
      VcoTitle,
    },
    template: `<VcoTitle :showLine="true" :translations="${translation}" />`,
  };
});
