import {Tweet} from "../Models/Store";
import {SET_TWEETS, REFRESHING_TWEETS} from "../ActionTypes";

const updateTweets = (state: Tweet[], action) => {
    switch (action.type) {
        case SET_TWEETS: {
            return action.tweets;
        }
        default:
            return state;
    }
}

const isRefreshing = (state: boolean, action) => {
    switch (action.type) {
        case REFRESHING_TWEETS: {
            return action.isRefreshing;
        }
        default:
            return state;
    }
}

export {updateTweets, isRefreshing}