import React, { Component } from 'react';
import { interpolateRgb } from 'd3-interpolate';
import { color } from 'd3-color';
import LiquidFillGauge from 'react-liquid-gauge';

interface IProps {
}

interface IState {
    value: number;
    mousedown: boolean;
}

export default class SprayGauge extends Component<IProps, IState> {
    constructor (props: IProps) {
        super(props);
        this.state = {
            value: 0,
            mousedown: false
        }
        
    };

    zoom = () => {
        if (this.state.mousedown) {
            if (this.state.value < 100){
                this.setState({ value: this.state.value + 1},
                    () => { window.requestAnimationFrame(this.zoom) }
                )
            }
        }
    }

    zoomIn = () => {
        window.requestAnimationFrame(this.zoom);
    }

    toggleMouseDown = () => {
        this.setState({
            mousedown: !this.state.mousedown
        });
        this.zoomIn()
    }

    toggleMouseUp = () => {
        this.setState({
            mousedown: !this.state.mousedown,
            value: 0
        });
    }

    onDoubleClick = () => {
        console.log('double clicked')
    }

    async componentDidMount() {
    }

    startColor = '#6495ed'; // cornflowerblue
    endColor = '#6495ed'; // cornflowerblue

    render() {
        const radius = 50;
        const interpolate = interpolateRgb(this.startColor, this.endColor);
        const fillColor = interpolate(this.state.value / 100);
        return (
            <div>
                <button
                    onMouseDown={this.toggleMouseDown} onMouseUp={this.toggleMouseUp}
                    onDoubleClick={this.onDoubleClick}
                    style = {{ border: 'None' }}
                >
                    <LiquidFillGauge
                        style={{ margin: '0 auto' }}
                        width={radius * 2}
                        height={radius * 2}
                        value={this.state.value}
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
                                        <tspan className="value" style={valueStyle}>SPRAY</tspan>
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