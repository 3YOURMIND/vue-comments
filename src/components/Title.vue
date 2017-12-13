<template>
  <div :class="titleClass" v-text="translations.title" />
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
  color: #555;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
