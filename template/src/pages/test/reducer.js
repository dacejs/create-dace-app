import {
  FETCH_TEST
} from './action';

const initState = {
  test: []
};

export default (state = {}, action) => {
  state = Object.keys(state).length === 0 ? initState : state;
  switch (action.type) {
    case FETCH_TEST:
      // 只能返回对象，不能返回数组
      return {
        ...state,
        test: action.payload
      };
    default:
      return state;
  }
};
