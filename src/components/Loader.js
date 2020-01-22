import React, { Component } from 'react'
import LoaderSVG from '../../src/assets/fonts/loader.svg';

export class Loader extends Component {
    render() {
        return (
            <LoaderSVG width={40} height={40}/>
        )
    }
}

export default Loader
