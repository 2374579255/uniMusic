### liu-slide-img适用于uni-app项目的轮播图组件
### 本组件目前兼容微信小程序、H5
### 本组件支持自定义自动切换、切换时间、轮播图高度、轮播内容
# --- 扫码预览、关注我们 ---

## 扫码关注公众号，查看更多插件信息，预览插件效果！ 

![](https://uni.ckapi.pro/uniapp/publicize.png)

### 使用方式
``` 
<template>
	<view class="page-main">
		<view style="margin: 30rpx;">卡片模式：</view>
		<liu-slide-img :list="list" :type="2" :autoplay="autoplay" :interval="interval" @change="change"
			@click="click"></liu-slide-img>
		<view style="margin: 30rpx;">默认模式：</view>
		<liu-slide-img :list="list" :autoplay="autoplay" :interval="interval" @change="change"
			@click="click">></liu-slide-img>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						src: "https://cdn.pixabay.com/photo/2020/05/19/13/32/cartoon-5190837_1280.jpg"
					},
					{
						src: "https://cdn.pixabay.com/photo/2020/05/19/13/35/cartoon-5190860_1280.jpg"
					},
					{
						src: "https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png"
					}
				],
				autoplay: true,
				interval: 3000
			}
		},
		methods: {
			//当前轮播索引
			change(e) {
				console.log('==========', e)
			},
			//点击轮播
			click(e) {
				console.log('点击轮播', e)
			}
		}
	}
</script>
```

### 属性说明
| 名称                         | 类型           | 默认值                  | 描述             |
| ----------------------------|--------------- | ---------------------- | ---------------|
| list                        | Array          | []                     | 轮播图数据源
| type                        | Number         | 1                      | 轮播模式(1:默认；2:卡片)
| heightNumber                | Number         | 300                    | 轮播图高度（rpx）
| borderRadius                | Number         | 8                      | 轮播图圆角（rpx）
| autoplay                    | Boolean        | true                   | 是否自动切换
| interval                    | Number         | 5000                   | 自动切换时间间隔
| circular                    | Boolean        | true                   | 是否采用衔接滑动，即播放到末尾后重新回到开头
| current                     | Number         | 0                      | 当前所在滑块的index
| @change                     | Function        |                        | 轮播回调
| @click                      | Function        |                        | 点击轮播
 


