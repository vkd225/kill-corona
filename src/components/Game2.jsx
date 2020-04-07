import React, { Component } from 'react';

import liveCorona from './../assets/live.png';
import deadCorona from './../assets/dead.png';
import spray from './../assets/spray.png';
import water from './../assets/water.png';

import P5Wrapper from 'react-p5-wrapper';

// interface IProps {
// }

// interface IState {
//     liveVirus: any,
//     deadVirus: any
// }

export default class Game extends Component {
    constructor (props) {
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

    sketch (p) {
        const width = window.innerWidth; //1600;
        const height = window.innerHeight; //825;
        const imageSizeX = 50;
        const imageSizeY = 100;
        let CENTER ;

        let x, y; 
        let liveimg;
        let deadimg;
        let sprayimg;
        let waterimg;
        let xArray = [];

        p.preload = function() {
            liveimg = p.loadImage(liveCorona);
            deadimg = p.loadImage(deadCorona);
            sprayimg = p.loadImage(spray)
            waterimg = p.loadImage(water);
        }

        p.setup = function () {
            p.createCanvas(width, height);
            p.imageMode(CENTER)
            liveimg.resize(imageSizeX, imageSizeY);
            deadimg.resize(imageSizeX, imageSizeY);
            sprayimg.resize(imageSizeX, imageSizeY);
            waterimg.resize(50, 50);
            x = 0;
            y = height - 100;
        };

        p.draw = function () {
            p.background(1000);

            // x-axis
            for (let i = 0; i < 80; i++) {
                p.stroke(0,0,255)
                p.line(i*40, 0, i*40, height)
            }

            // // y-axis
            // for (let i = 0; i < 400; i++) {
            //     p.stroke(255,0,0)
            //     p.line(0, i*2, width, i*2)
            // }

            p.image(sprayimg, 0, 0)
            p.image(waterimg, x, 0)

            // x = x + 4;
            // xArray.push(x)
            // if (x > width) {
            //     x = 0;
            // }

            for (let i = -1; i < 10; i++) {
                let liveImageX = width-((i*50) + 100)
                
                if (xArray.includes(liveImageX)) {
                    y = y + 2;
                    if (y < 0) {
                        y = height;
                    }
                    p.image(deadimg, width -((i*50) + 100), y)
                } else {
                    p.image(liveimg, liveImageX, y)
                }
            }

            // y = y - 2;
            // if (y < 0) {
            //     y = height;
            // }

        };

    };

    async componentDidMount() {
        await this.getLiveVirus();
        await this.getDeadVirus();
    }

    async getLiveVirus(){
        let liveVirus = [];
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
        let deadVirus = [];
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