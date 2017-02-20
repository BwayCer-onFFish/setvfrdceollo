var p, len;

var bcvPly = videojs( 'setPlyMain' );
var helPlaylist = document.getElementById( 'playlist' );
var helErrMsg = document.getElementById( 'errMsg' );

var vidolInfoList = [
    { name: '極品絕配', vid: '5326531447001' },
    { name: '敗犬女王', vid: '4687069601001' },
    { name: '西街少年', vid: '4651057926001' },
    { name: '獨家保鑣', vid: '5186909632001' },
    { name: '象山視角 101 煙火', vid: '5267029713001' },
];

for ( p = 0, len = vidolInfoList.length; p < len ; p++ ) {
    helPlaylist.appendChild( getPlayListButton( vidolInfoList[ p ] ) );
}

bcvPly.on( 'loadstart', function () {
    console.log( ' -- loadstart -- ' );
} );

bcvPly.on( 'durationchange', function () {
    console.log( ' -- durationchange -- ' );
} );

function setVideo( objVidolInfo ) {
    console.log( ' -- setVideo -- ' );

    bcvPly.catalog.getVideo( objVidolInfo.vid, function( err, bcvVideo ){
        bcvPly.paused();

        if( err ){
            if( err.data ){
                var errData = err.data[0];
                switch( errData.error_code ){
                    case 'ACCESS_DENIED': pushError( 'accessDenied' ); break;
                    case 'VIDEO_NOT_FOUND': pushError( 'notFoundSrc' ); break;
                    default:
                        pushError( 'unknown' );
                        console.log( err );
                }
            }else if( typeof err === 'string' ){
                pushError( err );
            }else{
                pushError('abnormalUsing');
                console.error( err );
            }
            return;
            // throw '影片讀取錯誤。';
        }

        bcvPly.on( 'loadstart', function () {
            var p, len, item;

            console.log( ' -- 當前影片： ' + objVidolInfo.name );

            bcvPly.one( 'durationchange', function () {
                bcvPly.play();
            } );

            for ( p = 0, len = vidolInfoList.length; p < len ; p++ ) {
                item = vidolInfoList[ p ];
                if ( item === objVidolInfo ) item.classList.add( 'esPlay' );
                else item.classList.remove( 'esPlay' );
            }
        } );


        console.log( ' -- 更換影片： ' + objVidolInfo.name );
        console.log( ' -- 更換影片： ' + bcvVideo );
        i.v.catalog.load( bcvVideo );
    } );
}

function pushError( strCode ) {
    var errMsg;
    switch ( strCode ) {
        case 'unknown':
            errMsg = '未知';
            break;
        case 'abnormalUsing':
            errMsg = '異常執行';
            break;
        case 'accessDenied':
            errMsg = '(#1) ' + '影片無法在此地區播放';
            break;
        case 'notFoundSrc':
            errMsg = '(-101) ' + '影片不存在或已被下架';
            break;
        case 'notPlayAble':
            errMsg = '(-102) ' + '未知';
            break;
        case 'errCode_-':
            errMsg = '(-2) ' + '無法下載此影片';
            break;
        case 'errCode_-1':
            errMsg = '(-1) ' + '無影片被載入';
            break;
        case 'errCode_1':
            errMsg = '(1) ' + '影片下載中斷';
            break;
        case 'errCode_2':
            errMsg = '(2) ' + '連線中斷，請確認網路連線狀態。';
            break;
        case 'errCode_3':
            errMsg = '(3) ' + '影片毀損或瀏覽器無法撥放此格式。';
            break;
        case 'errCode_4':
            errMsg = '(4) ' + '影片無法被取得或瀏覽器不支援。';
            break;
        case 'errCode_5':
            errMsg = '(5) ' + '無影片被載入。';
            break;
        default:
            errMsg = strCode;
    }

    helErrMsg.innerText += '\n' + errMsg;
}

function getPlayListButton( objVidolInfo ) {
    var helDivBtn = document.createElement( 'div' );
    helDivBtn.innerText = objVidolInfo.name;
    helDivBtn.onclick = function () { setVideo( objVidolInfo ); };
    objVidolInfo.btn = helDivBtn;
}
