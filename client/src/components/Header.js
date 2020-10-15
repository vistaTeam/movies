import React, { Component } from 'react';
import { FaSignOutAlt, FaVideo, FaSearch } from 'react-icons/fa';

export default class Header extends Component {


    // logout is cleaning the local storage
    logOut=()=>{
        window.localStorage.removeItem('moviesAccount')
        return window.location.reload(); 
    }


    //changing the pages
    changePage=(p)=>{
        this.props.changePage(p)
    }



    render() {
        return (
                <div className='container margin-top'>
                    <div className='row'>
                        <div className='col-2'></div>
                        <div className='col-3'><div onClick={_=>{this.changePage('search')}} className='my-movies'>
                        <FaSearch /> Search Movies</div></div>
                        <div className='col-3'><div onClick={_=>{this.changePage('myMovies')}} className='my-movies'>
                        <FaVideo /> My movies</div></div>
                        <div className='col-2'> 
                        <i className='bx bx-user'></i>              
                        <div onClick={this.logOut} className='log-out'>
                        <FaSignOutAlt /> Log out</div>
                        <div className='col-2'></div>
               </div>
               </div>
               </div>
        )
    }
}
