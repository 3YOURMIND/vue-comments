<template>
  <div>
    <div class="row">
      <div class="col-xs-12">
        <B3Textarea
          :type="'subcommentEdit'"
          :value="comment.editText"
          :emitInputEvents="true"
          @input="propagateTextareaInput($event)"
        />
      </div>
    </div>
    <div class="row" style="min-height: 30px;">
      <div class="col-xs-12">
        <CommentEditOptionBar
          :translations="translations"
          :comment="comment"
          @comment-edit-option-bar-save-edit-text="propagateSaveEditText"
          @comment-edit-option-bar-cancel-edit-text="propagateCancelEditText"
        />
      </div>
    </div>
  </div>
</template>

<script>
import B3Textarea from './Textarea.vue';
import CommentEditOptionBar from './CommentEditOptionBar.vue';

export default {
  name: 'CommentEditArea',
  components: {
    B3Textarea,
    CommentEditOptionBar,
  },
  props: {
    comment: Object,
    translations: Object,
  },
  methods: {
    propagateSaveEditText() {
      this.$emit('comment-edit-option-bar-save-edit-text');
    },
    propagateCancelEditText() {
      this.$emit('comment-edit-option-bar-cancel-edit-text');
    },
    propagateTextareaInput($event) {
      this.$emit('input', $event);
    },
  },
};
</script>
