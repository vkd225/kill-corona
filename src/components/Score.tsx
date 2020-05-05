import React, { Component } from 'react';
import { Table } from 'reactstrap';

interface IProps {
    score: number;
    turn: number;
}

interface IState {
    initScore: string;
}

export default class Score extends Component<IProps, IState> {
    constructor (props: IProps) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            initScore: '-'
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
                            <th scope="row" style={{paddingTop: 25}}>Player A</th>
                            <td>
                                <Table>
                                    <tbody>
                                        <tr>
                                            {(this.props.turn === 1 ) ?
                                                <td>{this.props.score}</td>
                                                :
                                                <td>-</td>
                                            }
                                            {(this.props.turn === 2) ?
                                                <td>{this.props.score}</td>
                                                :
                                                <td>-</td>
                                            }
                                        </tr>
                                        <tr style={{textAlign: 'right'}}>
                                            <th style={{border: 'none'}}>
                                                10
                                            </th>
                                        </tr>
                                    </tbody>
                                </Table>
                            </td>
                            <td>
                                <Table>
                                    <tbody>
                                    <tr>
                                        {(this.props.turn === 3) ?
                                            <td>{this.props.score}</td>
                                            :
                                            <td>-</td>
                                        }
                                        {(this.props.turn === 4) ?
                                            <td>{this.props.score}</td>
                                            :
                                            <td>-</td>
                                        }
                                    </tr>
                                    <tr style={{textAlign: 'right'}}>
                                        <th style={{border: 'none'}}>
                                            5
                                        </th>
                                    </tr>
                                    </tbody>
                                </Table>
                            </td>
                            <td>
                                <Table>
                                    <tbody>
                                    <tr>
                                        <td>2</td>
                                        <td>3</td>
                                    </tr>
                                    <tr style={{textAlign: 'right'}}>
                                        <th style={{border: 'none'}}>
                                            5
                                        </th>
                                    </tr>
                                    </tbody>
                                </Table>
                            </td>
                            <td>
                                <Table>
                                    <tbody>
                                    <tr>
                                        <td>2</td>
                                        <td>3</td>
                                    </tr>
                                    <tr style={{textAlign: 'right'}}>
                                        <th style={{border: 'none'}}>
                                            5
                                        </th>
                                    </tr>
                                    </tbody>
                                </Table>
                            </td>
                            <td>
                                <Table>
                                    <tbody>
                                    <tr>
                                        <td>2</td>
                                        <td>3</td>
                                    </tr>
                                    <tr style={{textAlign: 'right'}}>
                                        <th style={{border: 'none'}}>
                                            5
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
                                            25
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