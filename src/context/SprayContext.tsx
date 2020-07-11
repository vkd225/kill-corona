import React, { Component } from 'react'

interface IProps {
}

interface IState {
    data: any;
}

const defaultVal = {}
const SprayContext = React.createContext(defaultVal)

class SprayProvider extends Component<IProps, IState> {
    constructor (props: IProps) {
        super(props);
        this.state = {
            data: {}        }
        
    };

    // Method to update state
    setData = (data) => {
        this.setState((prevState) => ({ data }))
    }

    render() {
        const { children } = this.props
        const { data } = this.state
        const { setData } = this

        return (
        <SprayContext.Provider
            value={{
            data,
            setData,
            }}
        >
            {children}
        </SprayContext.Provider>
        )
    }
}

export default SprayContext

export { SprayProvider }