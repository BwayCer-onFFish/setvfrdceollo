var p, len;

var bcvPly = videojs( 'setPlyMain' );
var helPlaylist = document.getElementById( 'playlist' );
var helLogMsg = document.getElementById( 'logMsg' );

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
    pushLog( ' -- loadstart -- ' );
} );

bcvPly.on( 'durationchange', function () {
    pushLog( ' -- durationchange -- ' );
} );

bcvPly.on( 'error', function () {
    var errCode = 'errCode_' + i.error().code.toString();
    pushError( errCode );
} );
                                                          },
function rebuild( objVidolInfo ) {
    var id = bcvPly.id();
    var helPrev = bcvPly.el_;
    var helNew = createBcvVideo( id, objVidolInfo );

    helPrev.insertAdjacentElement( 'beforebegin', helNew );
    helPrev.remove();
    bcvPly = bc( helNew );
}

function createBcvVideo( strId, objInfo ){
    var helVideo = document.createElement( 'video' );

    helVideo.id = strId;
    helVideo.className = 'video-js';
    helVideo.dataset.account = '4338955585001';
    helVideo.dataset.videoId = objInfo.vid || '';
    helVideo.dataset.player = 'VJxyQW4m0e';
    helVideo.dataset.embed = 'default';
    helVideo.setAttribute( 'controls', '' );

    return helVideo;
}

function setVideo( objVidolInfo ) {
    pushLog( ' -- setVideo -- ' );

    rebuild( objVidolInfo );
    bcvPly.ready( function(){
        bcvPly.on( 'loadstart', function () {
            var p, len, item;

            pushLog( ' -- 當前影片： ' + objVidolInfo.name );

            history.pushState( null, 'title', '?name=' + objVidolInfo.name );

            bcvPly.one( 'durationchange', function () {
                bcvPly.ima3.adsLoader.contentComplete();
                bcvPly.ima3.adrequest( 'https://pubads.g.doubleclick.net/gampad/ads?sz=1024x768&iu=/123939770/test_sabine_0120&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator=[timestamp]' );

                bcvPly.play();
            } );

            for ( p = 0, len = vidolInfoList.length; p < len ; p++ ) {
                item = vidolInfoList[ p ];
                if ( item === objVidolInfo ) item.btn.classList.add( 'esPlay' );
                else item.btn.classList.remove( 'esPlay' );
            }
        } );
    } );
}

function pushLog( strTxt ) {
    console.log( strTxt );
    helLogMsg.innerText += '\n' + strTxt;
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

    console.error( strTxt );
    helLogMsg.innerText += '\n' + errMsg;
}

function getPlayListButton( objVidolInfo ) {
    var helDivBtn = document.createElement( 'div' );
    helDivBtn.className = 'btn btn-default';
    helDivBtn.innerText = objVidolInfo.name;
    helDivBtn.onclick = function () { setVideo( objVidolInfo ); };
    objVidolInfo.btn = helDivBtn;
    return helDivBtn;
}

