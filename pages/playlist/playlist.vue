<template>
	<view class="playlist">
		<view class="head">
			<view class="fixbj">
				<image mode="aspectFill" :src="content.picurl"></image>
			</view>
			<view class="headflex">
				<view class="title">
					<text>{{content.title}}</text>
				</view>
				<view class="headimg">
					<image mode="aspectFill" :src="content.picurl"></image>
				</view>
			</view>
		</view>

		<view class="desc">
			<view class="desc-fix">
				<text>{{content.desc}}</text>
			</view>
		</view>

		<view class="songlist">
			<view v-for="(item,index) in data" :key="item.id" @click="musiclistId(item.id)">
				<songlistm :item="item" :index="index"></songlistm>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		baseUrl
	} from "../../common/config.js"
	import {
		getplayList,
		playlistDetail
	} from "../../common/api.js"
	export default {
		data() {
			return {
				id: "",
				data: "",
				content: {
					title: "",
					picurl: "",
					desc: ""
				}
			};
		},
		onLoad(listId) {
			this.id = listId.id
			getplayList(this.id).then(res => {//获取歌单列表的音乐
				this.data = res.data.songs
				this.$store.commit('InitlyricIndex',res.data.privileges)
				console.log(this.data)
				console.log(res)
			})
			playlistDetail(this.id).then(res => {
				this.content.title = res.data.playlist.name
				this.content.picurl = res.data.playlist.coverImgUrl
				this.content.desc = res.data.playlist.description.replace(/\n/g, ' ');
				console.log(res)
				console.log(this.content)
			})
		},
		methods: {
			musiclistId(id) { //音乐id
				console.log(id)
				uni.navigateTo({
					url: "/pages/detail/detail?id=" + id
				})
			}
		}
	}
</script>

<style lang="scss">
	.playlist {
		box-sizing: border-box;

		.head {
			z-index: 998;
			height: 400rpx;
			width: 100%;
			position: relative;

			.fixbj {
				width: 100%;
				height: 100%;
				-webkit-backdrop-filter: blur(5px);
				backdrop-filter: blur(5px);
				filter: blur(5px);
				border-radius: 25px;
				box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.2);

				image {
					width: 100%;
					height: 100%;
				}
			}

			.headflex {
				height: 200rpx;
				width: 100%;
				display: flex;
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				margin: auto;
				align-items: center;
				padding: 0 100rpx;

				.title {
					font-weight: bold;
					color: white;
					font-size: 45rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					margin-right: 25rpx;
				}

				.headimg {
					image {
						width: 200rpx;
						height: 200rpx;
						border-radius: 15rpx;
					}
				}
			}
		}

		.desc {
			height: 260rpx;
			width: 100%;
			padding: 0 25rpx;
			margin-top: -25rpx;
			margin-bottom: 25rpx;
			z-index: 999;
			position: relative;

			.desc-fix {
				background: white;
				border-radius: 15rpx;
				box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
				width: 100%;
				height: 100%;
				padding: 40rpx;

				text {
					overflow: hidden;
					display: -webkit-box; //将元素设为盒子伸缩模型显示
					-webkit-box-orient: vertical; //伸缩方向设为垂直方向
					-webkit-line-clamp: 4; //超出3行隐藏，并显示省略号
					font-size: 30rpx;
				}
			}
		}

		.songlist {
			padding: 0 25rpx;
		}
	}
</style>