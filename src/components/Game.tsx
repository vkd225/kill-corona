import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';

import liveCorona from './../assets/live.png';
import deadCorona from './../assets/dead.png';
import spray from './../assets/spray.png';
import water from './../assets/water.png';
import { Button } from 'reactstrap';

import Score from './Score';
import GameOver from './Gameover';

let width = window.innerWidth-40; let height = window.innerHeight-170;
let sprayImg; let waterImg; let liveImg; let deadImg;
let runwater;
const imgWidth = (width/1560) * 50
const imgHeight = (height/745) * 100
let virus = [] as any;
let virArr = [] as any;
let startKilling = false; let resetVirus = false;

interface IProps {
    name: string;
}

interface IState {
    turnCount: number;
    scores: any;
    totalScore: number;
    gameOver: boolean;
    spare: boolean;
    strike: boolean;
}

export default class Game extends Component<IProps, IState> {
    constructor (props: IProps) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.sketch = this.sketch.bind(this);
        this.state = {
            turnCount: 0,
            scores: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
            totalScore: 0,
            gameOver: false,
            spare: false,
            strike: false
        }
    };

    async componentDidMount() {
    };

    moveVirus = () => {
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

    setDeadVirusCountScores() {
        // send scores to Score component
        let deadVirusCount = this.getDeadVirusCount()
        this.setState({ 
            turnCount: this.state.turnCount + 1
        })

        if (this.state.turnCount % 2 === 1){
            let newScores = this.state.scores.slice()
            if(this.state.spare){
                newScores[this.state.turnCount - 1] = 2 * deadVirusCount

            } else {
                newScores[this.state.turnCount - 1] = deadVirusCount
            }

            this.setState({ 
                scores: newScores,
                totalScore: this.state.totalScore + newScores[this.state.turnCount - 1]
            })

        } else if (this.state.turnCount % 2 === 0){
            let newScores = this.state.scores.slice()

            if(this.state.spare) {
                newScores[this.state.turnCount - 1] = deadVirusCount - (this.state.scores[this.state.turnCount-2]/2)

                // check if spare or not
                if (((newScores[this.state.turnCount - 2]/2)  + newScores[this.state.turnCount - 1]) === 10){
                    this.setState({ spare: true })
                } else {
                    this.setState({ spare: false })
                }
            } else {
                newScores[this.state.turnCount - 1] = deadVirusCount - this.state.scores[this.state.turnCount-2]

                // check if spare or not
                if (((newScores[this.state.turnCount - 2])  + newScores[this.state.turnCount - 1]) === 10){
                    this.setState({ spare: true })
                } else {
                    this.setState({ spare: false })
                }
            }
            
            this.setState({ 
                scores: newScores,
                totalScore: this.state.totalScore + newScores[this.state.turnCount - 1]
            })
            resetVirus = true

            
        }

        if (this.state.turnCount === 10){
            this.setState({
                gameOver: true
            })
        }
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
                this.setDeadVirusCountScores()
            }

            if (resetVirus) {
                startGame()
                resetVirus = false
            }

            this.moveVirus()
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
            <div>
                {
                    (this.state.gameOver) ?
                        <GameOver totalScore={this.state.totalScore}/>
                    :
                    <div style={{ margin: 20, textAlign: "center" }}>
                        <P5Wrapper sketch={this.sketch} />
                        <Button size="lg" color="secondary" onClick={this.killVirus}>
                            SPRAY
                        </Button>
                        <Score 
                            score ={this.state.scores} 
                            turn={this.state.turnCount}
                            totalScore={this.state.totalScore}
                            name={this.props.name}
                        />
                    </div>
                }
            </div>
            
        );
    }
}