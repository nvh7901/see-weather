<template>
    <div class="main">
        <div v-if="isLoading" class="loading">
            <span></span>
        </div>
        <div v-else class="app">
            <Create v-if="modalOpen" v-on:close-dialog="showDialog" :APIkey="APIkey" :cities="cities" />
            <Navigation v-on:add-city="showDialog" v-on:edit-city="showButtonDelete" />
            <router-view v-bind:cities="cities" v-bind:edit="edit" v-on:add-city="showDialog" />
        </div>

    </div>
</template>

<script>
import axios from "axios";
import db from "./firebase/firebaseinit";
import Navigation from "./components/Navigation.vue";
import Create from "./components/Create.vue";
export default {
    name: "App",
    components: {
        Navigation,
        Create
    },
    data() {
        return {
            APIkey: "1183c552f636bb38e3d160c55cedcb46",
            cities: [],
            modalOpen: null,
            edit: null,
            isLoading: true,
        }
    },
    created() {
        this.getCityWeather();
    },
    methods: {
        getCityWeather() {
            let firebaseDb = db.collection('cities');
            firebaseDb.onSnapshot(snap => {
                if (snap.docs.length === 0) {
                    this.isLoading = false;
                }
                snap.docChanges().forEach(async (doc) => {
                    if (doc.type === "added" && !doc.doc.Nd) {
                        try {
                            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${doc.doc.data().city}&units=metric&APPID=${this.APIkey}`);
                            const data = response.data;
                            firebaseDb.doc(doc.doc.id).update({
                                currentWeather: data,
                            }).then(() => {
                                this.cities.push(doc.doc.data());
                                this.isLoading = false;
                            });
                        } catch (error) {
                            console.log(error);
                        }
                    } else if (doc.type === "added" && doc.doc.Nd) {
                        this.cities.push(doc.doc.data());
                    } else if (doc.type === "removed") {
                        // Đi qua mảng thành phố đã đặt và dùng hàm filter để lọc ra city đã bị xóa
                        this.cities = this.cities.filter(city => city.city !== doc.doc.data().city)
                    }
                });
            });
        },

        showDialog() {
            this.modalOpen = !this.modalOpen;
        },

        showButtonDelete() {
            this.edit = !this.edit;
        },
    },
}
</script>
<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Times New Roman', Times, serif;
}

.main {
    max-width: 1024px;
    margin: 0 auto;
    height: 100vh;

    .container {
        padding: 0 30px;
    }
}

.loading {
    @keyframes spin {
        to {
            transform: rotateZ(360deg);
        }
    }

    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;

    span {
        display: block;
        width: 60px;
        height: 60px;
        margin: 0 auto;
        border: 2px solid transparent;
        border-top-color: #142a5f;
        border-radius: 50%;
        animation: spin ease 1000ms infinite;
    }
}
</style>