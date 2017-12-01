<template>
  <div
    class="comment-option"
    v-if="$djangoContext.requestUser.isAuthenticated"
  >
    <span
      class="reply-action"
      v-on:click="onReplyClick"
      v-if="!comment.editMode"
    >
      <span v-text="translations.reply" />
    </span>
    <CommentDropdownOption
      :id="comment.id"
      :editMode="comment.editMode"
      :type="'main'"
      :translations="translations"
      v-show="comment.isOwner"
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

<style lang="scss" scoped>
$b3Blue: #2C66C4;

.comment-option {
  color: $b3Blue;
  display: inline-block;
  float: right;
}

.reply-action {
  cursor: pointer;
  margin-left: 0.5em;
}
</style>
