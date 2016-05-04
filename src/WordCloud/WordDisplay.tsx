import * as React from "react";
import {render} from "react-dom";
import {Phrase} from "../Models/Store";

export class WordDisplay extends React.Component<WordDisplayProps,any> {
    
    wordClicked = (e) => {
        this.props.onPhraseSelected(this.props.phrase);
    }
    
    render() {
        
        var style;
        
        const size = (this.props.phrase ? (this.props.phrase.count | 0) : 0) / this.props.max;
        
        style = {
            fontSize: `${size*300}%`,
        }
        
        
        
        return (
           <span className="tag" style={style}>
                <a href="#" onClick={this.wordClicked} title={this.props.phrase.count}>{this.props.phrase.text}</a>
            </span>
        )
    }
}

export interface WordDisplayProps {
    phrase: Phrase;
    onPhraseSelected: (phrase: Phrase) => void;
    max: number
}