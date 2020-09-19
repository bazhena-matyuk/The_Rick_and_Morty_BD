import React from "react";
import "./LocationsList.css";
import Location from "../Location";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import Paginator from "../Paginator";
import { setLocationsThunk } from '../../actions/setLocationsAction';

class LocationsList extends React.Component {
  render() {
    const { 
      locations,
      getNextPage,
      getPrevPage,
      nextPageUrl,
      prevPageUrl,
    } = this.props;

    const items = locations.map((item) => {
      return (
        <li key={item.id}>
          <Location
            name={item.name}
            type={item.type}
            dimension={item.dimension}
            residents={item.residents}
            created={item.created}            
            id={item.id}
          />
        </li>
      );
    });

    if (!locations.length) {
      return <Spinner />;
    }

    return (
      <>
        <div className="LocationsList">
          <h1>Locations</h1>
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
    locations: state.locations,
    nextPageUrl: state.paginator.nextPageUrl,
    prevPageUrl: state.paginator.prevPageUrl,
  };
};

/*export default connect(mapStateToProps)(LocationsList);*/
const mapDispatchToProps = (dispatch) => ({
  getNextPage: (nextPageUrl) => dispatch(setLocationsThunk(nextPageUrl)),
  getPrevPage: (prevPageUrl) => dispatch(setLocationsThunk(prevPageUrl)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LocationsList);