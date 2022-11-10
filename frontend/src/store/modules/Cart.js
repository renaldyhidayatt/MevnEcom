const state = {
  OriginalCartListData: [],
  non: '',
};

const getters = {
  AllCatItems: (state) => state.OriginalCartListData,
};

const actions = {
  async GetCartItem({ commit }) {
    if (localStorage.getItem('Cart')) {
      const CartDataStorage = JSON.parse(localStorage.getItem('Cart'));
      commit('SetNew', CartDataStorage);
    } else {
      let emptyArr = [];
      const CartDataStorage = localStorage.setItem(
        'Cart',
        JSON.stringify(emptyArr)
      );
      commit('SetNew', CartDataStorage);
    }
  },
  async SetNewCartItems({ commit }, ID) {
    let defaultQuantity = 1;
    if (localStorage.getItem('Cart')) {
      let newItem = { id: ID, quantity: defaultQuantity };
      let CartData = JSON.parse(localStorage.getItem('Cart'));
      let ItemDATA = CartData.findIndex((obj) => obj.id == ID);

      if (ItemDATA !== -1) {
        let objIndex = CartData.findIndex((obj) => obj.id == ID);
        CartData[objIndex].quantity++;
        localStorage.setItem('Cart', JSON.stringify(CartData));
      } else {
        CartData.push(newItem);
        localStorage.setItem('Cart', JSON.stringify(CartData));
      }
      commit('SetNew', CartData);
    } else {
      let newItemDataArr = [{ id: ID, quantity: defaultQuantity }];
      localStorage.setItem('Cart', JSON.stringify(newItemDataArr));
      commit('SetNew', newItemDataArr);
    }
  },
  async ChangeItemQuantity({ commit }, data) {
    if (localStorage.getItem('Cart')) {
      let CartData = JSON.parse(localStorage.getItem('Cart'));
      let itemDATA = CartData.findIndex((obj) => obj.id == data.ID);
      if (itemDATA !== -1) {
        let objindex = Cart.CartData.findIndex((obj) => obj.id == data.ID);
        CartData[objindex].quantity = data.quantity;
        localStorage.setItem('Cart', JSON.stringify(CartData));
        commit('SetNew', CartData);
      }
    }
  },

  async RemoveItemFromCart({ commit }, ID) {
    if (localStorage.getItem('Cart')) {
      let CartData = JSON.parse(localStorage.getItem('Cart'));
      let itemDATA = CartData.findIndex((obj) => obj.id == ID);
      if (itemDATA !== -1) {
        CartData = CartData.filter((x) => {
          return x.id !== ID;
        });
        localStorage.setItem('Cart', JSON.stringify(CartData));
        commit('SetNew', CartData);
      }
    }
  },

  async CheckIfINCart({ commit }, ID) {
    if (localStorage.getItem('Cart')) {
      let CartData = JSON.parse(localStorage.getItem('Cart'));
      let ItemDATA = CartData.findIndex((obj) => obj.id == ID);
      let IsInCart;

      if (ItemDATA !== -1) {
        IsInCart = true;
      }
      if (ItemDATA == -1) {
        IsInCart = false;
      }
      commit('non');
      return IsInCart;
    }
  },
};

const mutations = {
  SetNew: (state, CartItems) => (state.OriginalCartListData = CartItems),
  non: (state) => (state.non = ''),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
