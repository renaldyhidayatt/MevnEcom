<template>
    <div>
        <button @click="CreateNew ? (CreateNew = !CreateNew) : (CreateNew = !CreateNew)"
            class="btn btn-success form-group bn">
            New Product
        </button>
        <form class="d" v-if="CreateNew">
            <div class="form-row">
                <div class="col-md-12">
                    <img class="ii" :src="NewProdData.product_img" />

                    <div class="fileUpload">
                        <input @change="onFileNewImg($event)" type="file" class="upload"
                            enctype="multipart/form-data" />
                        <small>Upload Img</small>
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <label>Name</label>
                    <input v-model="NewProdData.name" type="text" class="form-control" placeholder="Product name" />
                </div>
                <div class="form-group col-md-6">
                    <label>Price</label>
                    <input v-model="NewProdData.price" type="number" class="form-control" placeholder="Product Price" />
                </div>
            </div>
            <div class="form-group">
                <label>Desc</label>
                <input v-model="NewProdData.desc" type="text" class="form-control" placeholder="Description" />
            </div>
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label for="inputCategories">Categories</label>
                    <select v-model="NewProdData.prod_categories" v-on:change="ChangeNewProdCat($event)"
                        class="form-control">
                        <option v-for="Catdata in CatgeorisesList" :key="Catdata._id" :value="Catdata._id">
                            {{ Catdata.name }}
                        </option>
                    </select>
                </div>
            </div>
            <button @click="AddNewProduct($event)" type="submit" class="btn btn-primary">
                Add
            </button>
        </form>
    </div>
</template>
<script>
import axios from 'axios';

const URL_BACKEND = '';

export default {
    name: 'AddNew',
    date() {
        return {
            data: [],
            CreateNew: false,
            NewProdData: {
                name: '',
                desc: '',
                price: '',
                product_img: '',
                prod_categories: '',
            },
            files: null,
            CategoriesList: [],
        };
    },
    created() {
        this.GetTheCatListFromStore();
    },
    methods: {
        GetTheCatListFromStore: function () {
            axios.get(`${URL_BACKEND}/categories/All`).then((res) => {
                this.CategoriesList = res.data;
            });
        },
        ChangeNewProdCat(e) {
            this.NewProdData.prod_categories = e.target.value;
        },
        AddNewProduct(e) {
            e.preventDefault();

            if (
                !this.NewProdData.name ||
                !this.NewProdData.desc ||
                !this.NewProdData.price ||
                !this.NewProdData.product_img ||
                !this.NewProdData.prod_categories
            ) {
                alert('Please Complet Form Data');
            } else {
                const PostData = new FormData();
                PostData.append('name', this.NewProdData.name);
                PostData.append('desc', this.NewProdData.desc);
                PostData.append('price', this.NewProdData.price);
                PostData.append('prod_categories', this.NewProdData.prod_categories);

                for (const i of Object.keys(this.files)) {
                    PostData.append('image', this.files[i]);
                }
                let token = JSON.parse(localStorage.getItem('Auth')).Token;

                axios
                    .post(`${URL_backend}/products`, PostData, {
                        headers: { 'x-auth-token': token },
                    })
                    .then((res) => {
                        console.log('new prod data', res.data);
                        this.$emit('NewData');
                        this.CreateNew = !this.CreateNew;
                    })
                    .catch((err) => {
                        alert(err.response.data);
                    });
            }
        },
        onFileNewImg(e) {
            this.NewProdData.product_img = URL.createObjectURL(e.target.files[0]);

            this.files = e.target.files;
        }
    },
};
</script>

<style>
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
