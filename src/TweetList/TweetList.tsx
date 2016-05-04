import * as React from "react";
import {render} from "react-dom";
import {Tweet} from "../models/Store";
import {filter} from "lodash";

export class TweetList extends React.Component<TweetListProps, any> {
    render() {
        const tweetsToShow = filter(this.props.tweets, (tweet) => {
            
            return this.props.tweetIds ? this.props.tweetIds.indexOf(tweet.id) > -1 : [];
        })
        
        
        
        
        
        return (
            <div id="tweetList">
                {tweetsToShow.map((tweet: Tweet) => {
                    var rowStyle: any = {};
                    const userUrl = `http://www.twitter.com/${tweet.tweeted_by}`;
                    const tweetUrl = `https://twitter.com/${tweet.tweeted_by}/status/${tweet.tweet_id}`;
                    if (tweet.tweet_text.indexOf('RT') !== 0) {
                        rowStyle.backgroundColor = "rgba(0, 150, 136, 0.29)";
                    }
                    return <div style={rowStyle}><a href={userUrl} target="_new">{tweet.tweeted_by}</a> <a href={tweetUrl} target="_new">says</a>: {tweet.tweet_text}</div>    
                })}
            </div>
        )
        
    }
}

export interface TweetListProps {
    tweets: Tweet[],
    tweetIds: number[]
}