(function($) {
  "use strict";

//------------------------------------- Waiting for the entire site to load ------------------------------------------------//

jQuery(window).load(function() { 
		jQuery("#loaderInner").fadeOut(); 
		jQuery("#loader").delay(200).fadeOut("slow"); 
});

$(document).ready(function(){

//------------------------------------- View Router -------------------------------------------------//

    var currentLink;
    var swap = function(link) {
        if (currentLink === link) {
            return;
        }
        currentLink = link;
        $("html, body").animate({ scrollTop: 0 });
        $("#content-div").fadeOut(350, function() {
            $("#content-div").empty().load(link).fadeIn(800);
        });
    };

    var about = function () { swap('/about.html') };
    var projects = function () { swap('/projects.html'); };
    var blog = function () { swap('/blog.html') };
    var contact = function () { swap('/contact.html'); };

    var project = function(params) { swap('/projects/' + params.id + '.html'); };

    var routes = {
        'about': {callback: about, matcher: routeMatcher('about')},
        'projects': {callback: projects, matcher: routeMatcher('projects')},
        'blog': {callback: blog, matcher: routeMatcher('blog')},
        'contact': {callback: contact, matcher: routeMatcher('contact')},
        'projects/:id': {callback: project, matcher: routeMatcher('projects/:id')}
    };

    $(document).on("click", "a.director-link", function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var href = $(this).attr("href");

        for (var route in routes) {
            var params = routes[route].matcher.parse(href);
            if (params != null) {
                routes[route].callback(params);
                return;
            }
        }
    });
    routes['about'].callback();



//------------------------------------- Site slider ------------------------------------------------//

$("#testimonial-carousel").owlCarousel({
    navigation : false,
    slideSpeed : 300,
    paginationSpeed : 400,
    responsiveRefreshRate : 200,
    responsiveBaseWidth: window,
    pagination: true,
    singleItem: true
});


$("#block-slider").owlCarousel({
    navigation : false,
    slideSpeed : 300,
    paginationSpeed : 400,
    responsiveRefreshRate : 200,
    responsiveBaseWidth: window,
    pagination: false,
    singleItem: true,
	navigation:true,
    navigationText: ["<span class='icon-left-open-big'></span>","<span class='icon-right-open-big'></span>"]
});




//------------------------------------- End site slider------------------------------------------------//





//------------------------------------- Skills percentage setup------------------------------------------------//
$(".percentage").each(function(){
          var  width= $(this).text();
          $(this).css("width", width).empty();
});
//------------------------------------- End skills percentage setup------------------------------------------------//




//------------------------------------- Portfolio setup------------------------------------------------//

$('.box').magnificPopup({
					  type: 'image',
					fixedContentPos: false,
					fixedBgPos: false,
					mainClass: 'mfp-no-margins mfp-with-zoom',
					image: {
						verticalFit: true
					},
					zoom: {
						enabled: true,
						duration: 300
					}
				});


$('.popup-youtube, .popup-vimeo').magnificPopup({
	disableOn: 700,
	type: 'iframe',
	mainClass: 'mfp-fade',
	removalDelay: 160,
	preloader: false,

	fixedContentPos: false
});


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
