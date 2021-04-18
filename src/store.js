import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer';
import thunk from 'redux-thunk';

export default function configureStore() {
  const composeEnhancers = composeWithDevTools;
  // --------- REMOTE DEVTOOL FOR MOBILE -------- //
  /*  const composeEnhancers = composeWithDevTools({
      realtime: true,
      hostname: '192.168.0.17',
      port: 3005,
      autoReconnect: true,
      connectTimeout: 20000,
    }); */
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
}
