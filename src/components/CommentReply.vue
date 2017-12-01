<template>
  <div>
    <div v-if="showTextarea" class="row">
      <div class="col-xs-12">
        <B3Textarea
          :value="textValue"
          :emitInputEvents="true"
          :type="type"
          :placeholder="translations.leaveAComment"
          :rows="rows"
          @input="propagateInput($event)"
        />
      </div>
    </div>
    <div v-if="showCommentButton" class="row">
      <div class="col-xs-12">
        <div
          tabindex="0"
          :class="commentButtonClass"
          @click="propagateAddComment"
          @keyup.enter="propagateAddComment"
        >
          <i
            v-if="mainReplyLoading"
            class="fa fa-circle-o-notch fa-spin fa-1x fa-fw"
          />
          <span v-text="translations.comment" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import B3Textarea from './Textarea.vue';

export default {
  name: 'CommentReply',
  components: {
    B3Textarea,
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
        btn: true,
        'btn-comment': true,
        'btn-fake-disabled': this.mainReplyLoading,
        'btn-loading': this.mainReplyLoading,
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

<style lang="scss" scoped>
.btn-comment {
  float: right;
  margin-top: 0.5em;
}

.btn-loading {
  cursor: default;
}

.btn-loading i {
  cursor: default;
}
</style>
