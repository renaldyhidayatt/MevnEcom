<template>
    <div class="container wid">
        <div class="row">
            <nav aria-label="Page navigation  ">
                <ul class="pagination">
                    <li class="page-item">
                        <button class="page-link" @click="NextPrevPage(false)">
                            <span aria-hidden="true">&laquo;</span>
                            <span class="sr-only">Previous</span>
                        </button>
                    </li>
                    <li v-for="(Page, idx) in PageArray" :key="idx" class="page-item">
                        <button :class="PageSelected === Page ? 'page-link active' : 'page-link'"
                            v-on:click="changePage(Page)">{{
                                    Page
                            }}</button>
                    </li>
                    <li class="page-item">
                        <button @click="NextPrevPage(true)" class="page-link">
                            <span aria-hidden="true">&raquo;</span>
                            <span class="sr-only">Next</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'PageNationStore',
    data() {
        return {
            PageSelected: '',
            PageArray: []
        }
    },
    props: ['ComponentName'],
    computed: {
        ...mapGetters(['AllUsers', 'allCategories', 'AllProducs']),
    },
    mounted() {
        if (!this.$route.query.page) {
            this.$router.push({
                path: '/',
                name: 'Admin',
                query: {
                    page: 1,
                }
            }).catch(() => { })
        }
        this.PageSelected = parseInt(this.$route.query.page);
        this.PageNation();

    },
    methods: {
        ...mapActions([
            'GetUsByPNum',
            'GetCatBYPageNumBer',
            'GetProdByPageNumber'
        ]),
        changePage(page) {
            if (this.ComponentName == 'UsersComponent') {
                this.GetUsByPNum(page);
                let newd = this.AllUsers;
                this.$emit('new-UserData', newd, page);
            }
            if (this.ComponentName == 'CategoryComponent') {
                this.GetCatBYPageNumBer(page);
                let newd = this.allCategories;
                this.$emit('new-CategoryData', newd, page)
            }
            if (this.ComponentName == 'ProductComponent') {
                this.GetProdByPageNumber(page);
                let newd = this.AllProducs;
                this.$emit('new-ProductsData', newd, page)
            }
            this.PageSelected = page;
            this.$router.push({
                path: '/',
                name: 'Admin',
                query: {
                    page: page,
                }
            }).catch(() => { })
        },
        PageNation() {
            this.PageArray = [];
            let Scale = this.PageSelected + 3;
            for (let index = this.PageSelected; index < Scale; index++) {
                this.PageArray.push(index)
            }
        },
        NextPrevPage(con) {
            if (con == false && this.PageSelected == 1) {
                console.log('non')
            }
            if (con == false && this.PageSelected !== 1) {
                this.PageSelected = this.PageSelected - 1;
                this.changePage(this.PageSelected);
                this.PageNation();
                console.log('nn', this.PageSelected)
            }
            if (con == true) {
                this.PageSelected = this.PageSelected + 1;
                this.changePage(this.PageSelected);
                this.PageNation();
                console.log('nn', this.PageSelected)
            }
        }
    },
}
</script>

<style scoped>
.wid {
    margin-left: auto;
    margin-right: auto;
    width: 10em;
}
</style>