<template>
  <div
    :class="classIdentifier"
    @click="internalClick"
    v-text="text"
  />
</template>

<style scoped>
.btn {
  width: 100%;
}
</style>

<script>
export default {
  name: 'component',
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
        btn: true,
        'btn-warning': this.warning,
        'btn-fake-disabled': this.disabled,
        'b3-btn-black': this.black,
        'b3-btn-gray': this.gray,
        'btn-primary':
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
