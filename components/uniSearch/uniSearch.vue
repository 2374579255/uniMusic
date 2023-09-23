<template>
	<view>
		<view class="search">
			<view class="iconfont icon-search"></view>
			<input placeholder="搜索歌曲/专辑/音乐人"/>
		</view>
	</view>
</template>

<script>
	export default {
		name:"uniSearch",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
     .search{
		 height: 80rpx;
		 width: 100%;
		 background: #F0F2F5;
		 border-radius: 10px;
		 padding: 10rpx 40rpx;
		 display: flex;
		 align-items: center;
		 .iconfont{
			 font-size: 50rpx;
		 }
	 }
</style>