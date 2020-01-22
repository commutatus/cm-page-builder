import React, { Component } from 'react'
import LoaderSVG from '../assets/fonts/loader.svg';

export class Loader extends Component {
    render() {
        return (
            <img src={LoaderSVG}/>
        )
    }
}

export default Loader
