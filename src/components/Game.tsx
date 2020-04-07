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
        this.sketch = this.sketch.bind(this);
        this.state = {
        }
    };

    componentDidMount() {
    };

    sketch (p: any) {

        let width = window.innerWidth - 40; let height = window.innerHeight-40;
        let sprayImg; let waterImg; let liveImg; let deadImg;
        let runwater;
        let virus = [] as any;

        p.preload = function() {
            waterImg = p.loadImage(water);
            sprayImg = p.loadImage(spray)
            liveImg = p.loadImage(liveCorona);
            deadImg = p.loadImage(deadCorona);
        };

        p.setup = function() {
            p.createCanvas(width, height);
            sprayImg.resize(50, 100);
            waterImg.resize(50, 50);
            liveImg.resize(50, 100);
            deadImg.resize(50, 100);

            runwater = new WaterImage(50, 100, waterImg);
            for (let i=1; i < 11; i++){
                virus[i] = new VirusImage(width - (i*50), height-100, liveImg);
            }
        };

        p.draw = function() {
            p.background(0);

            runwater.show()
            runwater.move()

            for (let i=1; i < 11; i++){
                virus[i].show();
                virus[i].move();

                let c = p.color(200, 0,100)

                if (virus[i].x < runwater.x+50 && virus[i].x+50 > runwater.x &&
                    virus[i].y > runwater.y+50 && virus[i].y+100 < runwater.y) {
                        p.fill(c)
                }

                if (virus[i].y < 50) {
                    p.fill(c)
                }
            }

            let d = p.dist(virus)
        };

        class VirusImage { 
            private x: number;
            private y: number;
            private img: any;
            constructor(x: number, y: number, img: any) {
                this.x = x; 
                this.y = y;
                this.img = img;
            }

            move() {
                // this.x = this.x + p.random(-2 , 2)
                this.y = this.y - 2;
                if (this.y < 0) {
                    this.y = height;
                }
            }

            show() {
                // p.image(this.img, this.x, this.y);
                p.rect(this.x, this.y, 50, 100);
            }
        }

        class WaterImage {
            private x: number;
            private y: number;
            private img: any;
            constructor(x: number, y: number, img: any) {
                this.x = x; 
                this.y = y;
                this.img = img;
            }

            move() {
                this.x = this.x + 4;
                if (this.x > width) {
                    this.x = 50;
                }
                // this.y = this.y + p.random(-2 , 2)
            }

            show() {
                // p.image(this.img, this.x, this.y);
                p.rect(this.x, this.y, 50, 50);
            }

        }

    };

    render() {
        return (
            <div style={{ margin: 20 }}>
                <P5Wrapper sketch={this.sketch} />
            </div>
        );
    }
}