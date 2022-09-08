import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

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
            loading: true,
            page: 1,
            totalResults: 0

        }
        console.log("State inside constructor(initial state):-")//to check state of a page
        console.log(this.state)
    }

    async updateNews() {
        this.props.setProgress(10);
        console.log("cmd")
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parseddata = await data.json();
        this.props.setProgress(70);
        console.log(parseddata);
        console.log(data);
        this.setState({ articles: parseddata.articles, totalResults: parseddata.totalResults, loading: false })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();

    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        let data = await fetch(url);

        let parseddata = await data.json();
        console.log(parseddata);
        console.log(data);
        this.setState({
            articles: this.state.articles.concat(parseddata.articles),
            totalResults: parseddata.totalResults,
            // loading: false
        })

    };
    render() {
        console.log("page state set to-" + this.state.page);// to check whether page state changing or not
        console.log(this.state);
        console.log("render")
        return (
            <>
                <h1 className="text-center" style={{ margin: '35px 0px' }}>NewsMonkey-Top Headlines</h1>
                {this.state.loading && <Spinner />}

                {/* {this.state.articles.map((element) => { console.log(element) })} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element, index) => {
                                // console.log(element) yaha pe element may function k ander wala hai app.js k route wala ni.
                                //key should be unique otherwise error:-Encountered two children with the same key" occurs when two or more of the elements we return from the map() method have the same key prop.To solve the error, provide a unique value for the key prop on each element or use the index parameter ie replace key={element.url} with key={index} or key={Math.random()}
                                return <div className="col-md-4" key={Math.random()}>
                                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />

                                </div>
                            })}
                        </div>


                    </div>
                </InfiniteScroll>

            </>
        )
    }
}

export default News