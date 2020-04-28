import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';

import liveCorona from './../assets/live.png';
import deadCorona from './../assets/dead.png';
import spray from './../assets/spray.png';
import water from './../assets/water.png';

interface IProps {
}

interface IState {
    virusR: any;
    score: number;
}

let width = window.innerWidth-40; let height = window.innerHeight-100;
let sprayImg; let waterImg; let liveImg; let deadImg;
let runwater;
const imgWidth = (width/1560) * 50
const imgHeight = (height/745) * 100
let virus = [] as any;
let virArr = [] as any;
let startKilling = false;

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

function killVirus() {
    startKilling = true;
    return 'startKilling' 
}

export default class Game extends Component<IProps, IState> {
    constructor (props: IProps) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.sketch = this.sketch.bind(this);
        this.state = {
            virusR: [],
            score: 0
        }
    };

    async componentDidMount() {
        let a = await killVirus()
        console.log(a)
    };

    sketch (p: any) {
        p.preload = function() {
            waterImg = p.loadImage(water);
            sprayImg = p.loadImage(spray)
            liveImg = p.loadImage(liveCorona);
            deadImg = p.loadImage(deadCorona);
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
        
            virArr.length = 0;
            startKilling = false; 
        
            for (let i=1; i < 11; i++){
                virArr.push('alive')
            }
        }

        p.setup = function() {
            p.createCanvas(width, height);
            // let spray = p.createButton("SPRAY");
            // spray.style('font-size', '25px');
            // spray.mousePressed(killVirus);

            startGame();
            let reset = p.createButton("RESET");
            reset.style('font-size', '25px');
            reset.mousePressed(startGame);
        };

        p.draw = function() {
            p.background(1000);
            p.textSize(32);
            p.image(sprayImg, 0, imgWidth);

            if (startKilling) {
                runwater.render()
                runwater.move()
            }

            if (runwater.getLocation() < width){
                runwater.getDeadVirusCount()
            }

            p.textSize(22);
            p.text('YOUR SCORE: ', 0, height-10);
            p.text(runwater.getDeadVirusCount(), 170, height-10);

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
        
            getDeadVirusCount() {
                let deadVirusCount = 0
                for (let i=0; i<virArr.length; i++ ){
                    if (virArr[i] === 'dead') {
                        deadVirusCount ++
                    }
                }
                return deadVirusCount
            }
        
            render() {
                p.image(this.img, this.x, this.y);
            }
        }
    };

    render() {
        return (
            <div style={{ margin: 20 }}>
                <P5Wrapper sketch={this.sketch} />
                <button onClick={killVirus}>
                    SPRAY
                </button>
            </div>
        );
    }
}