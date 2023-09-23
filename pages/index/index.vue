<template>
	<view class="content">
		<view class="logo">
			<view class="logoimg">
				<image src="../../static/img/logo.png"></image>
			</view>
			<view class="logotext">uni Music</view>
			<view class="logoicon iconfont icon-menu"></view>
		</view>

		<view class="search" @tap="goSearch()"><!-- 搜索框 -->
			<uniSearch></uniSearch>
		</view>

		<view class="swiper"><!-- 轮播图 -->
			<liu-slide-img :list="bannerimg" :type="2" :autoplay="autoplay" :interval="interval"></liu-slide-img>
		</view>

		<view style="margin: 25rpx; 0">
			<text style="font-size: 45rpx;font-weight: bolder;">推荐歌单</text>
		</view>

		<view class="playlist"><!-- 推荐歌单 -->
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="120">
				<!-- <view class="scroll-view-item_H">
					<image mode="aspectFill" src="https://p2.music.126.net/vuPDRsBSPjjRUG2D_CGngw==/109951162933606208.jpg"></image>
					<view>
						<text>123</text>
						<text>456</text>
					</view>
				</view> -->
				<view class="scroll-view-item_H" v-for="(item,index) in playlist" :key="item.id" @click="playlistId(item.id)">
					<image mode="aspectFill" :src="item.picUrl"></image>
					<view>
						<text>{{item.name}}</text>
					</view>
				</view>
			</scroll-view>
		</view>

		<view style="margin: 25rpx; 0">
			<text style="font-size: 45rpx;font-weight: bolder;">每日音乐推荐</text>
		</view>
        
		<view class="musiclist" v-for="(item,index) in musicList" :key="item.id" @click="musiclistId(item.id)">
			<songlist :item="item"></songlist>
		</view>
		
		<view class="toplist">
			<toplist></toplist>
		</view>
	</view>
</template>

<script>
	import {
		bannerList,topList,playList,musicList
	} from "../../common/api.js"
	
	export default {
		data() {
			return {
				bannerimg: [],
				autoplay: true,
				interval: 3000,
				playlist: [],
				musicList:[]
			}
		},
		onLoad() {
			let text=uni.getStorageSync("musiclist")
			console.log(text)
			bannerList().then(res => { //轮播图
				res.forEach(item => {
					let result = {}
					result.src = item.pic
					this.bannerimg.push(result)
				})
			})
			topList() //热榜歌单
			playList().then(res => { //推荐歌单
				this.playlist = res
				console.log(this.playlist)
			})
			musicList().then(res=>{//推荐音乐
				this.musicList=res
				this.musicList.forEach(item=>{
					item.aname=item.song.artists[0].name
				})
				console.log(this.musicList)
			})

		},
		methods: {
             playlistId(id){//推荐歌单的id 
				 uni.navigateTo({//跳转的playlist推荐歌单详情
				 	url:"/pages/playlist/playlist?id="+id
				 })
			 },
			 musiclistId(id){//音乐id
				 console.log(id)
				 uni.navigateTo({
				 	url:"/pages/detail/detail?id="+id
				 })
			 },
			 goSearch(){
				 uni.navigateTo({
				 	url:"/pages/search/search"
				 })
			 }
			 
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 0 40rpx;
		background: #FFFFFF;

		.logo {
			height: 80rpx;
			width: 100%;
			margin-top: 25rpx;
			display: flex;
			align-items: center;

			.logoimg {
				image {
					height: 80rpx;
					width: 80rpx;
				}
			}

			.logotext {
				font-size: 50rpx;
				font-weight: bolder;
				margin-left: 25rpx;
			}

			.logoicon {
				margin-left: auto;
				font-weight: bolder;
				font-size: 40rpx;
			}
		}

		.search {
			margin-top: 50rpx;
		}

		.swiper {
			margin-top: 50rpx;
		}

		.playlist {
			min-height: 420rpx;
			width: 100%;

			.scroll-view_H {
				white-space: nowrap;
				width: 100%;
				height: 420rpx;

				.scroll-view-item_H {
					display: inline-block;
					//border: 0.5px solid #eee;
					margin-right: 30rpx;
					width: 50%;
					height: 420rpx;
					border-radius: 20rpx;

					image {
						width: 100%;
						height: 70%;
						// border-top-left-radius: 30rpx;
						// border-top-right-radius: 30rpx;
						border-radius: 30rpx;
					}

					text {
						padding: 10rpx 20rpx;
						width: 100%;
						display: inline-block;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
			}
		}

		.toplist {
			margin-top: 50rpx;
		}
	}
</style>