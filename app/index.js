import Hammer from "hammerjs"
import "./styles.less"
export default {
    name: "vue-tabs-swiper",
    props: {
        // 当前选择元素下表
        value: {
            type: Number,
            default: 0
        },
        // tab 文字颜色
        tabColor: {
            type: String,
            default: "#484848"
        },
        // tab 文字选中颜色
        tabActiveColor: {
            type: String,
            default: "#31aaff"
        },
        // 字体加粗
        tabFontWeight: [String, Number],
        // tab 字体大小
        tabFontSize: Number,
        // tab 选中下标记宽度
        tabSliderWidth: {
            type: Number,
            default: 20
        },
        // tab 选中下标记高度
        tabSliderHeight: Number,
        // 触摸动画，默认启动
        touchAnimation: {
            type: Boolean,
            default: true
        },
        // 滑动动画过渡时间
        animationTime: {
            type: Number,
            default: 400
        },
        // tabs 滑动滑动切换的阈值
        threshold: {
            type: Number,
            default: 50
        },
        // 是否显示header下边线
        borderBottom: Boolean,
        // tabs tab group未知宽度
        unknownTabGroupWiath: {
            type: Number,
            default: window.innerWidth
        },
        // tabs未知宽度
        unknowntabsWiath: {
            type: Number,
            default: window.innerWidth
        },
        // tabs change事件（支持jsx）
        change: Function,
        // tabs click事件（支持jsx）
        click: Function
    },
    data() {
        return {
            // tab 内容元素集合
            tabsContent: [],
            // tab 菜单元素集合
            tabsTiile: [],
            // tabs X轴位置
            translateX: 0,
            // 过渡时间
            duration: 0,
            // 保存当前tabs X位置（每次）
            tabsPositionX: 0,
            // 当前选择tab 下标
            tabIndex: 0,
            // 控制页面preventDefault
            touchmove: true
        }
    },
    mounted() {
        const hammer = new Hammer(this.$refs.tabsContent)
        hammer.on("panright", this.panright)
        hammer.on("panleft", this.panleft)
        hammer.on("panend", this.panend)
        document.addEventListener(
            "touchmove",
            event => {
                !this.touchmove ? event.preventDefault() : null
            },
            { passive: false }
        )
        this.initTabsSwiper()
    },
    methods: {
        initTabsSwiper() {
            this.tabIndex = this.value
            this.width = this.$el.clientWidth || this.unknowntabsWiath
            this.tabsGroupWidth =
                this.$refs.tabsGroup.clientWidth || this.unknownTabGroupWiath
            const slots = this.$slots.default ? this.$slots.default : []
            this.slots = slots.filter(item => item.tag)
            this.tabsContentElement()
            this.selectTab(this.tabIndex)
        },
        tabsContentElement() {
            // 获取tab 菜单元素集合
            this.tabsTiile = this.slots.map(({ data }) =>
                data ? data.attrs["tab-label"] : ""
            )
            // 获取tab 内容元素集合
            this.tabsContent = this.slots.map(item => {
                return this.$createElement(
                    "div",
                    {
                        style: {
                            width: `${this.width}px`,
                            "box-sizing": "border-box",
                            height: "100%"
                        }
                    },
                    [item]
                )
            })
        },
        panleft(e) {
            const { x, y } = e.center
            const unknown = Math.abs(x) + Math.abs(y)
            this.duration = 0
            if (unknown > 0) {
                this.touchmove = false
                this.translateX = this.tabsPositionX + e.deltaX
            }
        },
        panright(e) {
            const { x, y } = e.center
            const unknown = Math.abs(x) + Math.abs(y)
            this.duration = 0
            if (unknown > 0) {
                this.touchmove = false
                this.translateX = this.tabsPositionX + e.deltaX
            }
        },
        panend(e) {
            this.duration = this.animationTime
            if (e.deltaX > this.threshold) {
                // 大于-向右滑结束
                if (this.tabIndex != 0) {
                    this.tabIndex -= 1
                    this.$emit("input", this.tabIndex)
                }
            } else if (e.deltaX < -this.threshold) {
                const length = this.slots.length - 1
                // 小于-向左滑结束
                if (this.tabIndex != length) {
                    this.tabIndex += 1
                    this.$emit("input", this.tabIndex)
                }
            }
            this.selectTab(this.tabIndex)
        },
        selectTab(index = 0) {
            this.touchmove = true
            this.tabsPositionX = -(this.width * index)
            this.translateX = this.tabsPositionX
            this.change ? this.change(index) : this.$emit("change", index)
        },
        touchBackground(el) {
            let div = document.createElement("div")
            div.className = "touch-animation"
            div.style.width = `${el.clientWidth}px`
            div.style.height = `${el.clientWidth}px`
            el.appendChild(div)
            const clearTime = setTimeout(() => {
                el.removeChild(div)
                clearTimeout(clearTime)
            }, 700)
        },
        clickTab(index) {
            this.duration = this.animationTime
            this.tabIndex = index
            this.selectTab(index)
            this.$emit("input", index)
            this.click ? this.click(index) : this.$emit("click", index)
            if (!this.touchAnimation) return
            const tab = this.$refs.tabsGroup.children[index]
            new this.touchBackground(tab)
        },
        tabItem(item, index) {
            const color =
                this.tabIndex === index ? this.tabActiveColor : this.tabColor
            return (
                <div
                    class="tab"
                    key={index}
                    onClick={() => this.clickTab(index)}
                    style={{
                        "font-weight": this.tabFontWeight,
                        "font-size": `${this.tabFontSize}px`
                    }}
                >
                    <span style={{ color }}>{item}</span>
                </div>
            )
        },
        refresh() {
            this.initTabsSwiper()
            this.$forceUpdate()
        }
    },
    render() {
        const lenght = this.slots ? this.slots.length : 0
        const tabsWidth = this.slots ? lenght * this.width : 0
        const tabWidth = this.tabsGroupWidth ? this.tabsGroupWidth / lenght : 0
        const spare = (tabWidth * lenght) / this.width
        const tabsliderX =
            (-this.translateX * spare) / lenght +
            tabWidth / 2 -
            this.tabSliderWidth / 2
        return (
            <div class="xtt-tabs-swiper">
                <div
                    class={[
                        "tabs-header",
                        this.borderBottom ? "border-bottom" : null
                    ]}
                >
                    <div class="tabs-group" ref="tabsGroup">
                        {this.tabsTiile.map((item, index) =>
                            this.tabItem(item, index)
                        )}
                        <div
                            class="tab-slider"
                            style={{
                                width: `${this.tabSliderWidth}px`,
                                height: `${this.tabSliderHeight}px`,
                                transform: `translateX(${tabsliderX}px)`,
                                "transition-duration": `${this.duration}ms`,
                                "background-color": this.tabActiveColor
                            }}
                        />
                    </div>
                </div>
                <div class="tabs-content" ref="tabsContent">
                    <div
                        class="tabs-slide"
                        style={{
                            width: `${tabsWidth}px`,
                            transform: `translateX(${this.translateX}px)`,
                            "transition-duration": `${this.duration}ms`
                        }}
                    >
                        {this.tabsContent}
                    </div>
                </div>
            </div>
        )
    }
}
