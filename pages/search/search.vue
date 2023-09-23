<template>
	<view class="search">
		<view class="unisearch">
			<uni-search-bar radius="5" placeholder="请输入歌曲/歌手/歌名" @confirm="searchGet" v-model="searchtext"
				@cancel="cancel" />
		</view>

		<view class="searchdefault">

		</view>

		<view class="searchcmd" v-if="searchTrue">
			<view v-for="(item,index) in data" :key="item.index" class="searchlist" @click="searchlist(item.searchWord)">
				<view class="searchflex">
					<view class="index">{{index+1}}</view>
					<view class="word">{{item.searchWord}}</view>
					<view class="icon">
						<text class="iconfont icon-search"></text>
					</view>
				</view>
			</view>
		</view>
	    <view v-else class="searchcmd">
			<view v-for="(item,index) in songlist" :key="item.index" @click="getplaylist(item.id)">
				<songlist :item="item"></songlist>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		searchHot
	} from "../../common/api.js"
	import {baseUrl} from "../../common/config.js"
	export default {
		data() {
			return {
				data: [],
				searchtext: "",
				searchTrue:true,
				songlist:[]
			};
		},
		methods: {
			getplaylist(id){
				uni.redirectTo({
					url:"/pages/detail/detail?id=" + id
				})
			},
			getSearch(){//搜索歌曲
				uni.request({
					url:`${baseUrl}/cloudsearch?keywords=`+this.searchtext,
					success: res => {
						console.log(res)
						this.songlist=[]
						res.data.result.songs.forEach(item=>{
							let arr={}
							arr.name=item.name
							arr.picUrl=item.al.picUrl
							arr.aname=item.al.name
							arr.id=item.id
							this.songlist.push(arr)
						})
					}
				})
			},
              searchGet(){//按下确认搜索
				  this.getSearch()
				  this.searchTrue=false
			  },
			  cancel(){
				  this.searchTrue=true
				  console.log("取消搜索")
			  },
			  searchlist(text){//搜索的文本
				  this.searchtext=text
				  this.getSearch()
				  this.searchTrue=false
			  }
		},
		onLoad() {
			searchHot().then(res => {
				console.log(res)
				this.data = res.data.data
				console.log(this.data)
			})
		},
		computed: {

		}
	}
</script>

<style lang="scss">
	.search {
		min-height: 100vh;
		background: #F9F9F9;
		padding: 10rpx 25rpx;

		.searchdefault {}

		.unisearch {
			background: white;
			border-radius: 25rpx;
		}

		.searchcmd {
			margin-top: 25rpx;
			width: 100%;
			background: white;
			border-radius: 25rpx;
			padding: 15rpx 25rpx;

			.searchlist {
				width: 100%;
				height: 100rpx;
				line-height: 100rpx;

				.searchflex {
					display: flex;

					.index {
						margin-right: 15rpx;
					}

					.word {}

					.icon {
						margin-left: auto;

						.iconfont {
							font-size: 45rpx;
						}
					}
				}
			}
		}
	}
</style>