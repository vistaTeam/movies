import React, { Component } from 'react';
import axios from 'axios';
import Lottie from 'react-lottie'
import animationData from '../img/loading.json'


// animation settings
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };


export default class Register extends Component {


    constructor(props) {
        super(props)
    
        this.state = {
             username: '',
             password: '',
             email: '',
             name: '',
             rePassword: '',
             usernameError: false,
             emailError: false,
             passwordError: false,
             repasswordError: false,
             showForm: true,
             formRecived: false,
             showEror: false,
             formError: false,
             showLoudingPart: false,
             valid: {email: false, password: false, rePassword: false, username: false}
        }
    }


    // checking username
    async getUsername(e){
        let temp = ''
        await this.setState({username: e.target.value.toLowerCase()})
        
        if (this.state.username == '') {
            this.setState({usernameError: false})
        }

        else if (this.state.username.length < 6) {
            this.setState({usernameError: 'short'});
        }
        else{
                axios.get(`/users/findUser/${this.state.username}`)
                .then(res => {
                    if (res.data.length == 0) {
                        let tempValid = this.state.valid;
                        tempValid.username = true;
                        this.setState({valid: tempValid});
                        this.setState({usernameError: 'valid'});
                    }

                    else{
                        this.setState({usernameError: 'taken'});
                        let tempValid = this.state.valid;
                        tempValid.username = false;
                        this.setState({valid: tempValid});
                    }
                })
                .catch(function (error) {
                    this.setState({usernameError: 'error'});
                } .bind(this))
        }}
    

        // checking email
        async getEmail(e){
            await this.setState({email: e.target.value.toLowerCase()})
            
            if (this.state.email == '') {
                this.setState({emailError: false});
                let tempValid = this.state.valid;
                tempValid.email = false;
                this.setState({valid: tempValid});
            }
    
            else if (this.state.email.length < 8) {
                this.setState({emailError: 'wrong'});
                let tempValid = this.state.valid;
                tempValid.email = false;
                this.setState({valid: tempValid});
            }

            else{
                // checking if email is valid
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if ( re.test(this.state.email) ) {

                    axios.get(`/users/findEmail/${this.state.email}`)
                    .then(res => {
                        if (res.data.length == 0) {
                            let tempValid = this.state.valid;
                            tempValid.email = true;
                            this.setState({valid: tempValid});
                            this.setState({emailError: 'valid'});
                        }
    
                        else{
                            this.setState({emailError: 'taken'});
                            let tempValid = this.state.valid;
                            tempValid.email = false;
                            this.setState({valid: tempValid});
                        }
                    })
                    .catch(function (error) {
                        this.setState({emailError: 'error'});
                    } .bind(this))}
                    else{
                    this.setState({emailError: 'wrong'});
                    let tempValid = this.state.valid;
                    tempValid.email = false;
                    this.setState({valid: tempValid});
                    }}}
    

    // checking the password
    async getPassword(e){
       await this.setState({password: e.target.value})

       this.checkRePassword();
        if (this.state.password == '') {
        this.setState({passwordError: false})
        let tempValid = this.state.valid;
        tempValid.password = false;
        this.setState({valid: tempValid});
        }
        
        else if (this.state.password.length < 7) {
        this.setState({passwordError: 'short'});
        let tempValid = this.state.valid;
        tempValid.password = false;
        this.setState({valid: tempValid});
        }

        else{
            this.setState({passwordError: 'valid'});
            let tempValid = this.state.valid;
            tempValid.password = true;
            this.setState({valid: tempValid});
        }
    }
    
    // checking the rePassword
    async getRePassword(e){
        await this.setState({rePassword: e.target.value})
        this.checkRePassword();
    }


    checkRePassword=()=>{

        var rePassword = this.state.rePassword
         if (rePassword == '') {
         this.setState({repasswordError: false})
         let tempValid = this.state.valid;
         tempValid.password = false;
         this.setState({valid: tempValid});
         }
         
         else if (rePassword != this.state.password) {
         this.setState({repasswordError: 'notMaching'});
         let tempValid = this.state.valid;
         tempValid.password = false;
         this.setState({valid: tempValid});
         }
 
         else{
             this.setState({repasswordError: 'valid'});
             let tempValid = this.state.valid;
             tempValid.rePassword = true;
             tempValid.password = true
             this.setState({valid: tempValid});
         }
     }
     

    //  username message
    usernameMessage=()=>{
        if (this.state.usernameError == 'short') {
            return (<label for='username' style={{color: '#e91c23'}}  className='err'><br/>To short!</label>)
        }
        else if (this.state.usernameError == 'taken') {
            return (<label for='username' style={{color: '#e91c23'}}  className='err'><br/>Taken!</label>)
        }
        else if (this.state.usernameError == 'valid') {
            return (<label for='username' style={{color: '#08b665'}}  className='err'><br/>Valid!</label>)
        }
        else if(this.state.usernameError == 'error') {
            return (<label for='username' style={{color: '#e91c23'}}  className='err'><br/>Error!</label>)
        }
    }

