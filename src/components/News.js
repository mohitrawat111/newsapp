import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

    constructor() {
        super();
        console.log("I am constructor from news component");
        this.state = {
            articles: [],
            loading: false

        }
    }
    async componentDidMount() {

        //const headers = { 'Content-Type': 'application/json' }
        console.log("cmd")
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=699ed333a90a487c8409774371b60a48";
        let data = await fetch(url);

        let parseddata = await data.json();
        console.log(parseddata);
        console.log(data);
        this.setState({ articles: parseddata.articles })
    }
    render() {
        console.log("render")
        return (
            <div className='container my-3'>
                <h1>NewsMonkey-Top Headlines</h1>
                {/* {this.state.articles.map((element) => { console.log(element) })} */}
                <div className="row">
                    {this.state.articles.map((element) => {
                        // console.log(element)
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />

                        </div>
                    })}



                </div>
            </div>
        )
    }
}

export default News