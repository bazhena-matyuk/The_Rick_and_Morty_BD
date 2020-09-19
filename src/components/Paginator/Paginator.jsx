import React from 'react';
import { connect } from 'react-redux';
import "./Paginator.css";

const Paginator = (props) => {
  const {
    nextPageUrl,
    prevPageUrl,
    currentPage,
    pageCount,    
    getNextPage,
    getPrevPage,
  } = props;
  return (
    <div className="Paginator">
      {prevPageUrl && (
        <button onClick={() => getPrevPage(prevPageUrl)}>prev</button>
      )}
      <span>{currentPage} of {pageCount}</span>
      {nextPageUrl && (
        <button onClick={() => getNextPage(nextPageUrl)}>next</button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  pageCount: state.paginator.pageCount,
  currentPage: state.paginator.currentPage,
});

export default connect(mapStateToProps)(Paginator);