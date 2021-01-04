# coding: utf-8
import json
import numpy as np

from apiclient.discovery import build

import db_connect

DEVELOPER_KEY            = 'AIzaSyAhFOtBH3t8jHtOA109qe2moN9QToOwd2w'
YOUTUBE_API_SERVICE_NAME = 'youtube'
YOUTUBE_API_VERSION      = 'v3'

youtube = build( YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=DEVELOPER_KEY )

def get_video( youtube, video_id ):
    search_res = youtube.videos().list(
        part = 'statistics',
        id   = video_id
    ).execute()
    #json_res = json.dumps( search_res, ensure_ascii=False, indent=2 )
    #print( json_res )

    num = search_res['pageInfo']['resultsPerPage']

    for i in range( num ):
        data = []
        statistics = search_res['items'][i]['statistics']

        view_count = statistics['viewCount']
        like_count = statistics['likeCount']
        video_id   = search_res['items'][i]['id']
        #print( video_id )
        data.extend( [view_count, like_count, video_id] )
        #db_connect.update_videos( data )

def get_search_api( youtube, token ):
    search_res = None

    if token is not None:
        search_res = youtube.search().list(
            part        = 'id,snippet',
            channelId   = 'UCHVXbQzkl3rDfsXWo8xi2qw',
            order       = 'date',
            maxResults  = 50,
            pageToken   = token
        ).execute()
    else:
        search_res = youtube.search().list(
            part        = 'id,snippet',
            channelId   = 'UCHVXbQzkl3rDfsXWo8xi2qw',
            order       = 'date',
            maxResults  = 50
        ).execute()

    return search_res

def get_search( youtube, token ):
    search_res = get_search_api( youtube, token )

    #json_res = json.dumps( search_res, ensure_ascii=False, indent=2 )
    #print( json_res )
    videos = []

    num = search_res['pageInfo']['resultsPerPage']
    #print( num )
    for i in range( num ):
        try:
            data = []

            video_id = search_res['items'][i]['id']['videoId']
            videos.append( video_id )

            snippet  = search_res['items'][i]['snippet']

            date_time = snippet['publishedAt'].split( "T" )
            date = date_time[0]
            time = date_time[1][:8]

            title       = snippet['title']
            des         = snippet['description']
            thumbnails  = snippet['thumbnails']['high']['url']

            data.extend( [video_id, date, time, title, des, thumbnails] )
            #print( data )
            #db_connect.add_search( data )

        except KeyError:
            pass

    #print( videos )
    get_video( youtube, videos )

    try:
        nextToken = search_res["nextPageToken"]
        print( ' --------------------------- ' + nextToken + ' --------------------------- ' )
        if nextToken is not None:
            get_search( youtube, nextToken )
        else:
            print( "nextToken : None" + nextToken )
    except KeyError:
        pass

get_search( youtube, None )
#get_video( youtube, "" )
