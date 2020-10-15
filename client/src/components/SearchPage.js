import React, { Component } from 'react'
import axios from 'axios';
import { FaAngleLeft, FaAngleRight, FaThumbsUp } from 'react-icons/fa';
import Notiflix from "notiflix-react";

Notiflix.Notify.Init({
    fontFamily: 'Montserrat',
    useGoogleFont: true,
    timeout: 5000
}); 
  
export default class SearchPage extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             res: [['temp']],
             pointOfRes: 0,
        }
    }
    
    // search for movies
    async findSearch(s){
        {this.setState({pointOfRes: 0})}

        if (s.length > 2) {
            await axios.get(`https://www.omdbapi.com/?s=${s}&apikey=fa0ae931`)
        .then(res => {
            if (res.data.totalResults > 10) {

                var searchResult = []
                let index = 0;
                for (index = 0; index < Math.round(res.data.totalResults/10); index++) {
                    axios.get(`https://www.omdbapi.com/?s=${s}&page=${index+1}&apikey=fa0ae931`)
                    .then(res =>{
                        searchResult = [...searchResult, ...res.data.Search]
                        this.findImage(searchResult)
                    })
                    .catch((error)=>{
                        alert(error)
                    })
                }}

            else{
                this.findImage(res.data)
            }

        })
        .catch(function (error) {
        } .bind(this))
        }

        else{
            await this.setState({res: [['temp']]})
        }

    }

    // sort movies only if have a image
    findImage=(a)=>{
        var results = a.filter(e => e.Poster != "N/A" )

        var idx = 0
        var tempResult = []
        while (idx < results.length) {
            if (idx % 5 === 0) tempResult.push([])
            tempResult[tempResult.length - 1].push(results[idx++])}
            this.setState({res: tempResult})
    }

    // sort arrow
    showArrowLeft=()=>{
        if (this.state.res.length > 1) {
            return(<div onClick={_=>{if (this.state.pointOfRes < this.state.res.length-1){this.setState({pointOfRes: this.state.pointOfRes + 1})}}} className='circle-arrow-left'><FaAngleLeft size={50} className='arrow-left' /></div>)
        }
    }

    // sort arrow
    showArrowRight=()=>{
        if (this.state.res.length > 1) {
            return(<div onClick={_=>{if (this.state.pointOfRes > 0) {this.setState({pointOfRes: this.state.pointOfRes - 1})}}} className='circle-arrow-right'><FaAngleRight size={50} className='arrow-right' /></div>)
        }
    }
    
    // add movie to the list
    saveMovie=(m)=>{
        var account = JSON.parse(window.localStorage.getItem('moviesAccount'))

        var already = false;

        account.movies.map((e,i)=>{
            if (e.imdbID == m.imdbID) {
                return already = true;
            }
        })
        if (already == true) {
            return Notiflix.Notify.Info('That movie is already on your list!');
        }

        
        axios.post(`/users/addmovie/${account._id}`, {m})
        .then(res=>{
            Notiflix.Notify.Success('Movie added successfully to your movies');
            window.localStorage.setItem('moviesAccount', JSON.stringify(res.data))
        })

        .catch(error=>{
            alert(error)
            console.log(error);
        })
    }


    render() {

        return (<div>
            <div className='title-search'>Start typing a movie name...</div>
            <div className='row'>
                <div className='col-2'></div>
                <div className='col-8'>
                <input className='input-search-style' onChange={_=>{ this.findSearch(_.target.value.toLowerCase())}} placeholder='Search movie' type='text'></input></div>
                <div className='col-2'></div>
            </div>
            <div className='items-show'>
            {this.state.res[this.state.pointOfRes].map((e, i)=>{
                if (e.Poster) {
                    return(<div>
                        <div className='hover-image'></div>
                        <div className='movie-title'>{e.Title}</div>
                    <FaThumbsUp onClick={_=>{this.saveMovie(e)}} className='love' size={40}/>
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
