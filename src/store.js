import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer';
//import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { clearStorage } from './middlewares';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const initialiseSagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
};

export default function configureStore() {
  const persistedReducer = persistReducer(persistConfig, rootReducer);
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
    persistedReducer,
    composeEnhancers(applyMiddleware(initialiseSagaMiddleware))
    //composeEnhancers(applyMiddleware(thunk, clearStorage))
  );
  const persistor = persistStore(store);

  initialiseSagaMiddleware.run(rootSaga);

  return { store, persistor };
}
