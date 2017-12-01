<template>
  <textarea
    ref="textarea"
    :class="classInstance"
    :value="value"
    :placeholder="placeholder"
    :row="row"
    v-autosize
    @input="onInput($event)"
  />
</template>

<script>
export default {
  name: 'Textarea',
  props: {
    type: String,
    value: String,
    emitInputEvents: Boolean,
    placeholder: String,
    row: Number,
  },
  computed: {
    classInstance() {
      return {
        'subcomment-textarea-edit': this.type === 'subcommentEdit',
        'subreply-textarea': this.type === 'subcommentReply',
        'main-reply-textarea': !this.type,
      };
    },
  },
  mounted() {
    this.$refs.textarea.focus();
  },
  methods: {
    onInput($event) {
      if (this.emitInputEvents) {
        this.$emit('input', $event);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$borderColor: #ddd;
$placeholderColor: #a2a2a2;

textarea {
  margin: 0;
  padding: 0;
  display: inline-block;
  vertical-align: middle;
  background: white;
  width: 100%;
  border: 1px solid $borderColor;
  resize: none;
}

textarea:focus {
  outline: none;
}

textarea::-webkit-input-placeholder {
  color: $placeholderColor;
}

.subcomment-textarea-edit {
  display: block;
  font-size: 14px;
  min-height: 20px;
  overflow-y: hidden;
  padding: 5px;
}

.subreply-textarea {
  margin-top: 10px;
  padding: 5px 0 5px 10px;
}

.main-reply-textarea {
  display: block;
  font-size: 14px;
  min-height: 70px;
  overflow-y: hidden !important;
  padding: 5px;
}
</style>
