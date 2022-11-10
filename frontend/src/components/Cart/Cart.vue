<template>
    <div>
        <center>
            <div class="col-sm-12 col-md-9 col-md-offset-1">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th class="text-center">Price</th>
                            <th class="text-center">Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in items" :key="item._id">
                            <td class="col-sm-8 col-md-6">
                                <div class="media">
                                    <a class="thumbnail pull-left" href="#">
                                        <img :src="item.product_img" class="media-object"
                                            style="width: 72px; height: 72px" />
                                    </a>
                                    <div class="media-body">
                                        <h4 class="media-heading">
                                            <a class="ab" @click="MoveToTheDetails(item._id)">
                                                {{ item.name | NameFilltes }}</a>
                                        </h4>
                                        <span>Desc : </span>
                                        <span class="text-primary">
                                            <strong> {{ item.desc | DescFilters }} </strong>
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td class="col-sm-2 col-md-2" style="text-align: center">
                                <input type="number" v-model="item.quantity"
                                    v-on:change="ChecknewQuantity(item._id, $event)" class="form-control"
                                    id="exampleInputEmail1" />
                            </td>
                            <td class="col-sm-1 col-md-1 text-center">
                                <strong>$ {{ item.price }} </strong>
                            </td>
                            <td class="col-sm-1 col-md-1 text-center">
                                <strong>$ {{ item.price * item.quantity }}</strong>
                            </td>
                            <td class="col-sm-1 col-md-1">
                                <button type="button" class="btn btn-danger" @click="removeItem(item._id)">
                                    <span class="fa fa-remove"></span> Remove
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h3>Total</h3>
                            </td>
                            <td class="text-right">
                                <h3>
                                    <strong>${{ TotalItemsPrice }}</strong>
                                </h3>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="button" class="btn btn-default">
                                    <span class="fa fa-shopping-cart"></span> Continue Shopping
                                </button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-success">
                                    Checkout <span class="fa fa-play"></span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </center>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';

const URL_BACKEND = '';

export default {
    name: 'Cart',
    data() {
        return {
            TotalItemsPrice: 0,
            items: [],
        };
    },
    filters: {
        DescFilters: (value) => {
            return (
                value.split(',')[0] +
                ' ' +
                value.split(' ')[1] +
                ' ' +
                value.split(' ')[2] +
                '....'
            );
        },
        NameFilltes: (value) => {
            if (value.split(' ')) {
                return value.split(' ')[0] + ' ' + value.split(' ')[1];
            } else {
                return value.split(' ')[0];
            }
        },
    },
    mounted() {

    },
    computed: {
        ...mapGetters(['AllCatItems'])
    },
    created() {
        this.GetProductsONCard();
    },
    methods: {
        ...mapActions([
            'ChangeItemQuantity',
            'RemoveItemFromCart',
            'GetProdByID',
            'GetCartItem',
            'SetUserMovemnetCart'
        ]),
        GetProductsONCard: function () {
            this.GetCartItem();
            let arr = this.AllCatItems;

            let newArr = [];

            for (let index = 0; index < arr.length; index++) {
                const data = arr[index];
                axios.get(`${URL_BACKEND}/products/${data.id}`).then((res) => {
                    let objectINDEX = this.AllCatItems.findIndex((obj) => obj.id == res.data._id);
                    let Qu = this.AllCatItems[objectINDEX].quantity;

                    res.data.quantity = Qu;
                    newArr.push(res.data)
                })
            }
            this.items = newArr;
        },
        ChecknewQuantity: function (id, e) {
            if (e.target.value == 0) {
                let newData = this.items.map(el => {
                    if (el._id == id) {
                        return Object.assign({}, el, { quantity })
                    }
                    return el
                })
                this.items = newData;
            } else {
                let newData = this.items.map(el => {
                    if (el._id == id) {
                        return Object.assign({}, el, { quantity: e.target.value })
                    }
                    return el;
                });

                let NewD = { ID: Id, quantity: Number(e.target.value) }
                this.ChangeItemQuantity(NewD);

                this.items = newData;
            }
        },
        MoveToTheDetails: function (Id) {
            this.$router.push({
                path: "/Specificitem",
                name: 'Specificitem',
                query: {
                    ID: Id,
                }
            }).catch(() => { })
        },
        removeItem: function (Id) {
            let newArr = this.items.filter(x => { return x._id != Id })
            this.items = newArr;

            this.RemoveItemFromCart(Id);
            this.AddToUserMovements(Id);
        },
        TotalPrice: function () {
            const TheArrData = []
            for (let index = 0; index < this.items.length; index++) {
                let total = parseInt(this.items[index].price) *
                    parseInt(this.items[index].quantity);
                TheArrData.push(parseInt(total))
            }
            let lastNumber = TheArrData.reduce(function (a, b) {
                return a + b;
            }, 0);
            this.TotalItemsPrice = lastNumber;
        },
        AddToUserMovements: function (id) {
            this.SetUserMovemnetCart(id);
        }
    },
    watch: {
        items: function () {
            this.TotalPrice();
        }
    }

};
</script>
