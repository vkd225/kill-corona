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
            <div style={{ margin: '20%', marginTop: '10%' }}>
                <h2 style={{ marginLeft: -30, padding: 10 }}>Rules: </h2>
                <h5>1. Press and hold "SPRAY" to control the speed of spray.</h5>
                <h5>2. If you hit a strike (kill all virues on your 1st attempt), you double your score for next two turns.</h5>
                <h5>3. If you hit a spare (kill all virues on 2nd attempt), you double your score for next turn.</h5>
                <h5>4. Always have fun !!!</h5>

                <Button style={{ margin: 20, marginLeft: -10 }} onClick={this.goToGame}>
                    GO BACK
                </Button>                
            </div>
        );
    }
}