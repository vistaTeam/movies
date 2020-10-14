import React, { Component } from 'react'
import background from './img/backround.jpg';
import Header from './Header.js'


export default class Dashboard extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }

    
    render() {
        return (
            <div>
                <img className='bg-dashboard' src={background}></img>
                <Header/>


                
            </div>
        )
    }
}
