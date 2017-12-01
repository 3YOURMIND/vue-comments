<template>
  <div class="subreply">
    <div class="row" style="margin-bottom: 5px;">
      <div class="col-xs-12">
        <CommentInfo
          :comment="subComment"
          :translations="translations"
        />
        <CommentDropdownOption
          :id="subComment.id"
          :editMode="subComment.editMode"
          :translations="translations"
          :type="'sub'"
          v-show="subComment.isOwner"
        />
      </div>
    </div>
    <CommentText
      v-if="!subComment.editMode"
      :text="subComment.text"
    />
    <CommentEditArea
      v-else
      :comment="subComment"
      :translations="translations"
      @input="onInput"
      @comment-edit-option-bar-save-edit-text="saveText"
      @comment-edit-option-bar-cancel-edit-text="cancelText"
    />
  </div>
</template>

<script>
import CommentInfo from './CommentInfo.vue';
import CommentDropdownOption from './CommentDropdownOption.vue';
import CommentText from './CommentText.vue';
import CommentEditArea from './CommentEditArea.vue';

export default {
  name: 'SubComment',
  components: {
    CommentInfo,
    CommentDropdownOption,
    CommentText,
    CommentEditArea,
  },
  props: {
    subComment: Object,
    translations: Object,
  },
  methods: {
    onInput($event) {
      this.$emit('updateTextarea', $event);
    },
    saveText() {
      this.$emit('saveText');
    },
    cancelText() {
      this.$emit('cancelText');
    },
  }
};
</script>

<style lang="scss" scoped>
$hover: #f8f8f8;

.subreply {
  padding: 2px 0 2px 4px;
  border-radius: 5px;
}

.subreply:hover {
  background-color: $hover;
}
</style>
