

$(document).ready(function(){


	$('.news-slider').bxSlider({
    slideWidth: 318,
    adaptiveHeight: false,
    minSlides: 1,
    maxSlides: 3,
    slideMargin: 10
  });

$('.info-slider').bxSlider({
    slideWidth: 228,
    adaptiveHeight: false,
    minSlides: 1,
    maxSlides: 4,
    slideMargin: 10
  });	


$(".fancybox")
    .attr('rel', 'gallery')
    .fancybox({
        beforeShow: function () {
            if (this.title) {
                this.title += '<br />';
                
                // Add tweet button
                this.title += '<a href="https://twitter.com/share" class="twitter-share-button" data-count="none" data-url="' + this.href + '">Tweet</a> ';
                
                // Add FaceBook like button
                this.title += '<div class="fb-share-button right" data-href="'+this.href+'" data-type="button_count"></div>';
	  }
        },
        afterShow: function() {

        			FB.XFBML.parse();
					twttr.widgets.load();
          
        },
        helpers : {
            title : {
                type: 'inside'
            }
        }  
    });






});

