import axios from 'axios';

const URL_BACKEND = '';

const state = {
  UsersList: [],
};

const getters = {
  AllUsers: (state) => state.UsersList,
};

const actions = {
  async GetUserList({ commit }) {
    let token = JSON.parse(localStorage.getItem('Auth')).Token;

    axios
      .get(`${URL_BACKEND}/users/${1}`, {
        headers: { 'x-auth-token': token },
      })
      .then((res) => {
        console.log('userlist ', res.data);
        commit('SetUserList', res.data);
      });
  },

  async GetUsByPNum({ commit }, PageNum) {
    let token = JSON.parse(localStorage.getItem('Auth')).Token;

    axios
      .get(`${URL_BACKEND}/users/${PageNum}`, {
        headers: { 'x-auth-token': token },
      })
      .then((res) => {
        console.log('userlist by pn ', res.data);
        commit('SetUserList', res.data);
      });
  },

  async EditOneUser({ commit }, data) {
    let token = JSON.parse(localStorage.getItem('Auth')).Token;
    axios
      .put(
        `${URL_backend}/users/Role`,
        { _id: data.ID, isAdmin: data.isAdmin },
        { headers: { 'x-auth-token': token } }
      )
      .then(() => {
        let objIndex = state.UsersList.findIndex((obj) => obj._id == data.ID);
        let isAdmin = data.isAdmin;
        let NewDatOBJ = { objIndex, isAdmin };
        commit('EditOneUser', NewDatOBJ);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  },
};

const mutations = {
  SetUserList: (state, data) => (state.UsersList = data),
  EditOneUser: (state, newData) =>
    (state.UsersList[newData.objIndex].isAdmin = newData.isAdmin),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
