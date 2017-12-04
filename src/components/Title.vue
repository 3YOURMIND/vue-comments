<template>
  <div :class="this.titleClass" v-text="translations.title" />
</template>

<script>
export default {
  name: 'VcoTitle',
  props: {
    showLine: Boolean,
    translations: Object,
  },
  computed: {
    titleClass() {
      return {
        'vco-title__heading': true,
        'vco-title__line': this.showLine,
      };
    },
  },
};
</script>

<style>
.vco-title__heading {
  margin-top: 10px;
}
</style>
