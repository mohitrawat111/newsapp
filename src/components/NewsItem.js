import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl } = this.props;
        return (
            <div className='my-3'>
                <div className="card" >
                    <img src={imageUrl ? imageUrl : "https://images.moneycontrol.com/static-mcnews/2022/08/stocks_market-stock_stock-2-770x433.jpg"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark ">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem