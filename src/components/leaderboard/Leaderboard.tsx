import React, { Component } from 'react';
import * as HttpStatus from 'http-status-codes';
import { Table } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

interface IProps {
}

interface IState {
    rankings: any;
    gamesPlayed: number;
}

export default class LeaderBoard extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            rankings: [] as any,
            gamesPlayed: 0
        };
    }

    async componentDidMount() {
        let url = 'https://ve7erna0rb.execute-api.us-east-1.amazonaws.com/prod/ranks?request=get_ranks'
        let data = await this.getData (url)

        // console.log(data)
        this.setState({
            rankings: data.ranks,
            gamesPlayed: data.gamesPlayed
        })
    }

    async getData (url) {
        try {
          let result = await fetch(url, {
            method: 'GET',
          });

          // Bail if status code is not OK
          if ((result.status).toString() !== (HttpStatus.OK).toString()) return undefined;

          // Read response
          let response = await result.json();
          return response;
        } catch (error) {
          return undefined;
        }
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