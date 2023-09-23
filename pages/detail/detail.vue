<template>
	<view class="detail"><!-- //音乐播放页 -->
		<view class="bj" v-if="data.al">
			<image mode="aspectFill" :src="data.al.picUrl"></image>
		</view>
		
		<view class="playimg" @tap="playmusic()">
			<view class="playbj">
				<image mode="aspectFill" src="../../static/img/playimg.png"></image>
			</view>
			<view class="musicimg" v-if="data.al">
				<image :class="playState?'tfimg':''" mode="aspectFill" :src="data.al.picUrl"></image>
			</view>
			<view class="icon">
				<text class="iconfont" :class="playState?'icon-timeout':'icon-play-circle'"></text>
			</view>
		</view>
		
		<view class="detail-container">
			
			<view class="songtitle" v-if="data.al">
				<view class="title">{{data.al.name}}</view>
				<view class="iconfont icon-heart"></view>
			</view>
			
			<view class="detail-lyric" >
				<!-- <view class="lyric-item">测试文字</view> -->
				<view :style="{transform:'translateY('+ -(lyricindex-1) * 82+'rpx)'}" :class="{active:lyricindex==index}" v-for="(item,index) in songlyric" :key="item.index" class="lyric-item">{{item.lyric}}</view>
			</view>
			
			<!-- <view class="player">
				<audio v-if="data.al" style="display:block;" :name="data.al.name" :poster="data.al.picUrl" :author="data.ar[0].name" controls="true" :src="musicUrl"></audio>
			</view> -->
			
			<view style="color: white;font-size: 35rpx;margin-top: 50rpx;font-weight: bold;">喜欢这首歌的人也喜欢听</view>
            
			<view class="simi">
				<view v-for="(item,index) in simi" :key="item.id" @tap="getsimiMusic(item.id)">
					<songlist :item="item"></songlist>
				</view>
			</view>

            <view style="color: white;font-size: 35rpx;margin-top: 50rpx;font-weight: bold;">精彩评论</view>
            
			<view class="comments">
				<view class="comments-flx" v-for="(item,index) in content">
					<view class="avatar">
						<image mode="aspectFill" :src="item.user.avatarUrl"></image>
					</view>
					<view class="info">
						<view class="username">{{item.user.nickname}}</view>
						<view class="time">{{$u.timeFormat(item.time, 'yyyy年mm月dd日')}}</view>
						<view class="text">{{item.content}}</view>
					</view>
					<view class="icon">
						<text>{{item.likedCount}}</text>
						<text class="iconfont icon-like"></text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getmusicUrl,getmusicInfo,getmusicCmd,getsimiSong,getmusicLyric} from "../../common/api.js"
	export default {
		data() {
			return {
				id:"",
				musicUrl:"",
				data:{
					
				},
				index:1,
				content:"",
				simi:[],
				songlyric:[],
				lyricindex:0,
				playState:true
			};
		},
		onLoad(id) {//获取音乐id
			this.id=id.id
			getmusicUrl(this.id).then(res=>{
				this.musicUrl=res.data.data[0].url
				console.log(this.musicUrl)
			})
			getmusicInfo(this.id).then(res=>{//获取歌曲信息
				this.data=res.data.songs[0]
                // #ifdef MP-WEIXIN
                   this.bgAudioManager = uni.getBackgroundAudioManager();
                   this.bgAudioManager.title = res.data.songs[0].al.name;
                // #endif
				
				// #ifdef H5
				   this.bgAudioManager = uni.createInnerAudioContext();
				   this.playState=false
				// #endif
				
				this.bgAudioManager.coverImgUrl = res.data.songs[0].al.picUrl ;
				this.bgAudioManager.src = this.musicUrl;
				this.bgAudioManager.onPlay(()=>{
					this.listenlyricIndex()
					this.playState=true
				})
				this.bgAudioManager.onPause(()=>{

					this.playState=false
				})
			})
			getmusicCmd(this.id,this.index).then(res=>{//获取歌曲点赞最高的15条评论
				console.log(res)
				this.content=res.data.hotComments
				console.log(this.content)
			})
			getsimiSong(this.id).then(res=>{//获取相似音乐
			    this.simi=res.data.songs
				this.simi.forEach(item=>{
                    item.picUrl=item.album.picUrl
					item.aname=item.artists[0].name
				})
				console.log(this.simi)
			})
			getmusicLyric(this.id).then(res=>{
				let lyric=res.data.lrc.lyric;
				let re=/\[([^\]]+)\]([^\[]+)/g;
				var result = [];
				lyric.replace(re,($0,$1,$2)=>{
					result.push({"time":this.formatTimeToSec($1),"lyric":$2});
				})
				this.songlyric=result
				
			})
			uni.setStorageSync('musiclist', {"name":123});
		},
		methods:{
			formatTimeToSec(value){
				let arr=value.split(':');
				return (Number(arr[0]*60)+Number(arr[1])).toFixed(1)
			},
			playmusic(){
				if(this.bgAudioManager.paused){
					this.bgAudioManager.play()
				}else{
					this.bgAudioManager.pause()
					this.closelyricindex()
				}
			},
			listenlyricIndex(){
				clearInterval(this.timer);
				this.timer=setInterval(()=>{
					for(var i=0;i<this.songlyric.length;i++){
						if(this.bgAudioManager.currentTime>this.songlyric[this.songlyric.length-1].time){
							this.lyricindex=this.songlyric.length-1
							break;
						}
						
						if(this.bgAudioManager.currentTime>this.songlyric[i].time&&this.bgAudioManager.currentTime<this.songlyric[i+1].time){
							this.lyricindex=i;
						}
						console.log(this.lyricindex)
					}
					
				},500)
			},
			closelyricindex(){
				clearInterval(this.timer)
			},
			getsimiMusic(id){
				console.log(id)
				uni.redirectTo({
					url:"/pages/detail/detail?id="+id
				})
			}
		},
		computed:{
			getsimiSong,getmusicLyric
		},
		onUnload() {
			this.closelyricindex()
			// #ifdef H5
			   this.bgAudioManager.destroy();
			// #endif
		},
		onHide() {
			this.closelyricindex()
			// #ifdef H5
			   this.bgAudioManager.destroy();
			// #endif
		}
	}
