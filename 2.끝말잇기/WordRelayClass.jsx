import React, { Component } from 'react';

class WordRelay extends Component {

    state = {
        word: '강태웅',
        value: '',
        result: '',
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        if (this.state.word[this.state.word.length-1] === this.state.value[0]) {
            this.setState({
                word: this.state.value,
                value: '',
                result: '딩동댕',
            });
            this.taewoong.focus();
        } else {
            this.setState({
                value: '',
                result: '땡',
            });
            this.taewoong.focus();
        }
    }

    onChangeInput = (e) => {
        this.setState({
            value: e.target.value,
        });
    }

    onRefInput = (c) => {this.taewoong = c};

    render() {
        return (
            <>
                <div>{this.state.word}</div>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.onRefInput} type="text" value={this.state.value} onChange={this.onChangeInput} />
                    <button>입력</button>
                </form>
                <div>{this.state.result}</div>
            </>
        );
    }
}

export default WordRelay;