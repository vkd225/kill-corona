import React, { Component } from 'react';
// import { Table } from 'reactstrap';
import liveCorona from './../assets/live.png';
// import deadCorona from './../assets/dead.png';


interface IState {
    liveVirus: any
    deadVirus: any;
}

interface IProps {
}

export default class Game extends Component<IProps, IState> {
    constructor (props: IProps) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.getLiveVirus = this.getLiveVirus.bind(this);
        this.state = {
            liveVirus: [],
            deadVirus: []
        }
    }

    async componentDidMount() {
        let virus = []
        for (let i = 0; i<5; i++ ) {
            let object = {
                'id': i,
                'status': 'live',
                'url': 'liveCorona'
            }
            virus.push(object)
        }
         
        await this.setState ({
            liveVirus : virus
        })
    }

    async getLiveVirus() {
    }

    render() {
        return (
            <div>
                <h1>Kill Corona</h1>


                <img src={liveCorona} alt="live-corona" style={{ width: 80, height: 100, right: 10 }}/>
                {/* <img src={deadCorona} alt="dead-corona" style={{ width: 80, height: 100 }}/> */}
            </div>
        );
    }
}