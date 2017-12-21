<template>
  <div class="vco-comment-edit-option-bar__container">
    <div
      class="vco-button--black"
      data-test="vco-comment-edit-option-bar-cancel"
      tabindex="0"
      @click="cancelEditText"
      @keyup.enter="cancelEditText"
    >
      <span v-text="translations.cancel" />
    </div>
    <div
      tabindex="0"
      data-test="vco-comment-edit-option-bar-save"
      :class="loadingButtonClass"
      @click="saveEditText"
      @keyup.enter="saveEditText"
    >
      <span v-text="translations.save" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentEditOptionBar',
  props: {
    comment: Object,
    translations: Object,
  },
  computed: {
    loadingButtonClass() {
      return {
        'vco-button': true,
        'vco-button--disabled': this.comment.editLoading,
      };
    },
  },
  methods: {
    saveEditText() {
      this.$emit('comment-edit-option-bar-save-edit-text');
    },
    cancelEditText() {
      this.$emit('comment-edit-option-bar-cancel-edit-text');
    },
  },
};
</script>

<style lang="scss">
@import '../styles/buttons.scss';

.vco-comment-edit-option-bar__container {
  float: right;
  margin-top: 7px;
}
</style>
