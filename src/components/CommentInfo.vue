<template>
  <div class="vco-comment-info__container">
    <span class="vco-comment-info__username">
      <b data-test="vco-comment-info-username" v-text="comment.user.name" />
      <span
        v-if="comment.user.service"
        data-test="vco-comment-info-service"
        v-html="serviceHtmlRepresentation"
      />
    </span>
    <span
      data-test="vco-comment-info-created"
      class="vco-comment-info__date"
      v-text="createdDateRepresentation"
    />
    <span
      v-if="comment.editedPrettyDate"
      data-test="vco-comment-info-edited"
      class="vco-comment-info__date"
      v-text="editedDateRepresentation"
    />
  </div>
</template>

<script>
export default {
  name: 'CommentInfo',
  props: {
    comment: Object,
    translations: Object,
  },
  computed: {
    serviceHtmlRepresentation() {
      const baseTranslation = this.translations.commentInfoUserServiceInformation(
        this.comment,
      );
      return `${baseTranslation} `;
    },
    createdDateRepresentation() {
      return this.translations.createdDate(this.comment);
    },
    editedDateRepresentation() {
      return this.translations.editedDate(this.comment);
    },
  },
};
</script>

<style lang="scss">
.vco-comment-info__container {
  display: inline-block;
  font-size: 10px;
}

.vco-comment-info__username {
  color: #2c66c4;
}

.vco-comment-info__date {
  color: #a2a2a2;
  margin-left: 0.5em;
}
</style>
