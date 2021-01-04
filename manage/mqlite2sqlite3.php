<?php
/******************************************************************************
 * MySQL->SQLite変換
 *
 ******************************************************************************/
//MySQL接続情報
$cfg['MYSQL_DSN'] = 'mysql:host=localhost;dbname=youtube_anju;';
$cfg['MYSQL_USER'] = 'admin';
$cfg['MYSQL_PASS'] = 'admin';
//SQLiteデータベース
$cfg['SQLITE_DSN'] = 'sqlite:youtube_anju';
//変換するテーブル名
$cfg['TABLE_NAME'] = 'video_list';

//MySQLへ接続
$pdo_mysql = new PDO($cfg['MYSQL_DSN'], $cfg['MYSQL_USER'], $cfg['MYSQL_PASS'], array(
	PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
	PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
	PDO::ATTR_EMULATE_PREPARES => true));

//SQLiteへ接続
$pdo_sqlite = new PDO($cfg['SQLITE_DSN'], '', '',  array(
	PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
	PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
	PDO::ATTR_EMULATE_PREPARES => true));

//CREATE TABLE文を生成
$query = genCreateQuery($pdo_mysql, $cfg['TABLE_NAME']);
echo "CREATE TABLE文<br><textarea>".$query."</textarea>";
//既にテーブルが存在した場合は削除する
$pdo_sqlite->query("DROP TABLE IF EXISTS ".$cfg['TABLE_NAME']);
//SQLiteにテーブル作成
$pdo_sqlite->query($query);

//INSERT文を生成
$query = genInsertQuery($pdo_mysql, $cfg['TABLE_NAME']);
echo "<br>INSERT文<br><textarea>".htmlentities($query)."</textarea>";
//SQLiteでINSERT文を実行
$pdo_sqlite->query($query);

/************************************************
 * MySQLのテーブル情報からSQLite用のCREATE TABLEを作成
 *
 ************************************************/
function genCreateQuery($pdo_mysql, $table_name)
{
	//SHOW COLUMNS文でテーブルのフィールド情報を取得
	$rows = $pdo_mysql->query('SHOW COLUMNS FROM '.$table_name);
	//SQLite用のCREATE TABLE文を生成
	$query_create = "CREATE TABLE ".$table_name." (\n";
	foreach ($rows as $i => $row) {
		if ($i > 0) {
			$query_create .= ",\n";
		}
		$query_create .= $row['Field'];
		//MySQLの型名をSQLiteに合わせる
		$query_create .= ' '.convert_type($row['Type']);
		//auto_increment対応
		if ($row['Extra'] == 'auto_increment') {
			$query_create .= ' primary key autoincrement';
		}
	}
	$query_create .= ');';
	return $query_create;
}
/************************************************
 * MySQLの型名をSQLiteに変換
 *
 ************************************************/
function convert_type($type_str)
{
	$types['/bigint(.*)/'] = 'integer';
	$types['/int(.*)/'] = 'integer';
	$types['/tinyint(.*)/'] = 'integer';
	$types['/smallint(.*)/'] = 'integer';
	$types['/mediumint(.*)/'] = 'integer';
	$types['/varchar(.*)/'] = 'text';
	$types['/character(.*)/'] = 'text';
	foreach ($types as $pattern => $replace) {
		$type_str = preg_replace($pattern, $replace, $type_str);
	}
	return $type_str;
}
/************************************************
 * MySQLのテーブルからINSERT文を生成
 *
 ************************************************/
function genInsertQuery($pdo_mysql, $table_name)
{
	$rows = $pdo_mysql->query('SELECT * FROM '.$table_name);
	$query_insert = "INSERT INTO ".$table_name." VALUES \n";
	foreach ($rows as $i => $row) {
		foreach ($row as $key => $value) {
			//シングルクォートのエスケープ処理
			$row[$key] = str_replace("'", "''", $value);
		}
		if ($i > 0) $query_insert .= ",\n";
		$query_insert .= "('".implode("','", $row)."')";
	}
	return $query_insert;
}
?>
