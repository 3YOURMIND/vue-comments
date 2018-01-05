<template>
  <Modal>
    <h4 slot="header" v-text="translations.deleteComments" />
    <div slot="body" v-text="translations.areYouSureDeleteComment" />
    <div slot="footer">
      <div
        class="vco-button--black"
        @click="hideModal"
        v-text="translations.cancel"
      />
      <div
        class="vco-button"
        @click="deleteComment"
        v-text="translations.delete"
      />
    </div>
  </Modal>
</template>

<script>
import Modal from './Modal.vue';

export default {
  name: 'DeleteModal',
  components: {
    Modal,
  },
  props: {
    translations: Object,
  },
  methods: {
    hideModal() {
      this.$emit('hideModal');
    },
    deleteComment() {
      this.$emit('deleteComment');
    },
  },
};
</script>
