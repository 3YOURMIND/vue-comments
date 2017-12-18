<template>
  <div>
    <div v-if="showTextarea" class="row">
      <div class="col-xs-12">
        <VcoTextarea
          :value="textValue"
          :emitInputEvents="true"
          :type="type"
          :placeholder="translations.leaveAComment"
          :rows="rows"
          @input="propagateInput($event)"
        />
      </div>
    </div>
    <div v-if="showCommentButton" class="row" style="min-height: 30px;">
      <div class="col-xs-12">
        <div class="vco-comment-reply__button-container">
          <div
            tabindex="0"
            :class="commentButtonClass"
            @click="propagateAddComment"
            @keyup.enter="propagateAddComment"
          >
            <span v-text="translations.comment" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VcoTextarea from './Textarea.vue';

export default {
  name: 'CommentReply',
  components: {
    VcoTextarea,
  },
  props: {
    textValue: String,
    mainReplyLoading: Boolean,
    translations: Object,
    showTextarea: {
      type: Boolean,
      default: true,
    },
    showCommentButton: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: null,
    },
    rows: {
      type: Number,
      default: 3,
    },
  },
  computed: {
    commentButtonClass() {
      return {
        'vco-button': true,
        'vco-button--disabled': this.mainReplyLoading,
      };
    },
  },
  methods: {
    propagateInput($event) {
      this.$emit('input', $event);
    },
    propagateAddComment() {
      this.$emit('add-comment');
    },
  },
};
</script>

<style lang="scss">
@import '../styles/buttons.scss';

.vco-comment-reply__button-container {
  float: right;
  margin-top: 7px;
}
</style>
