import React, { Component } from 'react';
import emailjs from 'emailjs-com';
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


export default class ForgetPassword extends Component {


    constructor(props) {
        super(props)
    
        this.state = {
             email: '',
             user: {username: '', password: '', name: ''},
             showForm: true,
             showErrorMessage: false,
             showSuccsessMessage: false,
             showLoudingPart: false,

        }
    }
    

    checkUserDetails=()=>{

        this.setState({showForm: false, showLoudingPart: true})
        axios.get(`/users/findEmail/${this.state.email}`)
        .then(res => {
            if (res.data == '') {
                return this.setState({showLoudingPart: false, showErrorMessage: true})
            }
            else{
                this.setState({showLoudingPart: false, showSuccsessMessage: true})
                this.setState({user: res.data[0]})
            }
        })
        .catch(function (error) {
            return this.setState({showLoudingPart: false, showErrorMessage: true})
        } .bind(this))

        setTimeout(this.sendEmail, 8000)
    }

    
    sendEmail=()=>{
        var templateParams = {
            user_name: this.state.user.username,
            password: this.state.user.password,
            user_email: this.state.email,
            from_name: 'Mendy Joseph',
            to_name: this.state.user.name,
        };
         
        emailjs.send('email_sending', 'template_wnul56q', templateParams, 'user_CgG2cvhyTvZYouXtvi98G') //use your Service ID and Template ID
            .then(function(response) {
               console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
               console.log('FAILED...', error);
            });
    }

    showForm=()=>{
        if (this.state.showForm == true) {
            return( <div>
            <p className='email-message'>Please enter your email address <br/>you are registered by us</p>
            <input onKeyDown={this._handleKeyDown} className='input-style' onChange={_=>{this.setState({email: _.target.value.toLowerCase()})}} placeholder='Email' type='email'></input><br/>
            <button onClick={this.checkUserDetails} className='button-style' type='button'>Send me a email</button>
            </div>)}}


    
    showErrorMessage=()=>{
        if (this.state.showErrorMessage == true) {
            return (<div>
            <div className='error-email-message'>sorry, we couldn't find a user <br/> with that email address</div>
            <p onClick={this.changeToRegister} className='forget-password-text'>Register with <strong>{this.state.email}</strong>?</p>
            <p onClick={()=>{this.setState({showForm: true, showErrorMessage: false,})}} className='register-now-text'>Try again?</p>
            </div> )
        }
    }

    showSuccsessMessage=()=>{
        if (this.state.showSuccsessMessage == true) {
            return(<div>
            <div className='succsess-email-message'>An email with your details is on<br/>the way to <strong>{this.state.email}</strong></div>
            </div>)
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

    changeToLogin=()=>{
        this.props.changeShow('log')
    }

    changeToRegister=()=>{
        this.props.changeShow('register')
    }





    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.checkUserDetails();
        }
    }


    render() {
        return (
            <div className='centre-items'>
            {this.showLoudingPart()}
            {this.showForm()}
            {this.showErrorMessage()}
            {this.showSuccsessMessage()}
            <p onClick={this.changeToLogin} className='register-now-text margin-top'>Back to log in</p>
            </div>
        )
    }
}
