<template>
    <div>
        <div>
            <AddNew v-on:NewData="RestData" key="AddNew" />

            <ProdList key="ProdList" ref="child" />
        </div>
    </div>
</template>

<script>

import AddNew from './AddNew.vue';
import ProdList from './ProdList.vue';

export default {
    name: 'MainProd',
    components: {
        AddNew,
        ProdList
    },
    methods: {
        RestData() {
            console.log('any main prod');
            this.$refs.child.GetTheProdListFromStore();
        }
    }
}

</script>