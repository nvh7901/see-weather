<template>
    <div>
        <header class="container add-city">
            <nav>
                <!-- <span>Danh sách thành phố</span> -->
                <span>
                    {{ new Date().toLocaleString("vi", { weekday: "long" }) }},
                    {{ new Date().toLocaleString("vi", { day: "2-digit" }) }}
                    {{ new Date().toLocaleString("vi", { month: "long" }) }}
                </span>
                <div class="right">
                    <i @click="editCity" class="far fa-edit"></i>
                    <!-- <i @click="refreshApp" class="fa-solid fa-arrows-rotate"></i> -->
                    <i @click="addCity" class="far fa-plus"></i>
                </div>
            </nav>
        </header>
    </div>
</template>

<script>
export default {
    name: 'NavigationVue',
    props: ['listCityActive'],
    methods: {
        addCity() {
            this.$emit("add-city");
        },

        refreshApp() {
            location.reload();
        },

        editCity() {
            this.$emit("edit-city")
        },
    },
}
</script>

<style lang="scss" scoped>
.day {
    transition: 500ms ease all;
    background-color: rgb(59, 150, 249);
}

.night {
    transition: 500ms ease all;
    background-color: rgb(20, 42, 95);
}

header {
    z-index: 99;
    position: fixed;
    max-width: 1024px;
    width: 100%;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0.86);

    nav {
        display: flex;
        color: #fff;
        padding: 10px 0;
        justify-content: space-between;
        font-size: 24px;
    }

    .router-link {
        color: #fff;
    }

    .right {
        cursor: pointer;
        i {
            font-size: 24px;
        }

        i:nth-child(2),
        i:nth-child(3) {
            margin-left: 16px;
        }
    }

    span {
        font-weight: 500;
    }
}

.add-city {
    background-color: #313640;

}
</style>