<template>
  <div>
    <div class="row">
      <div class="col-xs-12">
        <B3Title
          :showLine="true"
          :translations="translations"
        />
      </div>
    </div>
    <CommentNoContent
      v-if="this.commentsMapped.length === 0"
      :translations="translations"
    />
    <div class="row" v-else>
      <div class="col-xs-12">
        <div v-for="comment in commentsMapped" :key="comment.id">
          <div class="row" style="font-size: .85em;">
            <div class="col-xs-12">
              <CommentInfo
                :comment="comment"
                :translations="translations"
              />
              <CommentOption
                :translations="translations"
                :comment="comment"
                :userIsAuthenticated="userContext.requestUser.isAuthenticated"
                @comment-option-reply-click="openSubReplyTextarea(comment)"
              />
            </div>
          </div>
          <CommentText
            v-if="!comment.editMode"
            :text="comment.text"
            style="margin-top: 0.5em;"
          />
          <CommentEditArea
            v-else
            style="margin-top: 0.5em;"
            :comment="comment"
            :translations="translations"
            @input="updateSubCommentEditTextarea($event, comment)"
            @comment-edit-option-bar-save-edit-text="saveEditText(comment)"
            @comment-edit-option-bar-cancel-edit-text="cancelEditText(comment)"
          />
          <div class="row vco-comment-container__sub-comments" v-if="comment.subComments.length > 0 || comment.textarea.show">
            <div class="col-xs-12">
              <SubComment
                v-for="subComment in comment.subComments"
                :key="subComment.id"
                :subComment="subComment"
                @updateTextarea="updateSubCommentEditTextarea($event, subComment)"
                @saveText="saveEditText(subComment)"
                @cancelText="cancelEditText(subComment)"
                :translations="translations"
              />
              <CommentReply
                :translations="translations"
                :textValue="''"
                :showTextarea="comment.textarea.show"
                :type="'subcommentReply'"
                :rows="1"
                :showCommentButton="comment.textarea.showCommentButton"
                :mainReplyLoading="comment.textarea.loading"
                @add-comment="addSubComment(comment)"
                @input="updateSubMessage($event, comment)"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <Divider />
            </div>
          </div>
        </div>
      </div>
    </div>
    <CommentReply
      v-if="userContext.requestUser.isAuthenticated"
      :translations="translations"
      :textValue="mainReplyTextarea"
      :mainReplyLoading="mainReplyLoading"
      @input="updateMainTextarea($event)"
      @add-comment="addComment"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import store from '../store/modules/comments/index';

import CommentInfo from './CommentInfo.vue';
import CommentNoContent from './CommentNoContent.vue';
import CommentOption from './CommentOption.vue';
import B3Title from './Title.vue';
import Divider from './Divider.vue';
import CommentEditArea from './CommentEditArea.vue';
import CommentReply from './CommentReply.vue';
import CommentText from './CommentText.vue';
import SubComment from './SubComment.vue';

export default {
  name: 'CommentContainer',
  components: {
    CommentInfo,
    B3Title,
    Divider,
    CommentNoContent,
    CommentOption,
    CommentEditArea,
    CommentReply,
    CommentText,
    SubComment,
  },
  props: {
    translations: Object,
    httpInterfaceActions: Object,
    entity: Object,
    userContext: Object,
  },
  computed: {
    ...mapState({
      commentsMapped(state) {
        const parentComments = [];
        const mappedComments = state.comments.comments.map((comment) => {
          const copy = Object.assign({}, comment);
          copy.isOwner = comment.user.id === state.comments.userData.userId;
          return copy;
        });
        mappedComments.forEach((comment) => {
          if (comment.parent === null) {
            const copy = Object.assign({}, comment);
            copy.textarea.showCommentButton = comment.textarea.text.length > 0;
            parentComments.push(copy);
          }
        });
        const result = [];
        parentComments.forEach((parentComment) => {
          const copy = Object.assign({}, parentComment);
          copy.subComments = mappedComments.filter(
            x => x.parent === parentComment.id,
          );
          result.push(copy);
        });
        return result;
      },
      mainReplyTextarea(state) {
        return state.comments.mainReplyText;
      },
      mainReplyLoading(state) {
        return state.comments.mainReplyLoading;
      },
    }),
  },
  methods: {
    openSubReplyTextarea({ id }) {
      const payload = {
        id,
      };
      this.$store.dispatch('SHOW_SUBREPLY_TEXTAREA', payload);
    },
    updateSubMessage(e, parentComment) {
      const payload = {
        text: e.target.value,
        id: parentComment.id,
      };
      this.$store.dispatch('UPDATE_SUBREPLY_TEXT', payload);
    },
    updateMainTextarea(e) {
      const payload = {
        text: e.target.value,
      };
      this.$store.dispatch('UPDATE_MAIN_TEXTAREA', payload);
    },
    addSubComment({ id, textarea }) {
      if (textarea.loading) {
        return;
      }
      const payload = {
        id,
        text: textarea.text,
      };
      this.$store.dispatch('ADD_SUB_COMMENT', payload);
    },
    addComment() {
      if (this.mainReplyLoading) return;
      this.$store.dispatch('ADD_COMMENT');
      this.$store.dispatch('RESET_MAIN_TEXTAREA');
    },
    updateSubCommentEditTextarea(e, subComment) {
      const payload = {
        id: subComment.id,
        text: e.target.value,
      };
      this.$store.dispatch('UPDATE_EDIT_TEXT', payload);
    },
    cancelEditText(subComment) {
      const payload = {
        id: subComment.id,
      };
      this.$store.dispatch('CANCEL_EDIT', payload);
    },
    saveEditText(comment) {
      if (comment.editLoading) {
        return;
      }
      const payload = {
        id: comment.id,
        text: comment.editText,
      };
      this.$store.dispatch('SAVE_EDIT_TEXT', payload);
    },
  },
  created() {
    const newStore = store(this.httpInterfaceActions);
    this.$store.registerModule('comments', newStore);
  },
  mounted() {
    this.$store.dispatch('ADD_USER_DATA', this.userContext);
    this.$store.dispatch('ADD_PROJECT_DATA', this.entity);
    this.$store.dispatch('FETCH_COMMENTS');
  },
};
</script>

<style lang="scss">
.vco-comment-container__sub-comments
  .vco-subcomment__container:nth-child(n + 2) {
  margin-top: 0.75em;
}

.vco-comment-container__sub-comments {
  border-left: 2px solid #2c66c4;
  margin: 0.5em 0 0 0.5em;
}
</style>
