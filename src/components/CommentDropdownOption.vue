<template>
  <div class="vcom-dropdown-option__container">
    <Modal v-if="showModal" @close="hideModal">
      <h4 slot="header" v-text="translations.deleteComments" />
      <div slot="body" v-text="translations.areYouSureDeleteComment" />
      <div slot="footer">
        <div
          class="btn b3-btn-black cancel-btn"
          @click="hideModal"
          v-text="translations.cancel"
        />
        <div class="btn" @click="deleteComment" v-text="translations.delete" />
      </div>
    </Modal>

    <div v-if="showArrowIcon">
      <i
        v-if="!menuActive"
        key="arrow-menu-active"
        :class="arrowClass"
        @click="toggleMenu"
      >
        keyboard_arrow_down
      </i>
      <i v-else key="arrow-menu-active" :class="arrowClass" @click="toggleMenu">
        keyboard_arrow_up
      </i>
    </div>

    <ul
      v-if="menuActive"
      :class="subCommentMenuClasses"
      v-on-clickaway="toggleAway"
    >
      <li @click="editComment">
        <span class="dropdown-event" v-text="translations.edit" />
      </li>
      <li @click="showDeleteModal">
        <span class="dropdown-event--warning" v-text="translations.delete" />
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
      return (!editMode && type === 'sub') || (!editMode && type === 'main');
    },
    arrowClass() {
      return {
        'material-icons': true,
        'subcomment-option': !editMode && type === 'sub',
      };
    },
    subCommentMenuClasses() {
      return {
        'comment-dropdown-menu--main': this.type === 'main',
        'comment-dropdown-menu--sub': this.type === 'sub',
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

<style lang="scss" scoped>
.vcom-dropdown-option__container {
  display: inline-block;
  font-size: 14px;
}

.dropdown-event {
  cursor: pointer;
}

.dropdown-event--warning {
  @extend .dropdown-event;
  color: red;
}

@mixin comment-dropdown-menu() {
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
}

.comment-dropdown-menu--sub {
  @include comment-dropdown-menu();
  transform: translate(-60px, 5px);
  color: #2c66c4;
}

.comment-dropdown-menu--main {
  @include comment-dropdown-menu();
  top: 24px;
  right: 16px;
}

.comment-dropdown-menu li {
  padding: 0;
  margin-left: -27px;
}

.comment-dropdown-menu li:nth-child(n + 2) {
  margin-top: 4px;
}
</style>
