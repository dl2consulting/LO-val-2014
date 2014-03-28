/*
js-fil för val2014


*/

$(document).ready(function(){


	var myPlayer;
	var mq = window.matchMedia( "(max-width: 1024px)" );
	var sliderClone;
	sliderClone = $('.video-slider').clone();
	var slidervideo;
	

if (matchMedia) {
	
	var mq = window.matchMedia("(max-width: 1024px)");

    try{
        mq.addListener(WidthChange);
        WidthChange(mq);
    } catch( err ){}


/*
	if (!mq.addEventListener) {
    	//mq.attachEvent('resize', WidthChange);
        mq.addListener(WidthChange);
    	WidthChange(mq);
    }
    else {
        mq.addListener(WidthChange);
        WidthChange(mq);
    }
*/
	
}

// media query change
function WidthChange(mq) {

	if (mq.matches) {
		slidervideo = $('.video-slider').bxSlider({
		    slideWidth: 228,
		    adaptiveHeight: false,
		    minSlides: 1,
		    maxSlides: 4,
		    slideMargin: 10,
		    slideHeight: 210
 		 });	
	}
	else {
		if (typeof(slidervideo) != "undefined"){
            slidervideo.destroySlider();
        }
		

		//var slider = $('.video-wrap .bx-wrapper');
		//var slider = $('.video-slider');
		//slider.replaceWith(sliderClone);
	}
}

	$('.news-slider').bxSlider({
	    slideWidth: 350,
	    adaptiveHeight: false,
	    minSlides: 1,
	    maxSlides: 3

  });

$('.info-slider').bxSlider({
    slideWidth: 206,
    adaptiveHeight: false,
    minSlides: 1,
    maxSlides: 4,
    slideMargin: 23
  });	

$(".fancybox")
    .attr('rel', 'gallery')
    .fancybox({
        beforeShow: function () {

            if (this.title) {
                this.title += '<br />';
                this.title += '<a href="https://twitter.com/share" class="twitter-share-button" data-count="none" data-url="' + this.href + '">Tweet</a> ';
                this.title += '<div class="fb-share-button" data-href="'+this.href+'" data-type="button_count"></div>';
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
            /*,
            thumbs: {
                source  : function(current) {
                    return $(current.element).data('img');
                }
            }*/
       }  
    });


 $('video').mediaelementplayer({

 		success:function(player){
 			myPlayer = player;

 			$('.video-mini').on('click', 'a', function(e, player) {
					e.preventDefault();

					var webm = $(this).data('webm');
					var mp4 = $(this).data('mp4');
					var poster = $(this).data('poster');

					var sources = [
            			{ src: mp4, type: 'video/mp4' },
            			{ src: webm, type: 'video/webm' }
        			];

					//console.table(sources);

					myPlayer.setSrc(sources);
				    myPlayer.load();
				    myPlayer.play();

				    $('video').attr('poster',poster);

			});

		  }
 });     

    /* toggle politiska krav */
    $('.politiska-krav').on('click', 'a', function(e){
        var $this = $(this),
            $li = $this.closest('li'),
            //kolla om den är öppen redan:
            isOpen = $li.hasClass('open');

        e.preventDefault();

        //stäng alla andra:
        $this.closest('.politiska-krav').find('li.open').removeClass('open').find('i.after').removeClass('fa-angle-down').addClass('fa-angle-right');

        //öppna om stängd:
        if ( !isOpen ){


            //console.log('opening or wtf!');
            $li.addClass('open').find('i.after').removeClass('fa-angle-right').addClass('fa-angle-down'); 
        }
    });

    /*  */
    $('.val2014-insats').on('submit', function(e){
        var $form = $(this),
            $btn = $form.find('button'),
            data = $form.serialize(),
            url = $form.attr('action');

        e.preventDefault();

        $form.find('.feedback').remove();

        //todo spinner?

        $.ajax({
            url: url,
            data: data,
            dataType: 'xml',
            error: function(){
                alert('Något gick fel');
            },
            success: function( xml ){
                var $xml = $(xml),
                    msg = 'Något gick fel';

                try {
                    if ( $xml.find('success').html() === 'true' ){
                        msg = $xml.find('msg').html();
                    }
                } catch(err){}/* ngt gick fel */

                $('<p class="feedback">' + msg + '</p>').appendTo($form).slideDown('medium');
                //console.log('xml:', xml);
            }

        });

    });


    var $counter = $('.special-text-headline');
    var today = new Date();
	var dDay = new Date("May 25, 2014");
	var msPerDay = 24 * 60 * 60 * 1000 ;
	var timeLeft = (dDay.getTime() - today.getTime());
	var hours = Math.abs(today - dDay) / 36e5;
	var e_daysLeft = timeLeft / msPerDay;
	var daysLeft = Math.floor(e_daysLeft);
	daysLeft+=1;
	if(daysLeft==1) {
		
		$('.special-text').text('dag kvar!');
	}
	$counter.text(daysLeft);
	var $header2 = $('.special-text-img');


	if(daysLeft < 1 ) {
		$('.special-text').text('');
		$('.special-text-headline').text('');
	}

 	var $spans = $header2;
 	var delay = 0;
 	$header2.on('click', function(e){
		   $(this).css({transitionDelay: delay+'s'}); 
		   delay += 0.1;
  		   $header2.addClass('text-effect'); 
  			setTimeout(function(){ 
	    		$(this).css({transitionDelay: '0ms'}) 
	 			$header2.removeClass('text-effect'); 
			   delay = 0;
			}, 1800); 
			e.preventDefault();
  			
 });


});

