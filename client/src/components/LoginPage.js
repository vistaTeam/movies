import React, { Component } from 'react'
import Logo from '../Logo.png'
import '../App.css';
import Log from './LogOrRegister/Log.js'
import Register from './LogOrRegister/Register.js';
import ForgetPassword from './LogOrRegister/ForgetPassword.js'
import clip from './img/Background.mp4';
import axios from 'axios';


export default class LoginPage extends Component {


    constructor(props) {
        super(props)
    
        this.state = {
             show: 'log'
        }
    }
    

    // login or regiter or forget password
    logOrRegister=()=>{
        if (this.state.show == 'log') {
            return <Log changeShow={this.changeShow}></Log>
        }
        else if (this.state.show == 'forget-password') {
            return <ForgetPassword changeShow={this.changeShow}></ForgetPassword>
        }
        else if (this.state.show == 'register') {
            return <Register changeShow={this.changeShow}></Register>
        }
    }


    // change page
    changeShow=(data)=>{
        this.setState({show: data})
    }




    render() {
        return (
            <div className='container'>
                <div className='background-login'> 

                <a href=''><img className='App-logo' src={Logo}></img></a>
                {this.logOrRegister()}

            <video src={clip}
            autoPlay muted loop='loop' id='background-video'/>
            </div>
            </div>
        )
    }
}
