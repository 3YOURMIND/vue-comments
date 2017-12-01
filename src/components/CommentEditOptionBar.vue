<template>
  <div>
    <div
      tabindex="0"
      :class="loadingButtonClass"
      @click="saveEditText"
      @keyup.enter="saveEditText"
    >
      <i
        v-if="comment.editLoading"
        class="fa fa-circle-o-notch fa-spin fa-1x fa-fw"
      />
      <span v-text="translations.save" />
    </div>
    <div
      class="btn btn-comment b3-btn-black cancel-btn"
      tabindex="0"
      @click="cancelEditText"
      @keyup.enter="cancelEditText"
    >
      <span v-text="translations.cancel" />
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
        btn: true,
        'btn-comment': true,
        'btn-fake-disabled': this.comment.editLoading,
        'btn-loading': this.comment.editLoading,
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

<style lang="scss" scoped>
.btn-comment {
  float:right;
  margin-top: 0.5em;
}

.cancel-btn {
  margin-right: 0.5em;
}
</style>
