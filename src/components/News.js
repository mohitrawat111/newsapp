import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    render() {
        return (
            <div className='container my-3'>
                <h2>NewsMonkey-Top Headlines</h2>
                <div className="row">
                    <div className="col-md-4">
                        <NewsItem title="myTitle" description="mydesc" />

                    </div>
                    <div className="col-md-4">
                        <NewsItem title="myTitle2" description="mydesc2" />

                    </div>
                    <div className="col-md-4">
                        <NewsItem title="myTitle3" description="mydesc3" />

                    </div>

                </div>
                <div className="row my-3">
                    <div className="col-md-4">
                        <NewsItem title="myTitle4" description="mydesc4" />

                    </div>
                    <div className="col-md-4">
                        <NewsItem title="myTitle5" description="mydesc5" />

                    </div>
                    <div className="col-md-4">
                        <NewsItem title="myTitle6" description="mydesc6" />

                    </div>

                </div>
            </div>
        )
    }
}

export default News