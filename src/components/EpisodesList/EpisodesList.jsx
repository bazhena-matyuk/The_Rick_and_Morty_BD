import React from "react";
import "./EpisodesList.css";
import Episode from "../Episode";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import Paginator from "../Paginator";
import { setEpisodesThunk } from '../../actions/setEpisodesAction';

class EpisodesList extends React.Component {
  render() {
    const { 
      episodes,
      getNextPage,
      getPrevPage,
      nextPageUrl,
      prevPageUrl,
    } = this.props;

    const items = episodes.map((item) => {
      return (
        <li key={item.id}>
          <Episode
            name={item.name}
            air_date={item.air_date}
            episode={item.episode}
            id={item.id}
          />
        </li>
      );
    });

    if (!episodes.length) {
      return <Spinner />;
    }

    return (
      <>
        <div className="EpisodesList">
          <h1>Episodes</h1>
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
    episodes: state.episodes,
    nextPageUrl: state.paginator.nextPageUrl,
    prevPageUrl: state.paginator.prevPageUrl,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getNextPage: (nextPageUrl) => dispatch(setEpisodesThunk(nextPageUrl)),
  getPrevPage: (prevPageUrl) => dispatch(setEpisodesThunk(prevPageUrl)),
});
export default connect(mapStateToProps, mapDispatchToProps)(EpisodesList);