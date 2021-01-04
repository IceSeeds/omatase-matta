<?php
  /* 初期化 */
  $pdo    = null;
  $sql    = null;
  $result = null;
  $list   = null;
  $items  = null;

  try {
    $pdo = new PDO( 'sqlite:db/youtube_anju.sqlite3' );

    $pdo->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
    $pdo->setAttribute( PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC );

    $sql = 'SELECT * FROM video_list';
    $list = $pdo->prepare( $sql );
    $list->execute();

    $result = $list->fetchAll( PDO::FETCH_ASSOC );

    print_r( $result );

    }catch( Exception $e ){
      echo $e->getMessage() . PHP_EOL;
    }
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>SQLite テスト</title>
</head>
<body>
  <?php
    foreach( $result as $items )
    {
      //echo '<p>' . $items['title'] . '</p>';
        echo '<div class="one-video">
                <a href="">
                  <img src="' . $items['thumbnails'] . '" alt="アンジュ サムネイル画像">
                  <p class="date">' . $items['publishedAt'] . '</p>
                  <p class="title">' . $items['title'] . '</p>
                </a>
              </div>';
    };
  ?>

</body>
</html>
