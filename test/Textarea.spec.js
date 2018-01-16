import { shallow } from '@vue/test-utils';

import Textarea from '../src/components/Textarea.vue';

const createProps = ({
  type = null,
  value = null,
  placeholder = null,
  row = null,
  emitInputEvents = false,
}) => {
  return {
    type,
    value,
    emitInputEvents,
    placeholder,
    row,
  };
};

describe('Textarea Module', () => {
  it('test if one textarea is visible', () => {
    const wrapper = shallow(Textarea, {
      propsData: createProps({}),
    });
    expect(wrapper.findAll('textarea')).toHaveLength(1);
  });

  it('test if default class is visible', () => {
    const wrapper = shallow(Textarea, {
      propsData: createProps({}),
    });
    const classes = wrapper.find('textarea').classes();
    expect(classes).toContain('vco-textarea--default');
  });

  it('test edit type class', () => {
    const wrapper = shallow(Textarea, {
      propsData: createProps({
        type: 'subcommentEdit',
      }),
    });
    const classes = wrapper.find('textarea').classes();
    expect(classes).toContain('vco-textarea--edit');
  });

  it('test sub comment reply class', () => {
    const wrapper = shallow(Textarea, {
      propsData: createProps({
        type: 'subcommentReply',
      }),
    });
    const classes = wrapper.find('textarea').classes();
    expect(classes).toContain('vco-textarea--subreply');
  });

  it('test if value props is working', () => {
    let wrapper = shallow(Textarea, {
      propsData: createProps({
        value: 'test text',
      }),
    });
    expect(wrapper.find('textarea').element.value).toBe('test text');
    wrapper = shallow(Textarea, {
      propsData: createProps({}),
    });
    expect(wrapper.find('textarea').element.value).toBe('');
  });

  it('test if placeholder props is working', () => {
    let wrapper = shallow(Textarea, {
      propsData: createProps({
        placeholder: 'test placeholder',
      }),
    });
    expect(wrapper.find('textarea').element.placeholder).toBe(
      'test placeholder',
    );
    wrapper = shallow(Textarea, {
      propsData: createProps({}),
    });
    expect(wrapper.find('textarea').element.placeholder).toBe('');
  });

  it('test if custom row prop is working', () => {
    const wrapper = shallow(Textarea, {
      propsData: createProps({
        row: 3,
      }),
    });
    expect(wrapper.find('textarea').element.rows).toBe(2);
  });

  it('test input event', () => {
    const wrapper = shallow(Textarea, {
      propsData: createProps({ emitInputEvents: true }),
    });
    const spy = jest.fn();
    wrapper.vm.$on('input', spy);
    const textarea = wrapper.find('textarea');
    textarea.trigger('input', {});
    textarea.trigger('input', {});
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
