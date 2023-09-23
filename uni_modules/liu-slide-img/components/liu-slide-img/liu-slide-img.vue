<template>
	<view class="slide">
		<swiper :style="'height:'+heightNumber+'rpx'" :autoplay="autoplay" :interval="interval" :circular="circular"
			:current="current" :previous-margin="type==2?'30rpx':'0rpx'" :next-margin="type==2?'30rpx':'0rpx'"
			@change="handleChange">
			<swiper-item
				:class="{'swiper-item':type==1,'swiper-item-card':type==2,'swiper-item-card-margin':(type==2 && swiperCurrent!=index)}"
				v-for="(item, index) in list" :key="index" @click="click(index)">
				<image :src="item.src" lazy-load :style="'border-radius:'+borderRadius+'rpx;'"
					:class="{'defaut-img':type==1 || (type==2 && swiperCurrent==index),'card-img':type==2 && swiperCurrent!=index,'card-margin':type==2 && swiperCurrent==index}" />
			</swiper-item>
		</swiper>
		<view class="custom-indicator">
			<view v-for="(item,index) in list" :key="index"
				:class="['indicator-item',swiperCurrent==index?'indicator-item-active':'']"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			//轮播图数据源
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
			//轮播模式(1:默认；2:卡片)
			type: {
				type: Number,
				default: 1
			},
			//轮播图高度（rpx）
			heightNumber: {
				type: Number,
				default: 300
			},
			//轮播图圆角（rpx）
			borderRadius: {
				type: Number,
				default: 8
			},
			//是否自动切换
			autoplay: {
				type: Boolean,
				default: true
			},
			//自动切换时间间隔
			interval: {
				type: Number,
				default: 5000
			},
			//是否采用衔接滑动，即播放到末尾后重新回到开头
			circular: {
				type: Boolean,
				default: true
			},
			//当前所在滑块的index
			current: {
				type: Number,
				default: 0
			},
		},
		data() {
			return {
				swiperCurrent: 0
			}
		},
		mounted() {
			this.swiperCurrent = this.current
		},
		methods: {
			handleChange(e) {
				this.swiperCurrent = e.detail.current
				this.$emit("change", e.detail.current)
			},
			click(index) {
				this.$emit("click", index)
			}
		}
	};
</script>

<style scoped>
	.slide {
		width: 100%;
		position: relative;
	}

	.swiper-item {
		width: 100%;
		height: 100%;
		overflow: hidden;
		box-sizing: border-box;
	}

	.swiper-item-card {
		width: 92% !important;
		height: 100%;
		margin: 0 4%;
		overflow: hidden;
		box-sizing: border-box;
		display: flex;
		align-items: flex-start;
		justify-content: center;
	}

	.swiper-item-card-margin {
		padding: 4% 0;
	}

	.defaut-img {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.card-img {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.card-margin {
		width: calc(100% - 40rpx);
		margin: 0 20rpx;
		overflow: hidden;
	}

	.custom-indicator {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		margin: 0 auto;
		bottom: 30rpx;
	}

	.indicator-item {
		width: 10rpx;
		height: 10rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		margin: 0 6rpx;
		opacity: 0.6;
	}

	.indicator-item-active {
		background-color: #FFFFFF;
		opacity: 1;
	}
</style>