<template>
  <div>
    <div class="no-comments">
      <span class="no-comments-text" v-text="translations.noCommentWarning" />
    </div>
    <Divider />
  </div>
</template>

<script>
import Divider from './Divider.vue';

export default {
  name: 'CommentNoComment',
  components: {
    Divider,
  },
  props: {
    translations: Object,
  },
};
</script>

<style lang="scss" scoped>
$grey: #a2a2a2;
$defaultPlaceholderHeight: 38px;

.no-comments {
  height: $defaultPlaceholderHeight;
  text-align: center;
}

.no-comments-text {
  color: $grey;
  line-height: $defaultPlaceholderHeight;
}
</style>
