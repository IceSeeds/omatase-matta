# coding: utf-8
import os
import pickle

import MeCab

import chat

def main( target_url, mode = "r" ):
    if mode == "w":
        res_comment = chat.count_result( target_url )

        text = ""
        comment = pkl_rw( target_url, res_comment, mode = "w" )
        for i in range( len( comment ) ):
            try:
                text += comment[i]['text']
            except KeyError:
                continue

        text = Preprocessing( text )
        text_wakati = mecab( text )

        pkl_rw( target_url, text_wakati, mode = "w", wakati = True )

        return pkl_rw( target_url, "read", mode = "r", wakati = True )

    elif mode == "r":
        return pkl_rw( target_url, "read", mode = "r", wakati = True )


#分かち書き
def mecab( text ):
    #t = MeCab.Tagger('-O wakati -u analysis/csv_2434.dic')#自作辞書の使用例
    t = MeCab.Tagger( '-O wakati' )
    sentence = text

    return t.parse( sentence )

#前処理
def Preprocessing( text ):
    #不要な文字を消す
    stop_chars = "\n,.、。()（）「」　『 』[]【】“”!！ ?？—:・■●★▲▼"
    for stop_char in stop_chars:
        text = text.replace( stop_char, "" )
    # アルファベットを小文字に統一
    text = text.lower()

    return text

#pklファイルで読み書き
def pkl_rw( target_url, comment, mode = 'r', wakati = False ):
    try:
        #書き込み用
        if mode == "w":
            if not wakati:
                with open( "manage/get_chat_list/" + target_url + "/comment.pkl", "wb" ) as f:
                    pickle.dump( comment, f )
            else:
                with open( "manage/get_chat_list/" + target_url + "/comment_wakati.pkl", "wb" ) as f:
                    pickle.dump( comment, f )

    except FileNotFoundError:
        os.mkdir( "manage/get_chat_list/" + target_url )
        print( "manage/get_chat_list/" + target_url + " : 新しいフォルダを作成しました。" )
        #回帰処理
        pkl_rw( target_url, comment, mode = 'w' )

    #読み込み用
    if mode == "r":
        if not wakati:
            with open( "manage/get_chat_list/" + target_url + "/comment.pkl", 'rb' ) as f:
                pkl_comment = pickle.load( f )
                return pkl_comment
        else:
            with open( "manage/get_chat_list/" + target_url + "/comment_wakati.pkl", 'rb' ) as f:
                pkl_comment = pickle.load( f )
                return pkl_comment

    return comment
