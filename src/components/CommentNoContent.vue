<template>
  <div>
    <div class="vco-no-content__text-container">
      <span
        class="vco-no-content__text"
        v-text="translations.noCommentWarning"
      />
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

<style lang="scss">
.vco-no-content__text-container {
  height: 38px;
  text-align: center;
}

.vco-no-content__text {
  color: #a2a2a2;
  line-height: 38px;
}
</style>
