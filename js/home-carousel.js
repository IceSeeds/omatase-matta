$(function(){
  /*
  |   youtube API videos
  */
  function video_search( data_array ){
    //console.log( data_array );
    $.ajax({
      type: 'get',
      url: 'https://www.googleapis.com/youtube/v3/videos',//リクエストURL
      dataType: 'json',
      data: {
        part: 'snippet, statistics',
        id: data_array[0],
        key: 'AIzaSyC6xWnSziX7JmvW2i85KwK54MwGPPNyZsw'
      }
    }).done(function( response ){
      // 成功時の動作を記述
      //var jsonData = JSON.stringify(response, null, "\t");
      //console.log( jsonData )
      var viewCount   = response['items'][0]['statistics']['viewCount'];
      var likeCount   = response['items'][0]['statistics']['likeCount'];
      var description = response['items'][0]['snippet']['description'];
      var thumbnails  = response['items'][0]['snippet']['thumbnails']['maxres']['url'];

      var html_data = '<div class="swiper-slide"><div class="slide-info"><p class="slide-img"><img src="' + thumbnails + '" width="500" height="250" alt="ss"></p><div class="slide-text"><ul><li class="slide-title">' + data_array[2] + '</li><li class="three-point">' + description + '</li><div class="slide-number"><li class="left">' + viewCount + ' 回視聴</li><li class="right"><i class="fas fa-thumbs-up">' + likeCount + '</i></li></div><li>' + data_array[1] + '</li></ul></div></div></div>';

      $( '#slide-list' ).append( html_data );
      //mySwiper.update;
      /*
        <div class="swiper-slide">
          <div class="slide-info">
            <p class="slide-img">
              <img src="' + thumbnails + '" width="500" height="250" alt="ss">
            </p>
            <div class="slide-text">
              <ul>
                <li class="slide-title">' + data_array[2] + '</li>
                <li class="three-point">' + description + '</li>
                <div class="slide-number">
                  <li class="left">' + viewCount + ' 回視聴</li>
                  <li class="right"><i class="fas fa-thumbs-up">' + likeCount + '</i></li>
                </div>
                <li>' + data_array[1] + '</li>
              </ul>
            </div>
          </div>
        </div>';
      */

    }).fail(function() {
      // 失敗時の動作を記述
      $('#hoge').text('失敗しました');
    });
  }

  /*
  |   youtube API search
  */
	$.ajax({
		type: 'get',//リクエスト方法
		url: 'https://www.googleapis.com/youtube/v3/search',//リクエストURL
		dataType: 'json',//取得するデータの形式
		data: {
			//リクエスト内容に応じたパラメータ
			part: 'snippet',
      channelId: 'UCHVXbQzkl3rDfsXWo8xi2qw',
      maxResults: 5,
      order: 'date',
			//使用するAPIキー
			key: 'AIzaSyC6xWnSziX7JmvW2i85KwK54MwGPPNyZsw'
		}
	}).done(function(response){
		//var jsonData = JSON.stringify(response, null, "\t"); // json表示用 json pars
    //console.log( "ok" + jsonData )
    num = response.items.length;
    for( var i = 0; i < num ; i++ )
    {
      var data_array     = [];

      var target_id      = response.items[i].id.videoId;
      var publishedAt    = response.items[i].snippet.publishedAt;
      var title          = response.items[i].snippet.title;
      //var description    = response.items[i].snippet.description; // videosの方で取得 ( 文字数制限があるため )
      //var thumbnails_url = response.items[i].snippet.thumbnails.maxres.url;
      //console.log( thumbnails_url )
      data_array.push( target_id, publishedAt, title );
      //console.log( data_array );
/*
      // TODO idが複数存在するため、別の方法を試すなう。
      //      連想配列を使うか、普通の配列を使うか。。。迷う
      var html_data = '<div class="swiper-slide"><div class="slide-info"><p class="slide-img"><img src="' + thumbnails_url + '" width="500" height="250" alt="ss"></p><div class="slide-text"><ul><li class="slide-title">' + title + '</li><li id="slide-des">' + description + '</li><div class="slide-number"><li class="left">none回視聴</li><li class="right"><i class="fas fa-thumbs-up">none</i></li></div><li>' + publishedAt + '</li></ul></div></div></div>';

      $('#slide-list').append( $(html_data) );
*/
      video_search( data_array );
    }
	}).fail(function() {
		// 失敗時の動作を記述
    console.log( '失敗しました' )
		$('#hoge').text('失敗しました');
	});
});
