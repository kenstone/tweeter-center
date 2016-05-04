import {Dispatch} from "redux";
import {Tweet} from "./Models/Store";
import {setTweets, setRefreshingTweets} from "./Actions/TweetActions";


require("whatwg-fetch");
require("moment");

const loadTweets = (dispatch: Dispatch, startTime: moment.Moment, endTime?: moment.Moment) => {
    const url = `http://localhost:3000/tweets?startTime=${startTime.toISOString()}&endTime=${endTime.toISOString()}`
    dispatch(setRefreshingTweets(true));
    fetch(url)
        .then(checkStatus)
    .then((response) => {
        return response.json()
    })
    .then((responseJson: Tweet[]) => {
        dispatch(setRefreshingTweets(false));
        dispatch(setTweets(responseJson));
    })
    .catch((ex) => {
        console.log(JSON.stringify(ex));
        dispatch(setRefreshingTweets(false));
    })
    
}

/**
 * Helper that looks at the fetch response to determine if it was actually an error response.
 * By default, it doesn't return a fault for HTTP status code errors
 */
function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText);
        
    throw error
  }
}

export {
    loadTweets
}
