import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Api from '../../API';
import { connect } from 'react-redux';
import './CharacterPage.css';

const CharacterPage = () => {
    const rickMortyApi = new Api();

    let { id } = useParams();
    const [character, setCharacter] = useState({});
    const {
    name: characterName,
    gender: characterGender,
    image: characterImage,
    species: characterSpecies,
    status: characterStatus,
    type: characterType,
    currentLocation: characterCurrentLocation,
    episodes,
    } = character;

    useEffect(() => {
        const getCharacter = async (id) => {
          const character = await rickMortyApi.getCharacter(id);
          const episodesIds = character.episode.map((item) => {
            const arr = item.split('/');
            return arr[arr.length - 1];
        });
    
        const episodes = await rickMortyApi.getEpisode(
            episodesIds.join(',')
        );
    
        setCharacter({
            ...character,
            episodes: Array.isArray(episodes) ? episodes : [episodes],
            });
        };
    
        getCharacter(id);
        }, []);

        const Episodes = ({ episodes }) => {
            return episodes && episodes.length ? (
              <ul>
                {episodes.map((item) => (
                  <li className='one_episode' key={item.id}>
                    <Link to={`/episode/${item.id}`}>
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
        
            <div className="CharacterPage">            
                <div className="characterBlock">
                    <div className="nameBlock">
                        <h1>{characterName}</h1>
                        <div><img src={characterImage} alt={`${characterName}`} /></div>
                    </div>
                    <div className="infoBlock">
                        <div>
                            <p className="title">The species of the character:</p> 
                            <p className="text">{characterSpecies}</p> 
                        </div>
                        <div>
                            <p className="title">The gender of the character: </p> 
                            <p className="text">{characterGender}</p> 
                        </div>
                        <div>
                            <p className="title">The status of the character: </p> 
                            <p className="text">{characterStatus}</p> 
                        </div>
                        <div>
                            <p className="title">The type or subspecies of the character:</p>  
                            <p className="text">{characterType}</p> 
                        </div>
                        <div>
                            <p className="title">Name character's last known location endpoint: </p> 
                            <p className="text">{characterCurrentLocation}</p> 
                        </div>
                        <div>
                            <p className='title'>
                            List of episodes in which this character appeared:{' '}
                            </p>
                            <Episodes {...{ episodes }} />
                        </div>                            
                    </div>                          
                </div>
            </div>
        );
    }

const mapStateToProps = (state) => {
    return {
        episodes: state.episodes,
    };
};

export default connect(mapStateToProps)(CharacterPage); 