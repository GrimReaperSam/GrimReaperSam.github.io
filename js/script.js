(function($) {
  "use strict";

//------------------------------------- Waiting for the entire site to load ------------------------------------------------//

jQuery(window).load(function() {
		jQuery("#loaderInner").fadeOut();
		jQuery("#loader").delay(200).fadeOut("slow");
});

$(document).ready(function(){

//------------------------------------- Portfolio setup------------------------------------------------//
/*Filtred portfolio*/
$('.filter li a').on("click", function(e){

		e.preventDefault();
		$(this).addClass('active');
		$(this).parent().siblings().find('a').removeClass('active');



        var filters = $(this).attr('data-filter');
        $(this).closest('.works').find('.item').removeClass('disable');

        if (filters !== 'all') {

        var selected =  $(this).closest('.works').find('.item');

        for(var i = 0; i < selected.length; i++){

        if (!selected.eq(i).hasClass(filters)) {
                    selected.eq(i).addClass('disable');
				}

        }
   }

});


//------------------------------------- End portfolio setup------------------------------------------------//




//------------------------------------- Search input------------------------------------------------//

	$('.search-form i').on("click", function(){
		$(this).closest('.search-form').find('input[type="text"]').focus();
		if($(this).closest('.search-form').find('input[type="text"]').val()){
			$(this).closest('.search-form').find('input[type="submit"]').trigger('click');
		}
	});

//------------------------------------- End search input------------------------------------------------//

});


})(jQuery);
