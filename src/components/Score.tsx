import React, { Component } from 'react';
import { Table } from 'reactstrap';

interface IProps {
    score: number;
    turn: number;
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
                            <th scope="row" style={{paddingTop: 25}}>Player A</th>
                            <td>
                                <Table>
                                    <tbody>
                                        <tr>
                                            <td>{this.props.score}</td>
                                            <td >13</td>
                                        </tr>
                                        <tr style={{textAlign: 'right'}}>10</tr>
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
                                    <tr style={{textAlign: 'right'}}>5</tr>
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
                                    <tr style={{textAlign: 'right'}}>5</tr>
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
                                    <tr style={{textAlign: 'right'}}>5</tr>
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
                                    <tr style={{textAlign: 'right'}}>5</tr>
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
                                    <tr>25</tr>
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