<template>
    <center>
        <div>
            <h3>Searching for :
                <small>{{ SearchData }}</small>
            </h3>

            <div class="col-md-9">
                <div class="container">
                    <div class="card-group">
                        <transition-group name="fade" tag="div" class="row">
                            <div class="card col-md-4" v-for="item in Resulttiems" :key="item._id">
                                <img class="card-img-top" :src="item.product_img" />
                                <div class="card-body">
                                    <h6>Price: ${{ item.price }}</h6>
                                    <h5 class="card-title">Card title</h5>
                                    <router-link :to="{ path: '/SpecificItem', query: { ID: item._id } }"
                                        class="card-title"> {{ item.name }} </router-link>
                                </div>
                            </div>
                        </transition-group>
                    </div>
                </div>
            </div>
        </div>
    </center>
</template>

<script>
import { mapActions } from 'vuex';
import axios from 'axios';

const URL_BACKEND = '';

export default {
    data() {
        return {
            SearchData: '',
            Resulttiems: []
        }
    },
    methods: {
        ...mapActions(['SetUserMovementSearch']),
        runSearch() {
            const token = JSON.parse(localStorage.getItem('Auth')).Token;
            if (token) {
                axios.get(`${URL_BACKEND}/search/user/${this.SearchData}`,
                    { headers: { 'x-auth-token': token } })
                    .then(res => {
                        this.Resulttiems = res.data;
                    })

            } else {
                axios.get(`${URL_backend}/search/${this.SearchData}`)
                    .then(res => {
                        this.Resulttiems = res.data;
                    })
            }
            this.SetUserMovementSearch(this.Resulttiems);
        }
    },
    watch: {
        '$route'(to, from) {
            this.SearchData = to.query.SData;
            this.runSearch();
            from
        }
    },
    mounted() {
        this.SearchData = this.$route.query.SData;
        this.runSearch();
    },
}
</script>