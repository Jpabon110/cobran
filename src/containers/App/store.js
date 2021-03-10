import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  sidebarReducer,
  topbarReducer,
  themeReducer,
  login,
  me,
  user,
  gestion,
  contact,
  asignation,
  uploadFileReducer,
} from '../../redux/reducers/index';


const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form",
  theme: themeReducer,
  sidebar: sidebarReducer,
  topbar: topbarReducer,
  login,
  me,
  user,
  contact,
  gestion,
  asignation,
  uploadFileReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
export default store;
