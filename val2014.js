

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


    /* toggle politiska krav */
    $('.politiska-krav').on('click', 'a', function(){
        var $this = $(this),
            $li = $this.closest('li');
            //kolla om den är öppen redan:
            isOpen = $li.hasClass('open');

        //console.log('isopen', isOpen);

        //stäng alla andra:
        $this.closest('.politiska-krav').find('li.open').removeClass('open');

        //öppna om stängd:
        if ( !isOpen ){

            //console.log('opening or wtf!');
            $li.addClass('open'); 
        }
    });



});

