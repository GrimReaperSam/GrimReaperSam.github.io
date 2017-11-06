//------------------------------------- Toggle bibtex div ---------------------------------------//
function toggleDiv(element){
  if(document.getElementById(element).style.display == 'none') {
    document.getElementById(element).style.display = 'block';
  } else {
    document.getElementById(element).style.display = 'none';
  }
}
//------------------------------------- End Toggle  div ---------------------------------------//

(function($) {
  "use strict";

//------------------------------------- Waiting for the entire site to load ------------------------------------------------//

  jQuery(window).load(function() {
  		jQuery("#loaderInner").fadeOut();
  		jQuery("#loader").delay(200).fadeOut("slow");
  });


  $(document).ready(function() {
    /*Filtred portfolio*/
    $('.filter li a').on("click", function(e){

        e.preventDefault();
        $(this).addClass('active');
        $(this).parent().siblings().find('a').removeClass('active');

        var filters = $(this).attr('data-filter');
        var blockPosts = $(this).closest('.blog').find('.block-post');
        blockPosts.removeClass('hidden');

        if (filters !== 'all') {
            for(var i = 0; i < blockPosts.length; i++){
                if (!blockPosts.eq(i).hasClass(filters)) {
                    blockPosts.eq(i).addClass('hidden');
                }
            }

        }


    });
  });

})(jQuery);
