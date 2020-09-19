import Api from "../API";

const rickMortyApi = new Api();

export const setLocationsThunk = (pageUrl = null) => {
  let pageNumber = null;

  if (pageUrl) {
    const arr = pageUrl.split("=");
    pageNumber = arr[arr.length - 1];
 }

  return function (dispatch) {
     rickMortyApi
      .getLocationsInfoByPage(pageNumber)
      .then(async (data) => {
        const locations = data.results;
        const responseInfoObj = data.info;

        dispatch({
          type: "IS_LOCATIONS",
          payload: {
            locations,
            paginator: {
              prevPageUrl: responseInfoObj.prev,
              nextPageUrl: responseInfoObj.next,
              pageCount: responseInfoObj.pages,
              currentPage: pageNumber || 1,
            },
          },
        });
      });
  };
};
export default setLocationsThunk;