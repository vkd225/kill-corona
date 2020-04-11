import React, { Component } from 'react';

import liveCorona from './../assets/live.png';
import deadCorona from './../assets/dead.png';
import spray from './../assets/spray.png';
import water from './../assets/water.png';

import P5Wrapper from 'react-p5-wrapper';

interface IProps {
}

interface IState {
    virusR : any;
}

export default class Game extends Component<IProps, IState> {
    constructor (props: IProps) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.sketch = this.sketch.bind(this);
        this.state = {
            virusR : []
        }
    };

    componentDidMount() {
    };

    sketch (p: any) {

        let width = window.innerWidth - 40; let height = window.innerHeight-40;
        let sprayImg; let waterImg; let liveImg; let deadImg;
        let runwater;
        let virus = [] as any;
        let virArr = [] as any

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

            runwater = new WaterImage(100, 100, waterImg);
            
            for (let i=1; i < 11; i++){
                virus[i] = new VirusImage(width - (i*50), height-100, liveImg);
            }

            for (let i=1; i < 11; i++){
                virArr.push('alive')
            }
        };

        p.draw = function() {
            p.background(0);
            runwater.show()
            runwater.move()

            for (let i=1; i < 11; i++){
                virus[i].show();                
                   
                if (virus[i].isDead(runwater)){
                    virArr.splice(i, 1, 'dead')
                }

                if(virArr[i] === 'dead'){
                    virus[i].moveDown();
                    p.fill(0,0,255)
                } else {
                    virus[i].moveUp();
                }
            }
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

            moveUp() {
                this.y = this.y - 2;
                if (this.y < -100) {
                    this.y = -100;
                }
            }

            moveDown() {
                this.y = this.y + 2;
                if (this.y > height) {
                    this.y = height;
                }
            }

            show() {
                p.image(this.img, this.x, this.y);
                // p.rect(this.x, this.y, 50, 100);
            }

            // Checks if the virus is dead or alive
            isDead(runwater) {
                if(runwater.y > this.y+100 || this.y > runwater.y+50) {
                    return false
                }
                if(runwater.x > this.x+50 || this.x > runwater.x+50) {
                    return false
                }
                return true
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
                // if (this.x > width) {
                //     this.x = 50;
                // }
            }

            show() {
                p.image(this.img, this.x, this.y);
                // p.rect(this.x, this.y, 50, 50);
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