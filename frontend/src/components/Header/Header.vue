<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <router-link to="/" class="navbar-brand" tag="a">The App</router-link>

            <button v-on:click="isActive = !isActive" class="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div v-bind:class="[
                isActive
                    ? 'collapse navbar-collapse show'
                    : 'collapse navbar-collapse',
            ]">
                <ul class="navbar-nav mr-auto"></ul>
                <form class="form-inline my-2 my-lg-0">
                    <Search />
                    <router-link v-if="!auth.isUserLogedIN" to="/LoginRegister"
                        class="btn btn-outline-primary my-2 my-sm-2 m-2" tag="button">Login | regeste</router-link>

                    <button v-if="auth.isUserLogedIN" class="btn btn-outline-danger my-2 my-sm-2 m-2"
                        @click="LogOutUser">
                        Logout
                    </button>

                    <router-link to="/Cart" class="btn btn-outline-warning my-2 my-sm-2 m-2" tag="button">Cart
                    </router-link>

                    <router-link v-if="auth.IsUserAdmin" to="/Admin" class="btn btn-outline-danger my-2 my-sm-2 m-2"
                        tag="button">
                        Admin</router-link>

                    <router-link v-if="auth.isUserLogedIN" to="/UserProfile"
                        class="btn btn-outline-dark my-2 my-sm-2 m-2" tag="button">Profile</router-link>
                </form>
            </div>
        </nav>
    </div>
</template>

<script>
import SearchVue from './Search.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'Header',
    components: {
        SearchVue,
    },
    data() {
        return {
            isActive: false,
            auth: { isUserLogedIN: false, IsUserAdmin: false },
        };
    },
    computed: {
        ...mapGetters(['UserAuth']),
    },
    created() {
        this.GetUsdata();
        this.$store.watch((state) => {
            this.StoreDataChange(state);
        });
    },
    methods: {
        ...mapActions(['GetUserAuth', 'SetUserAuth']),
        GetUsdata() {
            this.GetUserAuth();

            this.auth.isUserLogedIN = this.UserAuth.isLogedIN;
            this.auth.IsUserAdmin = this.UserAuth.isAdmin;
        },
        LogOutUser() {
            let data = { isLogedIN: false, isAdmin: false };
            this.auth = { isUserLogedIN: false, IsUserAdmin: false };
            this.SetUserAuth(data);
        },
        StoreDataChange(state) {
            let data = state.Authentication.IsAuthenticated;
            this.auth = {
                isUserLogedIN: data.isLogedIN,
                IsUserAdmin: data.isAdmin,
            };
        },
    },
};
</script>

<style scoped>
.userWords {
    width: 80%;
    background-color: #f8f9fa !important;
    margin: 5px auto;
    font-style: italic;
    color: #007bff;
    padding: 10px;
}
</style>
