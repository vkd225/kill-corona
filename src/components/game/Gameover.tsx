import React, { Component } from 'react';
import { Button } from 'reactstrap';
import StartGame from './StartGame';

interface IProps {
    totalScore: number;
}

interface IState {
    restart: boolean;
}

export default class Gameover extends Component<IProps, IState> {
    constructor (props: IProps) {
        super(props);
        this.restartGame = this.restartGame.bind(this);
        this.state = {
            restart: false
        }
    };

    restartGame() {
        this.setState({
            restart: true
        })
    }

    render() {
        return (
            <div>
                {(this.state.restart)?
                    <StartGame />
                :
                <div style={{ textAlign: 'center', marginTop: '20%' }}>
                    <h2>GAME OVER</h2>
                    <h2>Your Score: {this.props.totalScore}</h2>
                        <div style={{ marginTop: 30 }}>
                        <Button size="lg" color="secondary" onClick={this.restartGame}>
                            RESTART
                        </Button>
                    </div>
                </div>
                }
            </div>
        );
    }
}
