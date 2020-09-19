import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Api from '../../API';
import { connect } from 'react-redux';
import './EpisodePage.css';

const EpisodePage = () => {
  const rickMortyApi = new Api();
  
  let { id } = useParams();

  const [episode, setEpisode] = useState({});


  const {
    name: episodeName,
    episode: episodeCode,
    characters,
    air_date: airDate,
  } = episode;


  useEffect(() => {
    const getEpisode = async (id) => {
      const episode = await rickMortyApi.getEpisode(id);
      const charactersIds = episode.characters.map((item) => {
        const arr = item.split('/');
        return arr[arr.length - 1];
      });

      const characters = await rickMortyApi.getCharacter(
        charactersIds.join(',')
      );

      setEpisode({
        ...episode,
        characters: Array.isArray(characters) ? characters : [characters],
      });
    };

    getEpisode(id);
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

  return (
    <div className='EpisodePage'>
      <div className='infoBlock'>
        <div>
          <p className='title'>The air date of the episode: </p>
          <p className='text'>{airDate}</p>
        </div>
        <div>
          <p className='title'>The code of the episode:</p>
          <p className='text'>{episodeCode}</p>
        </div>
        <div>
          <p className='title'>
            List of characters who have been seen in the episode:{' '}
          </p>
          <Characters {...{ characters }} />
        </div>
      </div>
      <h1>{episodeName}</h1>
    </div>
  );
};
const mapStateToProps = (state) => {
    return {
        characters: state.characters,
    };
};

export default connect(mapStateToProps)(EpisodePage);