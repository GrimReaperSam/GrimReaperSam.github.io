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

})(jQuery);
