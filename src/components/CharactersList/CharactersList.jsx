import React from 'react';
import './CharactersList.css';
import Character from '../Character';
import { connect } from 'react-redux';
import Spinner from '../Spinner';
import Paginator from '../Paginator';
import { setCharactersThunk } from '../../actions/setCharactersAction';

class CharactersList extends React.Component {
  render() {
    const {
      characters,
      getNextPage,
      getPrevPage,
      nextPageUrl,
      prevPageUrl,
    } = this.props;

    const items = characters.map((item) => {
      return (
        <li key={item.id}>
          <Character
            name={item.name}
            img={item.image}
            status={item.status}
            species={item.species}
            gender={item.gender}
            currentLocation={item.location.name}
            firstEpisodeUrl={item.episode[0]}
            firstEpisodeName={item.firstEpisodeName}
            id={item.id}
          />
        </li>
      );
    });

    if (!characters.length) {
      return <Spinner />;
    }

    return (
      <>
        <div className="CharactersList">
          <h1>Characters</h1>
          <ul>{items}</ul>
        </div>
        <Paginator
          {...{
            prevPageUrl,
            nextPageUrl,
            getNextPage,
            getPrevPage,
          }}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    characters: state.characters,
    nextPageUrl: state.paginator.nextPageUrl,
    prevPageUrl: state.paginator.prevPageUrl,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getNextPage: (nextPageUrl) => dispatch(setCharactersThunk(nextPageUrl)),
  getPrevPage: (prevPageUrl) => dispatch(setCharactersThunk(prevPageUrl)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CharactersList);