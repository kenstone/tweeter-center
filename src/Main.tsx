import * as React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import App from "./App";
import {updateTweets, isRefreshing} from "./Reducers/TweetReducer"

const reducer  = (state, action) => {
    return {
        tweets: updateTweets(state.tweets, action),
        isRefreshing: isRefreshing(state.isRefreshing, action)
    }
}

let store = createStore(reducer, {});

render((
        <Provider store={store}>
            <App/>
        </Provider>
    ), document.getElementById('app')
);


