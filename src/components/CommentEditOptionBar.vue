<template>
  <div>
    <div
      :class="loadingButtonClass"
      @click="saveEditText"
      @keyup.enter="saveEditText"
      tabindex="0"
    >
      <i
        class="fa fa-circle-o-notch fa-spin fa-1x fa-fw"
        v-if="comment.editLoading"
      />
      <span v-text="translations.save" />
    </div>
    <div
      class="btn btn-comment b3-btn-black cancel-btn"
      @click="cancelEditText"
      @keyup.enter="cancelEditText"
      tabindex="0"
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
