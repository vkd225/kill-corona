import React, { Component } from 'react';
import { Button } from 'reactstrap';

interface IProps {
    history: any;
}

interface IState {
}

export default class Rules extends Component<IProps, IState> {
    goToGame = () => {
        this.props.history.push('/game');
    }

    render() {
        return (
            <div>
                <Button onClick={this.goToGame}>Go Back to Game</Button>
                <h1>Rules: </h1>
                <h3>- Have fun</h3>
                
            </div>
        );
    }
}