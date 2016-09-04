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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImdvb2dsZV9tYXBzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3ZUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFRvZ2dsZSBtZW51XHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4oZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICBjb25zb2xlLmxvZygoJy50b2dnbGUtbWVudScpKVxyXG4gICAgJCgnLnRvZ2dsZS1tZW51Jykub24gKCdjbGljayB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgICQoJy5zYW5kdycpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcblxyXG5cclxuICAgIGlmKCEkdGhpcy5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAkKCcubWVudS1zY3JlZW4nKS5zaG93KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNob3dNZW51SXRlbXModHJ1ZSk7fSwgNTAwKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgJCgnLm1lbnUtc2NyZWVuJykuZmFkZU91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICBzaG93TWVudUl0ZW1zKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgICR0aGlzLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNob3dNZW51SXRlbXMoc2hvdykge1xyXG4gICAgICAgIHZhclxyXG4gICAgICAgICAgICBpdGVtcyA9ICQoJy5tZW51LXNjcmVlbl9saW5rJyksXHJcbiAgICAgICAgICAgIGRlbGF5ID0gMTAwLFxyXG4gICAgICAgICAgICBjb3VudGVyID0gMCxcclxuICAgICAgICAgICAgdGltZXI7XHJcblxyXG4gICAgIGZ1bmN0aW9uIGVhY2goKSB7XHJcbiAgICAgICAgIHZhciAkdGhpcyA9IGl0ZW1zLmVxKGNvdW50ZXIpO1xyXG5cclxuICAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgaWYgKHR5cGVvZiB0aW1lciAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIGlmICgkdGhpcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgIHRpbWVyID0gc2V0VGltZW91dChlYWNoLCBkZWxheSk7XHJcbiAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICBjb3VudGVyKys7XHJcbiAgICAgfVxyXG4gICAgICAgICBpZiAoc2hvdykge1xyXG4gICAgICAgICAgICAgZWFjaCgpO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgaXRlbXMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSkoKTtcclxuXHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gQXV0aG9yaXphdGlvbiBbQ2xpY2tdXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHJcbiQod2luZG93KS5sb2FkKGZ1bmN0aW9uICgpIHtcclxuICAgICQoJyNjYXJkJykuYWRkQ2xhc3MoJ2xvYWRlZCcpXHJcbn0pO1xyXG4kKGZ1bmN0aW9uICgpIHtcclxuICAgICQoXCIuYXV0aFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgJChcIiNjYXJkXCIpLmFkZENsYXNzKFwiZmxpcHBlZFwiKTtcclxuICAgICAgICAkKFwiLmF1dGhcIikuYWRkQ2xhc3MoXCJjbGlja2VkXCIpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgIH0pO1xyXG4gICAgJChcIiNtYWluXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAkKFwiI2NhcmRcIikucmVtb3ZlQ2xhc3MoXCJmbGlwcGVkXCIpO1xyXG4gICAgICAgICQoXCIuYXV0aFwiKS5yZW1vdmVDbGFzcyhcImNsaWNrZWRcIik7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgfSk7XHJcbiAgICAkKCcud2VsLWNvbnRhaW5lcicpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoJChlLnRhcmdldCkucGFyZW50cyhcIiNjYXJkXCIpLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICQoXCIjY2FyZFwiKS5yZW1vdmVDbGFzcyhcImZsaXBwZWRcIik7XHJcbiAgICAgICAgICAgICQoXCIuYXV0aFwiKS5yZW1vdmVDbGFzcyhcImNsaWNrZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5wYXJlbnRzKFwiLmJsb2dsZWZ0XCIpLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICQoXCIuYmxvZ2xlZnRcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gQmxvZyBGaXhlZCBhbmQgUGxhc2hrYSBtb2JpbGVcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cclxudmFyXHJcbiAgICBuYXZpZ2F0aW9uID0gJCgnLm5hdmlnYXRpb24tYm94JyksXHJcbiAgICBiYXJfc2lkZSA9ICQoJy5ibG9nLW5hdmlnYXRpb25fX2xpc3QnKSxcclxuICAgIHNlY3Rpb25zID0gJCgnLmFydGljbGVzX19pdGVtJyksXHJcbiAgICB3aW5kb3dNYXJnaW4gPSA1MDtcclxuXHJcbnZhciBtZW51Rml4ZWQgPSAnPGRpdiBjbGFzcyA9IFwiZml4ZWQtbmF2aWdhdGlvblwiPiBcXFxyXG4gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3MgPSBcImNvbnRhaW5lclwiPiBcXFxyXG4gICAgPGRpdiBjbGFzcyA9IFwiZml4ZWQtbmF2aWdhdGlvbl9sZWZ0XCI+PC9kaXY+IFxcXHJcbiAgICA8ZGl2IGNsYXNzID0gXCJmaXhlZC1uYXZpZ2F0aW9uX3JpZ2h0XCI+PC9kaXY+IFxcXHJcbiAgICAgICAgPC9kaXY+IFxcXHJcbiAgICAgICAgPC9kaXY+JztcclxuXHJcblxyXG4vLyBmdW5jdGlvbiBmaXhlZE1lbnVcclxuZnVuY3Rpb24gc3RpY2tpdCh3U2Nyb2xsKSB7XHJcbiAgICAvL9Cy0YvQsdC+0YAg0L/QvtC30LjRhtC40LhcclxuICAgIHZhciBzdGlja1N0YXJ0ID0gbmF2aWdhdGlvbi5vZmZzZXQoKS50b3AgLSB3aW5kb3dNYXJnaW47XHJcbiAgICBpZiAod1Njcm9sbCA+PSBzdGlja1N0YXJ0KSB7XHJcbiAgICAgICAgaWYoISQoJy5maXhlZC1uYXZpZ2F0aW9uJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIG5hdmlnYXRpb24uYXBwZW5kKG1lbnVGaXhlZCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZml4ZWRNZW51ID0gJCgnLmZpeGVkLW5hdmlnYXRpb24nKSxcclxuICAgICAgICAgICAgICAgIG1lbnVDb250YWluZXIgPSBmaXhlZE1lbnUuZmluZCgnLmZpeGVkLW5hdmlnYXRpb25fbGVmdCcpLFxyXG4gICAgICAgICAgICAgICAgbWVudUNsb25lID0gYmFyX3NpZGUuY2xvbmUoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cgKCdtZW51Q2xvbmUnKTtcclxuICAgICAgICAgICAgZml4ZWRNZW51LmNzcygndG9wJywgd2luZG93TWFyZ2luKTtcclxuICAgICAgICAgICAgbWVudUNvbnRhaW5lci5hcHBlbmQobWVudUNsb25lKTtcclxuICAgICAgICAgICAgLy/RgdC60YDRi9Cy0LDQtdC8INC+0YHQvS7QvNC10L3RjlxyXG4gICAgICAgICAgICBiYXJfc2lkZS5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgJCgnLmZpeGVkLW5hdmlnYXRpb24nKS5yZW1vdmUoKTtcclxuICAgICAgICBiYXJfc2lkZS5zaG93KCk7XHJcbiAgICAgICAgY29uc29sZS5sb2cgKCdzdGlja1N0YXJ0Jyk7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG4vL9GE0YPQvdC60YbQuNGPINC00LvRjyDQv9C10YDQtdGF0L7QtNCwINC/0L4g0LDRgNGC0LjQutC70Y5cclxuZnVuY3Rpb24gY2xpY2tUb0FydGljbGUoKSB7XHJcbiAkKCdib2R5Jykub24oJ2NsaWNrJywnLmJsb2ctbmF2aWdhdGlvbl9faXRlbV9saW5rJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG52YXIgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgJGl0ZW0gPSAkdGhpcy5jbG9zZXN0KCcuYmxvZy1uYXZpZ2F0aW9uX19pdGVtJyksXHJcbiAgICAvL9C90LDRhdC+0LbRgyAg0LjQvdC00LXQutGBINC10LvQtdC80LXQvdGC0LAgMSwyLDNcclxuXHJcbiAgICAgaW5kZXggPSAkaXRlbS5pbmRleCgpLFxyXG4gICAgIHJlcVNlY3Rpb24gPSBzZWN0aW9ucy5lcShpbmRleCksXHJcbiAgICAgc2VjdGlvbk9mZnNldCA9IHJlcVNlY3Rpb24ub2Zmc2V0KCkudG9wO1xyXG5cclxuICAgICAkKCdib2R5LCBodG1sJykuYW5pbWF0ZSAoe1xyXG4gICAgICAgICAnc2Nyb2xsVG9wJyA6IHNlY3Rpb25PZmZzZXQgLSA1MFxyXG5cclxuICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuXHJcbi8v0YTRg9C90LrRhtC40Y8g0LDQutGC0LjQstC90L7QuSDQv9C70LDQvdC60LhcclxuXHJcbmZ1bmN0aW9uIGNoYW5nZUFjdGl2ZSh3U2Nyb2xsKSB7XHJcbiAgICAkLmVhY2goc2VjdGlvbnMsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhclxyXG4gICAgICAgICAgICAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIHdpbmRvd01hcmdpbiA9ICQod2luZG93KS5oZWlnaHQoKSAvIDIsXHJcbiAgICAgICAgICAgIHRvcEVkZ2UgPSAkdGhpcy5vZmZzZXQoKS50b3AgLSB3aW5kb3dNYXJnaW4sXHJcbiAgICAgICAgICAgIGJvdHRvbUVkZ2UgPSB0b3BFZGdlICsgJHRoaXMuaGVpZ2h0KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYod1Njcm9sbCA+IHRvcEVkZ2UgJiYgd1Njcm9sbCA8IGJvdHRvbUVkZ2UpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9ICR0aGlzLmluZGV4KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkKCcuYmxvZy1uYXZpZ2F0aW9uX19saXN0JykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHRoaXMuZmluZCgnLmJsb2ctbmF2aWdhdGlvbl9faXRlbScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmVxKGluZGV4KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYWN0aXZlJylcclxuICAgICAgICAgICAgICAgICAgICAvL9Cy0YvQsdC40YDQsNC10Lwg0YHQvtGB0LXQtNC90LjQtSDQtdC70LXQvNC10L3RgtGLINC4INGD0LTQsNC70LXRj9C10Lwg0LDQutGC0LjQslxyXG4gICAgICAgICAgICAgICAgICAgIC5zaWJsaW5ncygpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmNsaWNrVG9BcnRpY2xlKCk7XHJcblxyXG4kKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHdTY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICBzdGlja2l0KHdTY3JvbGwpO1xyXG4gICAgY2hhbmdlQWN0aXZlKHdTY3JvbGwpO1xyXG59KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gQW5pbWF0aW9uc1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuJC5mbi5hbmltYXRlZCA9IGZ1bmN0aW9uKGluRWZmZWN0KSB7XHJcbiAgICAkKHRoaXMpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHRocyA9ICQodGhpcyk7XHJcbiAgICAgICAgdGhzLmNzcyh7b3BhY2l0eTowfSlcclxuICAgICAgICAgICAgLmFkZENsYXNzKFwiYW5pbWF0ZWRcIilcclxuICAgICAgICAgICAgLndheXBvaW50KGZ1bmN0aW9uKGRpcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXIgPT09ICdkb3duJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHMuYWRkQ2xhc3MoaW5FZmZlY3QpLmNzcyh7b3BhY2l0eToxfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXQ6IFwiNTAwJVwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuXHJcbiQoXCIgLmFib3V0LW1lX19za2lsbHM+ZGl2XCIpLmFuaW1hdGVkKFwiZmFkZUluVXBcIik7XHJcbiQoJy5wb3J0Zm9saW9fX25hdiwudGFsa3MgLnRlc3RpbW9uaWFsLC5wb3J0Zm9saW9fX2ltZycpLmFuaW1hdGVkKCdmYWRlSW5VcCcpO1xyXG5cclxuXHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gUGllY2hhcnRzIGFuaW1hdGlvblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuJChcIi5waWVjaGFydCAucGllY2hhcnRfX2ZpbGxcIikuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgdmFyIHBpZSA9ICQodGhpcyk7XHJcbiAgICBwaWUud2F5cG9pbnQoZnVuY3Rpb24oZGlyKSB7XHJcbiAgICAgICAgICAgIGlmIChkaXIgPT09IFwiZG93blwiKSB7XHJcbiAgICAgICAgICAgICAgICBwaWUuY3NzKHtzdHJva2VEYXNob2Zmc2V0OnBpZS5kYXRhKFwicGVyY2VudGFnZVwiKX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG9mZnNldDogXCI1MDAlXCJcclxuICAgICAgICB9KTtcclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBTbGlkZXJcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgY29udHJvbFByZXYgPSAkKCcubmF2X19wcmV2IC5saW5rJyksXHJcbiAgICAgICAgY29udHJvbE5leHQgPSAkKCcubmF2X19uZXh0IC5saW5rJyk7XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIHNldEFjdGl2ZVNsaWRlcygpIHtcclxuICAgICAgICB2YXIgaW1nQWN0aXZlID0gJCgnLmltZ19fY29udGFpbmVyIC5pbWFnZS5hY3RpdmUnKSxcclxuICAgICAgICAgICAgaW1nQWN0aXZlSW5kZXggPSBpbWdBY3RpdmUuaW5kZXgoKSxcclxuICAgICAgICAgICAgcHJldlRodW1iID0gJCgnLm5hdl9fcHJldiAuc2xpZGVyX19pdGVtJyksXHJcbiAgICAgICAgICAgIG5leHRUaHVtYiA9ICQoJy5uYXZfX25leHQgLnNsaWRlcl9faXRlbScpLFxyXG4gICAgICAgICAgICBkZXNjciA9ICQoJy5kZXNjcl9fY29udGFpbmVyJyk7XHJcblxyXG4gICAgICAgIHByZXZUaHVtYi5yZW1vdmVDbGFzcygnbW92ZWRvd24nKTtcclxuICAgICAgICBuZXh0VGh1bWIucmVtb3ZlQ2xhc3MoJ21vdmV1cCcpO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKGltZ0FjdGl2ZS5uZXh0KCkubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgbmV4dFRodW1iLmZpcnN0KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaW1nQWN0aXZlLm5leHQoKS5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICBuZXh0VGh1bWIuZXEoaW1nQWN0aXZlSW5kZXggKyAxKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaW1nQWN0aXZlLnByZXYoKS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICBwcmV2VGh1bWIubGFzdCgpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGltZ0FjdGl2ZS5wcmV2KCkubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgcHJldlRodW1iLmVxKGltZ0FjdGl2ZUluZGV4IC0gMSkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRlc2NyLm5leHQoKS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICBkZXNjci5maXJzdCgpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRlc2NyLm5leHQoKS5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICBkZXNjci5lcShpbWdBY3RpdmVJbmRleCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRBY3RpdmVTbGlkZXMoKTtcclxuXHJcbiAgICBjb250cm9sUHJldi5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGltZyA9ICQoJy5pbWdfX2NvbnRhaW5lciAuaW1hZ2UnKSxcclxuICAgICAgICAgICAgaW1nQWN0aXZlID0gJCgnLmltZ19fY29udGFpbmVyIC5pbWFnZS5hY3RpdmUnKSxcclxuICAgICAgICAgICAgbmF2UHJldkFjdGl2ZSA9ICQoJy5uYXZfX3ByZXYgLnNsaWRlcl9faXRlbS5hY3RpdmUnKSxcclxuICAgICAgICAgICAgbmF2TmV4dEFjdGl2ZSA9ICQoJy5uYXZfX25leHQgLnNsaWRlcl9faXRlbS5hY3RpdmUnKSxcclxuICAgICAgICAgICAgZGVzY3IgPSAkKCcuZGVzY3JfX2NvbnRhaW5lcicpO1xyXG5cclxuICAgICAgICAkKCcubGluaycpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcblxyXG4gICAgICAgIGltZ0FjdGl2ZS5yZW1vdmVDbGFzcygnYWN0aXZlJykucHJldigpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBkZXNjci5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgaWYgKGltZ0FjdGl2ZS5wcmV2KCkubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgaW1nLmxhc3QoKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRBY3RpdmVTbGlkZXMoKTtcclxuICAgICAgICBuYXZQcmV2QWN0aXZlLmFkZENsYXNzKCdtb3ZlZG93bicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBuYXZOZXh0QWN0aXZlLmFkZENsYXNzKCdtb3ZldXAnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJy5saW5rJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgJCgnLnNsaWRlcl9faXRlbScpLnJlbW92ZUNsYXNzKCdtb3ZldXAgbW92ZWRvd24nKTtcclxuICAgICAgICB9LCA3MDApXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb250cm9sTmV4dC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGltZyA9ICQoJy5pbWdfX2NvbnRhaW5lciAuaW1hZ2UnKSxcclxuICAgICAgICAgICAgaW1nQWN0aXZlID0gJCgnLmltZ19fY29udGFpbmVyIC5pbWFnZS5hY3RpdmUnKSxcclxuICAgICAgICAgICAgbmF2UHJldkFjdGl2ZSA9ICQoJy5uYXZfX3ByZXYgLnNsaWRlcl9faXRlbS5hY3RpdmUnKSxcclxuICAgICAgICAgICAgbmF2TmV4dEFjdGl2ZSA9ICQoJy5uYXZfX25leHQgLnNsaWRlcl9faXRlbS5hY3RpdmUnKSxcclxuICAgICAgICAgICAgZGVzY3IgPSAkKCcuZGVzY3JfX2NvbnRhaW5lcicpO1xyXG5cclxuICAgICAgICAkKCcubGluaycpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcblxyXG4gICAgICAgIGltZ0FjdGl2ZS5yZW1vdmVDbGFzcygnYWN0aXZlJykubmV4dCgpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBkZXNjci5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgaWYgKGltZ0FjdGl2ZS5uZXh0KCkubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgaW1nLmZpcnN0KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0QWN0aXZlU2xpZGVzKCk7XHJcbiAgICAgICAgbmF2UHJldkFjdGl2ZS5hZGRDbGFzcygnbW92ZWRvd24nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgbmF2TmV4dEFjdGl2ZS5hZGRDbGFzcygnbW92ZXVwJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnLmxpbmsnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICAkKCcuc2xpZGVyX19pdGVtJykucmVtb3ZlQ2xhc3MoJ21vdmV1cCBtb3ZlZG93bicpO1xyXG4gICAgICAgIH0sIDcwMClcclxuICAgIH0pO1xyXG59KTtcclxuXHJcblxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKi9cclxuLyoqKioqIHByZWxvYWRlciAqKioqKi9cclxuLyoqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbnZhciBwcmVsb2FkZXJfc3RhdCA9ICQoXCIjcHJlbG9hZGVyLXN2Z19fcGVyY2VudGFnZVwiKSxcclxuICAgIGhhc0ltYWdlUHJvcGVydGllcyA9IFtcImJhY2tncm91bmRcIiwgXCJiYWNrZ3JvdW5kSW1hZ2VcIiwgXCJsaXN0U3R5bGVJbWFnZVwiLCBcImJvcmRlckltYWdlXCIsIFwiYm9yZGVyQ29ybmVySW1hZ2VcIiwgXCJjdXJzb3JcIl0sXHJcbiAgICBoYXNJbWFnZUF0dHJpYnV0ZXMgPSBbXCJzcmNzZXRcIl0sXHJcbiAgICBtYXRjaF91cmwgPSAvdXJsXFwoXFxzKihbJ1wiXT8pKC4qPylcXDFcXHMqXFwpL2csXHJcbiAgICBhbGxfaW1hZ2VzID0gW10sXHJcbiAgICB0b3RhbCA9IDAsXHJcbiAgICBjb3VudCA9IDA7XHJcblxyXG52YXIgY2lyY2xlX28gPSAkKFwiI3ByZWxvYWRlci1zdmdfX2ltZyAuYmFyX19vdXRlclwiKSxcclxuICAgIGNpcmNsZV9jID0gJChcIiNwcmVsb2FkZXItc3ZnX19pbWcgLmJhcl9fY2VudGVyXCIpLFxyXG4gICAgY2lyY2xlX2kgPSAkKFwiI3ByZWxvYWRlci1zdmdfX2ltZyAuYmFyX19pbm5lclwiKSxcclxuICAgIGxlbmd0aF9vID0gTWF0aC5QSSooY2lyY2xlX28uYXR0cihcInJcIikgKiAyKSxcclxuICAgIGxlbmd0aF9jID0gTWF0aC5QSSooY2lyY2xlX2MuYXR0cihcInJcIikgKiAyKSxcclxuICAgIGxlbmd0aF9pID0gTWF0aC5QSSooY2lyY2xlX2kuYXR0cihcInJcIikgKiAyKTtcclxuXHJcblxyXG5cclxuZnVuY3Rpb24gcHJlbG9hZGVyKCkge1xyXG5cclxuICAgIGZ1bmN0aW9uIGltZ19sb2FkZWQoKXtcclxuICAgICAgICB2YXIgcGVyY2VudGFnZSA9IE1hdGguY2VpbCggKGNvdW50KzEpIC8gdG90YWwgKiAxMDAgKTtcclxuXHJcbiAgICAgICAgY291bnQgKz0gMTtcclxuICAgICAgICBwZXJjZW50YWdlID0gcGVyY2VudGFnZSA+IDEwMCA/IDEwMCA6IHBlcmNlbnRhZ2U7XHJcblxyXG4gICAgICAgIC8vIERyYXcgb2Zmc2V0c1xyXG4gICAgICAgIC8vIDFzdCBjaXJjbGVcclxuICAgICAgICBjaXJjbGVfby5jc3Moe3N0cm9rZURhc2hvZmZzZXQ6ICgoMTAwLXBlcmNlbnRhZ2UpLzEwMCkqbGVuZ3RoX28gfSk7XHJcblxyXG4gICAgICAgIC8vIHdoZW4gdG8gc3RhcnQgMm5kIGNpcmNsZVxyXG4gICAgICAgIGlmKHBlcmNlbnRhZ2UgPiA1MCkge1xyXG4gICAgICAgICAgICBjaXJjbGVfYy5jc3Moe3N0cm9rZURhc2hvZmZzZXQ6ICgoMTAwLXBlcmNlbnRhZ2UpLzEwMCkqbGVuZ3RoX2MgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB3aGVuIHRvIHN0YXJ0IDNyZCBjaXJjbGVcclxuICAgICAgICBpZihwZXJjZW50YWdlID09IDEwMCkge1xyXG4gICAgICAgICAgICBjaXJjbGVfaS5jc3Moe3N0cm9rZURhc2hvZmZzZXQ6ICgoMTAwLXBlcmNlbnRhZ2UpLzEwMCkqbGVuZ3RoX2kgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcmVsb2FkZXJfc3RhdC5odG1sKHBlcmNlbnRhZ2UpO1xyXG5cclxuICAgICAgICBpZihjb3VudCA9PT0gdG90YWwpe1xyXG4gICAgICAgICAgICByZXR1cm4gZG9uZV9sb2FkaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRvbmVfbG9hZGluZygpe1xyXG4gICAgICAgIHByZWxvYWRlcl9zdGF0LmNzcyh7XCJhbmltYXRpb25cIjpcIm5vbmVcIn0pO1xyXG4gICAgICAgICQoXCIjcHJlbG9hZGVyXCIpLmRlbGF5KDcwMCkuZmFkZU91dCg3MDAsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoXCIjcHJlbG9hZGVyX19wcm9ncmVzc1wiKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKCQoXCIuZmxpcC1jYXJkXCIpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmZsaXAtY2FyZFwiKS5hZGRDbGFzcyhcImxvYWRlZFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGltYWdlc19sb29wICh0b3RhbCkge1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICBcdHZhciB0ZXN0X2ltYWdlID0gbmV3IEltYWdlKCk7XHJcblxyXG4gICAgICBcdHRlc3RfaW1hZ2Uub25sb2FkID0gaW1nX2xvYWRlZDtcclxuICAgICAgICBcdHRlc3RfaW1hZ2Uub25lcnJvciA9IGltZ19sb2FkZWQ7XHJcblxyXG4gICAgIFx0Y29uc29sZS5sb2coXCJDb3VudDogXCIgKyBjb3VudCArIFwiIFRvdGFsOiBcIiArIHRvdGFsKTtcclxuXHJcbiAgICAgIFx0aWYgKGNvdW50IDwgdG90YWwpIHtcclxuICAgICAgIFx0XHRpZiAoYWxsX2ltYWdlc1tjb3VudF0uc3Jjc2V0KSB7XHJcbiAgICAgIFx0XHRcdHRlc3RfaW1hZ2Uuc3Jjc2V0ID0gYWxsX2ltYWdlc1tjb3VudF0uc3Jjc2V0O1xyXG4gICAgICBcdFx0fVxyXG4gICAgIFx0dGVzdF9pbWFnZS5zcmMgPSBhbGxfaW1hZ2VzW2NvdW50XS5zcmM7XHJcblxyXG4gICAgICAgXHRcdGltYWdlc19sb29wKHRvdGFsKTtcclxuICAgICAgXHR9XHJcbiAgICAgICB9LCAxMCk7XHJcblxyXG4gICAgICAgIC8vIEZPUiB2ZXJzaW9uXHJcbiAgICAgICAgZm9yKHZhciBpPTA7IGk8dG90YWw7IGkrKyl7XHJcbiAgICAgICAgICAgIHZhciB0ZXN0X2ltYWdlID0gbmV3IEltYWdlKCk7XHJcblxyXG5cclxuICAgICAgICAgICAgdGVzdF9pbWFnZS5vbmxvYWQgPSBpbWdfbG9hZGVkO1xyXG4gICAgICAgICAgICB0ZXN0X2ltYWdlLm9uZXJyb3IgPSBpbWdfbG9hZGVkO1xyXG5cclxuICAgICAgICAgICAgaWYgKGFsbF9pbWFnZXNbaV0uc3Jjc2V0KSB7XHJcbiAgICAgICAgICAgICAgICB0ZXN0X2ltYWdlLnNyY3NldCA9IGFsbF9pbWFnZXNbaV0uc3Jjc2V0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0ZXN0X2ltYWdlLnNyYyA9IGFsbF9pbWFnZXNbaV0uc3JjO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBHZXQgYWxsIGltYWdlc1xyXG4gICAgJChcIipcIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSAkKHRoaXMpO1xyXG5cclxuICAgICAgICBpZiAoZWxlbWVudC5pcyhcImltZ1wiKSAmJiBlbGVtZW50LmF0dHIoXCJzcmNcIikpIHtcclxuICAgICAgICAgICAgYWxsX2ltYWdlcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHNyYzogZWxlbWVudC5hdHRyKFwic3JjXCIpLFxyXG4gICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudFswXVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQuZWFjaChoYXNJbWFnZVByb3BlcnRpZXMsIGZ1bmN0aW9uIChpLCBwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICB2YXIgcHJvcGVydHlWYWx1ZSA9IGVsZW1lbnQuY3NzKHByb3BlcnR5KTtcclxuICAgICAgICAgICAgdmFyIG1hdGNoO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFwcm9wZXJ0eVZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbWF0Y2ggPSBtYXRjaF91cmwuZXhlYyhwcm9wZXJ0eVZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgYWxsX2ltYWdlcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBzcmM6IG1hdGNoWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnRbMF1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQuZWFjaChoYXNJbWFnZUF0dHJpYnV0ZXMsIGZ1bmN0aW9uIChpLCBhdHRyaWJ1dGUpIHtcclxuICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZVZhbHVlID0gZWxlbWVudC5hdHRyKGF0dHJpYnV0ZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWF0dHJpYnV0ZVZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYWxsX2ltYWdlcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHNyYzogZWxlbWVudC5hdHRyKFwic3JjXCIpLFxyXG4gICAgICAgICAgICAgICAgc3Jjc2V0OiBlbGVtZW50LmF0dHIoXCJzcmNzZXRcIiksXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50WzBdXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdG90YWwgPSBhbGxfaW1hZ2VzLmxlbmd0aDtcclxuXHJcbiAgICAvLyBTdGFydCBwcmVsb2FkZXIgb3IgZXhpdFxyXG4gICAgaWYgKHRvdGFsID09PSAwKSB7XHJcbiAgICAgICAgZG9uZV9sb2FkaW5nKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGltYWdlc19sb29wKHRvdGFsKTtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5wcmVsb2FkZXIoKTsiLCJ2YXIgbWFwO1xyXG5mdW5jdGlvbiBpbml0TWFwKCkge1xyXG4gICAgdmFyIHN0eWxlcyA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZVwiLFxyXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuZmlsbFwiLFxyXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNDQ0NDQ0XCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlXCIsXHJcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2YyZjJmMlwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaVwiLFxyXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLFxyXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJzYXR1cmF0aW9uXCI6IC0xMDBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogNDVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXHJcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5hcnRlcmlhbFwiLFxyXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLmljb25cIixcclxuICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ0cmFuc2l0XCIsXHJcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxyXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM2MWRhYzlcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwic2F0dXJhdGlvblwiOiBcIjBcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgXTtcclxuICAgIHZhciBzdHlsZWRNYXAgPSBuZXcgZ29vZ2xlLm1hcHMuU3R5bGVkTWFwVHlwZShzdHlsZXMsXHJcbiAgICAgICAge25hbWU6IFwiU3R5bGVkIE1hcFwifSk7XHJcblxyXG5cclxuXHJcblxyXG4gICAgdmFyIG1hcE9wdGlvbnMgPSB7XHJcbiAgICAgICAgem9vbTogMTMsXHJcbiAgICAgICAgY2VudGVyOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDQ5LjQzMTE1NTksMzEuOTc4NjY1MSksXHJcbiAgICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxyXG4gICAgICAgIG5hdmlnYXRpb25Db250cm9sOiBmYWxzZSxcclxuICAgICAgICBtYXBUeXBlQ29udHJvbDogZmFsc2UsXHJcbiAgICAgICAgc2NhbGVDb250cm9sOiBmYWxzZSxcclxuICAgICAgICBkcmFnZ2FibGU6IHRydWUsXHJcbiAgICAgICAgZGlzYWJsZURlZmF1bHRVSTogdHJ1ZVxyXG5cclxuICAgIH07XHJcbiAgICB2YXIgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyksbWFwT3B0aW9ucyk7XHJcbiAgICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgcG9zaXRpb246IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoNDkuNDMxMTU1OSwzMS45Nzg2NjUxKSxcclxuICAgICAgICBtYXA6IG1hcCxcclxuICAgICAgICBpY29uOiAnL2Fzc2V0cy9pbWcvbWFwX21hcmtlci5zdmcnXHJcbiAgICB9KTtcclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
