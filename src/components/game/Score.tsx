import React, { Component } from 'react';
import { Table } from 'reactstrap';

interface IProps {
    score: number;
    turn: number;
    totalScore: number;
    name: string;
}

interface IState {
}

export default class Score extends Component<IProps, IState> {
    constructor (props: IProps) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
        }
    };

    async componentDidMount() {
    };

    render() {
        return (
            <div>
                <Table bordered size="sm" style={{textAlign: 'center', verticalAlign: 'center'}}>
                    <tbody>
                        <tr>
                            <th scope="row" style={{paddingTop: 25}}>{this.props.name}</th>
                            <td>
                                <Table>
                                    <tbody>
                                        <tr>
                                            <td>{this.props.score[0]}</td>
                                            <td>{this.props.score[1]}</td>
                                        </tr>
                                        <tr style={{textAlign: 'right'}}>
                                            <th style={{border: 'none'}}>
                                                {(this.props.turn > 1) ?
                                                    this.props.score[0] + this.props.score[1]
                                                    :
                                                    (this.props.turn > 0) ?
                                                    this.props.score[0]
                                                    :
                                                    '-'
                                                }
                                            </th>
                                        </tr>
                                    </tbody>
                                </Table>
                            </td>
                            <td>
                                <Table>
                                    <tbody>
                                    <tr>
                                        <td>{this.props.score[2]}</td>
                                        <td>{this.props.score[3]}</td>
                                    </tr>
                                    <tr style={{textAlign: 'right'}}>
                                        <th style={{border: 'none'}}>
                                            {(this.props.turn > 3) ?
                                                this.props.score[2] + this.props.score[3]
                                                :
                                                (this.props.turn > 2) ?
                                                this.props.score[2]
                                                :
                                                '-'
                                            }
                                        </th>
                                    </tr>
                                    </tbody>
                                </Table>
                            </td>
                            <td>
                                <Table>
                                    <tbody>
                                    <tr>
                                        <td>{this.props.score[4]}</td>
                                        <td>{this.props.score[5]}</td>
                                    </tr>
                                    <tr style={{textAlign: 'right'}}>
                                        <th style={{border: 'none'}}>
                                            {(this.props.turn > 5) ?
                                                this.props.score[4] + this.props.score[5]
                                                :
                                                (this.props.turn > 4) ?
                                                this.props.score[4]
                                                :
                                                '-'
                                            }
                                        </th>
                                    </tr>
                                    </tbody>
                                </Table>
                            </td>
                            <td>
                                <Table>
                                    <tbody>
                                    <tr>
                                        <td>{this.props.score[6]}</td>
                                        <td>{this.props.score[7]}</td>
                                    </tr>
                                    <tr style={{textAlign: 'right'}}>
                                        <th style={{border: 'none'}}>
                                            {(this.props.turn > 7) ?
                                                this.props.score[6] + this.props.score[7]
                                                :
                                                (this.props.turn > 6) ?
                                                this.props.score[6]
                                                :
                                                '-'
                                            }
                                        </th>
                                    </tr>
                                    </tbody>
                                </Table>
                            </td>
                            <td>
                                <Table>
                                    <tbody>
                                    <tr>
                                        <td>{this.props.score[8]}</td>
                                        <td>{this.props.score[9]}</td>
                                    </tr>
                                    <tr style={{textAlign: 'right'}}>
                                        <th style={{border: 'none'}}>
                                            {(this.props.turn > 9) ?
                                                this.props.score[8] + this.props.score[9]
                                                :
                                                (this.props.turn > 8) ?
                                                this.props.score[8]
                                                :
                                                '-'
                                            }
                                        </th>
                                    </tr>
                                    </tbody>
                                </Table>
                            </td>
                            <td>
                                <Table>
                                    <tbody>
                                    <tr>
                                        <th>
                                            Total Score
                                        </th>
                                    </tr>
                                    <tr> 
                                        <th style={{border: 'none'}}>
                                            {this.props.totalScore}
                                        </th>
                                    </tr>
                                    </tbody>
                                </Table>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}