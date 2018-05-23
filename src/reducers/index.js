import { LOAD_WEATHER, LOAD_FAIL } from '../actions';

const initialState = {
  status: false,
  data: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case LOAD_WEATHER:
      return {
        ...state,
        status: true,
        data: action.payload
      };
    case LOAD_FAIL:
      return {
        ...state,
        status: false,
        data: action.payload
      };
    default:
      return state;
  }
}
