# vue-tabs-swiper

这是一个基于 hammerjs 滑动切换的 tab 选项卡，支持 vue/vue-jsx。

`npm i vue-tabs-swiper -s`

```javascript
<vue-tabs-swiper>
    <div tab-label="热点">热点</div>
    <div tab-label="发现">发现</div>
    <div tab-label="关注">关注</div>
    // <My tab-label="我的" />
</vue-tabs-swiper>
```

### 演示

<img src="https://github.com/clown-wyj/vue-tabs-swiper/blob/develop/1.jpg" controls="controls" width="300px" />

### API

| 参数               | 说明                         | 类型            | 默认值              | 版本 |
| ------------------ | ---------------------------- | --------------- | ------------------- | ---- |
| v-model            | 绑定当前选中标签的下标       | Number          | 0                   | -    |
| tab-color          | tab 文字颜色                 | String          | #484848             | -    |
| tab-active-color   | tab 文字选中颜色             | String          | #31aaff             | -    |
| tab-font-weight    | tab 字体加粗                 | String, Number  | -                   | -    |
| tab-font-size      | tab 字体大小                 | Number          | -                   | -    |
| tab-slider-width   | tab 选中下标记宽度           | Number          | 20                  | -    |
| tab-slider-height  | tab 选中下标记高度           | Number          | -                   | -    |
| border-bottom      | 是否显示 header 下边线       | Boolean         | false               | -    |
| touch-animation    | tab 触摸动画                 | Boolean         | true                | -    |
| animation-time     | 选项卡切换滑动动画过渡时间   | Number          | 400                 | -    |
| threshold          | 选项卡切换滑动滑动切换的阈值 | Number          | 50                  | -    |
| un-tab-group-wiath | 当选项卡 head 无法获取宽度   | Number          | window.innerWidth   | -    |
| un-tabs-wiath      | 当选项卡无法获取宽度         | Number          | window.innerWidth   | -    |
| change             | 选项卡 change 事件           | Function(index) | -                   | -    |
| click              | 选项卡 tab click 事件        | Function(index) | -                   | -    |
| refresh            | 重新计算/渲染选项卡          | Methods         | \$refs.xx.refresh() | -    |

> 说明：un-tab-group-wiath 和 un-tabs-wiath 参数，是选项卡无法获取元素宽度，因此可手动设置宽度。
