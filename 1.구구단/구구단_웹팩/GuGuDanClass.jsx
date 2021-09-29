import React, { Component } from 'react';

class GuGuDanClass extends Component {
    state = {
        first: Math.ceil(Math.random() * 9),
        second: Math.ceil(Math.random() * 9),
        value: '',
        result: '',
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        if (this.state.first * this.state.second === parseInt(this.state.value)) {
            this.setState({
                result: '정답입니다',
                value: '',
                first: Math.ceil(Math.random() * 9),
                second: Math.ceil(Math.random() * 9),
            });
            this.inputRef.current.focus();
        } else {
            this.setState({
                result: '틀렸습니다',
                value: '',
            })
            this.inputRef.current.focus();
        }
    }

    onChangeInput = (e) => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        return (
            <>
                <div>{this.state.first} 곱하기 {this.state.second}는?</div>
                <form onSubmit={this.onSubmitForm}>
                    <input type="number" value={value} onChange={this.onChangeInput} />
                    <button type="submit">입력</button>
                </form>
                <div>{this.state.result}</div>
            </>
        );
    }
}

export default GuGuDanClass;