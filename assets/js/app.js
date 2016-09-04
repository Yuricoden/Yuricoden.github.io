// ==============================
// Toggle menu
// ==============================
(function() {
    'use strict';
    console.log(('.toggle-menu'))
    $('.toggle-menu').on ('click touchstart', function(){
        var $this = $(this);
        $('.sandw').toggleClass('active');



    if(!$this.hasClass('active')) {
        $('.menu-screen').show().addClass('active');
        setTimeout(function() {
            showMenuItems(true);}, 500);
    }


    else {
        $('.menu-screen').fadeOut(function () {
            $(this).removeClass('active');
            showMenuItems(false);
        });
    }
    $this.toggleClass('active');
    });

    function showMenuItems(show) {
        var
            items = $('.menu-screen_link'),
            delay = 100,
            counter = 0,
            timer;

     function each() {
         var $this = items.eq(counter);

         $this.addClass('active');

         if (typeof timer !== 'undefined') {
             clearTimeout(timer);
         }

         if ($this.length) {
             timer = setTimeout(each, delay);
         }


         counter++;
     }
         if (show) {
             each();
         }
         else {
             items.removeClass('active');
         }

    }

})();


// ==============================
// Authorization [Click]
// ==============================


$(window).load(function () {
    $('#card').addClass('loaded')
});
$(function () {
    $(".auth").on("click", function (e) {
        $("#card").addClass("flipped");
        $(".auth").addClass("clicked");
        e.stopPropagation()
    });
    $("#main").on("click", function (e) {
        $("#card").removeClass("flipped");
        $(".auth").removeClass("clicked");
        e.stopPropagation()
    });
    $('.wel-container').on("click", function (e) {
        if ($(e.target).parents("#card").length == 0) {
            $("#card").removeClass("flipped");
            $(".auth").removeClass("clicked");
        }
        if ($(e.target).parents(".blogleft").length == 0) {
            $(".blogleft").removeClass("active");
        }
    });
});



// ==============================
// Blog Fixed and Plashka mobile
// ==============================


var
    navigation = $('.navigation-box'),
    bar_side = $('.blog-navigation__list'),
    sections = $('.articles__item'),
    windowMargin = 50;

var menuFixed = '<div class = "fixed-navigation"> \
                 <div class = "container"> \
    <div class = "fixed-navigation_left"></div> \
    <div class = "fixed-navigation_right"></div> \
        </div> \
        </div>';


// function fixedMenu
function stickit(wScroll) {
    //выбор позиции
    var stickStart = navigation.offset().top - windowMargin;
    if (wScroll >= stickStart) {
        if(!$('.fixed-navigation').length) {
            navigation.append(menuFixed);

            var fixedMenu = $('.fixed-navigation'),
                menuContainer = fixedMenu.find('.fixed-navigation_left'),
                menuClone = bar_side.clone();
            console.log ('menuClone');
            fixedMenu.css('top', windowMargin);
            menuContainer.append(menuClone);
            //скрываем осн.меню
            bar_side.hide();
        }
    }
    else {
        $('.fixed-navigation').remove();
        bar_side.show();
        console.log ('stickStart');

    }
}

//функция для перехода по артиклю
function clickToArticle() {
 $('body').on('click','.blog-navigation__item_link', function (e) {
     e.preventDefault();

var $this = $(this),
    $item = $this.closest('.blog-navigation__item'),
    //нахожу  индекс елемента 1,2,3

     index = $item.index(),
     reqSection = sections.eq(index),
     sectionOffset = reqSection.offset().top;

     $('body, html').animate ({
         'scrollTop' : sectionOffset - 50

     });
    });
}



//функция активной планки

function changeActive(wScroll) {
    $.each(sections, function() {
        var
            $this = $(this),
            windowMargin = $(window).height() / 2,
            topEdge = $this.offset().top - windowMargin,
            bottomEdge = topEdge + $this.height();
        
        if(wScroll > topEdge && wScroll < bottomEdge) {
            
            var index = $this.index();
            
            $('.blog-navigation__list').each(function() {
                var $this = $(this);

                $this.find('.blog-navigation__item')
                    .eq(index)
                    .addClass('active')
                    //выбираем соседние елементы и удалеяем актив
                    .siblings()
                    .removeClass('active');
            });
        }
    });
}

clickToArticle();

$(window).scroll(function() {
    var wScroll = $(window).scrollTop();
    stickit(wScroll);
    changeActive(wScroll);
});





// ==============================
// Animations
// ==============================
$.fn.animated = function(inEffect) {
    $(this).each(function() {
        var ths = $(this);
        ths.css({opacity:0})
            .addClass("animated")
            .waypoint(function(dir) {
                    if (dir === 'down') {
                        ths.addClass(inEffect).css({opacity:1});
                    }
                },
                {
                    offset: "500%"
                });
    });
};


$(" .about-me__skills>div").animated("fadeInUp");
$('.portfolio__nav,.talks .testimonial,.portfolio__img').animated('fadeInUp');



// ==============================
// Piecharts animation
// ==============================
$(".piechart .piechart__fill").each(function(){
    var pie = $(this);
    pie.waypoint(function(dir) {
            if (dir === "down") {
                pie.css({strokeDashoffset:pie.data("percentage")});
            }
        },
        {
            offset: "500%"
        });
});






// ==============================
// Slider
// ==============================


