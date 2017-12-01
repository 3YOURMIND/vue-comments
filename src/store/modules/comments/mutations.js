const SET_COMMENTS = (state, obj) => {
  state.comments = obj;
};

const ADD_COMMENT = (state, payload) => {
  const comment = {
    id: payload.id,
    parent: null,
    text: payload.text,
    user: {
      name: state.userData.userProfile,
      id: state.userData.userId,
      service: null,
    },
    createdPrettyDate: Math.round(new Date().getTime() / 1000),
    editedPrettyDate: null,
    textarea: {
      text: '',
      show: false,
      loading: false,
    },
    editMode: false,
    editText: payload.text,
    editLoading: false,
  };
  state.comments.push(comment);
  state.comments.mainReplyText = '';
};

const ADD_SUB_COMMENT = (state, payload) => {
  const comment = {
    id: payload.id,
    parent: payload.parentId,
    text: payload.text,
    user: {
      name: state.userData.userProfile,
      id: state.userData.userId,
      service: null,
    },
    createdPrettyDate: Math.round(new Date().getTime() / 1000),
    editedPrettyDate: null,
    editMode: false,
    editText: payload.text,
    editLoading: false,
  };
  const existingComment = state.comments.find(
    stateComment => stateComment.id === payload.parentId,
  );
  existingComment.textarea.text = '';
  existingComment.textarea.show = false;
  state.comments.push(comment);
};

const UPDATE_SUBREPLY_TEXT = (state, obj) => {
  const commentToChange = state.comments.find(
    comment => comment.id === obj.id,
  );
  if (!commentToChange) {
    return;
  }
  commentToChange.textarea.text = obj.text;
};

const UPDATE_MAIN_TEXTAREA = (state, payload) => {
  state.mainReplyText = payload.text;
};

const SHOW_SUBREPLY_TEXTAREA = (state, payload) => {
  state.comments.find(
    comment => comment.id === payload.id,
  ).textarea.show = true;
};

const DELETE_COMMENT = (state, payload) => {
  const indexToDelete = state.comments.findIndex(
    comment => comment.id === payload.id,
  );
  state.comments.splice(indexToDelete, 1);
};

const ACTIVATE_EDIT_MODE = (state, payload) => {
  state.comments.find(comment => comment.id === payload.id).editMode = true;
};

const UPDATE_EDIT_TEXT = (state, payload) => {
  state.comments.find(comment => comment.id === payload.id).editText =
    payload.text;
};

const CANCEL_EDIT = (state, payload) => {
  const filteredComment = state.comments.find(
    comment => comment.id === payload.id,
  );
  filteredComment.editText = filteredComment.text;
  filteredComment.editMode = false;
};

const SAVE_EDIT_TEXT = (state, payload) => {
  const filteredComment = state.comments.find(
    comment => comment.id === payload.id,
  );
  filteredComment.text = payload.text;
  filteredComment.editMode = false;
  filteredComment.editText = payload.text;
};

const RESET_MAIN_TEXTAREA = (state) => {
  state.mainReplyText = '';
};

const ADD_PROJECT_DATA = (state, payload) => {
  state.project.id = payload.id;
};

const ADD_USER_DATA = (state, payload) => {
  state.userData = payload.requestUser;
};

export default {
  SET_COMMENTS,
  ADD_COMMENT,
  ADD_SUB_COMMENT,
  UPDATE_SUBREPLY_TEXT,
  UPDATE_MAIN_TEXTAREA,
  SHOW_SUBREPLY_TEXTAREA,
  DELETE_COMMENT,
  ACTIVATE_EDIT_MODE,
  UPDATE_EDIT_TEXT,
  CANCEL_EDIT,
  SAVE_EDIT_TEXT,
  RESET_MAIN_TEXTAREA,
  ADD_PROJECT_DATA,
  ADD_USER_DATA,
};
