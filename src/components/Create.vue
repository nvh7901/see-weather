<template>
    <div @click="closeDialog" class="modal" ref="modal">
        <div class="modal-wrap" ref="modalWrap">
            <label for="city-name">Nhập thành phố: </label>
            <input type="text" name="city-name" placeholder="Nhập tên thành phố" v-model="city">
            <button @click="addCity">Thêm mới</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import db from "../firebase/firebaseinit"
export default {
    name: 'CreateVue',
    props: ['APIkey', 'cities'],
    data() {
        return {
            city: "",
        }
    },

    methods: {
        closeDialog(e) {
            if (e.target === this.$refs.modal) {
                this.$emit('close-dialog')
            }
        },

        async addCity() {
            if (this.city === "") {
                alert('Không được để trống');
            } else if (this.cities.some((res) => res.city === this.city.toLowerCase())) {
                alert(`Thành phố ${this.city} đã tồn tại. Vui lòng nhập một thành phố khác`);
            } else {
                try {
                    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=imperia&appid=${this.APIkey}`);
                    const data = await res.data;
                    db.collection('cities').doc().set({
                        city: this.city.toLowerCase(),
                        currentWeather: data,
                    }).then(() => {
                        this.$emit('close-dialog')
                    });
                } catch (error) {
                    alert(`${this.city} không tìm thấy. Vui lòng nhập lại thành phố`);
                }

            }
        },
    },
}
</script>

<style lang="scss" scoped>
.modal {
    z-index: 101;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    width: 1024px;
    height: 1024px;
    display: flex;
    justify-content: center;
    align-items: center;

    label {
        color: #fff;
        font-size: 24px;
    }

    .modal-wrap {
        max-width: 500px;
        border-radius: 8px;
        width: 80%;
        padding: 20px;
        background-color: #31363d;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

        input {
            color: #fff;
            border: none;
            background-color: transparent;
            border-bottom: 1px solid #fff;
            padding: 6px 4px;
            margin: 10px 0 20px;
            width: 100%;
            font-size: 24px;

            &:focus {
                outline: none;
            }
        }

        button {
            background-color: #222325;
            color: #fff;
            padding: 15px;
            border-radius: 8px;
            border: none;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            font-size: 18px;
            cursor: pointer;
        }

    }
}
</style>