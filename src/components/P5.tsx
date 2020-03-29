import React, { Component } from 'react';
import Sketch from "react-p5";

class P5 extends Component {

    x = 50;
    y = 50;

    setup = (p5, canvasParentRef) => {
        p5.createCanvas(500, 500).parent(canvasParentRef); 
        // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
    };
    draw = p5 => {
        p5.background(0);
        p5.ellipse(this.x, this.y, 70, 70);
        // NOTE: Do not use setState in draw function or in functions that is executed in draw function... 
        // pls use normal variables or class properties for this purposes
        this.x++;
    };

    render() {
        return (
            <div>
                <Sketch setup={this.setup} draw={this.draw} />   


                {/* <P5 /> */}

                {/* <div style={{ bottom : '70%', position: 'absolute' }}>
                    <img src={spray} alt='spray' style={{ width: 80, height: 100 }}/>
                    <img src={water} alt='water' style={{ width: 50, height: 50, marginTop: -70 }}/>
                </div> */}

                {/* <div style={{ bottom : '0%', right: '0%', position: 'absolute', padding: 10 }}>
                    {this.state.liveVirus.map((value, index) => {
                        console.log(value)
                        return (
                            <img src={value.url} alt={value.url.concat(value.id)} key={index} 
                                style={{ width: 80, height: 100 }}/>    

                        );
                    })}
                </div> */}

                {/* <div style={{ bottom : '0%', right: '0%', position: 'absolute', padding: 10 }}>
                    {this.state.deadVirus.map((value: any, index: number) => {
                        console.log(value)
                        return (
                            <img src={value.url} alt={value.url.concat(value.id)} key={index} 
                                style={{ width: 80, height: 100 }}/>    

                        );
                    })}
                </div> */}
            </div>

        );
    }
}

export default P5;