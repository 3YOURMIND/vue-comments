import {
  storiesOf
} from 'storybook-vue';

import VcoTitle from '../components/Title.vue';
import stringifyObject from 'stringify-object';

storiesOf('Title', module)
  .add('normal title', () => {
    const translationsObject = {
      title: 'Whatever',
    };
    const translation = stringifyObject(translationsObject);
    return {
      components: {
        VcoTitle
      },
      template: `<VcoTitle :showLine="true" :translations="${translation}" />`
    };
  });
