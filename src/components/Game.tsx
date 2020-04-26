import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';

import liveCorona from './../assets/live.png';
import deadCorona from './../assets/dead.png';
import spray from './../assets/spray.png';
import water from './../assets/water.png';

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

        let width = window.innerWidth-40; let height = window.innerHeight-80;
        let sprayImg; let waterImg; let liveImg; let deadImg;
        let runwater;
        const imgWidth = (width/1560) * 50
        const imgHeight = (height/745) * 100
        let virus = [] as any;
        let virArr = [] as any;
        let startKilling = false;
        

        p.preload = function() {
            waterImg = p.loadImage(water);
            sprayImg = p.loadImage(spray)
            liveImg = p.loadImage(liveCorona);
            deadImg = p.loadImage(deadCorona);
        };

        p.setup = function() {
            p.createCanvas(width, height);
            let button = p.createButton("SPRAY");
            button.mousePressed(killVirus);
            startGame();
        };

        function startGame() {
            sprayImg.resize(imgWidth, imgHeight);
            waterImg.resize(imgWidth, imgWidth);
            liveImg.resize(imgWidth, imgHeight);
            deadImg.resize(imgWidth, imgHeight);

            runwater = new WaterImage(imgWidth, imgWidth, waterImg);
            
            for (let i=1; i < 11; i++){
                virus[i] = new VirusImage(width - (i*imgWidth), height-imgHeight);
            }

            for (let i=1; i < 11; i++){
                virArr.push('alive')
            }
        }

        function killVirus() {
            startKilling = true; 
        }

        function resetVirus() {
            for (let i=1; i < 11; i++){           
                if (virus[i].isDead(runwater)){
                    virArr.splice(i, 1, 'dead')
                }

                if(virArr[i] === 'dead'){
                    virus[i].render(deadImg);
                    virus[i].moveDown();
                } else {
                    virus[i].render(liveImg);
                    virus[i].moveUp();
                }
            }
        }

        p.draw = function() {
            p.background(1000);
            p.image(sprayImg, 0, imgWidth);

            if (startKilling) {
                runwater.render()
                runwater.move()
            }

            resetVirus()
        };

        class VirusImage {
            private x: number;
            private y: number;
            constructor(x: number, y: number) {
                this.x = x; 
                this.y = y;
            }

            getSpeed() {
                return ((2/745) * height);
            }

            moveUp() {
                this.y = this.y - this.getSpeed();
                if (this.y < -100) {
                    this.y = height;
                }
            }

            moveDown() {
                this.y = this.y + this.getSpeed();
                if (this.y > height) {
                    this.y = height;
                }
            }

            render(img) {
                p.image(img, this.x, this.y);
            }

            // Checks if the virus is dead or alive
            isDead(runwater) {
                if(runwater.y > this.y+imgHeight || this.y > runwater.y+imgWidth) {
                    return false
                }
                if(runwater.x > this.x+imgWidth || this.x > runwater.x+imgWidth) {
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

            getSpeed() {
                return ((4/1560)*width);
            }

            move() {
                this.x = this.x + this.getSpeed();
                if (this.x > width) {
                    startKilling = false
                    this.x = imgWidth;
                }
            }

            getLocation() {
                return this.x
            }

            render() {
                p.image(this.img, this.x, this.y);
            }
        }
    };

    render() {
        return (
            <div style={{ margin: 20 }}>
                {/* <button onClick={killVirus()}>
                    SPRAY
                </button> */}
                <P5Wrapper sketch={this.sketch} />
            </div>
        );
    }
}