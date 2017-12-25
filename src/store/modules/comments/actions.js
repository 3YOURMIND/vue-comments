let localHttpInstance = null;

const FETCH_COMMENTS = ({ commit, state }) => {
  localHttpInstance
    .fetchComments(state.project.id)
    .then((response) => {
      const mapped = [];
      response.data.value.forEach((rawComment) => {
        const cloned = Object.assign({}, rawComment);
        cloned.editMode = false;
        cloned.editText = cloned.text;
        cloned.editLoading = false;
        if (cloned.parent == null) {
          cloned.textarea = {
            text: '',
            show: false,
            loading: false,
          };
        }
        mapped.push(cloned);
      });
      commit('SET_COMMENTS', mapped);
    })
    .catch(() => {});
};

const ADD_COMMENT = ({ commit, state }) => {
  if (state.mainReplyText === '') {
    return;
  }
  state.mainReplyLoading = true;
  const mutationPayload = {
    text: state.mainReplyText,
    id: null,
  };
  localHttpInstance
    .addComment(state.project.id, null, mutationPayload.text)
    .then((response) => {
      mutationPayload.id = response.data.id;
      commit('ADD_COMMENT', mutationPayload);
      state.mainReplyLoading = false;
    });
};

const ADD_SUB_COMMENT = ({ commit, state }, payload) => {
  if (payload.text === '') {
    return;
  }
  const mutationPayload = {
    text: payload.text,
    parentId: payload.id,
    id: null,
  };
  const parentComment = state.comments.find(
    (stateComment) => stateComment.id === mutationPayload.parentId,
  );
  parentComment.textarea.loading = true;
  localHttpInstance
    .addComment(
      state.project.id,
      mutationPayload.parentId,
      mutationPayload.text,
    )
    .then((response) => {
      mutationPayload.id = response.data.id;
      commit('ADD_SUB_COMMENT', mutationPayload);
      parentComment.textarea.loading = false;
    });
};

const DELETE_COMMENT = ({ commit, state }, payload) => {
  const mutationPayload = {
    id: payload.id,
  };
  localHttpInstance
    .deleteComment(state.project.id, mutationPayload.id)
    .then(() => {
      commit('DELETE_COMMENT', mutationPayload);
    });
};

const UPDATE_SUBREPLY_TEXT = ({ commit }, payload) => {
  commit('UPDATE_SUBREPLY_TEXT', payload);
};

const UPDATE_MAIN_TEXTAREA = ({ commit }, payload) => {
  commit('UPDATE_MAIN_TEXTAREA', payload);
};

const SHOW_SUBREPLY_TEXTAREA = ({ commit }, payload) => {
  commit('SHOW_SUBREPLY_TEXTAREA', payload);
};

const ACTIVATE_EDIT_MODE = ({ commit }, payload) => {
  commit('ACTIVATE_EDIT_MODE', payload);
};

const UPDATE_EDIT_TEXT = ({ commit }, payload) => {
  commit('UPDATE_EDIT_TEXT', payload);
};

const CANCEL_EDIT = ({ commit }, payload) => {
  commit('CANCEL_EDIT', payload);
};

const SAVE_EDIT_TEXT = ({ commit, state }, payload) => {
  if (payload.text === '') {
    return;
  }
  const editComment = state.comments.find(
    (stateComment) => stateComment.id === payload.id,
  );
  editComment.editLoading = true;
  localHttpInstance
    .updateComment(state.project.id, payload.id, payload.text)
    .then(() => {
      commit('SAVE_EDIT_TEXT', payload);
      editComment.editLoading = false;
    });
};

const RESET_MAIN_TEXTAREA = ({ commit }) => {
  commit('RESET_MAIN_TEXTAREA');
};

const ADD_PROJECT_DATA = ({ commit }, payload) => {
  commit('ADD_PROJECT_DATA', payload);
};

const ADD_USER_DATA = ({ commit }, payload) => {
  commit('ADD_USER_DATA', payload);
};

const createActions = (httpActions) => {
  localHttpInstance = httpActions;
  return {
    FETCH_COMMENTS,
    ADD_COMMENT,
    ADD_SUB_COMMENT,
    DELETE_COMMENT,
    UPDATE_SUBREPLY_TEXT,
    UPDATE_MAIN_TEXTAREA,
    SHOW_SUBREPLY_TEXTAREA,
    ACTIVATE_EDIT_MODE,
    UPDATE_EDIT_TEXT,
    CANCEL_EDIT,
    SAVE_EDIT_TEXT,
    RESET_MAIN_TEXTAREA,
    ADD_PROJECT_DATA,
    ADD_USER_DATA,
  };
};

export default createActions;
