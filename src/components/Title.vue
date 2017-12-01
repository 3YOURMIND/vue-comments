<template>
  <div :class="this.titleClass" v-text="translations.title" />
</template>

<style scoped>
div {
  margin-top:10px;
}
</style>

<script>
export default {
  name: 'B3Title',
  props: {
    showLine: Boolean,
    translations: Object,
  },
  computed: {
    titleClass: function getTitleClass() {
      return {
        'b3-heading-title': true,
        line: this.showLine,
      };
    },
  },
};
</script>
