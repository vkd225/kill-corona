import React, { Component } from 'react';
import { interpolateRgb } from 'd3-interpolate';
import { color } from 'd3-color';
import LiquidFillGauge from 'react-liquid-gauge';

import SprayContext from '../../context/SprayContext';

interface IProps {
}

interface IState {
    sprayValue: number;
    mousedown: boolean;
}

export default class SprayGauge extends Component<IProps, IState> {
    static contextType = SprayContext;
    constructor (props: IProps) {
        super(props);
        this.state = {
            sprayValue: 0,
            mousedown: false
        }
    };

    componentDidMount = () => {
        // const sprayValue = this.context
        // console.log(sprayValue) // {sprayValue: 0}
    }

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
        this.setState({
            mousedown: !this.state.mousedown
        });
        this.spraying()
    }

    toggleMouseUp = () => {
        const { data, setData } = this.context
        let newData = {sprayValue: this.state.sprayValue}
        setData(newData)

        // const sprayValue = this.context
        // console.log('coming from sprayGauge', this.state.sprayValue) // {sprayValue: 0}
        this.setState({
            mousedown: !this.state.mousedown,
            sprayValue: 0
        });
    }

    startColor = '#6495ed'; // cornflowerblue
    endColor = '#6495ed'; // cornflowerblue

    render() {
        const radius = 50;
        const interpolate = interpolateRgb(this.startColor, this.endColor);
        const fillColor = interpolate(this.state.sprayValue / 100);
        return (
            <div>
                <button
                    onMouseDown={this.toggleMouseDown} onMouseUp={this.toggleMouseUp}
                    style = {{ border: 'None' }}
                >
                    <LiquidFillGauge
                        style={{ margin: '0 auto' }}
                        width={radius * 2}
                        height={radius * 2}
                        value={this.state.sprayValue}
                        percent="%"
                        textSize={0.8}
                        textOffsetX={0}
                        textOffsetY={0}
                        textRenderer={(props) => {
                            const value = Math.round(props.value);
                            const radius = Math.min(props.height / 2, props.width / 2);
                            const textPixels = (props.textSize * radius / 2);
                            const valueStyle = {
                                fontSize: textPixels
                            };
                            const percentStyle = {
                                fontSize: textPixels * 0.6
                            };

                            return (
                                    <tspan>
                                        <tspan className="value" style={valueStyle}>{value}</tspan>
                                        <tspan style={percentStyle}>{props.percent}</tspan>
                                    </tspan>
                            );
                        }}
                        riseAnimation
                        waveAnimation
                        waveFrequency={2}
                        waveAmplitude={1}
                        gradient
                        circleStyle={{
                            fill: fillColor
                        }}
                        waveStyle={{
                            fill: fillColor
                        }}
                        textStyle={{
                            fill: color('#000').toString(),
                            fontFamily: 'Arial'
                        }}
                        waveTextStyle={{
                            fill: color('#fff').toString(),
                            fontFamily: 'Arial'
                        }}
                    />
                </button>
            </div>
        );
    }
}