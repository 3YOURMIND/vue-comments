<template>
  <div style="display: inline-block; font-size: 14px;">
    <modal v-if="showModal" @close="showModal = false">
      <h4 slot="header" v-text="translations.deleteComments" />
      <div slot="body" v-text="translations.areYouSureDeleteComment" />
      <div slot="footer">
        <div
          class="btn b3-btn-black cancel-btn"
          @click="showModal = false"
          v-text="translations.cancel"
        />
        <div class="btn" @click="deleteComment" v-text="translations.delete" />
      </div>
    </modal>


    <div v-if="!editMode && type === 'sub'">
      <i class="material-icons subcomment-option" @click="toggleMenu" v-if="!menuActive">keyboard_arrow_down</i>
      <i class="material-icons subcomment-option" @click="toggleMenu" v-else>keyboard_arrow_up</i>
    </div>
    <div class="comment-dropdown-option" v-if="!editMode && type === 'main'">
      <i class="material-icons" @click="toggleMenu" v-if="!menuActive">keyboard_arrow_down</i>
      <i class="material-icons" @click="toggleMenu" v-else>keyboard_arrow_up</i>
    </div>


    <ul
      :class="subCommentMenuClasses"
      v-if="menuActive"
      v-on-clickaway="toggleAway"
    >
      <li @click="editComment">
        <span class="dropdown-event" v-text="translations.edit" />
      </li>
      <li @click="showDeleteModal">
        <span class="dropdown-event dropdown-event__warning" v-text="translations.delete" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';
import Modal from './Modal.vue';

export default {
  name: 'sub-comment-dropdown-option',
  components: {
    Modal
  },
  mixins: [
    clickaway,
  ],
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
    subCommentMenuClasses: function getSubCommentMenuClasses() {
      return {
        'comment-dropdown-menu': true,
        'comment-dropdown-menu__main': this.type === 'main',
        'comment-dropdown-menu__sub': this.type === 'sub',
      };
    }
  },
  methods: {
    toggleMenu: function toggleMenu() {
      this.menuActive = !this.menuActive;
    },
    toggleAway: function toggleAway() {
      this.menuActive = false;
    },
    deleteComment: function deleteComment() {
      this.showModal = false;
      const payload = {
        id: this.id,
      };
      this.$store.dispatch('DELETE_COMMENT', payload);
      this.menuActive = false;
    },
    editComment: function editComment() {
      const payload = {
        id: this.id,
      };
      this.$store.dispatch('ACTIVATE_EDIT_MODE', payload);
      this.menuActive = false;
    },
    showDeleteModal: function showDeleteModal() {
      this.menuActive = false;
      this.showModal = true;
    },
  },
};
</script>

<style scoped>
.dropdown-event {
  cursor: pointer;
}

.comment-dropdown-menu {
  position: absolute;
  width: 76px;
  z-index: 3;
  border: 1px solid #dfdfdf;
  background-color: white;
  border-radius: 3px;
  list-style-type: none;
  padding-top: 8px;
  padding-bottom: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,.1);
}

.comment-dropdown-menu__sub {
  transform: translate(-60px, 5px);
  color: #2C66C4;
}

.comment-dropdown-menu__main {
  top: 24px;
  right: 16px;
}

.dropdown-event__warning {
  color: red;
}

.comment-dropdown-menu li {
  padding: 0;
  margin-left: -27px;
}

.comment-dropdown-menu li:nth-child(n+2) {
  margin-top: 4px;
}
</style>
