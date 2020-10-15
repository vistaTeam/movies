import React, { Component } from 'react'
import background from './img/backround.jpg';
import Header from './Header.js';
import SearchPage from './SearchPage';
import MyMovies from './MyMovies';



export default class Dashboard extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             show: 'search',
        }
    }


    // change pages
    changePage=(p)=>{
    this.setState({show: p})
    }

    // showing search page or my movies page
    showPage=()=>{
        if (this.state.show == 'search') {
            return (<SearchPage/>)
        }
        else{
            return (<MyMovies/>)
        }
    }

    
    render() {
        return (
            <div className='container'>
                <img className='bg-dashboard' src={background}></img>
                <Header changePage={this.changePage}/>
                
                {this.showPage()}
            </div>
        )
    }
}
