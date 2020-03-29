import React, { Component } from 'react';

import liveCorona from './../assets/live.png';
import deadCorona from './../assets/dead.png';
import spray from './../assets/spray.png';
import water from './../assets/water.png';

import P5Wrapper from 'react-p5-wrapper';

interface IProps {
}

interface IState {
}

export default class Game extends Component<IProps, IState> {
    constructor (props: IProps) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.getLiveVirus = this.getLiveVirus.bind(this);
        this.getDeadVirus = this.getDeadVirus.bind(this);
        this.sketch = this.sketch.bind(this);

        this.state = {
            liveVirus: [],
            deadVirus: []
        }
    }

    sketch (p: any) {
        const width = window.innerWidth; //1600;
        const height = window.innerHeight; //825;
        const imageSizeX = width/32;
        const imageSizeY = height/10

        let x: number, y: number;      
        let liveimg: any;
        let deadimg: any;
        let sprayimg: any;
        let waterimg: any;
        let xArray = [] as any;

        p.preload = function() {
            liveimg = p.loadImage(liveCorona);
            deadimg = p.loadImage(deadCorona);
            sprayimg = p.loadImage(spray)
            waterimg = p.loadImage(water);
        }

        p.setup = function () {
            p.createCanvas(width, height);
            liveimg.resize(imageSizeX, imageSizeY);
            deadimg.resize(imageSizeX, imageSizeY);
            sprayimg.resize(imageSizeX, imageSizeY);
            waterimg.resize(50, 50);
            x = 50;
            y = 500;
        };

        p.draw = function () {
            p.background(1000);
            p.image(sprayimg, 0, 200)

            p.image(waterimg, x, 200)
            x = x + 3;
            xArray.push(x)
            if (x > width) {
                x = 0;
            }

            for (var i = 0; i < 10; i++) {
                let spot = width-((i*50) + 100)
                p.image(liveimg, spot, y)
                
                if (xArray.includes(spot)) {
                    p.image(deadimg, width -((i*50) + 100), y)
                }
            }

            y = y - 1;
            if (y < 0) {
                y = height;
            }


        };

    };

    async componentDidMount() {
        await this.getLiveVirus();
        await this.getDeadVirus();
    }

    async getLiveVirus(){
        let liveVirus = [] as any;
        for (let i = 0; i<10; i++ ) {
            let object = {
                'id': i,
                'url': liveCorona,
                'status': 'live'
            }
            liveVirus.push(object)
        }

        await this.setState ({
            liveVirus : liveVirus
        })
    }

    async getDeadVirus(){
        let deadVirus = [] as any;
        for (let i = 0; i<10; i++ ) {
            let object = {
                'id': i,
                'url': deadCorona,
                'status': 'dead'
            }
            deadVirus.push(object)
        }
         
        await this.setState ({
            deadVirus : deadVirus
        })

    }
    render() {
        return (
            <div style={{ margin: 20 }}>
                <P5Wrapper sketch={this.sketch} />
            </div>
        );
    }
}