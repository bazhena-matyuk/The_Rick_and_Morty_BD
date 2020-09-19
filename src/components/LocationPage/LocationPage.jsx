import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Api from '../../API';
import { connect } from 'react-redux';
import './LocationPage.css';


const LocationPage = () => {
    const rickMortyApi = new Api();
  
    let { id } = useParams();

    const [location, setLocation] = useState({});

    const {
        name: locationName,
        type: locationType,
        dimension: locationDimension,
        characters,
    } = location;

    useEffect(() => {
        const getLocation = async (id) => {          
          const location = await rickMortyApi.getLocation(id);
          const charactersIds = location.residents.map((item) => {
            const arr = item.split('/');    
            return arr[arr.length - 1];
        });

        const characters = await rickMortyApi.getCharacter(
            charactersIds.join(',')
          );
    
          setLocation({
            ...location,
            characters: Array.isArray(characters) ? characters : [characters],
          });
        };
    
        getLocation(id);
    }, []);

const Characters = ({ characters }) => {
    return characters && characters.length ? (
      <ul>
        {characters.map((item) => (
          <li className='one_character' key={item.id}>
            <Link to={`/character/${item.id}`}>
              <p>{item.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    ) : (
      <></>
    );
    };

  
    return(
        
        <div className="LocationPage">
            <div className="infoBlock">
                <h1>{locationName}</h1>
                <div>
                    <p className="title">The type of the location:</p> 
                    <p className="text">{locationType}</p>
                </div>
                <div>
                    <p className="title">The dimension in which the location is located:</p>  
                    <p className="text">{locationDimension}</p>
                </div>
                <div>
                    <p className='title'>
                        List of characters who have been seen in the episode:{' '}
                    </p>
                    <Characters {...{ characters }} />
                    </div>
            </div>                  
        
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        characters: state.characters,
      };
};

export default connect(mapStateToProps)(LocationPage);