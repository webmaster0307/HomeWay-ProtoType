import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import promise from "redux-promise";
import rootReducer from "./reducers/index";
import {BrowserRouter,Switch,Route} from 'react-router-dom';
// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql'
});
//middleware settings
// To resolve promise to store we use apply
const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStore(rootReducer, composePlugin(applyMiddleware(thunk)));
//createStoreWithMiddleware(RootReducer)

ReactDOM.render(
    <ApolloProvider client={client}>
    <Provider store={store}>
    <BrowserRouter>
    <App /></BrowserRouter></Provider></ApolloProvider>,document.getElementById('root'));
registerServiceWorker();