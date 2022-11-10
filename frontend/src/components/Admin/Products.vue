<template>
    <center>
        <div>
            <h5 class=" btn-danger">Products</h5>
            <div v-if="!CreateNew">
                <div v-for="data in NewProductsList" :key="data.id">
                    <form class="d" v-if="data.isEdit">
                        <div class="form-row">
                            <div class="col-md-12">
                                <img class="ii" :src="data.imgSrc">
                                <div class="fileUpload">
                                    <input @change="onFileChange($event, data.id)" type="file" class="upload"
                                        enctype="multipart/form-data" />
                                    <span>Upload</span>
                                </div>
                            </div>
                            <div class="form-group col-md-6">
                                <label>Name</label>
                                <input v-model="data.name" type="text" class="form-control" placeholder="Product name">
                            </div>
                            <div class="form-group col-md-6">
                                <label>Price</label>
                                <input v-model="data.price" type="number" class="form-control"
                                    placeholder="Product Price">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Desc</label>
                            <input v-model="data.desc" type="text" class="form-control" placeholder="Description">
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label for="inputCategories">Categories</label>
                                <select v-on:change="ChangeProductCat($event, data.id)" class="form-control">
                                    <option v-for="catdata in CatgeorisesList" :key="catdata.id"
                                        :selected="CheckTheCat(catdata.id, data.id)" :value="catdata.id">
                                        {{ catdata.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <button @click="saveData($event, data.id, data)" class="btn btn-primary">Save</button>
                        <button @click="Delete($event, data.id)" class="btn btn-success">Delete</button>
                    </form>
                    <div class="card d" v-if="!data.isEdit">
                        <img class="card-img-top" :src="data.imgSrc" :alt="data.name">
                        <div class="card-body">
                            <h5 class="card-title">Name :{{ data.name }}</h5>
                            <p class="card-text">Desc :{{ data.desc }} </p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Price:${{ data.price }}</li>
                            <li v class="list-group-item danger">Category : {{ GetCatById(data.CatID) }}
                            </li>
                        </ul>
                        <div class="card-body">
                            <a @click="data.isEdit = !data.isEdit" class="card-link btn btn-danger">Edit</a>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <PageNationStore v-if="!CreateNew" v-on:new-ProductsData="NewProductData"
                ComponentName="ProductComponent" />
        </div>
    </center>

</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import PageNationStore from './PageNationStore';

export default {
    name: 'Prod',
    data() {
        return {
            ProductsList: [],
            NewProductsList: [],
            CatgeorisesList: [],
            NewProdData: {
                id: '',
                CatID: '',
                name: '',
                desc: '',
                price: '',
                imgSrc: '',
                isEdit: false
            },
            selected: '',
            CreateNew: false,
            PageNumber: null,
        }
    },
    components: {
        PageNationStore
    },
    computed: {
        ...mapGetters(['AllProducs', 'allCategories'])
    },
    mounted() {
        this.GetTheProdListFromStore();
        this.GetTheCatListFromStore();
        this.AddEditToProductsList();
    },
    created() {
        this.GetProducts();
        this.GetCategories();
    },
    methods: {
        ...mapActions([
            'GetProducts',
            'ADD_NEW_PRODUCT',
            'EditOneProd',
            'DeleteOneProd',
            'GetCategories'
        ]),
        GetTheProdListFromStore: function () {
            this.ProductsList = this.AllProducs;
        },
        GetTheCatListFromStore: function () {
            this.CatgeorisesList = this.allCategories;
        },
        AddEditToProductsList() {
            let newData = []
            for (let index = 0; index < this.ProductsList.length; index++) {
                let id = this.ProductsList[index]['id'];
                let name = this.ProductsList[index]['name'];
                let price = this.ProductsList[index]['price'];
                let desc = this.ProductsList[index]['desc'];
                let CatID = this.ProductsList[index]['CatID'];
                let imgSrc = this.ProductsList[index]['imgSrc'];

                newData.push({ id, name, CatID, price, imgSrc, desc, isEdit: false })
            }
            this.NewProductsList = [];
            this.NewProductsList = newData;
        },
        GetCatById(CatID) {
            let el = this.CatgeorisesList.find(el => el.id == CatID);
            return el.name;
        },
        CheckTheCat(CatId, ProductID) {
            let Pdata = this.NewProductsList.find(Pdata => Pdata.id == ProductID);
            if (CatId === Pdata.CatID) {
                return true;
            } else {
                return false;
            }
        },
        ChangeProductCat(e, ProductID) {
            let newDataArray = [];
            for (let index = 0; index < this.NewProductsList.length; index++) {
                let element = this.NewProductsList[index];
                if (element.id === ProductID) {
                    element['CatID'] = e.target.value;
                    newDataArray.push(element)
                } else {
                    newDataArray.push(element)
                }
            }
            this.NewProductsList = newDataArray;
        },
        saveData(e, ProdID, newData) {
            e.preventDefault();
            let data = {
                ID: ProdID, name: newData.name,
                CatID: newData.CatID,
                price: newData.price,
                desc: newData.desc,
                imgSrc: newData.imgSrc
            }

            this.EditOneProd(data);
            this.AddEditToProductsList();
        },
        onFileChange(e, ProdID) {
            let newDataArray = [];
            for (let index = 0; index < this.NewProductsList.length; index++) {
                let element = this.NewProductsList[index];
                if (ProdID === element.id) {
                    let reader = new FileReader();
                    reader.readAsDataURL(e.target.files[0]);
                    reader.onload = () => {
                        element['imgSrc'] = reader.result
                    }
                    newDataArray.push(element)
                } else {
                    newDataArray.push(element)
                }
            }
            this.NewProductsList = newDataArray;
        },
        Delete(e, ID) {
            e.preventDefault();

            let data = { ID }
            this.DeleteOneProd(data);
            this.GetTheCatListFromStore();
            this.AddEditToProductsList();
        },
        ChangeNewProdCat(e) {
            this.NewProdData.CatID = e.target.value;
        },
        onFileNewImg(e) {
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                this.NewProdData.imgSrc = reader.result;
            }
        },
        AddNewProduct(e) {
            e.preventDefault();
            if (!this.NewProdData.name || !this.NewProdData.desc ||
                !this.NewProdData.price || !this.NewProdData.imgSrc ||
                !this.NewProdData.CatID) {
                alert('Please Complet Form Data');
            } else {
                this.ADD_NEW_PRODUCT(this.NewProdData);
                this.AddEditToProductsList();
                this.CreateNew = !this.CreateNew;
            }
        },
        NewProductData(data, page) {
            this.PageNumber = page;
            this.ProductsList = data;
            this.CatgeorisesList = this.allCategories;
            this.AddEditToProductsList()
        }

    },
}
</script>

<style>
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

.im {
    max-width: 10%;
    border-radius: 50%;
}

.d {
    font-family: cursive;
    border: 1px solid #2f4f4f1f;
    margin: 3% 1%;
    padding: 2%;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}


.card>img {
    /* width: 100px; */
    margin-left: auto;
    margin-right: auto;
    width: 10em;
}

.ii {
    margin-left: auto;
    margin-right: auto;
    width: 10em;
}



.fileUpload {
    background: #00bcbe;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    border-radius: 15px;
    color: #fff;
    font-size: 1em;
    font-weight: bold;
    margin: 1.25em auto;
    /*20px/16px 0*/
    overflow: hidden;
    padding: 0.875em;
    /*14px/16px*/
    position: relative;
    text-align: center;
    width: 120px;
    cursor: pointer;
}

.fileUpload:hover,
.fileUpload:active,
.fileUpload:focus {
    background: #00a2a4;
    cursor: pointer;
}

.fileUpload input.upload {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    padding: 0;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    filter: alpha(opacity=0);
    width: 148px;
    height: 46px;
    cursor: pointer;
}
</style>