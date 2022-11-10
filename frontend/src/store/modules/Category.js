import axios from 'axios';

const URL_BACKEND = '';

const state = {
  CategoriesList: [],
  non: '',
};

const getters = {
  allCategories: (state) => state.CategoriesList,
};

const actions = {
  async GetCategories({ commit }) {
    axios.get(`${URL_backend}/categories/CatByPage/${1}`).then((res) => {
      commit('setCategories', res.data);
    });
  },

  async GetCatByPageNumber({ commit }, PageNum) {
    axios.get(`${URL_BACKEND}/categories/CatByPage/${PageNum}`).then((res) => {
      commit('setCategories', res.data);
    });
  },

  async AddNewCat({ commit }, data) {
    let token = JSON.parse(localStorage.getItem('Auth')).Token;

    axios
      .post(
        `${URL_BACKEND}/categories`,
        {
          name: data.NewCatName,
        },
        { headers: { 'x-auth-token': token } }
      )
      .then((res) => {
        commit('NewCategories', res.data);
      });
  },

  async EditOneCat({ commit }, data) {
    let Tok = JSON.parse(localStorage.getItem('Auth')).Token;

    axios
      .put(
        `${URL_BACKEND}/categories/${data.ID}`,
        {
          name: data.NewCatName,
        },
        { headers: { 'x-auth-token': Tok } }
      )
      .then(() => {
        let objIndex = state.CateGorisList.findIndex(
          (obj) => obj._id == data.ID
        );
        let name = data.NewCatName;
        let NewDatObj = { objIndex, name };
        commit('EditOneCategories', NewDatObj);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  },
  async DeleteOneCat({ commit }, data) {
    let Tok = JSON.parse(localStorage.getItem('Auth')).Token;

    axios
      .delete(`${URL_BACKEND}/categories/${data.ID}`, {
        headers: { 'x-auth-token': Tok },
      })
      .then((res) => {
        console.log('deleted cat successfully', res.data);

        let newArrDel = state.CateGorisList.filter((x) => {
          return x._id != data.ID;
        });
        commit('ResetAndDelete', newArrDel);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  },
  async GetCatByID({ commit }, ID) {
    let Tok = JSON.parse(localStorage.getItem('Auth')).Token;

    axios
      .get(`${URL_BACKEND}/categories/${ID}`, {
        headers: { 'x-auth-token': Tok },
      })
      .then((res) => {
        commit('non');
        return res.data;
      });
  },
};

const mutations = {
  setCategories: (state, categories) => (state.CategoriesList = categories),
  NewCategories: (state, newData) => state.CategoriesList.unshift(newData),
  EditOneCategories: (state, NewDatObj) =>
    (state.CategoriesList[NewDatObj.objIndex].name = NewDatObj.name),
  ResetAndDelete: (state, newArrDel) => (state.CategoriesList = newArrDel),

  non: (state) => (state.non = ''),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
