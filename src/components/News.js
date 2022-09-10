import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)





    const updateNews = async () => {
        props.setProgress(10);
        console.log("cmd");
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parseddata = await data.json();
        props.setProgress(70);
        setArticles(parseddata.articles);
        setTotalResults(parseddata.totalResults);
        setLoading(false);
        console.log(parseddata);
        console.log(data);

        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();

        // eslint-disable-next-line 
    }, [])


    const fetchMoreData = async () => {

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)

        let data = await fetch(url);

        let parseddata = await data.json();
        console.log(parseddata);
        console.log(data);
        setArticles(articles.concat(parseddata.articles))
        setTotalResults(parseddata.totalResults)


    };

    console.log("page state set to-" + page);// to check whether page state changing or not

    console.log("render")
    return (
        <>
            <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>NewsMonkey-Top Headlines</h1>
            {loading && <Spinner />}

            {/* {this.state.articles.map((element) => { console.log(element) })} */}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element, index) => {
                            // console.log(element) yaha pe element may function k ander wala hai app.js k route wala ni.
                            //key should be unique otherwise error:-Encountered two children with the same key" occurs when two or more of the elements we return from the map() method have the same key prop.To solve the error, provide a unique value for the key prop on each element or use the index parameter ie replace key={element.url} with key={index} or key={Math.random()}
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />

                            </div>
                        })}
                    </div>


                </div>
            </InfiniteScroll>

        </>
    )

}
News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: "general"

}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News