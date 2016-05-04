import {each, split, find, filter}  from "lodash";
import {Tweet, Phrase} from "./Models/Store";


const splitIntoSingleWordPhrases = (tweets: Tweet[]): Phrase[] => {
    var phrases: Phrase[] = [];
    
    each(tweets, (tweet) => {
        
        const fixedTweetText = cleanPhrase(tweet.tweet_text);
        
        const words = split(fixedTweetText, ' ');
        collectPhrases(words, tweet, phrases);
        
    });
    
    return filter(phrases, (phrase) => {
        return phrase.count > 1;
    })
}

const splitIntoTwoWordPhrases = (tweets: Tweet[]): Phrase[] => {
     var words: Phrase[] = [];
    
    return words;
}

/**
 * Takes a collection of word phrases, and adds them to a collector of phrases with their counts and tweet Ids
 */
const collectPhrases = (words: string[], tweet: Tweet, phrases: Phrase[]) => {
    each(words, (word) => {
            let existingPhrase = find(phrases, (phrase) => {
                return phrase.text === word;
            });
            
            if (existingPhrase) {
                existingPhrase.count++;
                existingPhrase.TweetIds.push(tweet.id);
            }
            else {
                
                if (word.length > 1) {
                
                    const newPhrase: Phrase = {
                        text: word,
                        count: 1,
                        TweetIds: [tweet.id]
                    }
                    phrases.push(newPhrase);
                }
            }
        })
};

const cleanPhrase = (phrase) => {
    return phrase.replace(':','').replace(';','').replace('RT ','').replace("#angularjs", '').replace('#AngularJS', '').replace(' to ',' ').replace(' for ','').replace(' a ').replace(' the ',' ').replace(' in ',' ').replace(' Angular ','').replace('#javascript','').replace(' with ',' ').replace(' at ',' ').replace(' by ',' ').replace(' of ', ' ').replace('@ngconf','').replace('#ngconf','').replace('#angular2','').replace(' is ', ' ').replace('The','');
}

export {splitIntoSingleWordPhrases, splitIntoTwoWordPhrases}