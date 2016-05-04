export interface Store {
    tweets: Tweet[]
}

export interface Tweet {
    id: number;
    timestamp: Date;
    retweet_count: number;
    tweet_text: string;
    tweeted_by: string;
    tweet_id: string;
    created_at: string;
}

export interface Phrase {
    text: string;
    count: number;
    TweetIds: number[];
}