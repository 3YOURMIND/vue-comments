<template>
  <div
    :class="classIdentifier"
    @click="internalClick"
    v-text="text"
  />
</template>

<style>
.vco-button {
  width: 100%;
}
</style>

<script>
export default {
  name: 'VcoButton',
  props: {
    text: String,
    warning: Boolean,
    disabled: Boolean,
    black: Boolean,
    gray: Boolean,
    onClick: Function,
  },
  computed: {
    classIdentifier() {
      return {
        'vco-button': true,
        'vco-button--warning': this.warning,
        'vco-button--fake-disabled': this.disabled,
        'vco-button--black': this.black,
        'vco-button--gray': this.gray,
        'vco-button--primary':
          !this.warning && !this.disabled && !this.black && !this.gray,
      };
    },
  },
  methods: {
    internalClick() {
      if (this.onClick !== undefined) {
        this.onClick();
      }
    },
  },
};
</script>
