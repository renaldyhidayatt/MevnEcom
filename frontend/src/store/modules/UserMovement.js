import axios from 'axios';

const URL_BACKEND = '';

const state = {
  UsMovement: {
    Search: [],
    Cart: [],
    Items: [],
  },
};

const getters = {
  AllUserMovement: (state) => state.UsMovement,
};

const actions = {
  async SetUserMovementSearch({ commit }) {
    let token = JSON.parse(localStorage.getItem('Auth')).Token;
    axios
      .get(`${URL_BACKEND}/machine_learning/SearchData`, {
        headers: { 'x-auth-token': token },
      })
      .then((res) => {
        console.log('result', res.data), commit('SetUserMovementSearch', '');
      });
  },
  async SetUserMovementCart({ commit }, data) {
    let token = JSON.parse(localStorage.getItem('Auth')).Token;
    axios
      .patch(
        `${URL_BACKEND}/machine_learning/ml_cart/${data}`,
        {},
        { headers: { 'x-auth-token': token } }
      )
      .then((res) => {
        console.log('result', res.data), commit('SetUserMovementCart', data);
      });
  },
  async SetUserMovementItem({ item }, data) {
    let token = JSON.parse(localStorage.getItem('Auth')).Token;
    axios
      .patch(
        `${URL_backend}/machine_learning/ml_products/${data}`,
        {},
        { headers: { 'x-auth-token': token } }
      )
      .then((res) => {
        console.log('result', res.data), commit('SetUserMovementItem', data);
      });
  },
};

const mutations = {
  SetUserMovementSearch: (state, newusmovesearch) =>
    state.UsMovement.Search.unshift(newusmovesearch),
  SetUserMovementCart: (state, newusmovecart) =>
    (state.UsMovement.cart = newusmovecart),
  SetUserMovementItem: (state, newusmoveItems) =>
    state.UsMovement.Items.unshift(newusmoveItems),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
