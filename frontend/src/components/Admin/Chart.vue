<template>
    <div>
        <h1>Chart</h1>
        <pie-chart :data="piData"></pie-chart>
        <area-chart :data="arData"></area-chart>
    </div>
</template>


<script>
export default {
    name: 'chart',
    data() {
        return {
            piData: [],
            arData: {}
        }
    },
    methods: {
        InitGetData() {
            // http serve ..
            this.arData = {
                '2021-8-5': 270,
                '2021-8-6': 280,
                '2021-8-7': 300,
                '2021-8-8': 350,
                '2021-8-9': 100,
                '2021-8-10': 230,
            };

            this.piData = [
                ['blueberry', 55],
                ['Strawberry', 24],
                ['Mango', 88]
            ]
        }
    },
    mounted() {
        this.InitGetData();
    },
}
</script>
