import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducer from "./reducers";
export * from './actions';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer, undefined, applyMiddleware(thunkMiddleware));
export default store;