<template>
  <div class="vco-dropdown-option__container">
    <Modal v-if="showModal" @close="hideModal">
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

    <div v-if="showArrowIcon">
      <div
        data-test="vco-comment-dropdown-option-open-menu"
        style="transform: rotate(180deg); cursor: pointer;"
        v-if="!menuActive"
        key="arrow-menu-active"
        :class="arrowClass"
        @click="toggleMenu"
      >
        ⌃
      </div>
      <div
        data-test="vco-comment-dropdown-option-close-menu"
        style="transform: translate(0px, 4px); cursor: pointer;"
        v-else
        key="arrow-menu-active"
        :class="arrowClass"
        @click="toggleMenu"
      >
        ⌃
      </div>
    </div>
    <ul
      v-if="menuActive"
      :class="subCommentMenuClasses"
      v-on-clickaway="toggleAway"
    >
      <li @click="editComment">
        <span
          class="vco-dropdown-option__list-item"
          v-text="translations.edit"
        />
      </li>
      <li @click="showDeleteModal">
        <span
          class="vco-dropdown-option__list-item--warning"
          v-text="translations.delete"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { mixin as VueClickaway } from 'vue-clickaway';
import Modal from './Modal.vue';

export default {
  name: 'CommentDropdownOption',
  components: {
    Modal,
  },
  mixins: [VueClickaway],
  props: {
    id: String,
    editMode: Boolean,
    type: String,
    translations: Object,
  },
  data() {
    return {
      showModal: false,
      menuActive: false,
    };
  },
  computed: {
    showArrowIcon() {
      return (
        (!this.editMode && this.type === 'sub') ||
        (!this.editMode && this.type === 'main')
      );
    },
    arrowClass() {
      return {
        'subcomment-option': !this.editMode && this.type === 'sub',
      };
    },
    subCommentMenuClasses() {
      return {
        'vco-dropdown-option__menu--main': this.type === 'main',
        'vco-dropdown-option__menu--sub': this.type === 'sub',
      };
    },
  },
  methods: {
    hideModal() {
      this.showModal = false;
    },
    toggleMenu() {
      this.menuActive = !this.menuActive;
    },
    toggleAway() {
      this.menuActive = false;
    },
    deleteComment() {
      this.showModal = false;
      const payload = {
        id: this.id,
      };
      this.$store.dispatch('DELETE_COMMENT', payload);
      this.menuActive = false;
    },
    editComment() {
      const payload = {
        id: this.id,
      };
      this.$store.dispatch('ACTIVATE_EDIT_MODE', payload);
      this.menuActive = false;
    },
    showDeleteModal() {
      this.menuActive = false;
      this.showModal = true;
    },
  },
};
</script>

<style lang="scss">
@import '../styles/buttons.scss';

.vco-dropdown-option__container {
  display: inline-block;
  font-size: 14px;
}

.vco-dropdown-option__list-item {
  cursor: pointer;
}

.vco-dropdown-option__list-item--warning {
  @extend .vco-dropdown-option__list-item;
  color: red;
}

.vco-dropdown-option__menu {
  position: absolute;
  width: 76px;
  z-index: 3;
  border: 1px solid #dfdfdf;
  background-color: white;
  border-radius: 3px;
  list-style-type: none;
  padding-top: 8px;
  padding-bottom: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  li {
    padding: 0;
    margin-left: 12px;
    margin-top: 0px;
  }

  li:nth-child(n + 2) {
    margin-top: 4px;
  }
}

.vco-dropdown-option__menu--sub {
  @extend .vco-dropdown-option__menu;
  transform: translate(-76px, -10px);
  color: #2c66c4;
}

.vco-dropdown-option__menu--main {
  @extend .vco-dropdown-option__menu;
  right: 16px;
  transform: translate(-5px, -10px);
}
</style>
