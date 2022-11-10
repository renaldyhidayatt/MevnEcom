<template>
    <div>
        <Sugproducts />
        <hr>
        <center>
            <div class="col-md-2" style="float:left;margin: 1px 2%;">
                <Categoryes v-on:CheckCat="CheckTheCat" key="cat" />
            </div>
            <div class="col-md-3"></div>
            <div class="col-md-9">
                <div class="container">
                    <div class="card-group">
                        <div class="row" v-if="isLoaded">
                            <div class="card col-md-4" v-for="(item, index) in items" :key="item._id">
                                <img class="card-img-top" :src="item.product_img" :alt="item.name">
                                <div class="card-body">
                                    <h6>Price: ${{ item.price }}</h6>
                                    <router-link :to="{
                                        path: '/Specificitem',
                                        query: { ID: item._id }
                                    }" tag="h5" class="card-title vx">
                                        {{ item.name | MaxName }}
                                    </router-link>
                                    <button v-if="!item.isincart" v-on:click="RemoveFromCart(item._id, index)"
                                        class=" btn btn-danger">
                                        <small>Remove From Cart</small> </button>
                                    <button v-else class=" btn btn-primary" v-on:click="AddToCart(item._id, index)">
                                        Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="container wid">
                    <div class="row">
                        <nav aria-label="Page navigation  ">
                            <ul class="pagination">
                                <li lass="page-item">
                                    <button class="page-link" v-on:click="NextPrevPage(false)">
                                        <span aria-hidden="true">&laquo;</span>
                                        <span class="sr-only">Previous</span>
                                    </button>
                                </li>
                                <li class="page-item" v-for="(page, idx) in PageArray " :key="idx">
                                    <button :class="PageSelected === page ?
                                    'page-link active' : 'page-link '" v-on:click="changePage(page)"> {{ page }}
                                    </button>
                                </li>
                                <li class="page-item">
                                    <button class="page-link" v-on:click="NextPrevPage(true)">
                                        <span aria-hidden="true">&raquo;</span>
                                        <span class="sr-only">Next</span>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </center>
        <div class="clear xp"></div>
    </div>
</template>
   

<script>
import CategoriesVue from './Categories.vue';
import SugProductsVue from './SugProducts.vue';
import { mapActions, mapGetters } from 'vuex';

import axios from 'axios';
const URL_BACKEND = ``;

export default {
    name: 'Main',
    data() {
        return {
            items: [],
            PageArray: [],
            PageSelected: 3,
            CheckedCat: [],
            isLoaded: true
        }
    },
    components: {
        CategoriesVue,
        SugProductsVue
    },
    filters: {
        MaxName: function (value) {
            if (value.length > 8) return value;
            return value.substr(0, 8) + '...';
        }
    },
    computed: {
        ...mapGetters(['AllProducts'])
    },
    created() {
        this.GetProducts();
    },
    mounted() {
        if (!this.$route.query.page) {
            this.$router.push({
                path: '/',
                name: 'Main',
                query: {
                    page: 1,
                }
            }).catch(() => { })
        }
        this.PageSelected = parseInt(this.$route.query.page)
        //
        this.getProddata()
        this.PageNation()
    },
    methods: {
        ...mapActions([
            'GetProducts',
            'GetProdByPageNumber',
            'ChecIfINCart',
            'SetNewCartItem',
            'RemoveItemFromCart'
        ]),
        getProddata() {
            if (this.CheckedCat.length !== 0) {
                axios.post(`${URL_BACKEND}/products/ProdByCat/${this.PageSelected}`, {
                    cat: this.CheckedCat
                }).then((res) => {

                    if (res.data.length) {
                        this.isLoaded = false;
                        this.items = res.data;
                        this.CheckIf_inCart();
                    }
                })
            } else {
                axios.get(`${URL_backend}/products/ProdByPage/${this.PageSelected}`)
                    .then(res => {
                        if (res.data.length) {
                            this.isLoaded = false;
                            this.items = res.data;
                            console.log('data with out cat', res.data);
                            this.CheckIf_inCart();
                        }
                    })
            }
        },
        CheckIf_inCart() {
            let newData = [];
            for (let index = 0; index < this.items.length; index++) {
                const element = this.items[index];
                let CartData = JSON.parse(localStorage.getItem('Cart'));
                let objIndex = CartData.findIndex((obj => obj.id == element._id));
                if (objIndex !== -1) {
                    element.isincart = false;
                } else {
                    element.isincart = true;
                }
                newData.push(element);
            }
            this.isLoaded = true;
        },
        AddToCart(id, index) {
            this.isLoaded = false;
            this.items[index].isincart = true;
            this.isLoaded = true;
            this.SetNewCartItem(id);
            this.getProddata();
        },
        RemoveFromCart(id, index) {
            this.isLoaded = false;
            this.items[index].isincart = false;
            this.isLoaded = true;
            this.RemoveItemFromCart(id);
            this.getProddata();
        },
        PageNation() {
            this.PageArray = [];
            let Scale = this.PageSelected + 3;
            for (let index = this.PageSelected; index < Scale; index++) {
                this.PageArray.push(index);
            }
            console.log('pagenation', this.PageArray);
            this.getProddata();
        },
        changePage(page) {
            this.GetProdByPageNumber(page);
            this.PageSelected = page;
            this.$router.push({
                path: '/',
                name: 'Main',
                query: {
                    page: page,
                }
            });
            this.getProddata();
        },
        NextPrevPage(con) {
            if (con = false && this.PageSelected == 1) {
                console.log('non')
            }
            if (con == false && this.PageSelected !== 1) {
                this.PageSelected = this.PageSelected - 1;
                this.changePage(this.PageSelected);
                this.PageNation();
                this.getProddata();
            }
            if (con == true) {
                this.PageSelected = this.PageSelected + 1;
                this.changePage(this.PageSelected);
                this.PageNation();
                this.getProddata();
                console.log('n ', this.PageSelected)
            }
        },
        CheckTheCat(cat) {
            if (this.CheckedCat.indexOf(cat) === -1) {
                this.CheckedCat.push(cat)
            } else {
                this.CheckedCat = this.CheckedCat.filter(e => e !== cat)
            }
            axios
                .post(`${URL_backend}/products/ProdByCat/${this.PageSelected}`,
                    { cat: this.CheckedCat })
                .then(res => {
                    if (res.data.length !== 0) {
                        this.items = res.data;
                        this.CheckIf_inCart();
                    }
                })
        }
    }
}

</script>

<style scoped>
.card {
    /* padding: 1%; */
    margin: 1% auto;

}

.wid {
    margin-left: auto;
    margin-right: auto;
    width: 10em;
}


.active,
.active:hover {
    background-color: #F44336;
    color: white;
}

.vx:hover {
    cursor: pointer;
    color: darkred;
}

.card>img {
    width: 100%;
    height: 12rem;
    margin: 3px auto !important;
}
</style>
