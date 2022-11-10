<template>
    <div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="item in CategoriesList" :key="item._id">
                <div class="custom-control custom-checkbox">
                    <input v-on:change="checkCat(item._id)" :id="item._id" type="checkbox"
                        class="custom-control-input" />
                    <label :for="item._id" class="custom-control-label">{{
                            item.name
                    }}</label>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Categories',
    data() {
        return {
            CategoriesList: [],
        };
    },
    computed: {
        ...mapGetters(['allCategories']),
    },
    created() {
        this.GetCategories();
        this.$store.watch(() => {
            this.GetTheCatListFromStore();
        });
    },
    mounted() {
        this.CategoriesList = this.allCategories;
    },
    methods: {
        ...mapActions(['GetCategories']),
        checkCat(cat) {
            this.emit('CheckCat', cat);
        },
        GetTheCatListFromStore: function () {
            this.CategoriesList = this.allCategories;
        },
    },
};
</script>
<style>
.act {
    background-color: gainsboro;
}
</style>
