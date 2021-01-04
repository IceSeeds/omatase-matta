$(function(){
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
      key: 'AIzaSyDb_gBbucdoCC4PgGzZc4pEYY-VDOekJdI'
    }
  }).done(function(response){
    // 成功時の動作を記述
    //var jsonData = JSON.stringify(response, null, "\t");
    //$('#hoge').text(jsonData);

    //next = response.nextPageToken; //CAUQAA
    /*
    関数を作ってajax通信をチャンネルの動画数回す。
    一度目
      nextPageToken
    n+1 度目以降
      prevPageToken
    終了条件
      prevPageToken = null

    for maxResults 50
    */
    num = response.items.length;
    for( var i = 0; i < num ; i++ )
    {
      var target_id      = response.items[i].id.videoId;
      var publishedAt    = response.items[i].snippet.publishedAt;
      var title          = response.items[i].snippet.title;
      //var description    = response.items[i].snippet.description;
      var thumbnails_url = response.items[i].snippet.thumbnails.high.url;

      $('#list').append('<div class="one-video">  <a href="https://www.youtube.com/watch?v=' + target_id + '"><img src="'+ thumbnails_url + '" alt="アンジュ サムネイル画像"><p class="date">' + publishedAt + '</p><p class="title">' + title + '</p></a></div>');
    }
    /*
      TODO
        ポップアップでの表示 or 新しいページを作ってそこで再生。
          youtube api で video のサーチを使って、その動画の情報も表示
    */
  }).fail(function() {
    // 失敗時の動作を記述
    $('#hoge').text('失敗しました');
  });
});
