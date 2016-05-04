import * as React from "react";
import {render} from "react-dom";
import {Phrase} from "../Models/Store";
import {WordDisplay} from "./WordDisplay";
import {maxBy, minBy, find} from "lodash";

export class WordCloud extends React.Component<WordCloudProps,any> {
    
    render() {
        
        const maxCount = maxBy(this.props.phrases, (phrase) => {
            
            return phrase ? phrase.count : 0;
        });
        
        const max = (maxCount) ? maxCount.count : 0
        
        var biggest;
        
        if (max) {
            biggest = find(this.props.phrases, (phrase) => {
                return phrase.count === max;
            })
        }
        
        
        return (
            <div>
                {this.props.phrases.map((phrase) => {
                    return <WordDisplay key={phrase.text} phrase={phrase} onPhraseSelected={this.props.onPhraseSelected} max={max} />
                })}
            </div>
        )
    }
}

export interface WordCloudProps {
    phrases: Phrase[];
    onPhraseSelected: (phrase: Phrase) => void;
}