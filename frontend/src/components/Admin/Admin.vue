<template>
    <div>
        <center>
            <div class="container">
                <div class="row">
                    <div class="col-md-3 df">

                        <div class="list-group">
                            <a @click="ChangePage('Users')" :class="ChangeClassAndCompoenent('Users') ? 'active':''"
                                class="list-group-item list-group-item-action v ">
                                Users
                            </a>
                            <a @click="ChangePage('Categories')"
                                :class="ChangeClassAndCompoenent('Categories') ? 'active' : ''"
                                class="list-group-item list-group-item-action v ">
                                Categories
                            </a>
                            <a @click="ChangePage('MainProd')"
                                :class="ChangeClassAndCompoenent('MainProd') ? 'active' : ''"
                                class="list-group-item list-group-item-action v ">
                                Products
                            </a>
                            <a @click="ChangePage('Chart')" :class="ChangeClassAndCompoenent('Chart') ? 'active' : ''"
                                class="list-group-item list-group-item-action v ">
                                Chart
                            </a>

                        </div>
                    </div>
                    <transition-group name="slide" tag="div" class="col-md-9 d">
                        <Users key="Users" v-if="ChangeClassAndCompoenent('Users')" />
                        <Categories key="Categories" v-if="ChangeClassAndCompoenent('Categories')" />
                        <MainProd key="MainProd" v-if="ChangeClassAndCompoenent('MainProd')" />
                        <Chart key="Chart" v-if="ChangeClassAndCompoenent('Chart')" />

                    </transition-group>
                </div>
            </div>
        </center>
    </div>
</template>


<script>
import Categories from './Categories.vue';
import Chart from './Chart.vue';
import MainProd from './Products/MainProd.vue';
import Users from './Users.vue';

export default {
    name: 'Admin',
    data() {
        return {
            Data:
                [
                    { name: 'Users', val: true },
                    { name: 'Categories', val: false },
                    { name: 'Chart', val: false },
                    { name: 'MainProd', val: false },
                ],
        }
    },
    components: {
        Categories,
        Chart,
        MainProd,
        Users,
    },
    methods: {
        ChangePage: function (PageName) {

            let newData = [];
            for (let index = 0; index < this.Data.length; index++) {
                const element = this.Data[index];
                if (PageName == element.name) {
                    element.val = !element.val;
                    newData.push(element)
                } else {
                    element.val = false;
                    newData.push(element)
                }

            }
            this.Data = newData;

        },
        ChangeClassAndCompoenent: function (PName) {
            for (let index = 0; index < this.Data.length; index++) {
                const element = this.Data[index];
                if (PName == element.name) {
                    return element.val;
                }
            }
        }
    },
}
</script>


<style scoped>
.d {
    font-family: cursive;
    border: 1px solid #2f4f4f1f;
    margin: 1% auto;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

df {
    border: 1px solid #2f4f4f1f;
    margin: 1% auto;
}

.v {
    cursor: pointer;
}
</style>



