import { storiesOf } from 'storybook-vue';
import stringifyObject from 'stringify-object';
import VcoTitle from '../src/components/Title.vue';
import VcoTextarea from '../src/components/Textarea.vue';

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
