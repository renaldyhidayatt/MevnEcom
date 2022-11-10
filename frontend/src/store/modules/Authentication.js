const state = {
  IsAuthenticated: { isLogedIN: false, isAdmin: false, Token: null },
};

const getters = {
  UserAuth: (state) => state.IsAuthenticated,
};

const actions = {
  async SetUserAuth({ commit }, data) {
    let newStatus = {
      isLogedIN: data.isLogedIN,
      isAdmin: data.isAdmin,
      Token: data.Token,
    };
    localStorage.setItem('Auth', JSON.stringify(newStatus));
    commit('SetAndGetUserAuthStatus', newStatus);
  },
  async GetUserAuth({ commit }) {
    if (localStorage.getItem('Auth')) {
      let AuthData = JSON.parse(localStorage.getItem('Auth'));
      commit('SetAndGetUserAuthStatus', AuthData);
    }
  },
};

const mutations = {
  SetAndGetUserAuthStatus: (state, UserAuthStauts) => (
    (state.IsAuthenticated.isAdmin = UserAuthStauts.isAdmin),
    (state.IsAuthenticated.isLogedIN = UserAuthStauts.isLogedIN),
    (state.IsAuthenticated.Token = UserAuthStauts.Token)
  ),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
