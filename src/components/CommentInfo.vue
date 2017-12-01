<template>
  <div class="comment-info">
    <span class="username">
      <b v-text="comment.user.name" />
      <span v-if="comment.user.service" v-html="serviceHtmlRepresentation" />
    </span>
    <span class="date" v-text="createdDateRepresentation" />
    <span
      v-if="comment.editedPrettyDate"
      class="date"
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
      return `${baseTranslation} <i class="material-icons">verified_user</i>`;
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

<style scoped>
.material-icons {
  cursor: text;
}

.comment-info {
  display: inline-block;
  font-size: 10px;
}

.username {
  color: #2c66c4;
}

.date {
  color: #a2a2a2;
  margin-left: 0.5em;
}
</style>
