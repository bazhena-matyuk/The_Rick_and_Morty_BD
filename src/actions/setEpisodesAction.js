import Api from "../API";

const rickMortyApi = new Api();

export const setEpisodesThunk = (pageUrl = null) => {
  let pageNumber = null;

  if (pageUrl) {
    const arr = pageUrl.split("=");
    pageNumber = arr[arr.length - 1];
 }

  return function (dispatch) {
     rickMortyApi
      .getEpisodesInfoByPage(pageNumber)
      .then(async (data) => {
        const episodes = data.results;
        const responseInfoObj = data.info;

        dispatch({
          type: "IS_EPISODES",
          payload: {
            episodes,
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
export default setEpisodesThunk;