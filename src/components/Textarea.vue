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
  name: 'VcoTextarea',
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
        'vco-textarea--default': !this.type,
        'vco-textarea--edit': this.type === 'subcommentEdit',
        'vco-textarea--subreply': this.type === 'subcommentReply',
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

<style lang="scss">
$borderColor: #ddd;
$placeholderColor: #a2a2a2;

.vco-textarea {
  margin: 0;
  padding: 0;
  display: inline-block;
  vertical-align: middle;
  background: white;
  width: 100%;
  border: 1px solid $borderColor;
  resize: none;
}

.vco-textarea:focus {
  outline: none;
}

.vco-textarea::-webkit-input-placeholder {
  color: $placeholderColor;
}

.vco-textarea--edit {
  @extend .vco-textarea;
  display: block;
  font-size: 14px;
  min-height: 20px;
  overflow-y: hidden;
  padding: 5px;
}

.vco-textarea--subreply {
  @extend .vco-textarea;
  margin-top: 10px;
  padding: 5px 0 5px 10px;
}

.vco-textarea--default {
  @extend .vco-textarea;
  display: block;
  font-size: 14px;
  min-height: 70px;
  overflow-y: hidden !important;
  padding: 5px;
}
</style>
