<template>
  <div class="comment-info">
    <span class="username">
      <b v-text="comment.user.name" />
      <span
        v-if="comment.user.service"
        v-html="serviceHtml"
      />
    </span>
    <span class="date" v-text="translations.createdDate(comment)" />
    <span
      class="date"
      v-show="comment.editedPrettyDate"
      v-text="translations.editedDate(comment)"
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
    serviceHtml() {
      const baseTranslation = this.translations.commentInfoUserServiceInformation(
        this.comment,
      );
      return `${baseTranslation} <i class="material-icons">verified_user</i>`;
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
