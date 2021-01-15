# coding: utf-8
import shutil

from gensim.models import word2vec
from gensim.models import Word2Vec

import pre

def models( target_url, mode = 'r' ):
    if mode == 'w':
        #chat取得
        sentences = pre.main( target_url, mode = "w" )
        #モデルの学習
        word2vec_model = word2vec.Word2Vec( sentences, sg=1, )
        #モデルの保存
        word2vec_model.save( "manage/get_chat_list/" + target_url + ".model" )

        return True

    elif mode == 'r':
        # 読み込み
        word2vec_model = Word2Vec.load( "manage/get_chat_list/" + target_url + ".model" )

        return word2vec_model
    else:
        print( "モードを設定してください" )

def main( target_url, mode = 'r' ):
    if mode == 'w':
        if models( target_url, mode = "w" ):
            shutil.rmtree( "manage/get_chat_list/" + target_url )
            print( 'model create sucsess' )

    elif mode == 'r':
        w2v_model = models( target_url )
        return w2v_model


if __name__ == '__main__':
    target_url = 'M8yLREU8YrA'

    #main( target_url, mode = 'w' )

    w2v_model = main( target_url )
    #print( w2v_model.wv.vocab.keys() )
    #print( w2v_model.wv.most_similar( positive = [""], topn = 1 ) )

# 二つの単語の類似度を得る
#print(word2vec_model.wv.similarity("巨人", "阪神"))
# 0.8579513
