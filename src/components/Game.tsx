import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';

import liveCorona from './../assets/live.png';
import deadCorona from './../assets/dead.png';
import spray from './../assets/spray.png';
import water from './../assets/water.png';
import { Button } from 'reactstrap';

import Score from './Score';

let width = window.innerWidth-40; let height = window.innerHeight-100;
let sprayImg; let waterImg; let liveImg; let deadImg;
let runwater;
const imgWidth = (width/1560) * 50
const imgHeight = (height/745) * 100
let virus = [] as any;
let virArr = [] as any;
let startKilling = false;

interface IProps {
}

interface IState {
    turnCount: number;
    scores: any;
}

export default class Game extends Component<IProps, IState> {
    constructor (props: IProps) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.sketch = this.sketch.bind(this);
        this.state = {
            turnCount: 0,
            scores: []
        }
    };

    async componentDidMount() {
    };

    resetVirus = () => {
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

    killVirus = () => {
        startKilling = true;
    }

    getDeadVirusCount = () => {
        let deadVirusCount = 0
        for (let i=0; i<virArr.length; i++ ){
            if (virArr[i] === 'dead') {
                deadVirusCount ++
            }
        }
        return deadVirusCount
    }

    setDeadVirusCount() {
        // send scores to Score component
        let deadCount = this.getDeadVirusCount()
        this.setState({ 
            scores: [...this.state.scores, deadCount],
            turnCount: this.state.turnCount + 1
        })
        console.log('Tunr: ', this.state.turnCount)
        console.log('sores: ', this.state.scores)
    }

    sketch = (p: any) => {
        p.preload = () => {
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

        p.setup = () => {
            p.createCanvas(width, height);
            startGame();
            let reset = p.createButton("RESET");
            reset.style('font-size', '25px');
            reset.mousePressed(startGame);
        };

        p.draw = () => {
            p.background(1000);
            p.textSize(32);
            p.image(sprayImg, 0, imgWidth);

            if (startKilling) {
                runwater.render()
                runwater.move()
            }

            if (runwater.getLocation() >= width){
                this.setDeadVirusCount()
            }

            this.resetVirus()
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
                if (this.x > width + this.getSpeed()) {
                    startKilling = false;
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
                <P5Wrapper sketch={this.sketch} />
                <Button color="secondary" onClick={this.killVirus}>SPRAY</Button>
                <Score score ={245} turn={this.state.turnCount}/>
            </div>
        );
    }
}