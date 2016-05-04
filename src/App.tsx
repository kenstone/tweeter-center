import * as React from "react";
import {render} from "react-dom";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {loadTweets} from "./Utils";
import * as moment from "moment";
import {splitIntoSingleWordPhrases, splitIntoTwoWordPhrases} from "./Splitter";
import {Tweet,Phrase} from "./Models/Store";
import {WordCloud} from "./WordCloud/WordCloud";
import {TweetList} from "./TweetList/TweetList";

function mapStateToProps(state, props) {
    return {
        tweets: state.tweets,
        isRefreshing: state.isRefreshing
        
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadTweets: (startTime: moment.Moment, endTime: moment.Moment) => {
            loadTweets(dispatch, startTime, endTime)
        }
    }
}

class App extends React.Component<AppProps, any> {
    
    componentWillMount = () => {
        
        const refreshTweets = () => {
            const endTime = moment.utc();
            const startTime = moment(endTime).add('m', -5);
            
            this.props.loadTweets(startTime, endTime);    
        }
        
        setInterval(refreshTweets, 30000);
        this.setState({selectedPhrase: {}});
        
        refreshTweets();
        
       
    }
    
    phraseSelected = (phrase: Phrase) => {
        this.setState({selectedPhrase: phrase});
        
    }
    
    
    clearSelected = (e) => {
        this.phraseSelected(null);
    }
    
    
    render() {
        
        const singleWords = splitIntoSingleWordPhrases(this.props.tweets);
       // const couplets = splitIntoTwoWordPhrases(this.props.tweets);
       
       var isRefreshing;
       
       if (this.props.isRefreshing) {
           isRefreshing = <div>Refreshing Tweets</div>;
       }
        
        return (
            <div>
                
                {isRefreshing}
            
                <WordCloud phrases={singleWords} onPhraseSelected={this.phraseSelected}/>
                
                
                <button onClick={this.clearSelected}>Clear Tweet Drilldown</button>
                <TweetList tweets={this.props.tweets} tweetIds={this.state.selectedPhrase.TweetIds} />
               
            </div>   
        )
    }
}

export default connect<any, any, AppProps>(mapStateToProps, mapDispatchToProps)(App);

export interface AppProps {
    loadTweets?: (startTime: moment.Moment, endTime: moment.Moment) => void;
    tweets?: Tweet[];
    isRefreshing?: boolean;
}