$(function () {
    var controlPrev = $('.nav__prev .link'),
        controlNext = $('.nav__next .link');


    function setActiveSlides() {
        var imgActive = $('.img__container .image.active'),
            imgActiveIndex = imgActive.index(),
            prevThumb = $('.nav__prev .slider__item'),
            nextThumb = $('.nav__next .slider__item'),
            descr = $('.descr__container');

        prevThumb.removeClass('movedown');
        nextThumb.removeClass('moveup');


        if (imgActive.next().length == 0) {
            nextThumb.first().addClass('active');
        } else if (imgActive.next().length != 0) {
            nextThumb.eq(imgActiveIndex + 1).addClass('active');
        }

        if (imgActive.prev().length == 0) {
            prevThumb.last().addClass('active');
        } else if (imgActive.prev().length != 0) {
            prevThumb.eq(imgActiveIndex - 1).addClass('active');
        }

        if (descr.next().length == 0) {
            descr.first().addClass('active');
        } else if (descr.next().length != 0) {
            descr.eq(imgActiveIndex).addClass('active');
        }
    }

    setActiveSlides();

    controlPrev.on('click', function () {
        var img = $('.img__container .image'),
            imgActive = $('.img__container .image.active'),
            navPrevActive = $('.nav__prev .slider__item.active'),
            navNextActive = $('.nav__next .slider__item.active'),
            descr = $('.descr__container');

        $('.link').attr('disabled', 'disabled');

        imgActive.removeClass('active').prev().addClass('active');
        descr.removeClass('active');
        if (imgActive.prev().length == 0) {
            img.last().addClass('active');
        }

        setActiveSlides();
        navPrevActive.addClass('movedown').removeClass('active');
        navNextActive.addClass('moveup').removeClass('active');
        setTimeout(function () {
            $('.link').removeAttr('disabled');
            $('.slider__item').removeClass('moveup movedown');
        }, 700)
    });

    controlNext.on('click', function () {
        var img = $('.img__container .image'),
            imgActive = $('.img__container .image.active'),
            navPrevActive = $('.nav__prev .slider__item.active'),
            navNextActive = $('.nav__next .slider__item.active'),
            descr = $('.descr__container');

        $('.link').attr('disabled', 'disabled');

        imgActive.removeClass('active').next().addClass('active');
        descr.removeClass('active');
        if (imgActive.next().length == 0) {
            img.first().addClass('active');
        }

        setActiveSlides();
        navPrevActive.addClass('movedown').removeClass('active');
        navNextActive.addClass('moveup').removeClass('active');

        setTimeout(function () {
            $('.link').removeAttr('disabled');
            $('.slider__item').removeClass('moveup movedown');
        }, 700)
    });
});



/*********************/
/***** preloader *****/
/*********************/

