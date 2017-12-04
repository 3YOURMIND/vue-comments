<template>
  <transition name="vco-modal">
    <div class="vco-modal__mask">
      <div class="vco-modal__wrapper">
        <div class="vco-modal__container">
          <div class="vco-modal__header">
            <slot name="header">default header</slot>
          </div>

          <div class="vco-modal__body">
            <slot name="body">default body</slot>
          </div>

          <div class="vco-modal__footer">
            <slot name="footer">
              default footer
              <button class="vco-modal__default-button" @click="closeModal">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss">
.vco-modal__mask {
  position: fixed;
  color: #555;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.vco-modal__header {
  padding: 15px;
  border-bottom: 1px solid #e5e5e5;
  min-height: 16.42857px;
}

.vco-modal__footer {
  padding: 15px;
  text-align: right;
  border-top: 1px solid #e5e5e5;
}

.vco-modal__wrapper {
  display: table-cell;
  vertical-align: middle;
}

.vco-modal__container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  font-family: 'Open Sans', sans-serif;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}

.vco-modal__body {
  margin: 20px 0;
}

.vco-modal__default-button {
  float: right;
}

.vco-modal-enter {
  opacity: 0;
}

.vco-modal-leave-active {
  opacity: 0;
}

.vco-modal-enter .vco-modal__container,
.vco-modal-leave-active .vco-modal__container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
