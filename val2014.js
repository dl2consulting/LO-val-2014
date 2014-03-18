/*
js-fil för val2014


*/

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
        }  
    });



    /* toggle politiska krav */
    $('.politiska-krav').on('click', 'a', function(){
        var $this = $(this),
            $li = $this.closest('li'),
            //kolla om den är öppen redan:
            isOpen = $li.hasClass('open');

        //console.log('isopen', isOpen);

        //stäng alla andra:
        $this.closest('.politiska-krav').find('li.open').removeClass('open').find('i.after').removeClass('icon-angle-down').addClass('icon-angle-right');

        //öppna om stängd:
        if ( !isOpen ){


            //console.log('opening or wtf!');
            $li.addClass('open').find('i.after').removeClass('icon-angle-right').addClass('icon-angle-down'); 
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


});

