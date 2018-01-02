import { storiesOf } from 'storybook-vue';
import stringifyObject from 'stringify-object';
import VcoTitle from '../src/components/Title.vue';
import VcoTextarea from '../src/components/Textarea.vue';
import Modal from '../src/components/Modal.vue';

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
