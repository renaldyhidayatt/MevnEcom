<template>
    <i>
        <input class="form-control mr-sm-0" type="search" placeholder="Search" aria-label="Search" v-model="SearchData">
        <button @click="Search($event)" class="btn btn-outline-success my-2 my-sm-2">Search</button>
    </i>
</template>

<script>
export default {
    name: 'Search',
    data() {
        return {
            SearchData: ''
        }
    },
    methods: {
        Search(e) {
            e.preventDefault();
            this.$router.push({
                path: '/SearchP',
                name: 'SearchP',
                query: {
                    SData: this.SearchData
                }
            }).catch(() => { });
        }
    },
}
</script>