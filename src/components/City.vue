<template>
    <div class="city">
        <!-- Icon edit list thành phố -->
        <div v-if="edit" @click="deleteCity" class="far fa-trash-alt edit" ref="edit"></div>
        <!-- Danh sách các thành phố -->
        <span style="text-transform: capitalize;">Thành phố:  {{ this.city.city }}</span>
        <span>MT mọc: {{ new Date(this.city.currentWeather.sys.sunrise * 1000).getHours() + ":" + new Date(this.city.currentWeather.sys.sunrise * 1000).getMinutes() }}</span>
        <span>Gió: {{ this.city.currentWeather.wind.speed }} m/s</span>
        <span>Độ ẩm: {{ this.city.currentWeather.main.humidity }}%</span>
        <div class="weather">
            <span>{{ Math.round(this.city.currentWeather.main.temp) }}&deg;</span>
            <img :src="require(`../../public/conditions/${this.city.currentWeather.weather[0].icon}.svg`)" alt="">
        </div>

        <div class="video">
            <video autoplay loop muted
                :src="require(`../../public/videos/${this.city.currentWeather.weather[0].icon}.mp4`)">
            </video>
            <div class="bg-overlay"></div>
        </div>
    </div>
</template>

<script>
import db from "../firebase/firebaseinit";

export default {
    name: 'CityVue',
    props: ["city", "edit"],
    data() {
        return {
            id: null,
        }
    },
    methods: {
        deleteCity() {
            db.collection('cities')
                .where('city', '==', `${this.city.city}`)
                .get()
                .then((docs) => {
                    docs.forEach((doc) => {
                        this.id = doc.id;
                    });
                })
                .then(() => {
                    db.collection('cities').doc(this.id).delete();
                })
        },
    },
}
</script>

<style lang="scss" scoped>
.city {
    display: flex;
    position: relative;
    flex-direction: column;
    padding: 20px;
    min-height: 250px;
    color: #fff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

    .edit {
        border-radius: 0 15px 0 0;
        border: 10px solid rgb(77, 77, 77);
        background-color: rgb(77, 77, 77);
        z-index: 1;
        font-size: 24px;
        position: absolute;
        bottom: 0;
        left: 0;
    }

    span {
        z-index: 1;
        // text-transform: capitalize;
        display: block;
        font-size: 24px;
        font-weight: 600;
    }

    .weather {
        display: flex;
        z-index: 1;
        justify-content: flex-end;
        align-items: flex-end;
        flex: 1;

        span {
            font-size: 32px;
            margin-right: 8px;
        }

        img {
            height: 24px;
            width: auto;
        }
    }

    .video {
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        video {
            height: 100%;

            @media (min-width: 900px) {
                height: auto;
                width: 100%;
            }
        }

        .bg-overlay {
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            background-color: rgba(0, 0, 0, 0.2);
        }
    }
}
</style>