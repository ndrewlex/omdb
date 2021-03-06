import { TOGGLE_FAVOURITE_MOVIE } from '../action-types';

export interface IMovieTableRow {
  Title: string;
  Year: string;
  imdbID: string;
  isFavourite?: boolean;
}

export interface IMovieReducerState {
  favouriteMovieList: IMovieTableRow[];
}
const initialState: IMovieReducerState = {
  favouriteMovieList: [],
};

interface IActionType {
  type: any;
  payload: any;
}

export default (state = initialState, action: IActionType) => {
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
};