</script>

<style lang="scss">
     .detail{
		
		 position: relative;
		 padding: 0 25rpx;
		.bj{
			position: fixed;
			z-index: -1;
			top: 0;
			width: 100%;
			height: 100vh;
			-webkit-backdrop-filter: blur(10px);
			backdrop-filter: blur(10px);
			filter: blur(10px);
			transform: scale(1.2);
			image{
				width: 100%;
				height: 100%;
			}
		}
		.playimg{
			position: relative;
			margin-top: 25rpx;
			.playbj{
				height: 580rpx;
				width: 580rpx;
				margin: auto;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.musicimg{
				.tfimg{
					animation: rotate 6s linear infinite;
					@keyframes rotate{
						0%{
							transform: rotateZ(0deg);/*从0度开始*/
						}
						100%{
							transform: rotateZ(360deg);/*360度结束*/
						}
					}
				}
				image{
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					margin: auto;
					width: 290rpx;
					height: 290rpx;
					border-radius: 50%;
				}
			}
			.icon{
				width: 100rpx;
				height: 100rpx;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
				.iconfont{
					font-size: 100rpx;
				}
			}
		}
		.detail-container{
			padding: 25rpx;
			margin-top: 25rpx;
			width: 100%;
			.songtitle{
				display: flex;
				margin-bottom: 25rpx;
				.title{
					margin-right: auto;
					font-size: 45rpx;
					font-weight: bold;
				}
				.iconfont{
					font-size: 50rpx;
				}
			}
			.detail-lyric{
				transition: .5s;
				height: 246rpx;
				text-align: center;
				overflow: hidden;
				font-size: 32rpx;
				line-height: 82rpx;
				color: #919193;
				margin-bottom: 25rpx;
			}
			.lyric-item{
				overflow: hidden;
				height: 82rpx;
			}
			.lyric-item.active{
				color: white;
				font-weight: bold;
			}
			.player{
				margin-top: 25rpx;
			}
			.simi{
				
			}
		}
		.comments{
			margin-top: 50rpx;
			.comments-flx{
				min-height: 200rpx;
				display: flex;
				align-items: flex-start;
				margin-bottom: 50rpx;
				.avatar{
					image{
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;
					}
					margin-right: 25rpx;
				}
				.info{
					display: flex;
					width: 80%;
					flex-direction: column;
					justify-content: space-between;
					min-height: 100rpx;
					.username{
						font-size: 28rpx;
						line-height: 40rpx;
						color: #cbcacf;
					}
					.time{
						font-size: 26rpx;
						line-height: 40rpx;
						color: #eee;
					}
					.text{
						line-height: 40rpx;
						margin-top: 20rpx;
						color: white;
						font-weight: bold;
						font-size: 30rpx;
					}
					
				}
				.icon{
					margin-left: auto;
					color: #cbcacf;
					text{
						font-size: 35rpx;
						color: white;
					}
				}
			}
		}
	 }
</style>
