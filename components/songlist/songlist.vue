<template>
	<view class="songlist">
		<view class="songdetail">
			<view class="songimg">
				<image mode="aspectFill" :src="item.picUrl"></image>
			</view>
			<view class="songinfo">
				<text class="name">{{item.name}}</text>
				<text class="aname">{{item.aname}}</text>
			</view>
			<view class="songlike">
				<text class="iconfont icon-heart"></text>
				<text class="iconfont icon-play-circle"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "songlist",
		props: {
			item: {
				type: Object,
				default () {
					return;
				}
			}
		},
		data() {
			return {

			};
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.songlist {
		.songdetail {
			min-height: 220rpx;
			width: 100%;
			background: #FAFAFA;
			display: flex;
			align-items: center;
			padding: 0 25rpx;
			margin: 10rpx 0;
			border-radius: 25rpx;

			.songimg {
				image {
					width: 170rpx;
					height: 170rpx;
					border-radius: 20rpx;
				}
			}

			.songinfo {
				margin: 0 25rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				white-space: nowrap;
				overflow: hidden;
				
				.name {
					font-weight: bold;
					font-size: 35rpx;
					text-overflow: ellipsis;
					
				}
				.aname {
					font-size: 25rpx;
					margin-top: 15rpx;
				}
			}

			.songlike {
				margin-left: auto;

				.iconfont {
					font-size: 45rpx;
					margin-left: 25rpx;
				}
			}
		}
	}
</style>