    // email message
    emailMessage=()=>{
            if (this.state.emailError == 'wrong') {
            return (<label for='email' style={{color: '#e91c23'}}  className='err-2'><br/>Wrong!</label>)
        }
        else if (this.state.emailError == 'taken') {
            return (<label for='email' style={{color: '#e91c23'}}  className='err-2'><br/>Registered!</label>)
        }
        else if (this.state.emailError == 'valid') {
            return (<label for='email' style={{color: '#08b665'}}  className='err-2'><br/>Valid!</label>)
        }
        else if(this.state.emailError == 'error') {
            return (<label for='email' style={{color: '#e91c23'}}  className='err-2'><br/>Error!</label>)
        }
    }

    // password message
    passwordMessage=()=>{
        if (this.state.passwordError == 'short') {
            return (<label for='password' style={{color: '#e91c23'}}  className='err'><br/>To short!</label>)
        }
        else if (this.state.passwordError == 'valid') {
            return (<label for='password' style={{color: '#08b665'}}  className='err'><br/>Valid!</label>)
        }
    }

    // rePassword message
    repasswordMessage=()=>{
        if (this.state.repasswordError == 'notMaching') {
            return (<label for='password-2' style={{color: '#e91c23'}}  className='err-2'><br/>Not match!</label>)
        }
        else if (this.state.repasswordError == 'valid') {
            return (<label for='password-2' style={{color: '#08b665'}}  className='err-2'><br/>Valid!</label>)
        }
    }


    // send from to server
    submitForm=()=>{
        this.setState({showForm: false, showLoudingPart: true})
        
        if (this.state.valid.username == true && this.state.valid.password == true
            && this.state.valid.rePassword == true && this.state.valid.email == true) {
        axios.post("/users/add/",
        {username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        name: this.state.name}
        )
        .then(res => {
            this.setState({showLoudingPart: false})
            this.setState({formRecived: true})
        })
        .catch(function (error) {
            this.setState({showLoudingPart: false})
            this.setState({formError: true})
        } .bind(this))
        }

        else{
            this.setState({showLoudingPart: false})
            this.setState({showForm: true})
            this.setState({showEror: true})
        }


    }

    



    // clicking enter to continue
    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.submitForm();
        }
    }

    // the form
    showForm=()=>{
        if (this.state.showForm == true) {
            return(<div>

                <div className='login-header'>Register to start<br/> enjoy our movies</div>
                <div className='centre'>
                <input onKeyDown={this._handleKeyDown} className='input-form-style' id='username' name='username' onChange={this.getUsername.bind(this)} placeholder='Username' type='text'></input>
                {this.usernameMessage()}
                    
                <input onKeyDown={this._handleKeyDown} className='input-form-style' id='email' name='email' onChange={this.getEmail.bind(this)} placeholder='Email' type='email'></input>
                {this.emailMessage()}
                  </div>


                <div className='centre'>
                <input onKeyDown={this._handleKeyDown} className='input-form-style' id='password' name='password' onChange={this.getPassword.bind(this)} placeholder='Password' type='password'></input>
                {this.passwordMessage()}

                <input onKeyDown={this._handleKeyDown} className='input-form-style' id='password-2' onChange={this.getRePassword.bind(this)} placeholder='Re-Password' type='password'></input>
                {this.repasswordMessage()}
                </div>
                <input onKeyDown={this._handleKeyDown} className='centre input-style' name='name' onChange={_=>{this.setState({name: _.target.value})}} placeholder='Your name' type='text'></input>
                {this.showEror()}
                <button className='centre button-style' onClick={this.submitForm}>Register!</button>
                <p onClick={this.changeToLogin} className='register-now-text margin-top'>Back to Log in</p>

                </div>
            )
        }
    }

    // erropr sending the form
    showEror=()=>{
        if (this.state.showEror == true) {
            return <p className='eror-message-log-in'>Sorry, please fill all fields</p>
        }
    }

    // form posted successfully
    formRecived=()=>{
        if (this.state.formRecived == true) {
            return(<div>
                <div className='centre'>
                <div className='succsess-email-message'>Account registered successfully<br/><strong>you can now log in! </strong></div>
                </div>
                <p onClick={this.changeToLogin} className='register-now-text margin-top'>Log in</p>
            
                </div>)
        }
    }


    // error on sending the form to the server
    formError=()=>{
        if (this.state.formError == true) {
            return(<div>
                <div className='login-header'><strong>Error</strong><br/>please try again!</div>
                <p onClick={this.tryAgain} className='register-now-text margin-top'>Try again!</p>
                </div>
            )
        }
    }

    //try again button
    tryAgain=()=>{
        this.setState({username: '', password: '', email: '', name: '', rePassword: '', usernameError: false,
             emailError: false, passwordError: false, repasswordError: false, showForm: true, formRecived: false, showEror: false,
             formError: false, showLoudingPart: false, valid: {username: false, password: false, rePassword: false, email: false}
        })
    }

    //change page to login
    changeToLogin=()=>{
        this.props.changeShow('log')
    }

    // animtion part
    showLoudingPart=()=>{
        if (this.state.showLoudingPart == true) {
            return (
            <Lottie options={defaultOptions}
            height={350}
            width={350}/>)
        }
    }


    render() {
        
        return (
            <div>
              {this.showForm()}
              {this.formRecived()}
              {this.formError()}
            </div>
        )
    }
}
