<template>
  <div class="comment-option" v-if="$djangoContext.requestUser.isAuthenticated">
    <span
      v-show="!comment.editMode"
      class="reply-action"
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

<style lang="scss" scoped>
$b3Blue: #2c66c4;

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
