<!--
 * @Author: wyj
 * @Date: 2019-11-12 22:12:13
 * @LastEditors: wyj
 * @LastEditTime: 2019-11-18 14:26:56
 * @Description: 
 -->
<script>
import VueTabsSwiper from "./app/index.js"

import HotSpot from "./dem/hot-spot"
import Found from "./dem/found"
import Concern from "./dem/concern"
export default {
    components: {
        VueTabsSwiper,
        HotSpot,
        Found,
        Concern
    },
    data() {
        return {
            value: 1
        }
    },
    render() {
        return (
            <div>
                <vue-tabs-swiper
                    v-model="value"
                    ref="tabsSwiper"
                    tab-font-weight="bold"
                    tab-color="#484848"
                    tab-active-color="#3189F4"
                >
                    <hot-spot tab-label="热点" />
                    <Found tab-label="发现" />
                    <Concern tab-label="关注" />
                </vue-tabs-swiper>
            </div>
        )
    }
}
</script>
<!--
<template>
    <div>
        <vue-tabs-swiper @change="test">
            <hot-spot tab-label="热点" />
            <Found tab-label="发现" />
            <Concern tab-label="关注" />
        </vue-tabs-swiper>
    </div>
</template>
<script>
import VueTabsSwiper from "./app/index.js"

import HotSpot from "./dem/hot-spot"
import Found from "./dem/found"
import Concern from "./dem/concern"
export default {
    components: {
        VueTabsSwiper,
        HotSpot,
        Found,
        Concern
    },
    methods: {
        test(val) {
            console.log(val)
        }
    }
}
</script>
-->
