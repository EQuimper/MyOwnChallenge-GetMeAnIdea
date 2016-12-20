import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as toastrReducer} from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form';
import { AuthReducer, IdeasReducer, IdeaReducer, ModalReducer } from '../../modules';

const apiReducer = combineReducers({
  ideas: IdeasReducer,
  idea: IdeaReducer
});

const uiReducer = combineReducers({
  modal: ModalReducer
});

export default combineReducers({
  auth: AuthReducer,
  routing: routerReducer,
  form: formReducer,
  toastr: toastrReducer,
  api: apiReducer,
  ui: uiReducer
});