var preloader_stat = $("#preloader-svg__percentage"),
    hasImageProperties = ["background", "backgroundImage", "listStyleImage", "borderImage", "borderCornerImage", "cursor"],
    hasImageAttributes = ["srcset"],
    match_url = /url\(\s*(['"]?)(.*?)\1\s*\)/g,
    all_images = [],
    total = 0,
    count = 0;

var circle_o = $("#preloader-svg__img .bar__outer"),
    circle_c = $("#preloader-svg__img .bar__center"),
    circle_i = $("#preloader-svg__img .bar__inner"),
    length_o = Math.PI*(circle_o.attr("r") * 2),
    length_c = Math.PI*(circle_c.attr("r") * 2),
    length_i = Math.PI*(circle_i.attr("r") * 2);



function preloader() {

    function img_loaded(){
        var percentage = Math.ceil( (count+1) / total * 100 );

        count += 1;
        percentage = percentage > 100 ? 100 : percentage;

        // Draw offsets
        // 1st circle
        circle_o.css({strokeDashoffset: ((100-percentage)/100)*length_o });

        // when to start 2nd circle
        if(percentage > 50) {
            circle_c.css({strokeDashoffset: ((100-percentage)/100)*length_c });
        }

        // when to start 3rd circle
        if(percentage == 100) {
            circle_i.css({strokeDashoffset: ((100-percentage)/100)*length_i });
        }

        preloader_stat.html(percentage);

        if(count === total){
            return done_loading();
        }
    }

    function done_loading(){
        preloader_stat.css({"animation":"none"});
        $("#preloader").delay(700).fadeOut(700, function(){
            $("#preloader__progress").remove();

            if($(".flip-card").length){
                $(".flip-card").addClass("loaded");
            }
        });
    }

    function images_loop (total) {

    setTimeout(function () {
      	var test_image = new Image();

      	test_image.onload = img_loaded;
        	test_image.onerror = img_loaded;

     	console.log("Count: " + count + " Total: " + total);

      	if (count < total) {
       		if (all_images[count].srcset) {
      			test_image.srcset = all_images[count].srcset;
      		}
     	test_image.src = all_images[count].src;

       		images_loop(total);
      	}
       }, 10);

        // FOR version
        for(var i=0; i<total; i++){
            var test_image = new Image();


            test_image.onload = img_loaded;
            test_image.onerror = img_loaded;

            if (all_images[i].srcset) {
                test_image.srcset = all_images[i].srcset;
            }

            test_image.src = all_images[i].src;
        }
    }

    // Get all images
    $("*").each(function () {
        var element = $(this);

        if (element.is("img") && element.attr("src")) {
            all_images.push({
                src: element.attr("src"),
                element: element[0]
            });
        }

        $.each(hasImageProperties, function (i, property) {
            var propertyValue = element.css(property);
            var match;

            if (!propertyValue) {
                return true;
            }

            match = match_url.exec(propertyValue);

            if (match) {
                all_images.push({
                    src: match[2],
                    element: element[0]
                });
            }
        });

        $.each(hasImageAttributes, function (i, attribute) {
            var attributeValue = element.attr(attribute);

            if (!attributeValue) {
                return true;
            }

            all_images.push({
                src: element.attr("src"),
                srcset: element.attr("srcset"),
                element: element[0]
            });
        });
    });

    total = all_images.length;

    // Start preloader or exit
    if (total === 0) {
        done_loading();
    } else {
        images_loop(total);
    }
};


preloader();
var map;
function initMap() {
    var styles = [
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#444444"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#f2f2f2"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 45
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#61dac9"
                },
                {
                    "visibility": "on"
                },
                {
                    "saturation": "0"
                }
            ]
        }
    ];
    var styledMap = new google.maps.StyledMapType(styles,
        {name: "Styled Map"});




    var mapOptions = {
        zoom: 13,
        center: new google.maps.LatLng(49.4311559,31.9786651),
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: true,
        disableDefaultUI: true,

    };
    var map = new google.maps.Map(document.getElementById('map'),mapOptions);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(49.4311559,31.9786651),
        map: map,
        icon: '/assets/img/map_marker.svg'
    });
}
google.maps.event.addDomListener(window, 'load', initialize);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImdvb2dsZV9tYXBzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3ZUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gVG9nZ2xlIG1lbnVcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbihmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIGNvbnNvbGUubG9nKCgnLnRvZ2dsZS1tZW51JykpXHJcbiAgICAkKCcudG9nZ2xlLW1lbnUnKS5vbiAoJ2NsaWNrIHRvdWNoc3RhcnQnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgJCgnLnNhbmR3JykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuXHJcblxyXG4gICAgaWYoISR0aGlzLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICQoJy5tZW51LXNjcmVlbicpLnNob3coKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2hvd01lbnVJdGVtcyh0cnVlKTt9LCA1MDApO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBlbHNlIHtcclxuICAgICAgICAkKCcubWVudS1zY3JlZW4nKS5mYWRlT3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIHNob3dNZW51SXRlbXMoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgJHRoaXMudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gc2hvd01lbnVJdGVtcyhzaG93KSB7XHJcbiAgICAgICAgdmFyXHJcbiAgICAgICAgICAgIGl0ZW1zID0gJCgnLm1lbnUtc2NyZWVuX2xpbmsnKSxcclxuICAgICAgICAgICAgZGVsYXkgPSAxMDAsXHJcbiAgICAgICAgICAgIGNvdW50ZXIgPSAwLFxyXG4gICAgICAgICAgICB0aW1lcjtcclxuXHJcbiAgICAgZnVuY3Rpb24gZWFjaCgpIHtcclxuICAgICAgICAgdmFyICR0aGlzID0gaXRlbXMuZXEoY291bnRlcik7XHJcblxyXG4gICAgICAgICAkdGhpcy5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICBpZiAodHlwZW9mIHRpbWVyICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgaWYgKCR0aGlzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGVhY2gsIGRlbGF5KTtcclxuICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgIGNvdW50ZXIrKztcclxuICAgICB9XHJcbiAgICAgICAgIGlmIChzaG93KSB7XHJcbiAgICAgICAgICAgICBlYWNoKCk7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICBpdGVtcy5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG5cclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBBdXRob3JpemF0aW9uIFtDbGlja11cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cclxuJCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24gKCkge1xyXG4gICAgJCgnI2NhcmQnKS5hZGRDbGFzcygnbG9hZGVkJylcclxufSk7XHJcbiQoZnVuY3Rpb24gKCkge1xyXG4gICAgJChcIi5hdXRoXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAkKFwiI2NhcmRcIikuYWRkQ2xhc3MoXCJmbGlwcGVkXCIpO1xyXG4gICAgICAgICQoXCIuYXV0aFwiKS5hZGRDbGFzcyhcImNsaWNrZWRcIik7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgfSk7XHJcbiAgICAkKFwiI21haW5cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICQoXCIjY2FyZFwiKS5yZW1vdmVDbGFzcyhcImZsaXBwZWRcIik7XHJcbiAgICAgICAgJChcIi5hdXRoXCIpLnJlbW92ZUNsYXNzKFwiY2xpY2tlZFwiKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICB9KTtcclxuICAgICQoJy53ZWwtY29udGFpbmVyJykub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5wYXJlbnRzKFwiI2NhcmRcIikubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgJChcIiNjYXJkXCIpLnJlbW92ZUNsYXNzKFwiZmxpcHBlZFwiKTtcclxuICAgICAgICAgICAgJChcIi5hdXRoXCIpLnJlbW92ZUNsYXNzKFwiY2xpY2tlZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLnBhcmVudHMoXCIuYmxvZ2xlZnRcIikubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgJChcIi5ibG9nbGVmdFwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5cclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBCbG9nIEZpeGVkIGFuZCBQbGFzaGthIG1vYmlsZVxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblxyXG52YXJcclxuICAgIG5hdmlnYXRpb24gPSAkKCcubmF2aWdhdGlvbi1ib3gnKSxcclxuICAgIGJhcl9zaWRlID0gJCgnLmJsb2ctbmF2aWdhdGlvbl9fbGlzdCcpLFxyXG4gICAgc2VjdGlvbnMgPSAkKCcuYXJ0aWNsZXNfX2l0ZW0nKSxcclxuICAgIHdpbmRvd01hcmdpbiA9IDUwO1xyXG5cclxudmFyIG1lbnVGaXhlZCA9ICc8ZGl2IGNsYXNzID0gXCJmaXhlZC1uYXZpZ2F0aW9uXCI+IFxcXHJcbiAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcyA9IFwiY29udGFpbmVyXCI+IFxcXHJcbiAgICA8ZGl2IGNsYXNzID0gXCJmaXhlZC1uYXZpZ2F0aW9uX2xlZnRcIj48L2Rpdj4gXFxcclxuICAgIDxkaXYgY2xhc3MgPSBcImZpeGVkLW5hdmlnYXRpb25fcmlnaHRcIj48L2Rpdj4gXFxcclxuICAgICAgICA8L2Rpdj4gXFxcclxuICAgICAgICA8L2Rpdj4nO1xyXG5cclxuXHJcbi8vIGZ1bmN0aW9uIGZpeGVkTWVudVxyXG5mdW5jdGlvbiBzdGlja2l0KHdTY3JvbGwpIHtcclxuICAgIC8v0LLRi9Cx0L7RgCDQv9C+0LfQuNGG0LjQuFxyXG4gICAgdmFyIHN0aWNrU3RhcnQgPSBuYXZpZ2F0aW9uLm9mZnNldCgpLnRvcCAtIHdpbmRvd01hcmdpbjtcclxuICAgIGlmICh3U2Nyb2xsID49IHN0aWNrU3RhcnQpIHtcclxuICAgICAgICBpZighJCgnLmZpeGVkLW5hdmlnYXRpb24nKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgbmF2aWdhdGlvbi5hcHBlbmQobWVudUZpeGVkKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmaXhlZE1lbnUgPSAkKCcuZml4ZWQtbmF2aWdhdGlvbicpLFxyXG4gICAgICAgICAgICAgICAgbWVudUNvbnRhaW5lciA9IGZpeGVkTWVudS5maW5kKCcuZml4ZWQtbmF2aWdhdGlvbl9sZWZ0JyksXHJcbiAgICAgICAgICAgICAgICBtZW51Q2xvbmUgPSBiYXJfc2lkZS5jbG9uZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyAoJ21lbnVDbG9uZScpO1xyXG4gICAgICAgICAgICBmaXhlZE1lbnUuY3NzKCd0b3AnLCB3aW5kb3dNYXJnaW4pO1xyXG4gICAgICAgICAgICBtZW51Q29udGFpbmVyLmFwcGVuZChtZW51Q2xvbmUpO1xyXG4gICAgICAgICAgICAvL9GB0LrRgNGL0LLQsNC10Lwg0L7RgdC9LtC80LXQvdGOXHJcbiAgICAgICAgICAgIGJhcl9zaWRlLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICAkKCcuZml4ZWQtbmF2aWdhdGlvbicpLnJlbW92ZSgpO1xyXG4gICAgICAgIGJhcl9zaWRlLnNob3coKTtcclxuICAgICAgICBjb25zb2xlLmxvZyAoJ3N0aWNrU3RhcnQnKTtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbi8v0YTRg9C90LrRhtC40Y8g0LTQu9GPINC/0LXRgNC10YXQvtC00LAg0L/QviDQsNGA0YLQuNC60LvRjlxyXG5mdW5jdGlvbiBjbGlja1RvQXJ0aWNsZSgpIHtcclxuICQoJ2JvZHknKS5vbignY2xpY2snLCcuYmxvZy1uYXZpZ2F0aW9uX19pdGVtX2xpbmsnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbnZhciAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAkaXRlbSA9ICR0aGlzLmNsb3Nlc3QoJy5ibG9nLW5hdmlnYXRpb25fX2l0ZW0nKSxcclxuICAgIC8v0L3QsNGF0L7QttGDICDQuNC90LTQtdC60YEg0LXQu9C10LzQtdC90YLQsCAxLDIsM1xyXG5cclxuICAgICBpbmRleCA9ICRpdGVtLmluZGV4KCksXHJcbiAgICAgcmVxU2VjdGlvbiA9IHNlY3Rpb25zLmVxKGluZGV4KSxcclxuICAgICBzZWN0aW9uT2Zmc2V0ID0gcmVxU2VjdGlvbi5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICQoJ2JvZHksIGh0bWwnKS5hbmltYXRlICh7XHJcbiAgICAgICAgICdzY3JvbGxUb3AnIDogc2VjdGlvbk9mZnNldCAtIDUwXHJcblxyXG4gICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG5cclxuLy/RhNGD0L3QutGG0LjRjyDQsNC60YLQuNCy0L3QvtC5INC/0LvQsNC90LrQuFxyXG5cclxuZnVuY3Rpb24gY2hhbmdlQWN0aXZlKHdTY3JvbGwpIHtcclxuICAgICQuZWFjaChzZWN0aW9ucywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyXHJcbiAgICAgICAgICAgICR0aGlzID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgd2luZG93TWFyZ2luID0gJCh3aW5kb3cpLmhlaWdodCgpIC8gMixcclxuICAgICAgICAgICAgdG9wRWRnZSA9ICR0aGlzLm9mZnNldCgpLnRvcCAtIHdpbmRvd01hcmdpbixcclxuICAgICAgICAgICAgYm90dG9tRWRnZSA9IHRvcEVkZ2UgKyAkdGhpcy5oZWlnaHQoKTtcclxuICAgICAgICBcclxuICAgICAgICBpZih3U2Nyb2xsID4gdG9wRWRnZSAmJiB3U2Nyb2xsIDwgYm90dG9tRWRnZSkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gJHRoaXMuaW5kZXgoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICQoJy5ibG9nLW5hdmlnYXRpb25fX2xpc3QnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkdGhpcy5maW5kKCcuYmxvZy1uYXZpZ2F0aW9uX19pdGVtJylcclxuICAgICAgICAgICAgICAgICAgICAuZXEoaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC8v0LLRi9Cx0LjRgNCw0LXQvCDRgdC+0YHQtdC00L3QuNC1INC10LvQtdC80LXQvdGC0Ysg0Lgg0YPQtNCw0LvQtdGP0LXQvCDQsNC60YLQuNCyXHJcbiAgICAgICAgICAgICAgICAgICAgLnNpYmxpbmdzKClcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuY2xpY2tUb0FydGljbGUoKTtcclxuXHJcbiQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgd1Njcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgIHN0aWNraXQod1Njcm9sbCk7XHJcbiAgICBjaGFuZ2VBY3RpdmUod1Njcm9sbCk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBBbmltYXRpb25zXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4kLmZuLmFuaW1hdGVkID0gZnVuY3Rpb24oaW5FZmZlY3QpIHtcclxuICAgICQodGhpcykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgdGhzID0gJCh0aGlzKTtcclxuICAgICAgICB0aHMuY3NzKHtvcGFjaXR5OjB9KVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoXCJhbmltYXRlZFwiKVxyXG4gICAgICAgICAgICAud2F5cG9pbnQoZnVuY3Rpb24oZGlyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpciA9PT0gJ2Rvd24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocy5hZGRDbGFzcyhpbkVmZmVjdCkuY3NzKHtvcGFjaXR5OjF9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldDogXCI1MDAlXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5cclxuJChcIiAuYWJvdXQtbWVfX3NraWxscz5kaXZcIikuYW5pbWF0ZWQoXCJmYWRlSW5VcFwiKTtcclxuJCgnLnBvcnRmb2xpb19fbmF2LC50YWxrcyAudGVzdGltb25pYWwsLnBvcnRmb2xpb19faW1nJykuYW5pbWF0ZWQoJ2ZhZGVJblVwJyk7XHJcblxyXG5cclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBQaWVjaGFydHMgYW5pbWF0aW9uXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4kKFwiLnBpZWNoYXJ0IC5waWVjaGFydF9fZmlsbFwiKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgcGllID0gJCh0aGlzKTtcclxuICAgIHBpZS53YXlwb2ludChmdW5jdGlvbihkaXIpIHtcclxuICAgICAgICAgICAgaWYgKGRpciA9PT0gXCJkb3duXCIpIHtcclxuICAgICAgICAgICAgICAgIHBpZS5jc3Moe3N0cm9rZURhc2hvZmZzZXQ6cGllLmRhdGEoXCJwZXJjZW50YWdlXCIpfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgb2Zmc2V0OiBcIjUwMCVcIlxyXG4gICAgICAgIH0pO1xyXG59KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFNsaWRlclxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBjb250cm9sUHJldiA9ICQoJy5uYXZfX3ByZXYgLmxpbmsnKSxcclxuICAgICAgICBjb250cm9sTmV4dCA9ICQoJy5uYXZfX25leHQgLmxpbmsnKTtcclxuXHJcblxyXG4gICAgZnVuY3Rpb24gc2V0QWN0aXZlU2xpZGVzKCkge1xyXG4gICAgICAgIHZhciBpbWdBY3RpdmUgPSAkKCcuaW1nX19jb250YWluZXIgLmltYWdlLmFjdGl2ZScpLFxyXG4gICAgICAgICAgICBpbWdBY3RpdmVJbmRleCA9IGltZ0FjdGl2ZS5pbmRleCgpLFxyXG4gICAgICAgICAgICBwcmV2VGh1bWIgPSAkKCcubmF2X19wcmV2IC5zbGlkZXJfX2l0ZW0nKSxcclxuICAgICAgICAgICAgbmV4dFRodW1iID0gJCgnLm5hdl9fbmV4dCAuc2xpZGVyX19pdGVtJyksXHJcbiAgICAgICAgICAgIGRlc2NyID0gJCgnLmRlc2NyX19jb250YWluZXInKTtcclxuXHJcbiAgICAgICAgcHJldlRodW1iLnJlbW92ZUNsYXNzKCdtb3ZlZG93bicpO1xyXG4gICAgICAgIG5leHRUaHVtYi5yZW1vdmVDbGFzcygnbW92ZXVwJyk7XHJcblxyXG5cclxuICAgICAgICBpZiAoaW1nQWN0aXZlLm5leHQoKS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICBuZXh0VGh1bWIuZmlyc3QoKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpbWdBY3RpdmUubmV4dCgpLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgIG5leHRUaHVtYi5lcShpbWdBY3RpdmVJbmRleCArIDEpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpbWdBY3RpdmUucHJldigpLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHByZXZUaHVtYi5sYXN0KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaW1nQWN0aXZlLnByZXYoKS5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICBwcmV2VGh1bWIuZXEoaW1nQWN0aXZlSW5kZXggLSAxKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGVzY3IubmV4dCgpLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGRlc2NyLmZpcnN0KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGVzY3IubmV4dCgpLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgIGRlc2NyLmVxKGltZ0FjdGl2ZUluZGV4KS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldEFjdGl2ZVNsaWRlcygpO1xyXG5cclxuICAgIGNvbnRyb2xQcmV2Lm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgaW1nID0gJCgnLmltZ19fY29udGFpbmVyIC5pbWFnZScpLFxyXG4gICAgICAgICAgICBpbWdBY3RpdmUgPSAkKCcuaW1nX19jb250YWluZXIgLmltYWdlLmFjdGl2ZScpLFxyXG4gICAgICAgICAgICBuYXZQcmV2QWN0aXZlID0gJCgnLm5hdl9fcHJldiAuc2xpZGVyX19pdGVtLmFjdGl2ZScpLFxyXG4gICAgICAgICAgICBuYXZOZXh0QWN0aXZlID0gJCgnLm5hdl9fbmV4dCAuc2xpZGVyX19pdGVtLmFjdGl2ZScpLFxyXG4gICAgICAgICAgICBkZXNjciA9ICQoJy5kZXNjcl9fY29udGFpbmVyJyk7XHJcblxyXG4gICAgICAgICQoJy5saW5rJykuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuXHJcbiAgICAgICAgaW1nQWN0aXZlLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5wcmV2KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGRlc2NyLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBpZiAoaW1nQWN0aXZlLnByZXYoKS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICBpbWcubGFzdCgpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldEFjdGl2ZVNsaWRlcygpO1xyXG4gICAgICAgIG5hdlByZXZBY3RpdmUuYWRkQ2xhc3MoJ21vdmVkb3duJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIG5hdk5leHRBY3RpdmUuYWRkQ2xhc3MoJ21vdmV1cCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnLmxpbmsnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICAkKCcuc2xpZGVyX19pdGVtJykucmVtb3ZlQ2xhc3MoJ21vdmV1cCBtb3ZlZG93bicpO1xyXG4gICAgICAgIH0sIDcwMClcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnRyb2xOZXh0Lm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgaW1nID0gJCgnLmltZ19fY29udGFpbmVyIC5pbWFnZScpLFxyXG4gICAgICAgICAgICBpbWdBY3RpdmUgPSAkKCcuaW1nX19jb250YWluZXIgLmltYWdlLmFjdGl2ZScpLFxyXG4gICAgICAgICAgICBuYXZQcmV2QWN0aXZlID0gJCgnLm5hdl9fcHJldiAuc2xpZGVyX19pdGVtLmFjdGl2ZScpLFxyXG4gICAgICAgICAgICBuYXZOZXh0QWN0aXZlID0gJCgnLm5hdl9fbmV4dCAuc2xpZGVyX19pdGVtLmFjdGl2ZScpLFxyXG4gICAgICAgICAgICBkZXNjciA9ICQoJy5kZXNjcl9fY29udGFpbmVyJyk7XHJcblxyXG4gICAgICAgICQoJy5saW5rJykuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuXHJcbiAgICAgICAgaW1nQWN0aXZlLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5uZXh0KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGRlc2NyLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBpZiAoaW1nQWN0aXZlLm5leHQoKS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICBpbWcuZmlyc3QoKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRBY3RpdmVTbGlkZXMoKTtcclxuICAgICAgICBuYXZQcmV2QWN0aXZlLmFkZENsYXNzKCdtb3ZlZG93bicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBuYXZOZXh0QWN0aXZlLmFkZENsYXNzKCdtb3ZldXAnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCcubGluaycpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgICQoJy5zbGlkZXJfX2l0ZW0nKS5yZW1vdmVDbGFzcygnbW92ZXVwIG1vdmVkb3duJyk7XHJcbiAgICAgICAgfSwgNzAwKVxyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqL1xyXG4vKioqKiogcHJlbG9hZGVyICoqKioqL1xyXG4vKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxudmFyIHByZWxvYWRlcl9zdGF0ID0gJChcIiNwcmVsb2FkZXItc3ZnX19wZXJjZW50YWdlXCIpLFxyXG4gICAgaGFzSW1hZ2VQcm9wZXJ0aWVzID0gW1wiYmFja2dyb3VuZFwiLCBcImJhY2tncm91bmRJbWFnZVwiLCBcImxpc3RTdHlsZUltYWdlXCIsIFwiYm9yZGVySW1hZ2VcIiwgXCJib3JkZXJDb3JuZXJJbWFnZVwiLCBcImN1cnNvclwiXSxcclxuICAgIGhhc0ltYWdlQXR0cmlidXRlcyA9IFtcInNyY3NldFwiXSxcclxuICAgIG1hdGNoX3VybCA9IC91cmxcXChcXHMqKFsnXCJdPykoLio/KVxcMVxccypcXCkvZyxcclxuICAgIGFsbF9pbWFnZXMgPSBbXSxcclxuICAgIHRvdGFsID0gMCxcclxuICAgIGNvdW50ID0gMDtcclxuXHJcbnZhciBjaXJjbGVfbyA9ICQoXCIjcHJlbG9hZGVyLXN2Z19faW1nIC5iYXJfX291dGVyXCIpLFxyXG4gICAgY2lyY2xlX2MgPSAkKFwiI3ByZWxvYWRlci1zdmdfX2ltZyAuYmFyX19jZW50ZXJcIiksXHJcbiAgICBjaXJjbGVfaSA9ICQoXCIjcHJlbG9hZGVyLXN2Z19faW1nIC5iYXJfX2lubmVyXCIpLFxyXG4gICAgbGVuZ3RoX28gPSBNYXRoLlBJKihjaXJjbGVfby5hdHRyKFwiclwiKSAqIDIpLFxyXG4gICAgbGVuZ3RoX2MgPSBNYXRoLlBJKihjaXJjbGVfYy5hdHRyKFwiclwiKSAqIDIpLFxyXG4gICAgbGVuZ3RoX2kgPSBNYXRoLlBJKihjaXJjbGVfaS5hdHRyKFwiclwiKSAqIDIpO1xyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBwcmVsb2FkZXIoKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gaW1nX2xvYWRlZCgpe1xyXG4gICAgICAgIHZhciBwZXJjZW50YWdlID0gTWF0aC5jZWlsKCAoY291bnQrMSkgLyB0b3RhbCAqIDEwMCApO1xyXG5cclxuICAgICAgICBjb3VudCArPSAxO1xyXG4gICAgICAgIHBlcmNlbnRhZ2UgPSBwZXJjZW50YWdlID4gMTAwID8gMTAwIDogcGVyY2VudGFnZTtcclxuXHJcbiAgICAgICAgLy8gRHJhdyBvZmZzZXRzXHJcbiAgICAgICAgLy8gMXN0IGNpcmNsZVxyXG4gICAgICAgIGNpcmNsZV9vLmNzcyh7c3Ryb2tlRGFzaG9mZnNldDogKCgxMDAtcGVyY2VudGFnZSkvMTAwKSpsZW5ndGhfbyB9KTtcclxuXHJcbiAgICAgICAgLy8gd2hlbiB0byBzdGFydCAybmQgY2lyY2xlXHJcbiAgICAgICAgaWYocGVyY2VudGFnZSA+IDUwKSB7XHJcbiAgICAgICAgICAgIGNpcmNsZV9jLmNzcyh7c3Ryb2tlRGFzaG9mZnNldDogKCgxMDAtcGVyY2VudGFnZSkvMTAwKSpsZW5ndGhfYyB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHdoZW4gdG8gc3RhcnQgM3JkIGNpcmNsZVxyXG4gICAgICAgIGlmKHBlcmNlbnRhZ2UgPT0gMTAwKSB7XHJcbiAgICAgICAgICAgIGNpcmNsZV9pLmNzcyh7c3Ryb2tlRGFzaG9mZnNldDogKCgxMDAtcGVyY2VudGFnZSkvMTAwKSpsZW5ndGhfaSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByZWxvYWRlcl9zdGF0Lmh0bWwocGVyY2VudGFnZSk7XHJcblxyXG4gICAgICAgIGlmKGNvdW50ID09PSB0b3RhbCl7XHJcbiAgICAgICAgICAgIHJldHVybiBkb25lX2xvYWRpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZG9uZV9sb2FkaW5nKCl7XHJcbiAgICAgICAgcHJlbG9hZGVyX3N0YXQuY3NzKHtcImFuaW1hdGlvblwiOlwibm9uZVwifSk7XHJcbiAgICAgICAgJChcIiNwcmVsb2FkZXJcIikuZGVsYXkoNzAwKS5mYWRlT3V0KDcwMCwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJChcIiNwcmVsb2FkZXJfX3Byb2dyZXNzXCIpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYoJChcIi5mbGlwLWNhcmRcIikubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICQoXCIuZmxpcC1jYXJkXCIpLmFkZENsYXNzKFwibG9hZGVkXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW1hZ2VzX2xvb3AgKHRvdGFsKSB7XHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIFx0dmFyIHRlc3RfaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuXHJcbiAgICAgIFx0dGVzdF9pbWFnZS5vbmxvYWQgPSBpbWdfbG9hZGVkO1xyXG4gICAgICAgIFx0dGVzdF9pbWFnZS5vbmVycm9yID0gaW1nX2xvYWRlZDtcclxuXHJcbiAgICAgXHRjb25zb2xlLmxvZyhcIkNvdW50OiBcIiArIGNvdW50ICsgXCIgVG90YWw6IFwiICsgdG90YWwpO1xyXG5cclxuICAgICAgXHRpZiAoY291bnQgPCB0b3RhbCkge1xyXG4gICAgICAgXHRcdGlmIChhbGxfaW1hZ2VzW2NvdW50XS5zcmNzZXQpIHtcclxuICAgICAgXHRcdFx0dGVzdF9pbWFnZS5zcmNzZXQgPSBhbGxfaW1hZ2VzW2NvdW50XS5zcmNzZXQ7XHJcbiAgICAgIFx0XHR9XHJcbiAgICAgXHR0ZXN0X2ltYWdlLnNyYyA9IGFsbF9pbWFnZXNbY291bnRdLnNyYztcclxuXHJcbiAgICAgICBcdFx0aW1hZ2VzX2xvb3AodG90YWwpO1xyXG4gICAgICBcdH1cclxuICAgICAgIH0sIDEwKTtcclxuXHJcbiAgICAgICAgLy8gRk9SIHZlcnNpb25cclxuICAgICAgICBmb3IodmFyIGk9MDsgaTx0b3RhbDsgaSsrKXtcclxuICAgICAgICAgICAgdmFyIHRlc3RfaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuXHJcblxyXG4gICAgICAgICAgICB0ZXN0X2ltYWdlLm9ubG9hZCA9IGltZ19sb2FkZWQ7XHJcbiAgICAgICAgICAgIHRlc3RfaW1hZ2Uub25lcnJvciA9IGltZ19sb2FkZWQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoYWxsX2ltYWdlc1tpXS5zcmNzZXQpIHtcclxuICAgICAgICAgICAgICAgIHRlc3RfaW1hZ2Uuc3Jjc2V0ID0gYWxsX2ltYWdlc1tpXS5zcmNzZXQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRlc3RfaW1hZ2Uuc3JjID0gYWxsX2ltYWdlc1tpXS5zcmM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEdldCBhbGwgaW1hZ2VzXHJcbiAgICAkKFwiKlwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgIGlmIChlbGVtZW50LmlzKFwiaW1nXCIpICYmIGVsZW1lbnQuYXR0cihcInNyY1wiKSkge1xyXG4gICAgICAgICAgICBhbGxfaW1hZ2VzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgc3JjOiBlbGVtZW50LmF0dHIoXCJzcmNcIiksXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50WzBdXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJC5lYWNoKGhhc0ltYWdlUHJvcGVydGllcywgZnVuY3Rpb24gKGksIHByb3BlcnR5KSB7XHJcbiAgICAgICAgICAgIHZhciBwcm9wZXJ0eVZhbHVlID0gZWxlbWVudC5jc3MocHJvcGVydHkpO1xyXG4gICAgICAgICAgICB2YXIgbWF0Y2g7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXByb3BlcnR5VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtYXRjaCA9IG1hdGNoX3VybC5leGVjKHByb3BlcnR5VmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICBhbGxfaW1hZ2VzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHNyYzogbWF0Y2hbMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudFswXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJC5lYWNoKGhhc0ltYWdlQXR0cmlidXRlcywgZnVuY3Rpb24gKGksIGF0dHJpYnV0ZSkge1xyXG4gICAgICAgICAgICB2YXIgYXR0cmlidXRlVmFsdWUgPSBlbGVtZW50LmF0dHIoYXR0cmlidXRlKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghYXR0cmlidXRlVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhbGxfaW1hZ2VzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgc3JjOiBlbGVtZW50LmF0dHIoXCJzcmNcIiksXHJcbiAgICAgICAgICAgICAgICBzcmNzZXQ6IGVsZW1lbnQuYXR0cihcInNyY3NldFwiKSxcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnRbMF1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0b3RhbCA9IGFsbF9pbWFnZXMubGVuZ3RoO1xyXG5cclxuICAgIC8vIFN0YXJ0IHByZWxvYWRlciBvciBleGl0XHJcbiAgICBpZiAodG90YWwgPT09IDApIHtcclxuICAgICAgICBkb25lX2xvYWRpbmcoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW1hZ2VzX2xvb3AodG90YWwpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbnByZWxvYWRlcigpOyIsInZhciBtYXA7XHJcbmZ1bmN0aW9uIGluaXRNYXAoKSB7XHJcbiAgICB2YXIgc3R5bGVzID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFkbWluaXN0cmF0aXZlXCIsXHJcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXHJcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM0NDQ0NDRcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGVcIixcclxuICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZjJmMmYyXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsXHJcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXHJcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcInNhdHVyYXRpb25cIjogLTEwMFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiA0NVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcclxuICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmFydGVyaWFsXCIsXHJcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMuaWNvblwiLFxyXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInRyYW5zaXRcIixcclxuICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsXHJcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzYxZGFjOVwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJzYXR1cmF0aW9uXCI6IFwiMFwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICBdO1xyXG4gICAgdmFyIHN0eWxlZE1hcCA9IG5ldyBnb29nbGUubWFwcy5TdHlsZWRNYXBUeXBlKHN0eWxlcyxcclxuICAgICAgICB7bmFtZTogXCJTdHlsZWQgTWFwXCJ9KTtcclxuXHJcblxyXG5cclxuXHJcbiAgICB2YXIgbWFwT3B0aW9ucyA9IHtcclxuICAgICAgICB6b29tOiAxMyxcclxuICAgICAgICBjZW50ZXI6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoNDkuNDMxMTU1OSwzMS45Nzg2NjUxKSxcclxuICAgICAgICBzY3JvbGx3aGVlbDogZmFsc2UsXHJcbiAgICAgICAgbmF2aWdhdGlvbkNvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgIG1hcFR5cGVDb250cm9sOiBmYWxzZSxcclxuICAgICAgICBzY2FsZUNvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgIGRyYWdnYWJsZTogdHJ1ZSxcclxuICAgICAgICBkaXNhYmxlRGVmYXVsdFVJOiB0cnVlLFxyXG5cclxuICAgIH07XHJcbiAgICB2YXIgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyksbWFwT3B0aW9ucyk7XHJcbiAgICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgcG9zaXRpb246IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoNDkuNDMxMTU1OSwzMS45Nzg2NjUxKSxcclxuICAgICAgICBtYXA6IG1hcCxcclxuICAgICAgICBpY29uOiAnL2Fzc2V0cy9pbWcvbWFwX21hcmtlci5zdmcnXHJcbiAgICB9KTtcclxufVxyXG5nb29nbGUubWFwcy5ldmVudC5hZGREb21MaXN0ZW5lcih3aW5kb3csICdsb2FkJywgaW5pdGlhbGl6ZSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
