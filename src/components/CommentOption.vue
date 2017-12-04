<template>
  <div
    v-if="$djangoContext.requestUser.isAuthenticated"
    class="vco-comment-option__container"
  >
    <span
      v-show="!comment.editMode"
      class="vco-comment-option__reply-text"
      @click="onReplyClick"
    >
      <span v-text="translations.reply" />
    </span>
    <CommentDropdownOption
      v-if="comment.isOwner"
      :id="comment.id"
      :editMode="comment.editMode"
      :type="'main'"
      :translations="translations"
    />
  </div>
</template>

<script>
import CommentDropdownOption from './CommentDropdownOption.vue';

export default {
  name: 'CommentOption',
  components: {
    CommentDropdownOption,
  },
  props: {
    comment: Object,
    translations: Object,
  },
  methods: {
    onReplyClick() {
      this.$emit('comment-option-reply-click');
    },
  },
};
</script>

<style lang="scss">
.vco-comment-option__container {
  color: #2c66c4;
  display: inline-block;
  float: right;
}

.vco-comment-option__reply-text {
  cursor: pointer;
  margin-left: 0.5em;
}
</style>
