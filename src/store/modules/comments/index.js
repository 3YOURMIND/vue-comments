import actions from './actions';
import mutations from './mutations';
import defaultState from './defaultState';

const storeContructor = (httpActions) => {
  const createActions = actions(httpActions);
  return {
    state: defaultState,
    actions: createActions,
    mutations,
  };
};

export default storeContructor;
