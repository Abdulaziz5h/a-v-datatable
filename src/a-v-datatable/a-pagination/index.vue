<template>
    <div>
        <ul class="pagination-list">
            <slot
                name="pagination"
                :updatePagination="updatePagination"
                :activePage="activePage"
            >
                <li
                    class="page-item page-prev"
                    @click="activePage > 1 && updatePagination(activePage - 1)"
                    :class="{ 'fade-page': !(activePage > 1) }"
                >
                    <slot name="page-prev" :page="activePage - 1">&lt;</slot>
                </li>
                <template
                    v-for="(page, i) in Math.ceil(items.length / pageLength)"
                >
                    <span :key="i">
                        <li
                            v-if="
                                page == Math.ceil(items.length / pageLength) &&
                                    activePage <=
                                        Math.ceil(items.length / pageLength) - 3
                            "
                        >
                            ...
                        </li>
                        <li
                            v-if="
                                page == 1 ||
                                    (page > activePage - 2 &&
                                        page <
                                            activePage +
                                                2 +
                                                (page > 4 ? 0 : page)) ||
                                    page == Math.ceil(items.length / pageLength)
                            "
                            class="page-item"
                            :class="{ 'page-active': activePage == page }"
                            @click="updatePagination(page)"
                        >
                            <slot name="page" :page="page">{{ page }}</slot>
                        </li>
                        <li v-if="page == 1 && activePage >= 4">
                            ...
                        </li>
                    </span>
                </template>
                <li
                    class="page-item page-next"
                    @click="
                        activePage < Math.ceil(items.length / pageLength) &&
                            updatePagination(activePage + 1)
                    "
                    :class="{
                        'fade-page': !(
                            activePage < Math.ceil(items.length / pageLength)
                        )
                    }"
                >
                    <slot name="page-next" :page="activePage + 1">&gt;</slot>
                </li>
            </slot>
        </ul>
    </div>
</template>

<style scoped lang="scss">
.pagination-list {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
        display: inline-block;
        border: solid 1px rgba(0, 0, 0, 0.125);
        padding: 8px 12px;
        margin: 2px;
        cursor: pointer;
        user-select: none;
        &.page-active {
            background: rgba(49, 49, 194, 0.918);
            color: #fff;
        }
        &.fade-page {
            opacity: 0.6;
            background: #d8d6de;
        }
    }
}
</style>

<script>
export default {
    props: {
        items: Array,
        value: Array,
        pageLength: {
            type: Number,
            default: () => 10
        }
    },
    data: () => ({
        val: {
            type: null
        },
        activePage: 1
    }),
    mounted() {
        this.val = this.value;
        this.updatePagination(this.activePage);
    },
    methods: {
        updatePagination(page) {
            const activePage = this.pageLength * (page - 1);
            this.val = this.items.slice(
                activePage,
                activePage + this.pageLength
            );
            this.activePage = page;
        }
    },
    watch: {
        val(v) {
            console.log(v);
            this.$emit("input", v);
        },
        value(v) {
            this.val = v;
        },
        items() {
            this.updatePagination(this.activePage);
        }
    }
};
</script>
