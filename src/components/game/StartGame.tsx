import React, { Component } from 'react';
import { Input, Button, Form } from 'reactstrap';
import Game from './Game';

interface IProps {
}

interface IState {
    startGame: boolean;
    name: string;
    error: boolean;
}

export default class StartGame extends Component<IProps, IState> {
    constructor (props: IProps) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.startGame = this.startGame.bind(this);
        this.state = {
            startGame: false,
            name: '',
            error: false
        }
    };

    async componentDidMount() {
    };

    handleChange(e) {
        if (e.target.id === "name") {
          this.setState({
            name: e.target.value,
          });
        }
    }

    startGame() {
        if (this.state.name === '') {
            this.setState({
                error: true
            })
        } else {
            this.setState({
                startGame: true
            })
        }
        
    }

    render() {
        return (
            <div>
                {
                    (this.state.startGame) ?
                        <Game name={this.state.name}/>
                    :
                    <div style={{ width:'33%', margin: 'auto', marginTop: '25%' }}>
                        <Form onSubmit={this.startGame}>
                        <Input type="text" id="name" placeholder="Enter your name" required
                            onChange={this.handleChange}
                        />
                        {(this.state.error)?
                            <div style={{ color: 'red' }}>
                                Please enter your name.
                            </div> 
                            :
                            null
                        }

                        <div style={{ marginLeft: '35%', marginTop: 30 }}>
                            <Button size="lg" color="secondary" onClick={this.startGame}>
                                START GAME
                            </Button>
                        </div>
                        </Form>

                    </div>
                }
            </div>
        );
    }
}