import {Tweet} from "../Models/Store";
import {SET_TWEETS, REFRESHING_TWEETS} from "../ActionTypes";
const setTweets = (tweets: Tweet[]) => {
    return {
        type: SET_TWEETS,
        tweets
    }
}
const setRefreshingTweets = (isRefreshing: boolean) => {
    return {
        type: REFRESHING_TWEETS,
        isRefreshing
    }
}

export {
    setTweets, setRefreshingTweets
}