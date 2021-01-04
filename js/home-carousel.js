$(function(){
  var target_id = "";
  /*
  |   youtube API videos
  */
  function video_search( target_id ){
    console.log( target_id );
    $.ajax({
      type: 'get',
      url: 'https://www.googleapis.com/youtube/v3/videos',//リクエストURL
      dataType: 'json',
      data: {
        part: 'snippet, statistics',
        id: target_id,
        //使用するAPIキー
        key: 'AIzaSyDb_gBbucdoCC4PgGzZc4pEYY-VDOekJdI'
      }
    }).done(function(response){
      // 成功時の動作を記述
      var jsonData = JSON.stringify(response, null, "\t");
      //$('#hoge').text(jsonData);
      $('#hoge').append(jsonData);
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
			key: 'AIzaSyDb_gBbucdoCC4PgGzZc4pEYY-VDOekJdI'
		}
	}).done(function(response){
		// 成功時の動作を記述
		var jsonData = JSON.stringify(response, null, "\t");
		$('#hoge').text(jsonData);

    num = response.items.length;
    for( var i = 0; i < num ; i++ )
    {
      target_id = response.items[i].id.videoId;
      video_search( target_id );
    }
	}).fail(function() {
		// 失敗時の動作を記述
		$('#hoge').text('失敗しました');
	});
});
