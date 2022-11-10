<template>
    <center>
        <div>
            <h5 class=" btn-danger">Categories</h5>

            <input class="form-group bn" type="text" placeholder="Category Name" v-model="TheNewAddedCat">
            <button @click="AddNewCat" class="btn btn-success form-group bn">New Category</button>

            <ul v-for="data in NewCatList" :key="data._id" class="list-group m">
                <li class="z list-group-item d-flex justify-content-between align-items-center">
                    <input type="text" v-model="data.name" v-if="data.isEdit">
                    {{ data.name }}
                    <div class="form-group ">
                        <button class="form-control btn btn-primary" v-if="!data.isEdit"
                            @click="data.isEdit = !data.isEdit"> Edit</button>
                        <button class="form-control btn btn-success" v-if="data.isEdit"
                            @click="SaveAfterEdit(data._id, data)"> Save</button>
                        <!-- delete item -->
                        <button v-if="!data.isEdit" @click="Delete(data._id)" class="form-control btn btn-danger">
                            Delete</button>
                    </div>
                </li>
            </ul>

            <hr>
            <PageNationStore ComponentName="CategoryComponent" v-on:new-CategoryData="NewCatListPageData" />


        </div>
    </center>
</template>

<script>
import PageNationStore from './PageNationStore';

import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'Categories',
    data() {
        return {
            CatList: [],
            NewCatList: [],
            TheNewAddedCat: '',
            PageNumber: null,
        }
    },
    components: {
        PageNationStore
    },
    computed: {
        ...mapGetters(['allCategories'])
    },
    mounted() {
        //  this.GetCategories();
        this.GetTheCatListFromStore();
        this.AddEditToCatList();
    },
    created() {
        this.GetCategories();
        this.$store.watch(
            (state) => {
                console.log('store change cat.vue', state)
                this.GetTheCatListFromStore()
                this.AddEditToCatList()
            }
        )
    },
    methods: {
        ...mapActions([
            'ADD_NEW_CAT',
            'EditOneCat',
            'DeleteOneCat',
            'GetCategories'
        ]),

        GetTheCatListFromStore: function () {
            this.CatList = this.allCategories;
        },

        SaveAfterEdit: function (ID, ProjectData) {
            // console.log('id',ID, 'pn',ProjectData['name']  )
            let data = { ID, NewCatName: ProjectData['name'] };
            this.EditOneCat(data);
            this.AddEditToCatList();
        },
        AddNewCat() {
            let data = { NewCatName: this.TheNewAddedCat };
            this.ADD_NEW_CAT(data)
            this.AddEditToCatList();
        },
        Delete: function (ID) {
            let data = { ID };
            this.DeleteOneCat(data);
            this.GetTheCatListFromStore();
            this.AddEditToCatList();
        },
        NewCatListPageData(data, page) {
            this.PageNumber = page;
            this.CatList = data;

            this.AddEditToCatList()
        },

        AddEditToCatList() {
            // add isEdit to the array 
            let newData = [];
            for (let index = 0; index < this.CatList.length; index++) {
                let _id = this.CatList[index]['_id'];
                let name = this.CatList[index]['name'];
                newData.push({ _id, name, isEdit: false })
            }
            this.NewCatList = [];
            this.NewCatList = newData
        }
    },

}
</script>

<style scoped>
.userimg {
    max-width: 10%;
    border-radius: 50%;
}

.m {
    margin: 10px auto;
}

.wid {
    margin-left: auto;
    margin-right: auto;
    width: 10em;
}

.z {
    font-size: 14px;
    font-weight: bold;
}

.bn {
    margin: 5px;
}
</style>