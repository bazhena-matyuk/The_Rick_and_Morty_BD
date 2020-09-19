import React from 'react';

import './Episode.css';
import { Link } from 'react-router-dom';

export default class Episode extends React.Component {

    render() {
        const { name, air_date, episode, id } = this.props;
    
        return (
            <div className="Episode">
                <div className="textBlock">
                    <div className="titleBlock">
                        <p className="name">
                            <Link to={`/episode/${id}`}>
                                {name}
                            </Link>
                        </p>
                    </div>
                    <div className="infoBlock">
                        <div className="dateBlock">
                            <p className="title">The air date of the episode:</p>
                            <p className="airDate">{air_date}</p>
                        </div>
                        <div className="firstSeenBlock">
                            <p className="title">The code of the episode:</p>
                            <p className="codeEpisode">{episode}</p>
                        </div>
                    </div>                    
                </div>
                
            </div>
        );
    }
}