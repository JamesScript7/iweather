import { LOAD_WEATHER, LOAD_FAIL } from '../actions';

const initialState = {
  status: false,
  data: [],
  forecast: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case LOAD_WEATHER: {
      return {
        ...state,
        status: true,
        data: [action.payload],
        forecast: [action.forecast]
      };
    }
    case LOAD_FAIL: {
      return {
        ...state,
        status: false
      };
    }
    default:
      return state;
  }
}
