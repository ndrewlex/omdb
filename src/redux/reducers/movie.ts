import { IMovieTableRow } from 'hooks/use-fetch-movie';
import { TOGGLE_FAVOURITE_MOVIE, GET_SEARCH_MOVIE } from '../action-types';

export interface IMovieReducerState {
  favouriteMovieList: IMovieTableRow[];
  searchMovieList: IMovieTableRow[];
}
const initialState: IMovieReducerState = {
  favouriteMovieList: [
    {
      Title: 'TEST',
      Year: '2020',
      imdbID: '1323',
      isFavourite: true,
    },
  ],
  searchMovieList: [],
};

interface IActionType {
  type: any;
  payload: any;
}

export default function (state = initialState, action: IActionType) {
  switch (action.type) {
    case TOGGLE_FAVOURITE_MOVIE: {
      const { imdbID, isFavourite, ...rest }: IMovieTableRow = action.payload;

      if (isFavourite) {
        // toggle to unfavourite
        return {
          ...state,
          favouriteMovieList: state.favouriteMovieList.filter(
            (item) => item.imdbID !== imdbID
          ),
        };
      } else {
        // toggle to favourite
        return {
          ...state,
          favouriteMovieList: [
            ...state.favouriteMovieList,
            { imdbID, isFavourite: true, ...rest },
          ],
        };
      }
    }

    default:
      return state;
  }
}
