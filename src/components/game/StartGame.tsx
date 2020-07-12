import React, { Component } from 'react';
import { Input, Button, Form } from 'reactstrap';
import Game from './Game';

interface IState {
    startGame: boolean;
    name: string;
    error: boolean;
}

interface IProps {
    history?: any;
}

export default class StartGame extends Component<IProps, IState> {
    constructor (props) {
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

    goToRules = () => {
        this.props.history.push('/rules')
    }

    goToHome = () => {
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                {
                    (this.state.startGame) ?
                        <Game name={this.state.name}/>
                    :
                    <div style={{ width:'33%', margin: 'auto', marginTop: '18%' }}>
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

                            <div style={{ textAlign: 'center', marginTop: 20 }}>
                                <Button size="lg" color="secondary" style={{ marginRight: 10 }} onClick={this.startGame}>
                                    START GAME
                                </Button>

                                <Button size="lg" color="secondary" onClick={this.goToRules}>
                                    SHOW RULES
                                </Button>
                            </div>
                        </Form>

                        <div style={{ textAlign: 'center', marginTop: 50 }}>
                            <Button size="lg" color="secondary" onClick={this.goToHome}>
                                GO BACK HOME
                            </Button>
                        </div>

                    </div>
                }

            </div>
        );
    }
}