import React, { Component } from 'react';
import { FaAngleLeft, FaAngleRight, FaThumbsDown } from 'react-icons/fa';
import Notiflix from "notiflix-react";
import axios from 'axios';



export default class MyMovies extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             account: {},
             pointOfRes: 0,
             movies: [['temp']],
        }
    }
    

    componentDidMount=()=> {
        this.getMoviesFromDb()
    }

    // get the movies from the DB
    getMoviesFromDb=()=>{
        var account = JSON.parse(window.localStorage.getItem('moviesAccount'))
        this.setState({account: account})
        debugger
        if (account.movies.length > 0) {
            return this.sortMovies(account.movies)
        }

        this.setState({pointOfRes: 0})
        return this.setState({movies: [['temp']]})
    }

    // sorting the movies by arrays
    sortMovies=(m)=>{
        var idx = 0
        var tempResult = []
        while (idx < m.length) {
            if (idx % 10 === 0) tempResult.push([])
            tempResult[tempResult.length - 1].push(m[idx++])}
            this.setState({movies: tempResult})
    }

    // show arrow
    showArrowLeft=()=>{
        if (this.state.movies.length > 1) {
            return(<div onClick={_=>{if (this.state.pointOfRes < this.state.movies.length-1){this.setState({pointOfRes: this.state.pointOfRes + 1})}}} className='love-arrow-left'><FaAngleLeft size={50} className='arrow-left' /></div>)
        }
    }

    // show arrow
    showArrowRight=()=>{
        if (this.state.movies.length > 1) {
            return(<div onClick={_=>{if (this.state.pointOfRes > 0) {this.setState({pointOfRes: this.state.pointOfRes - 1})}}} className='love-arrow-right'><FaAngleRight size={50} className='arrow-right' /></div>)
        }
    }

    // remove a movie from the list
    removeMovie=(m)=>{
        axios.post(`/users/removemovie/${this.state.account._id}`, {m})
        .then(res=>{
            window.localStorage.setItem('moviesAccount', JSON.stringify(res.data))
            Notiflix.Notify.Warning('Movie removed successfully!');
            this.getMoviesFromDb()
        })

        .catch(error=>{
            alert(error)
            console.log(error);
        })
    }


    render() {
        return (
            <div>
            <div className='items-show'>
            {this.state.movies[this.state.pointOfRes].map((e, i)=>{
                if (e.Poster) {
                    return(<div>
                        <div className='hover-image'></div>
                        <div className='movie-title'>{e.Title}</div>
                    <FaThumbsDown onClick={_=>{this.removeMovie(e)}} className='love' size={40}/>
                    <img className='img-show' src={e.Poster}></img>
                </div>)}
            })}
            {this.showArrowLeft()}
            {this.showArrowRight()}
            </div>
            </div>
        )
    }
}

