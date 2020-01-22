import React, { Component } from 'react'
import LoaderSVG from '../../src/assets/fonts/loader.svg';

export class Loader extends Component {
    render() {
        return (
            <img src={LoaderSVG}/>
        )
    }
}

export default Loader
