<template>
    <div>
        <div v-if="!EDIT">
            <div v-for="data in ProductList" :key="data.id">
                <div class="card d">
                    <img class="card-img-top" :src="data.product_img" alt="data.name" />
                    <div class="card-body">
                        <h5 class="card-title">Name :{{ data.name }}</h5>
                        <p class="card-text">Desc :{{ data.desc }} </p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Price: ${{ data.price }}</li>
                        <li v class="list-group-item danger">Category: {{ data.prod_categories.name }}</li>
                    </ul>
                    <div class="card-body">
                        <a @click="EditProd(data._id)" class="card-link btn btn-danger">Edit</a>
                    </div>
                </div>
            </div>
            <hr>
            <PageNationStore v-on:new-ProductsData="changingPagenation" ComponentName="ProductComponent" />

        </div>
        <EditProd key="EditProd" v-if="EDIT" v-bind:ProdID="EditProdID" v-on:SaveDone="SaveDoneFunc" />
    </div>
</template>

<script>
import axios from 'axios';

const URL_BACKEND = '';

import EditProd from './';
import PageNationStoreVue from '../PageNationStore.vue';

export default {
    name: 'ProdList',
    components: {

    }
}

</script>
<style scoped>
.d {
    font-family: cursive;
    border: 1px solid #2f4f4f1f;
    margin: 3% 1%;
    padding: 2%;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.card>img {
    margin-left: auto;
    margin-right: auto;
    width: 10em;
}
</style>