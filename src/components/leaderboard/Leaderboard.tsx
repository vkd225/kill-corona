import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { ApiService }  from './../../services/ApiService';

interface IProps {
}

interface IState {
    rankings: any;
    gamesPlayed: number;
}

export default class LeaderBoard extends Component<IProps, IState> {
    private apiService: ApiService;

    constructor(props: IProps) {
        super(props);
        this.apiService = new ApiService({functions: {}});
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            rankings: [] as any,
            gamesPlayed: 0
        };
    }

    async componentDidMount() {
        let data = await this.apiService.getranks()
        this.setState({
            rankings: data.ranks,
            gamesPlayed: data.gamesPlayed
        })
    }

    render() {
        return (
        <Container fluid style={{ marginTop: 20 }}>
            <Row  style={{ margin: 10, marginTop: 0 }}>
                <Col>
                    <h1>
                        LEADERBOARD
                    </h1>
                </Col>

                <Col>
                    <div style={{ right: 30, position: 'absolute' }}>
                        <h3 style={{ textTransform: 'capitalize', opacity: 0.9 }}>
                            Games Played
                        </h3>
                        <h3 style={{ right: 0, position: 'absolute' }}>
                            {this.state.gamesPlayed}
                        </h3>
                    </div>
                </Col>

            </Row>
            <Row  style={{ margin: 10, marginTop: 0, marginBottom: 0 }}>
                <Col>
                    <Row>
                        <Col >
                            <h2>Rank</h2>
                        </Col>
                        <Col md='7' lg='7' xl='7'>
                            <h2>Name</h2>
                        </Col>
                        <Col>
                            <h2 style={{ right: 20, position: 'absolute'}} >Score</h2>
                        </Col>
                    </Row>
                </Col>
                <Col></Col>
            </Row>
            <Row style={{ margin: 10, marginTop: 0 }}>
                <Col>
                    <Table dark>
                        {this.state.rankings.filter(athletes => athletes.rank < 11)
                            .map((value: any) => {
                        return (
                            <tbody>
                                <tr key={ value.rank } style={{ height: 65 }}>
                                    <th scope='row' className='h4' style={{ paddingLeft: 20 }}>{value.rank}</th>
                                    <td className='h4' style={{ left: '21%', position: 'absolute'}}>{value.username}</td>
                                    <td className='h4' style={{ right: 40, position: 'absolute'}}>{value.score}</td>
                                </tr>
                            </tbody>
                        );
                        })}
                    </Table>
                </Col>

                <Col>
                    <Table dark>
                        {this.state.rankings.filter(athletes => athletes.rank > 10)
                            .map((value: any) => {
                        return (
                            <tbody>
                                <tr key={ value.rank } style={{ height: 65 }}>
                                    <th scope='row' className='h4' style={{ paddingLeft: 20 }}>{value.rank}</th>
                                    <td className='h4' style={{ left: '21%', position: 'absolute'}}>{value.username}</td>
                                    <td className='h4' style={{ right: 40, position: 'absolute'}}>{value.score}</td>
                                </tr>
                            </tbody>
                        );
                        })}
                    </Table>
                </Col>
            </Row>
        </Container>
        );
    }
}