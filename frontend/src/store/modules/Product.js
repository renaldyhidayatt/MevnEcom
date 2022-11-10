import axios from 'axios';

const URL_BACKEND = '';

const state = {
  ProductsList: [],
  non: '',
};

const getters = {
  AllProducts: (state) => state.ProductsList,
};

const actions = {
  async GetProducts({ commit }) {
    axios.get(`${URL_BACKEND}/products/ProdByPage/${1}`).then((res) => {
      commit('setProducts', res.data);
    });
  },
  async GetProdByID({ commit }, ID) {
    axios.get(`${URL_BACKEND}/products/${ID}`).then((res) => {
      commit('non');
      return res.data;
    });
  },

  async GetProdByPageNumber({ commit }, pageNum) {
    axios.get(`${URL_BACKEND}/products/ProdByPage/${pageNum}`).then((res) => {
      commit('SetProdByPageNum', res.data);
    });
  },

  async ADD_NEW_PRODUCT({ commit }, data) {
    let token = JSON.parse(localStorage.getItem('Auth')).Token;

    axios
      .post(`${URL_BACKEND}/products`, data, {
        headers: { 'x-auth-token': token },
      })
      .then((res) => {
        commit('NewProducts', res.data);
      })
      .catch((err) => {
        alert(err.response.data);
      });
  },

  async EditOneProd({ commit }, data) {
    let Tok = JSON.parse(localStorage.getItem('Auth')).Token;

    axios
      .put(`${URL_BACKEND}/products/${data._id}`, data, {
        headers: { 'x-auth-token': Tok },
      })
      .then(() => {
        let objIndex = state.ProductsList.findIndex(
          (obj) => obj._id == data._id
        );
        let name = data.name;
        let prod_categories = data.prod_categories;
        let desc = data.desc;
        let price = data.price;
        let product_img = data.product_img;
        let NewDatObj = {
          objIndex,
          name,
          prod_categories,
          desc,
          price,
          product_img,
        };

        commit('EditOneProduct', NewDatObj);
      });
  },

  async DeleteOneProd({ commit }, data) {
    let token = JSON.parse(localStorage.getItem('Auth')).Token;

    axios
      .delete(`${URL_BACKEND}/products/${data._id}`, data, {
        headers: { 'x-auth-token': token },
      })
      .then((res) => {
        console.log('deleted prod success', res.data);
        let newArrDel = state.ProductsList.filter((x) => {
          return x.id != data.ID;
        });
        commit('ResetAndDelete', newArrDel);
      });
  },
};

const mutations = {
  setProducts: (state, newProdData) => (state.ProductsList = newProdData),

  NewProducts: (state, newprod) => state.ProductsList.unshift(newprod),

  EditOneProduct: (state, NewDatObj) => (
    (state.ProductsList[NewDatObj.objIndex].name = NewDatObj.name),
    (state.ProductsList[NewDatObj.objIndex].prod_categories =
      NewDatObj.prod_categories),
    (state.ProductsList[NewDatObj.objIndex].desc = NewDatObj.desc),
    (state.ProductsList[NewDatObj.objIndex].price = NewDatObj.price),
    (state.ProductsList[NewDatObj.objIndex].product_img = NewDatObj.product_img)
  ),

  ResetAndDelete: (state, newArrDel) => (state.ProductsList = newArrDel),
  SetProdByPageNum: (state, NewProdDataArr) =>
    (state.ProductsList = NewProdDataArr),
  non: (state) => (state.non = ''),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
