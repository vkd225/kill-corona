import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import { Row, Col } from 'reactstrap';

import liveCorona from './../../assets/live.png';
import deadCorona from './../../assets/dead.png';
import spray from './../../assets/spray.png';
import water from './../../assets/water.png';

import Score from './Score';
import GameOver from './Gameover';
import SprayGauge from './SprayGauge';

let width = window.innerWidth-15; let height = window.innerHeight-150;
let sprayImg; let waterImg; let liveImg; let deadImg;
let runwater; 
let spraySpeed = 0;
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
    prevStrike: boolean;
    mousedown: boolean;
    sprayValue: number;
}

export default class Game extends Component<IProps, IState> {
    constructor (props: IProps) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.sketch = this.sketch.bind(this);
        this.checkStrikeSpare = this.checkStrikeSpare.bind(this);
        this.state = {
            turnCount: 0,
            scores: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
            totalScore: 0,
            gameOver: false,
            spare: false,
            strike: false,
            prevStrike: false,
            mousedown: false,
            sprayValue: 0
        }
    };

    async componentDidMount() {
    };

    setSpary = () => {
        if (this.state.mousedown) {
            if (this.state.sprayValue < 100){
                this.setState({ sprayValue: this.state.sprayValue + 1},
                    () => { window.requestAnimationFrame(this.setSpary) }
                )
            }
        }
    }

    spraying = () => {
        window.requestAnimationFrame(this.setSpary);
    }

    toggleMouseDown = () => {
        if(!startKilling){
            this.setState({
                mousedown: !this.state.mousedown
            });
            this.spraying()
        }
    }

    toggleMouseUp = async () => {
        await this.calculateSpraySpeed()
        await this.killVirus()
        this.setState({
            mousedown: !this.state.mousedown,
            sprayValue: 0
        });
    }

    calculateSpraySpeed = async () => {
        spraySpeed = 0.1 * this.state.sprayValue + 3
        return spraySpeed 
    }

    killVirus = async () => {
        startKilling = true;
    }

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

    getDeadVirusCount = () => {
        let deadVirusCount = 0
        for (let i=0; i<virArr.length; i++ ){
            if (virArr[i] === 'dead') {
                deadVirusCount ++
            }
        }
        return deadVirusCount
    }
    
    async checkStrikeSpare (score: number) {
        if (score === 10) {
            return true
        } else {
            return false
        }
    }

    async setDeadVirusCountScores() {
        // send scores to Score component
        let deadVirusCount = this.getDeadVirusCount()
        this.setState({ 
            turnCount: this.state.turnCount + 1
        })

        if (this.state.turnCount % 2 === 1) {
            let newScores = this.state.scores.slice()
            if (this.state.strike) {
                newScores[this.state.turnCount - 1] = 2 * deadVirusCount
                this.setState({ prevStrike: true})
            } else if(this.state.spare) {
                newScores[this.state.turnCount - 1] = 2 * deadVirusCount

            } else {
                newScores[this.state.turnCount - 1] = deadVirusCount
            }

            // check if strike or not
            let strikeSpare = await this.checkStrikeSpare (deadVirusCount)
            this.setState({ 
                scores: newScores,
                totalScore: this.state.totalScore + newScores[this.state.turnCount - 1],
                strike: strikeSpare
            })

            if (this.state.strike) {
                resetVirus = true
                await this.setState({ 
                    turnCount: this.state.turnCount + 1,
                    spare: false
                })
                newScores[this.state.turnCount - 1] = 0
            }
        } else if (this.state.turnCount % 2 === 0){
            let newScores = this.state.scores.slice()

            if (this.state.prevStrike) {
                newScores[this.state.turnCount - 1] = 2 * (deadVirusCount - (this.state.scores[this.state.turnCount-2]/2))

            } else if (this.state.spare) {
                newScores[this.state.turnCount - 1] = deadVirusCount - (this.state.scores[this.state.turnCount-2]/2)

            } else {
                newScores[this.state.turnCount - 1] = deadVirusCount - this.state.scores[this.state.turnCount-2]
            }

            // check if spare or not
            let strikeSpare = await this.checkStrikeSpare (deadVirusCount)
            
            this.setState({ 
                scores: newScores,
                totalScore: this.state.totalScore + newScores[this.state.turnCount - 1],
                strike: false,
                prevStrike: false,
                spare: strikeSpare
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
            p.background('rgb(245,245,245)');
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
                // return speed of spray
                // return ((8/1560)*width);
                return spraySpeed
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
                        <GameOver totalScore={this.state.totalScore} username={this.props.name}/>
                    :
                    <div style={{ margin: 20, marginTop: 5, textAlign: "center" }}>
                        <Row>
                            <P5Wrapper sketch={this.sketch} />
                        </Row>
                        {/* <Button size="lg" color="secondary" onClick={this.killVirus}>
                            SPRAY
                        </Button> */}
                        <Row style={{ paddingTop: 10}}>
                            <Col xs="1" sm="1" md="1">
                                <button
                                    onMouseDown={this.toggleMouseDown} onMouseUp={this.toggleMouseUp}
                                    style = {{ border: 'None', backgroundColor: 'Transparent' }}
                                >
                                    <SprayGauge sprayValue={this.state.sprayValue} />
                                </button>
                            </Col>
                            <Col>
                                <Score 
                                score ={this.state.scores} 
                                turn={this.state.turnCount}
                                totalScore={this.state.totalScore}
                                name={this.props.name}
                                />
                            </Col>
                        </Row>
                    </div>
                }
            </div>
            
        );
    }
}