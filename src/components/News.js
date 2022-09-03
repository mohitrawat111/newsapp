import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {

    constructor() {
        super();
        console.log("I am constructor from news component");
        this.state = {
            articles: [],
            loading: false,
            page: 1

        }
        console.log("State inside constructor(initial state):-")//to check state of a page
        console.log(this.state)
    }
    async componentDidMount() {

        //const headers = { 'Content-Type': 'application/json' }
        console.log("cmd")
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=699ed333a90a487c8409774371b60a48&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);

        let parseddata = await data.json();
        console.log(parseddata);
        console.log(data);
        this.setState({ articles: parseddata.articles, totalResults: parseddata.totalResults, loading: false })

    }
    handlprevclick = async () => {
        console.log("previous");
        console.log("next");
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=699ed333a90a487c8409774371b60a48&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);

        let parseddata = await data.json();
        console.log(parseddata);
        console.log(data);

        this.setState({
            page: this.state.page - 1,
            articles: parseddata.articles,
            loading: false
        })
        // console.log(this.state.page)


    }
    handlenextclick = async () => {
        console.log("next");
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            // refactor- If not of
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=699ed333a90a487c8409774371b60a48&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;// ye state k page se page ko le k usme se +1 kra hai
            this.setState({ loading: true });
            let data = await fetch(url);

            let parseddata = await data.json();
            console.log(parseddata);
            console.log(data);

            this.setState({
                page: this.state.page + 1, // agar hum ishko yha pe set ni kerege toh ek sirf ek br page+1 hog url pe kyuki url pe bhi +1 hai.ye state k page ko +1  set kra hai
                articles: parseddata.articles,
                loading: false
            })
            // console.log(this.state.page)
        }

    }
    render() {
        console.log("page state set to-" + this.state.page);// to check whether page state changing or not
        console.log(this.state);
        console.log("render")
        return (
            <div className='container my-3'>
                <h1 className="text-center">NewsMonkey-Top Headlines</h1>
                {this.state.loading && <Spinner />}

                {/* {this.state.articles.map((element) => { console.log(element) })} */}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        // console.log(element)
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />

                        </div>
                    })}



                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlprevclick}>&larr;Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handlenextclick}>Next&rarr;</button>
                </div>
            </div>
        )
    }
}

export default News