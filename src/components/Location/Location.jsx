import React from 'react';

import './Location.css';
import { Link } from 'react-router-dom';

export default class Location extends React.Component {

    render() {
        const { name, type, dimension, id } = this.props;

        let typeImgClass = 'typeImg';
    
        if (type === 'Planet') {
            typeImgClass += ' planet';
        } else if (type === 'Space station') {
            typeImgClass += ' station';
        } else if (type === 'TV') {
            typeImgClass += ' TV';
        } else if (type === 'Microverse') {
            typeImgClass += ' microverse';
        } else if (type === 'Cluster') {
            typeImgClass += ' cluster';
        } else if (type === 'Resort') {
            typeImgClass += ' resort';
        } else if (type === 'Fantasy town') {
            typeImgClass += ' town';
        } else if (type === 'Dream') {
            typeImgClass += ' dream';
        }
    
        return (
            <div className="Location">
                <div className={typeImgClass}>
                    <div className="textBlock">
                        <div className="titleBlock">
                            <p className="name">
                                <Link to={`/location/${id}`}>
                                    {name}
                                </Link>
                            </p>
                        </div>
                        <div className="infoBlock">
                            <div className="typeBlock">
                                <p className="title">Type:</p>
                                <p className="type">{type}</p>
                            </div>
                            <div className="createdBlock">
                                <p className="title">Dimension:</p>
                                <p className="created">{dimension}</p>
                            </div>
                        </div>     
                    </div>                                   
                </div>                
            </div>
        );
    }
}