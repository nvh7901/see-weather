<template>
    <div>
        <div v-if="cities.length === 0" class="no-cities">
            <p>Chưa có thành phố nào, Hãy thêm một thành phố để xem thời tiết</p>
            <button @click="addCity">Thêm mới</button>
        </div>
        <div class="grid">
            <div class="city-link" v-for="(city, index) in cities" v-bind:key="index">
                <City v-bind:city="city" v-bind:edit="edit" />
            </div>
        </div>
    </div>
</template>

<script>
import City from "../components/City.vue";
export default {
    name: "AddCity",
    props: ["cities", "edit"],
    methods: {
        addCity() {
            this.$emit("add-city");
        },
    },
    components: {
        City,
    },
    
}
</script>

<style lang="scss" scoped>
.no-cities {
    position: absolute;
    min-height: 100%;
    min-width: 1024px;
    width: 1024px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 24px;
}

.grid {
    display: grid;
    padding-top: 50px;
    background-color: #31363d;
    width: 100%;
    min-height: 100vh;
    grid-auto-rows: 250px;

    // responsive
    @media (min-width: 400px) {
        grid-template-columns: repeat(2, 1fr);
    }
}

button {
    background-color: #fff;
    color: black;
    padding: 15px;
    border-radius: 8px;
    border: none;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    font-size: 18px;
    margin-top: 15px;
    cursor: pointer;
}
</style>