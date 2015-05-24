$(document).ready(function() {
    /* Create a cache object */
    var cache = new LastFMCache();

    /* Create a LastFM object */
    var lastfm = new LastFM({
      apiKey    : '3d386c221b36c1442b384aa1d853bc8c',
      apiSecret : '35f82503c71039e6300c6643e2c34122',
      cache     : cache
    });

    /* Load some artist info. */
    lastfm.user.getRecentTracks({user: 'Guapo15'}, {success: function(data){
        /* Use data. */
        console.log(data);
        console.log(data.recenttracks.track[0]);
                
        var mostCurrentTrack = data.recenttracks.track[0];
        var imgObj = mostCurrentTrack.image[3];
        var imgUrl = imgObj['#text'];
        console.log(mostCurrentTrack.name);
        
        // set background
        
        var styles = {
            backgroundImage: 'url('+imgUrl+')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center'
        };
        
//        $('html').css(styles);
        $('.container .left img').attr('src', imgUrl);
        $('.title').html(mostCurrentTrack.name+' <span class="green">-</span> '+mostCurrentTrack.artist['#text']);
        
        
    }, error: function(code, message){
      /* Show error message. */
    }});
});