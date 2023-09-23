<template>
	<view class="listm">
		<view class="index">{{index+1}}</view>
		<view class="info">
			<view class="musicname">{{item.al.name}}</view>
			<view class="name">{{item.name}}</view>
		</view>
		<view class="icon">
			<text class="iconfont icon-heart"></text>
			<text class="iconfont icon-play-circle"></text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"songlistm",
		props:{
			item:{
				type:Object,
				default(){
					return
				}
			},
			index:{
				type:Number,
				default(){
					return
				}
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			
		},
		onLoad() {
           
		}
	}
</script>

<style lang="scss">
   .listm{
	   padding: 0 25rpx;
	   display: flex;
	   height: 120rpx;
	   width: 100%;
	   align-items: center;
	   
	   .index{
		   margin-right: 35rpx;
	   }
	   .info{
		   width: 60%;
		   .musicname{
			   overflow: hidden;
			   white-space: nowrap;
			   text-overflow: ellipsis;
			   margin-bottom: 10rpx;
			   font-weight: bold;
		   }
		   .name{
			   font-size: 25rpx;
			   color: #CBCBCD;
		   }
	   }
	   .icon{
		   margin-left: auto;
		   .iconfont{
			   font-size: 45rpx;
			   margin-left: 25rpx;
		   }
	   }
   }
</style>