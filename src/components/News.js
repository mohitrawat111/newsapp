import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: "general"

    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

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

    async updateNews() {
        console.log("cmd")
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=699ed333a90a487c8409774371b60a48&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);

        let parseddata = await data.json();
        console.log(parseddata);
        console.log(data);
        this.setState({ articles: parseddata.articles, totalResults: parseddata.totalResults, loading: false })

    }

    async componentDidMount() {
        this.updateNews();

    }
    handlprevclick = async () => {

        this.setState({ page: this.state.page - 1 });
        this.updateNews();


    }
    handlenextclick = async () => {
        console.log("next");
        this.setState({ page: this.state.page + 1 });
        this.updateNews();

    }
    render() {
        console.log("page state set to-" + this.state.page);// to check whether page state changing or not
        console.log(this.state);
        console.log("render")
        return (
            <div className='container my-3' >
                <h1 className="text-center" style={{ margin: '35px 0px' }}>NewsMonkey-Top Headlines</h1>
                {this.state.loading && <Spinner />}

                {/* {this.state.articles.map((element) => { console.log(element) })} */}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        // console.log(element) yaha pe element may function k ander wala hai app.js k route wala ni.
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />

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