export const FETCH_TEST = 'fetch_test';

/**
 * 获取必住酒店列表
 * @param {string} cityUrl 城市编码
 */
export const fetchTest = () => async (dispatch, getState, api) => {
  const address = '/api/test';
  let res = {
    data: []
  };
  try {
    res = await api.get(address);
  } catch (e) {
    console.log(e);
  }
  return dispatch({
    type: FETCH_TEST,
    payload: res.data
  });
};
