import {baseUrl} from './config.js'
export function bannerList(){//首页轮播图
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/banner?type=2`,
			method:'GET',
			success:res=> {
				let result=res.data.banners;
				result.length=5;
				reslove(result)
			}
		})
	})
}
export function topList(){//热门榜单
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/toplist/detail`,
			method:'GET',
			success:res=> {
				console.log(res)
				reslove(res);
			}
		})
	})
}
export function playList(){//歌单推荐
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/personalized?limit=6`,
			method:'GET',
			success:res=> {
				let result=res.data.result
				reslove(result);
			}
		})
	})
}

export function musicList(){//新歌推荐
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/personalized/newsong`,
			method:'GET',
			success:res=> {
				let result=res.data.result
				reslove(result);
			}
		})
	})
}

export function getplayList(id){//获取歌单列表的音乐
		return uni.request({
			url:`${baseUrl}/playlist/track/all?id=${id}&limit=15&offset=1`
		})
}

export function playlistDetail(id){
	return uni.request({
		url:`${baseUrl}/playlist/detail?id=`+id
	})
}

export function searchHot(){//获取热搜列表
	return uni.request({
		url:`${baseUrl}/search/hot/detail`
	})
}

export function getmusicUrl(id){//获取歌曲音乐url
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/song/url?id=`+id,
			success:res=>{
				reslove(res)
			}
		})
	})
}

export function getmusicCmd(id,index){//获取歌曲评论
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/comment/music?id=${id}&limit=${index}`,
			success:res=>{
				reslove(res)
			}
		})
	})
}

export function getmusicInfo(id){//获取歌曲详细信息
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/song/detail?ids=`+id,
			success:res=>{
				reslove(res)
			}
		})
	})
}

export function getsimiSong(id){//获取相似音乐
		 return uni.request({
			url:`${baseUrl}/simi/song?id=`+id
		})
}

export function getmusicLyric(id){//获取歌词
	return uni.request({
		url:`${baseUrl}/lyric?id=`+id,
	})
}
