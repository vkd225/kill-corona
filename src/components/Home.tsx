import React, { Component } from 'react';
import { Button } from 'reactstrap';

interface IState {
}

interface IProps {
    history: any;
}

export default class Home extends Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.playGame = this.playGame.bind(this);
        this.showLeaderboard = this.showLeaderboard.bind(this);
    }

    async playGame() {
        this.props.history.push('/game');
    }

    async showLeaderboard() {
        this.props.history.push('/leaderboard');
    }

    render() {
        return (
            <div style={{ textAlign: 'center', marginTop: '20%' }}>
                <h3> Let's kill some virus !!!</h3>
                <Button size="lg" color="secondary" style={{ margin: 40 }} onClick={this.playGame}>
                    Play Game
                </Button>

                <Button size="lg" color="secondary" onClick={this.showLeaderboard}>
                    Show Leaderboard
                </Button>
            </div>
        );
    }
}
