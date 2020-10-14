import React, { Component } from 'react';
import axios from 'axios';
import Lottie from 'react-lottie'
import animationData from '../img/loading.json'


const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };


export default class Log extends Component {


    constructor(props) {
        super(props)
    
        this.state = {
             username: "username",
             password: "",
             showForm: true,
             erorMessage: false,
             showLoudingPart: false,
        }

    }

    checkUserDetails=()=>{
        this.setState({showForm: false, showLoudingPart: true})
        axios.get(`/users/findUser/${this.state.username}`)
        .then(res => {
            if (this.state.password == res.data[0].password) {
                window.localStorage.setItem('moviesAccount', JSON.stringify(res.data[0]))
                return window.location.reload(); 
            }
            else{
                this.setState({showLoudingPart: false, erorMessage: true, showForm: true})
            }
        })
        .catch(function (error) {
            this.setState({showLoudingPart: false, erorMessage: true, showForm: true})
        } .bind(this))
    }

    
    changeToRegister=()=>{
        this.props.changeShow('register')
    }

    changeToForgetPassword=()=>{
        this.props.changeShow('forget-password')
    }

    showErorMessage=()=>{
        if (this.state.erorMessage == true) {
            return <p className='eror-message-log-in'>sorry, username or password is incorrect!</p>
        }
    }

    showLoudingPart=()=>{
        if (this.state.showLoudingPart == true) {
            return (
            <Lottie options={defaultOptions}
            height={350}
            width={350}/>)
        }
    }

    showForm=()=>{
        if (this.state.showForm == true) {
            return( <div>

                    <div className='login-header'>Please log in to <br/>start see your movies!</div>
                    {this.showErorMessage()}
                    <form>
                    <input onKeyDown={this._handleKeyDown} className='input-style' onChange={_=>{this.setState({username: _.target.value.toLowerCase()})}} placeholder='Username' type='text'></input><br/>
                    <input onKeyDown={this._handleKeyDown} className='input-style' onChange={_=>{this.setState({password: _.target.value})}} placeholder='Password' type='password'></input><br/>
                    <button onClick={this.checkUserDetails} className='button-style' type='button'>Go head...</button>
                    </form>

                    <p onClick={this.changeToForgetPassword} className='forget-password-text'>Forget Password?</p>
                    <p onClick={this.changeToRegister} className='register-now-text'>Don't have an account? <strong>Register now!</strong></p>

            </div>)
        }
    }



    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.checkUserDetails();
        }
    }
    
    render() {
        return (
            <div className='App'>
                {this.showForm()}
                {this.showLoudingPart()}

               
            </div>
        )
    }
}
