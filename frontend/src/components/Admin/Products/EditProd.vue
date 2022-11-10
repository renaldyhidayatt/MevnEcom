<template>
    <div>
        <form class="d">
            <div class="form-row">
                <div class="col-md-12">
                    <img class="ii" :src="DataArr.product_img">

                    <div class="fileUpload">
                        <input @change="onFileChange($event)" type="file" class="upload"
                            enctype="multipart/form-data" />
                        <span>Upload</span>
                    </div>
                </div>
                <div class="form-group col-md-6">
                    <label>Name</label>
                    <input v-model="DataArr.name" type="text" class="form-control" placeholder="Product name">
                </div>
                <div class="form-group col-md-6">
                    <label>Price</label>
                    <input v-model="DataArr.price" type="number" class="form-control" placeholder="Product Price">
                </div>
            </div>
            <div class="form-group">
                <label>Desc</label>
                <input v-model="DataArr.desc" type="text" class="form-control" placeholder="Description">
            </div>
            <div class="form-row">
                <div class="form-group col-md-4">
                    <label for="inputCategories">Categories</label>
                    <select v-on:change="ChangeProductCat($event, DataArr._id)" class="form-control">
                        <option v-for="catdata in CatgeorisesList" :key="catdata._id"
                            :selected="CheckTheCat(catdata._id)" :value="catdata._id">
                            {{ catdata.name }}
                        </option>
                    </select>
                </div>
            </div>
            <button @click="saveData($event)" class="btn btn-primary">Save</button>
            <button @click="Delete($event, DataArr._id)" class="btn btn-success">Delete</button>
        </form>

    </div>
</template>

<script>
import axios from 'axios';

const URL_BACKEND = '';

export default {
    name: 'EditProd',
    props: ['ProdID'],
    data() {
        return {
            DataArr: [],
            prodid: this.ProdID,
            files: null,
            CategoriesList: []
        }
    },
    created() {
        this.DataFunc();
    },
    methods: {
        GetTheCatListFromStore: function () {
            axios.get(`${URL_backend}/categories/All`)
                .then(res => {
                    this.CatgeorisesList = res.data;
                })
        },
        DataFunc: function () {
            axios.get(`${URL_backend}/products/${this.prodid}`)
                .then(res => {
                    let data = {
                        _id: res.data._id,
                        desc: res.data.desc,
                        name: res.data.name,
                        product_img: res.data.product_img,
                        price: res.data.price,
                        catname: res.data.prod_categories.name,
                        catid: res.data.prod_categories._id,
                    };

                    this.DataArr = data;
                })
        },
        saveData(e) {
            e.preventDefault();
            if (!this.DataArr.name || !this.DataArr.desc
                || !this.DataArr.price || !this.DataArr.product_img) {
                alert('Plese complete form data')
            } else {
                console.log('click', this.DataArr);

                const PostData = new FormData();
                PostData.append("name", this.DataArr.name);
                PostData.append("desc", this.DataArr.desc);
                PostData.append("price", this.DataArr.price);
                PostData.append("prod_categories", this.DataArr.catid);
                PostData.append("product_img", this.DataArr.product_img);

                if (this.files !== null) {
                    for (const i of Object.keys(this.files)) {
                        PostData.append('image', this.files[i])
                    }
                }

                let Tok = JSON.parse(localStorage.getItem("Auth")).Token;
                axios.put(`${URL_backend}/products/${this.DataArr._id}`,
                    PostData,
                    { headers: { 'x-auth-token': Tok } },
                )
                    .then(res => {
                        console.log('new prod data ', res.data)
                        this.$emit('SaveDone');
                    })
                    .catch((err) => {
                        console.log('errX', err.response);
                        alert(err.response.data)
                    })
            }
        },
        onFileChange(e) {
            this.DataArr.product_img = URL.createObjectURL(e.target.files[0])
            this.files = e.target.files;
        },
        CheckTheCat(catId) {
            let DArr = this.DataArr.catid;
            if (String(DArr) === String(catId)) {
                return true;
            } else {
                return false;
            }
        },
        ChangeProductCat(e) {
            this.DataArr.catid = e.target.value;
        },
        Delete(e, id) {
            e.preventDefault();
            const token = JSON.parse(localStorage.getItem("Auth")).Token;
            axios.delete(`${URL_BACKEND}/products/${id}`,
                { headers: { 'x-auth-token': token } })
                .then(res => {
                    console.log('del res', res)
                    this.$emit('SaveDone');
                })
                .catch((err) => {
                    console.log('er', err.response.data.msg);
                });
        }
    }
}
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