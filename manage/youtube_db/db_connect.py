# coding: utf-8

import sqlite3

def connect():
    con = sqlite3.connect( 'db/youtube_anju.sqlite3' )
    cur = con.cursor()

    return con, cur

def close( con ):
    con.commit()
    con.close()

def all_view():
    con, cur = connect()

    sql = "SELECT * FROM video_list"
    cur.execute( sql )
    rows = cur.fetchall()
    for row in rows:
        print( row )

    close( con )
#all_view()

def add_search( data ):
    con, cur = connect()

    sql  = 'INSERT INTO video_list (videoId, publishedAt, time, thumbnails, title, description) values (?,?,?,?,?,?)'
    cur.execute(sql, data)

    close( con )
#add_search( ['6P7AczHsv8k', '2020-12-31', '10:16:32', '【●忘年会】2020年を振り返り、Wikiを読み、アンジュ相関図を作りたい。【アンジュ・カトリーナ／にじさんじ】', 'さよなら、2020・・・。いいやつだったよ・・。 ましゅまろ：https://marshmallow-qa.com/ange_katrina_?utm_medium=url_text&utm_source=promotion ♦️配信について ...', 'https://i.ytimg.com/vi/6P7AczHsv8k/hqdefault.jpg'] )

def update_videos( data ):
    con, cur = connect()

    sql  = 'UPDATE video_list SET viewCount = ?, likeCount = ? where videoId = ?'
    cur.execute(sql, data)

    close( con )
#update_videos( [100, 10055, "6P7AczHsv8k"] )

def delete_id( data ):

    con, cur = connect()

    sql  = 'DELETE FROM video_list WHERE id = ?'
    cur.execute(sql, data)

    """
    All Delete in Table
    """
    #sql  = 'DELETE FROM video_list'
    #cur.execute(sql)

    close( con )
#delete_id( [1] )
