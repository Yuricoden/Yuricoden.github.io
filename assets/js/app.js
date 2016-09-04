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
        disableDefaultUI: true

    };
    var map = new google.maps.Map(document.getElementById('map'),mapOptions);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(49.4311559,31.9786651),
        map: map,
        icon: '/assets/img/map_marker.svg'
    });
}

if($("#map").length){
    google.maps.event.addDomListener(window, "load", map.init("map"));
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImdvb2dsZV9tYXBzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3ZUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBUb2dnbGUgbWVudVxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgY29uc29sZS5sb2coKCcudG9nZ2xlLW1lbnUnKSlcclxuICAgICQoJy50b2dnbGUtbWVudScpLm9uICgnY2xpY2sgdG91Y2hzdGFydCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICAkKCcuc2FuZHcnKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XHJcblxyXG5cclxuXHJcbiAgICBpZighJHRoaXMuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgJCgnLm1lbnUtc2NyZWVuJykuc2hvdygpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzaG93TWVudUl0ZW1zKHRydWUpO30sIDUwMCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGVsc2Uge1xyXG4gICAgICAgICQoJy5tZW51LXNjcmVlbicpLmZhZGVPdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgc2hvd01lbnVJdGVtcyhmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAkdGhpcy50b2dnbGVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBzaG93TWVudUl0ZW1zKHNob3cpIHtcclxuICAgICAgICB2YXJcclxuICAgICAgICAgICAgaXRlbXMgPSAkKCcubWVudS1zY3JlZW5fbGluaycpLFxyXG4gICAgICAgICAgICBkZWxheSA9IDEwMCxcclxuICAgICAgICAgICAgY291bnRlciA9IDAsXHJcbiAgICAgICAgICAgIHRpbWVyO1xyXG5cclxuICAgICBmdW5jdGlvbiBlYWNoKCkge1xyXG4gICAgICAgICB2YXIgJHRoaXMgPSBpdGVtcy5lcShjb3VudGVyKTtcclxuXHJcbiAgICAgICAgICR0aGlzLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgIGlmICh0eXBlb2YgdGltZXIgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICBpZiAoJHRoaXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoZWFjaCwgZGVsYXkpO1xyXG4gICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgY291bnRlcisrO1xyXG4gICAgIH1cclxuICAgICAgICAgaWYgKHNob3cpIHtcclxuICAgICAgICAgICAgIGVhY2goKTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgIGl0ZW1zLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7XHJcblxyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEF1dGhvcml6YXRpb24gW0NsaWNrXVxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblxyXG4kKHdpbmRvdykubG9hZChmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCcjY2FyZCcpLmFkZENsYXNzKCdsb2FkZWQnKVxyXG59KTtcclxuJChmdW5jdGlvbiAoKSB7XHJcbiAgICAkKFwiLmF1dGhcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICQoXCIjY2FyZFwiKS5hZGRDbGFzcyhcImZsaXBwZWRcIik7XHJcbiAgICAgICAgJChcIi5hdXRoXCIpLmFkZENsYXNzKFwiY2xpY2tlZFwiKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICB9KTtcclxuICAgICQoXCIjbWFpblwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgJChcIiNjYXJkXCIpLnJlbW92ZUNsYXNzKFwiZmxpcHBlZFwiKTtcclxuICAgICAgICAkKFwiLmF1dGhcIikucmVtb3ZlQ2xhc3MoXCJjbGlja2VkXCIpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgIH0pO1xyXG4gICAgJCgnLndlbC1jb250YWluZXInKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLnBhcmVudHMoXCIjY2FyZFwiKS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAkKFwiI2NhcmRcIikucmVtb3ZlQ2xhc3MoXCJmbGlwcGVkXCIpO1xyXG4gICAgICAgICAgICAkKFwiLmF1dGhcIikucmVtb3ZlQ2xhc3MoXCJjbGlja2VkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoJChlLnRhcmdldCkucGFyZW50cyhcIi5ibG9nbGVmdFwiKS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAkKFwiLmJsb2dsZWZ0XCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTtcclxuXHJcblxyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEJsb2cgRml4ZWQgYW5kIFBsYXNoa2EgbW9iaWxlXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHJcbnZhclxyXG4gICAgbmF2aWdhdGlvbiA9ICQoJy5uYXZpZ2F0aW9uLWJveCcpLFxyXG4gICAgYmFyX3NpZGUgPSAkKCcuYmxvZy1uYXZpZ2F0aW9uX19saXN0JyksXHJcbiAgICBzZWN0aW9ucyA9ICQoJy5hcnRpY2xlc19faXRlbScpLFxyXG4gICAgd2luZG93TWFyZ2luID0gNTA7XHJcblxyXG52YXIgbWVudUZpeGVkID0gJzxkaXYgY2xhc3MgPSBcImZpeGVkLW5hdmlnYXRpb25cIj4gXFxcclxuICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzID0gXCJjb250YWluZXJcIj4gXFxcclxuICAgIDxkaXYgY2xhc3MgPSBcImZpeGVkLW5hdmlnYXRpb25fbGVmdFwiPjwvZGl2PiBcXFxyXG4gICAgPGRpdiBjbGFzcyA9IFwiZml4ZWQtbmF2aWdhdGlvbl9yaWdodFwiPjwvZGl2PiBcXFxyXG4gICAgICAgIDwvZGl2PiBcXFxyXG4gICAgICAgIDwvZGl2Pic7XHJcblxyXG5cclxuLy8gZnVuY3Rpb24gZml4ZWRNZW51XHJcbmZ1bmN0aW9uIHN0aWNraXQod1Njcm9sbCkge1xyXG4gICAgLy/QstGL0LHQvtGAINC/0L7Qt9C40YbQuNC4XHJcbiAgICB2YXIgc3RpY2tTdGFydCA9IG5hdmlnYXRpb24ub2Zmc2V0KCkudG9wIC0gd2luZG93TWFyZ2luO1xyXG4gICAgaWYgKHdTY3JvbGwgPj0gc3RpY2tTdGFydCkge1xyXG4gICAgICAgIGlmKCEkKCcuZml4ZWQtbmF2aWdhdGlvbicpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uLmFwcGVuZChtZW51Rml4ZWQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZpeGVkTWVudSA9ICQoJy5maXhlZC1uYXZpZ2F0aW9uJyksXHJcbiAgICAgICAgICAgICAgICBtZW51Q29udGFpbmVyID0gZml4ZWRNZW51LmZpbmQoJy5maXhlZC1uYXZpZ2F0aW9uX2xlZnQnKSxcclxuICAgICAgICAgICAgICAgIG1lbnVDbG9uZSA9IGJhcl9zaWRlLmNsb25lKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nICgnbWVudUNsb25lJyk7XHJcbiAgICAgICAgICAgIGZpeGVkTWVudS5jc3MoJ3RvcCcsIHdpbmRvd01hcmdpbik7XHJcbiAgICAgICAgICAgIG1lbnVDb250YWluZXIuYXBwZW5kKG1lbnVDbG9uZSk7XHJcbiAgICAgICAgICAgIC8v0YHQutGA0YvQstCw0LXQvCDQvtGB0L0u0LzQtdC90Y5cclxuICAgICAgICAgICAgYmFyX3NpZGUuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgICQoJy5maXhlZC1uYXZpZ2F0aW9uJykucmVtb3ZlKCk7XHJcbiAgICAgICAgYmFyX3NpZGUuc2hvdygpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nICgnc3RpY2tTdGFydCcpO1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuLy/RhNGD0L3QutGG0LjRjyDQtNC70Y8g0L/QtdGA0LXRhdC+0LTQsCDQv9C+INCw0YDRgtC40LrQu9GOXHJcbmZ1bmN0aW9uIGNsaWNrVG9BcnRpY2xlKCkge1xyXG4gJCgnYm9keScpLm9uKCdjbGljaycsJy5ibG9nLW5hdmlnYXRpb25fX2l0ZW1fbGluaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxudmFyICR0aGlzID0gJCh0aGlzKSxcclxuICAgICRpdGVtID0gJHRoaXMuY2xvc2VzdCgnLmJsb2ctbmF2aWdhdGlvbl9faXRlbScpLFxyXG4gICAgLy/QvdCw0YXQvtC20YMgINC40L3QtNC10LrRgSDQtdC70LXQvNC10L3RgtCwIDEsMiwzXHJcblxyXG4gICAgIGluZGV4ID0gJGl0ZW0uaW5kZXgoKSxcclxuICAgICByZXFTZWN0aW9uID0gc2VjdGlvbnMuZXEoaW5kZXgpLFxyXG4gICAgIHNlY3Rpb25PZmZzZXQgPSByZXFTZWN0aW9uLm9mZnNldCgpLnRvcDtcclxuXHJcbiAgICAgJCgnYm9keSwgaHRtbCcpLmFuaW1hdGUgKHtcclxuICAgICAgICAgJ3Njcm9sbFRvcCcgOiBzZWN0aW9uT2Zmc2V0IC0gNTBcclxuXHJcbiAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcblxyXG4vL9GE0YPQvdC60YbQuNGPINCw0LrRgtC40LLQvdC+0Lkg0L/Qu9Cw0L3QutC4XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VBY3RpdmUod1Njcm9sbCkge1xyXG4gICAgJC5lYWNoKHNlY3Rpb25zLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXJcclxuICAgICAgICAgICAgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICB3aW5kb3dNYXJnaW4gPSAkKHdpbmRvdykuaGVpZ2h0KCkgLyAyLFxyXG4gICAgICAgICAgICB0b3BFZGdlID0gJHRoaXMub2Zmc2V0KCkudG9wIC0gd2luZG93TWFyZ2luLFxyXG4gICAgICAgICAgICBib3R0b21FZGdlID0gdG9wRWRnZSArICR0aGlzLmhlaWdodCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHdTY3JvbGwgPiB0b3BFZGdlICYmIHdTY3JvbGwgPCBib3R0b21FZGdlKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSAkdGhpcy5pbmRleCgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJCgnLmJsb2ctbmF2aWdhdGlvbl9fbGlzdCcpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICR0aGlzLmZpbmQoJy5ibG9nLW5hdmlnYXRpb25fX2l0ZW0nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5lcShpbmRleClcclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLy/QstGL0LHQuNGA0LDQtdC8INGB0L7RgdC10LTQvdC40LUg0LXQu9C10LzQtdC90YLRiyDQuCDRg9C00LDQu9C10Y/QtdC8INCw0LrRgtC40LJcclxuICAgICAgICAgICAgICAgICAgICAuc2libGluZ3MoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5jbGlja1RvQXJ0aWNsZSgpO1xyXG5cclxuJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgIHZhciB3U2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgc3RpY2tpdCh3U2Nyb2xsKTtcclxuICAgIGNoYW5nZUFjdGl2ZSh3U2Nyb2xsKTtcclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEFuaW1hdGlvbnNcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiQuZm4uYW5pbWF0ZWQgPSBmdW5jdGlvbihpbkVmZmVjdCkge1xyXG4gICAgJCh0aGlzKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciB0aHMgPSAkKHRoaXMpO1xyXG4gICAgICAgIHRocy5jc3Moe29wYWNpdHk6MH0pXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcyhcImFuaW1hdGVkXCIpXHJcbiAgICAgICAgICAgIC53YXlwb2ludChmdW5jdGlvbihkaXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlyID09PSAnZG93bicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhzLmFkZENsYXNzKGluRWZmZWN0KS5jc3Moe29wYWNpdHk6MX0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0OiBcIjUwMCVcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcblxyXG4kKFwiIC5hYm91dC1tZV9fc2tpbGxzPmRpdlwiKS5hbmltYXRlZChcImZhZGVJblVwXCIpO1xyXG4kKCcucG9ydGZvbGlvX19uYXYsLnRhbGtzIC50ZXN0aW1vbmlhbCwucG9ydGZvbGlvX19pbWcnKS5hbmltYXRlZCgnZmFkZUluVXAnKTtcclxuXHJcblxyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFBpZWNoYXJ0cyBhbmltYXRpb25cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiQoXCIucGllY2hhcnQgLnBpZWNoYXJ0X19maWxsXCIpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIHZhciBwaWUgPSAkKHRoaXMpO1xyXG4gICAgcGllLndheXBvaW50KGZ1bmN0aW9uKGRpcikge1xyXG4gICAgICAgICAgICBpZiAoZGlyID09PSBcImRvd25cIikge1xyXG4gICAgICAgICAgICAgICAgcGllLmNzcyh7c3Ryb2tlRGFzaG9mZnNldDpwaWUuZGF0YShcInBlcmNlbnRhZ2VcIil9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvZmZzZXQ6IFwiNTAwJVwiXHJcbiAgICAgICAgfSk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gU2xpZGVyXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGNvbnRyb2xQcmV2ID0gJCgnLm5hdl9fcHJldiAubGluaycpLFxyXG4gICAgICAgIGNvbnRyb2xOZXh0ID0gJCgnLm5hdl9fbmV4dCAubGluaycpO1xyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRBY3RpdmVTbGlkZXMoKSB7XHJcbiAgICAgICAgdmFyIGltZ0FjdGl2ZSA9ICQoJy5pbWdfX2NvbnRhaW5lciAuaW1hZ2UuYWN0aXZlJyksXHJcbiAgICAgICAgICAgIGltZ0FjdGl2ZUluZGV4ID0gaW1nQWN0aXZlLmluZGV4KCksXHJcbiAgICAgICAgICAgIHByZXZUaHVtYiA9ICQoJy5uYXZfX3ByZXYgLnNsaWRlcl9faXRlbScpLFxyXG4gICAgICAgICAgICBuZXh0VGh1bWIgPSAkKCcubmF2X19uZXh0IC5zbGlkZXJfX2l0ZW0nKSxcclxuICAgICAgICAgICAgZGVzY3IgPSAkKCcuZGVzY3JfX2NvbnRhaW5lcicpO1xyXG5cclxuICAgICAgICBwcmV2VGh1bWIucmVtb3ZlQ2xhc3MoJ21vdmVkb3duJyk7XHJcbiAgICAgICAgbmV4dFRodW1iLnJlbW92ZUNsYXNzKCdtb3ZldXAnKTtcclxuXHJcblxyXG4gICAgICAgIGlmIChpbWdBY3RpdmUubmV4dCgpLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIG5leHRUaHVtYi5maXJzdCgpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGltZ0FjdGl2ZS5uZXh0KCkubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgbmV4dFRodW1iLmVxKGltZ0FjdGl2ZUluZGV4ICsgMSkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGltZ0FjdGl2ZS5wcmV2KCkubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgcHJldlRodW1iLmxhc3QoKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpbWdBY3RpdmUucHJldigpLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgIHByZXZUaHVtYi5lcShpbWdBY3RpdmVJbmRleCAtIDEpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkZXNjci5uZXh0KCkubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgZGVzY3IuZmlyc3QoKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkZXNjci5uZXh0KCkubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgZGVzY3IuZXEoaW1nQWN0aXZlSW5kZXgpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QWN0aXZlU2xpZGVzKCk7XHJcblxyXG4gICAgY29udHJvbFByZXYub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBpbWcgPSAkKCcuaW1nX19jb250YWluZXIgLmltYWdlJyksXHJcbiAgICAgICAgICAgIGltZ0FjdGl2ZSA9ICQoJy5pbWdfX2NvbnRhaW5lciAuaW1hZ2UuYWN0aXZlJyksXHJcbiAgICAgICAgICAgIG5hdlByZXZBY3RpdmUgPSAkKCcubmF2X19wcmV2IC5zbGlkZXJfX2l0ZW0uYWN0aXZlJyksXHJcbiAgICAgICAgICAgIG5hdk5leHRBY3RpdmUgPSAkKCcubmF2X19uZXh0IC5zbGlkZXJfX2l0ZW0uYWN0aXZlJyksXHJcbiAgICAgICAgICAgIGRlc2NyID0gJCgnLmRlc2NyX19jb250YWluZXInKTtcclxuXHJcbiAgICAgICAgJCgnLmxpbmsnKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG5cclxuICAgICAgICBpbWdBY3RpdmUucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLnByZXYoKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgZGVzY3IucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGlmIChpbWdBY3RpdmUucHJldigpLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGltZy5sYXN0KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0QWN0aXZlU2xpZGVzKCk7XHJcbiAgICAgICAgbmF2UHJldkFjdGl2ZS5hZGRDbGFzcygnbW92ZWRvd24nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgbmF2TmV4dEFjdGl2ZS5hZGRDbGFzcygnbW92ZXVwJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCcubGluaycpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgICQoJy5zbGlkZXJfX2l0ZW0nKS5yZW1vdmVDbGFzcygnbW92ZXVwIG1vdmVkb3duJyk7XHJcbiAgICAgICAgfSwgNzAwKVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29udHJvbE5leHQub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBpbWcgPSAkKCcuaW1nX19jb250YWluZXIgLmltYWdlJyksXHJcbiAgICAgICAgICAgIGltZ0FjdGl2ZSA9ICQoJy5pbWdfX2NvbnRhaW5lciAuaW1hZ2UuYWN0aXZlJyksXHJcbiAgICAgICAgICAgIG5hdlByZXZBY3RpdmUgPSAkKCcubmF2X19wcmV2IC5zbGlkZXJfX2l0ZW0uYWN0aXZlJyksXHJcbiAgICAgICAgICAgIG5hdk5leHRBY3RpdmUgPSAkKCcubmF2X19uZXh0IC5zbGlkZXJfX2l0ZW0uYWN0aXZlJyksXHJcbiAgICAgICAgICAgIGRlc2NyID0gJCgnLmRlc2NyX19jb250YWluZXInKTtcclxuXHJcbiAgICAgICAgJCgnLmxpbmsnKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG5cclxuICAgICAgICBpbWdBY3RpdmUucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLm5leHQoKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgZGVzY3IucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGlmIChpbWdBY3RpdmUubmV4dCgpLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGltZy5maXJzdCgpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldEFjdGl2ZVNsaWRlcygpO1xyXG4gICAgICAgIG5hdlByZXZBY3RpdmUuYWRkQ2xhc3MoJ21vdmVkb3duJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIG5hdk5leHRBY3RpdmUuYWRkQ2xhc3MoJ21vdmV1cCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJy5saW5rJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgJCgnLnNsaWRlcl9faXRlbScpLnJlbW92ZUNsYXNzKCdtb3ZldXAgbW92ZWRvd24nKTtcclxuICAgICAgICB9LCA3MDApXHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKiovXHJcbi8qKioqKiBwcmVsb2FkZXIgKioqKiovXHJcbi8qKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG52YXIgcHJlbG9hZGVyX3N0YXQgPSAkKFwiI3ByZWxvYWRlci1zdmdfX3BlcmNlbnRhZ2VcIiksXHJcbiAgICBoYXNJbWFnZVByb3BlcnRpZXMgPSBbXCJiYWNrZ3JvdW5kXCIsIFwiYmFja2dyb3VuZEltYWdlXCIsIFwibGlzdFN0eWxlSW1hZ2VcIiwgXCJib3JkZXJJbWFnZVwiLCBcImJvcmRlckNvcm5lckltYWdlXCIsIFwiY3Vyc29yXCJdLFxyXG4gICAgaGFzSW1hZ2VBdHRyaWJ1dGVzID0gW1wic3Jjc2V0XCJdLFxyXG4gICAgbWF0Y2hfdXJsID0gL3VybFxcKFxccyooWydcIl0/KSguKj8pXFwxXFxzKlxcKS9nLFxyXG4gICAgYWxsX2ltYWdlcyA9IFtdLFxyXG4gICAgdG90YWwgPSAwLFxyXG4gICAgY291bnQgPSAwO1xyXG5cclxudmFyIGNpcmNsZV9vID0gJChcIiNwcmVsb2FkZXItc3ZnX19pbWcgLmJhcl9fb3V0ZXJcIiksXHJcbiAgICBjaXJjbGVfYyA9ICQoXCIjcHJlbG9hZGVyLXN2Z19faW1nIC5iYXJfX2NlbnRlclwiKSxcclxuICAgIGNpcmNsZV9pID0gJChcIiNwcmVsb2FkZXItc3ZnX19pbWcgLmJhcl9faW5uZXJcIiksXHJcbiAgICBsZW5ndGhfbyA9IE1hdGguUEkqKGNpcmNsZV9vLmF0dHIoXCJyXCIpICogMiksXHJcbiAgICBsZW5ndGhfYyA9IE1hdGguUEkqKGNpcmNsZV9jLmF0dHIoXCJyXCIpICogMiksXHJcbiAgICBsZW5ndGhfaSA9IE1hdGguUEkqKGNpcmNsZV9pLmF0dHIoXCJyXCIpICogMik7XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIHByZWxvYWRlcigpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBpbWdfbG9hZGVkKCl7XHJcbiAgICAgICAgdmFyIHBlcmNlbnRhZ2UgPSBNYXRoLmNlaWwoIChjb3VudCsxKSAvIHRvdGFsICogMTAwICk7XHJcblxyXG4gICAgICAgIGNvdW50ICs9IDE7XHJcbiAgICAgICAgcGVyY2VudGFnZSA9IHBlcmNlbnRhZ2UgPiAxMDAgPyAxMDAgOiBwZXJjZW50YWdlO1xyXG5cclxuICAgICAgICAvLyBEcmF3IG9mZnNldHNcclxuICAgICAgICAvLyAxc3QgY2lyY2xlXHJcbiAgICAgICAgY2lyY2xlX28uY3NzKHtzdHJva2VEYXNob2Zmc2V0OiAoKDEwMC1wZXJjZW50YWdlKS8xMDApKmxlbmd0aF9vIH0pO1xyXG5cclxuICAgICAgICAvLyB3aGVuIHRvIHN0YXJ0IDJuZCBjaXJjbGVcclxuICAgICAgICBpZihwZXJjZW50YWdlID4gNTApIHtcclxuICAgICAgICAgICAgY2lyY2xlX2MuY3NzKHtzdHJva2VEYXNob2Zmc2V0OiAoKDEwMC1wZXJjZW50YWdlKS8xMDApKmxlbmd0aF9jIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gd2hlbiB0byBzdGFydCAzcmQgY2lyY2xlXHJcbiAgICAgICAgaWYocGVyY2VudGFnZSA9PSAxMDApIHtcclxuICAgICAgICAgICAgY2lyY2xlX2kuY3NzKHtzdHJva2VEYXNob2Zmc2V0OiAoKDEwMC1wZXJjZW50YWdlKS8xMDApKmxlbmd0aF9pIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJlbG9hZGVyX3N0YXQuaHRtbChwZXJjZW50YWdlKTtcclxuXHJcbiAgICAgICAgaWYoY291bnQgPT09IHRvdGFsKXtcclxuICAgICAgICAgICAgcmV0dXJuIGRvbmVfbG9hZGluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkb25lX2xvYWRpbmcoKXtcclxuICAgICAgICBwcmVsb2FkZXJfc3RhdC5jc3Moe1wiYW5pbWF0aW9uXCI6XCJub25lXCJ9KTtcclxuICAgICAgICAkKFwiI3ByZWxvYWRlclwiKS5kZWxheSg3MDApLmZhZGVPdXQoNzAwLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKFwiI3ByZWxvYWRlcl9fcHJvZ3Jlc3NcIikucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICBpZigkKFwiLmZsaXAtY2FyZFwiKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgJChcIi5mbGlwLWNhcmRcIikuYWRkQ2xhc3MoXCJsb2FkZWRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbWFnZXNfbG9vcCAodG90YWwpIHtcclxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgXHR2YXIgdGVzdF9pbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG5cclxuICAgICAgXHR0ZXN0X2ltYWdlLm9ubG9hZCA9IGltZ19sb2FkZWQ7XHJcbiAgICAgICAgXHR0ZXN0X2ltYWdlLm9uZXJyb3IgPSBpbWdfbG9hZGVkO1xyXG5cclxuICAgICBcdGNvbnNvbGUubG9nKFwiQ291bnQ6IFwiICsgY291bnQgKyBcIiBUb3RhbDogXCIgKyB0b3RhbCk7XHJcblxyXG4gICAgICBcdGlmIChjb3VudCA8IHRvdGFsKSB7XHJcbiAgICAgICBcdFx0aWYgKGFsbF9pbWFnZXNbY291bnRdLnNyY3NldCkge1xyXG4gICAgICBcdFx0XHR0ZXN0X2ltYWdlLnNyY3NldCA9IGFsbF9pbWFnZXNbY291bnRdLnNyY3NldDtcclxuICAgICAgXHRcdH1cclxuICAgICBcdHRlc3RfaW1hZ2Uuc3JjID0gYWxsX2ltYWdlc1tjb3VudF0uc3JjO1xyXG5cclxuICAgICAgIFx0XHRpbWFnZXNfbG9vcCh0b3RhbCk7XHJcbiAgICAgIFx0fVxyXG4gICAgICAgfSwgMTApO1xyXG5cclxuICAgICAgICAvLyBGT1IgdmVyc2lvblxyXG4gICAgICAgIGZvcih2YXIgaT0wOyBpPHRvdGFsOyBpKyspe1xyXG4gICAgICAgICAgICB2YXIgdGVzdF9pbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRlc3RfaW1hZ2Uub25sb2FkID0gaW1nX2xvYWRlZDtcclxuICAgICAgICAgICAgdGVzdF9pbWFnZS5vbmVycm9yID0gaW1nX2xvYWRlZDtcclxuXHJcbiAgICAgICAgICAgIGlmIChhbGxfaW1hZ2VzW2ldLnNyY3NldCkge1xyXG4gICAgICAgICAgICAgICAgdGVzdF9pbWFnZS5zcmNzZXQgPSBhbGxfaW1hZ2VzW2ldLnNyY3NldDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGVzdF9pbWFnZS5zcmMgPSBhbGxfaW1hZ2VzW2ldLnNyYztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gR2V0IGFsbCBpbWFnZXNcclxuICAgICQoXCIqXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgaWYgKGVsZW1lbnQuaXMoXCJpbWdcIikgJiYgZWxlbWVudC5hdHRyKFwic3JjXCIpKSB7XHJcbiAgICAgICAgICAgIGFsbF9pbWFnZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBzcmM6IGVsZW1lbnQuYXR0cihcInNyY1wiKSxcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnRbMF1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkLmVhY2goaGFzSW1hZ2VQcm9wZXJ0aWVzLCBmdW5jdGlvbiAoaSwgcHJvcGVydHkpIHtcclxuICAgICAgICAgICAgdmFyIHByb3BlcnR5VmFsdWUgPSBlbGVtZW50LmNzcyhwcm9wZXJ0eSk7XHJcbiAgICAgICAgICAgIHZhciBtYXRjaDtcclxuXHJcbiAgICAgICAgICAgIGlmICghcHJvcGVydHlWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1hdGNoID0gbWF0Y2hfdXJsLmV4ZWMocHJvcGVydHlWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgIGFsbF9pbWFnZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgc3JjOiBtYXRjaFsyXSxcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50WzBdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkLmVhY2goaGFzSW1hZ2VBdHRyaWJ1dGVzLCBmdW5jdGlvbiAoaSwgYXR0cmlidXRlKSB7XHJcbiAgICAgICAgICAgIHZhciBhdHRyaWJ1dGVWYWx1ZSA9IGVsZW1lbnQuYXR0cihhdHRyaWJ1dGUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFhdHRyaWJ1dGVWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFsbF9pbWFnZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBzcmM6IGVsZW1lbnQuYXR0cihcInNyY1wiKSxcclxuICAgICAgICAgICAgICAgIHNyY3NldDogZWxlbWVudC5hdHRyKFwic3Jjc2V0XCIpLFxyXG4gICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudFswXVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRvdGFsID0gYWxsX2ltYWdlcy5sZW5ndGg7XHJcblxyXG4gICAgLy8gU3RhcnQgcHJlbG9hZGVyIG9yIGV4aXRcclxuICAgIGlmICh0b3RhbCA9PT0gMCkge1xyXG4gICAgICAgIGRvbmVfbG9hZGluZygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpbWFnZXNfbG9vcCh0b3RhbCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxucHJlbG9hZGVyKCk7IiwidmFyIG1hcDtcclxuZnVuY3Rpb24gaW5pdE1hcCgpIHtcclxuICAgIHZhciBzdHlsZXMgPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmVcIixcclxuICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcclxuICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzQ0NDQ0NFwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZVwiLFxyXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNmMmYyZjJcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2lcIixcclxuICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcclxuICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwic2F0dXJhdGlvblwiOiAtMTAwXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IDQ1XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxyXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuYXJ0ZXJpYWxcIixcclxuICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy5pY29uXCIsXHJcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdFwiLFxyXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcclxuICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNjFkYWM5XCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcInNhdHVyYXRpb25cIjogXCIwXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgIF07XHJcbiAgICB2YXIgc3R5bGVkTWFwID0gbmV3IGdvb2dsZS5tYXBzLlN0eWxlZE1hcFR5cGUoc3R5bGVzLFxyXG4gICAgICAgIHtuYW1lOiBcIlN0eWxlZCBNYXBcIn0pO1xyXG5cclxuXHJcblxyXG5cclxuICAgIHZhciBtYXBPcHRpb25zID0ge1xyXG4gICAgICAgIHpvb206IDEzLFxyXG4gICAgICAgIGNlbnRlcjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyg0OS40MzExNTU5LDMxLjk3ODY2NTEpLFxyXG4gICAgICAgIHNjcm9sbHdoZWVsOiBmYWxzZSxcclxuICAgICAgICBuYXZpZ2F0aW9uQ29udHJvbDogZmFsc2UsXHJcbiAgICAgICAgbWFwVHlwZUNvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgIHNjYWxlQ29udHJvbDogZmFsc2UsXHJcbiAgICAgICAgZHJhZ2dhYmxlOiB0cnVlLFxyXG4gICAgICAgIGRpc2FibGVEZWZhdWx0VUk6IHRydWVcclxuXHJcbiAgICB9O1xyXG4gICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLG1hcE9wdGlvbnMpO1xyXG4gICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgIHBvc2l0aW9uOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDQ5LjQzMTE1NTksMzEuOTc4NjY1MSksXHJcbiAgICAgICAgbWFwOiBtYXAsXHJcbiAgICAgICAgaWNvbjogJy9hc3NldHMvaW1nL21hcF9tYXJrZXIuc3ZnJ1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmlmKCQoXCIjbWFwXCIpLmxlbmd0aCl7XHJcbiAgICBnb29nbGUubWFwcy5ldmVudC5hZGREb21MaXN0ZW5lcih3aW5kb3csIFwibG9hZFwiLCBtYXAuaW5pdChcIm1hcFwiKSk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
