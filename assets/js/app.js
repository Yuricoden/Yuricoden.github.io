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
// Scroll animation on waypoints
// ==============================
$.fn.animated = function(inEffect) {
    $(this).each(function() {
        var ths = $(this);
        ths.css({opacity:0})
            .addClass("animated")
            .waypoint(function(dir) {
                    if (dir === "down") {
                        ths.addClass(inEffect).css({opacity:1});
                    }
                },
                {
                    offset: "90%"
                });
    });
};

// ==============================
// Piecharts animation
// ==============================
$.fn.animatePies = function() {
    $(this).each(function(){
        var pie = $(this),
            pie_dasharray = 314.159265,
            pie_offset = ((100-pie.data("percentage"))/100)*pie_dasharray;

        pie.waypoint(function(dir) {
                if (dir === "down") {
                    pie.css({strokeDashoffset:pie_offset});
                }
            },
            {
                offset: "90%"
            });
    });
}
$(".about-me__skills>div").animated("fadeInUp");
$(".about-me__bio>div").animated("fadeInLeft");
$(".map__contacts").animated("fadeInDown");
$("#map").animated("zoomInDown");
$(".portfolio__nav").animated("flipInY");
$(".portfolio__img").animated("fadeInLeft");
$(".piechart .piechart__fill").animatePies();
$(".descr__container").animated("flipInY");



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

// ==============================
// Contact form blur based on js
// ==============================
function set_bg(){
    var section = $(".talks"),
        form = section.find(".contact-form"),
        form_bg = form.find(".contact-form__bg"),
        bg_offset = section.offset().top - form_bg.offset().top;

    form_bg.css({
        "background-position" : "center " + bg_offset + "px"
    });

    // Upscale "testimonials" section background to fit its container
    if( $(window).width() > window.hm.resizeLimit){
        $(".talks, .contact-form__bg").css("background-size", $(window).width() + "px");
    }
}

if($(".talks").length){
    $(window).on("load", function() {
        set_bg();
    });

    $(window).resize(function() {
        set_bg();
    });
}

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
// Poppup
// ==============================

$(".contact-form").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        submitMSG(false, "Did you fill in the form properly?");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});


function submitForm(){
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();

    $.ajax({
        type: "POST",
        url: "form-process.php",
        data: "name=" + name + "&email=" + email + "&message=" + message,
        success : function(text){
            if (text == "success"){
                formSuccess();
            } else {
                submitMSG(false,text);
            }
        }
    });
}

function formSuccess(){
    $(".contact-form")[0].reset();
    submitMSG(true, "Message Submitted!");
}


function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $('#formModal').fadeIn();
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}
$(window).on('click',function () {
    $('#formModal').fadeOut();
});


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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImdvb2dsZV9tYXBzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL2tCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBUb2dnbGUgbWVudVxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuKGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgY29uc29sZS5sb2coKCcudG9nZ2xlLW1lbnUnKSlcclxuICAgICQoJy50b2dnbGUtbWVudScpLm9uICgnY2xpY2sgdG91Y2hzdGFydCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICAkKCcuc2FuZHcnKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XHJcblxyXG5cclxuXHJcbiAgICBpZighJHRoaXMuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgJCgnLm1lbnUtc2NyZWVuJykuc2hvdygpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzaG93TWVudUl0ZW1zKHRydWUpO30sIDUwMCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGVsc2Uge1xyXG4gICAgICAgICQoJy5tZW51LXNjcmVlbicpLmZhZGVPdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgc2hvd01lbnVJdGVtcyhmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAkdGhpcy50b2dnbGVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBzaG93TWVudUl0ZW1zKHNob3cpIHtcclxuICAgICAgICB2YXJcclxuICAgICAgICAgICAgaXRlbXMgPSAkKCcubWVudS1zY3JlZW5fbGluaycpLFxyXG4gICAgICAgICAgICBkZWxheSA9IDEwMCxcclxuICAgICAgICAgICAgY291bnRlciA9IDAsXHJcbiAgICAgICAgICAgIHRpbWVyO1xyXG5cclxuICAgICBmdW5jdGlvbiBlYWNoKCkge1xyXG4gICAgICAgICB2YXIgJHRoaXMgPSBpdGVtcy5lcShjb3VudGVyKTtcclxuXHJcbiAgICAgICAgICR0aGlzLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgIGlmICh0eXBlb2YgdGltZXIgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICBpZiAoJHRoaXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoZWFjaCwgZGVsYXkpO1xyXG4gICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgY291bnRlcisrO1xyXG4gICAgIH1cclxuICAgICAgICAgaWYgKHNob3cpIHtcclxuICAgICAgICAgICAgIGVhY2goKTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgIGl0ZW1zLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7XHJcblxyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEF1dGhvcml6YXRpb24gW0NsaWNrXVxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblxyXG4kKHdpbmRvdykubG9hZChmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCcjY2FyZCcpLmFkZENsYXNzKCdsb2FkZWQnKVxyXG59KTtcclxuJChmdW5jdGlvbiAoKSB7XHJcbiAgICAkKFwiLmF1dGhcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICQoXCIjY2FyZFwiKS5hZGRDbGFzcyhcImZsaXBwZWRcIik7XHJcbiAgICAgICAgJChcIi5hdXRoXCIpLmFkZENsYXNzKFwiY2xpY2tlZFwiKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICB9KTtcclxuICAgICQoXCIjbWFpblwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgJChcIiNjYXJkXCIpLnJlbW92ZUNsYXNzKFwiZmxpcHBlZFwiKTtcclxuICAgICAgICAkKFwiLmF1dGhcIikucmVtb3ZlQ2xhc3MoXCJjbGlja2VkXCIpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgIH0pO1xyXG4gICAgJCgnLndlbC1jb250YWluZXInKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLnBhcmVudHMoXCIjY2FyZFwiKS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAkKFwiI2NhcmRcIikucmVtb3ZlQ2xhc3MoXCJmbGlwcGVkXCIpO1xyXG4gICAgICAgICAgICAkKFwiLmF1dGhcIikucmVtb3ZlQ2xhc3MoXCJjbGlja2VkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoJChlLnRhcmdldCkucGFyZW50cyhcIi5ibG9nbGVmdFwiKS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAkKFwiLmJsb2dsZWZ0XCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gU2Nyb2xsIGFuaW1hdGlvbiBvbiB3YXlwb2ludHNcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiQuZm4uYW5pbWF0ZWQgPSBmdW5jdGlvbihpbkVmZmVjdCkge1xyXG4gICAgJCh0aGlzKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciB0aHMgPSAkKHRoaXMpO1xyXG4gICAgICAgIHRocy5jc3Moe29wYWNpdHk6MH0pXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcyhcImFuaW1hdGVkXCIpXHJcbiAgICAgICAgICAgIC53YXlwb2ludChmdW5jdGlvbihkaXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlyID09PSBcImRvd25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHMuYWRkQ2xhc3MoaW5FZmZlY3QpLmNzcyh7b3BhY2l0eToxfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXQ6IFwiOTAlXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gUGllY2hhcnRzIGFuaW1hdGlvblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuJC5mbi5hbmltYXRlUGllcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJCh0aGlzKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHBpZSA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIHBpZV9kYXNoYXJyYXkgPSAzMTQuMTU5MjY1LFxyXG4gICAgICAgICAgICBwaWVfb2Zmc2V0ID0gKCgxMDAtcGllLmRhdGEoXCJwZXJjZW50YWdlXCIpKS8xMDApKnBpZV9kYXNoYXJyYXk7XHJcblxyXG4gICAgICAgIHBpZS53YXlwb2ludChmdW5jdGlvbihkaXIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkaXIgPT09IFwiZG93blwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGllLmNzcyh7c3Ryb2tlRGFzaG9mZnNldDpwaWVfb2Zmc2V0fSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9mZnNldDogXCI5MCVcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcbiQoXCIuYWJvdXQtbWVfX3NraWxscz5kaXZcIikuYW5pbWF0ZWQoXCJmYWRlSW5VcFwiKTtcclxuJChcIi5hYm91dC1tZV9fYmlvPmRpdlwiKS5hbmltYXRlZChcImZhZGVJbkxlZnRcIik7XHJcbiQoXCIubWFwX19jb250YWN0c1wiKS5hbmltYXRlZChcImZhZGVJbkRvd25cIik7XHJcbiQoXCIjbWFwXCIpLmFuaW1hdGVkKFwiem9vbUluRG93blwiKTtcclxuJChcIi5wb3J0Zm9saW9fX25hdlwiKS5hbmltYXRlZChcImZsaXBJbllcIik7XHJcbiQoXCIucG9ydGZvbGlvX19pbWdcIikuYW5pbWF0ZWQoXCJmYWRlSW5MZWZ0XCIpO1xyXG4kKFwiLnBpZWNoYXJ0IC5waWVjaGFydF9fZmlsbFwiKS5hbmltYXRlUGllcygpO1xyXG4kKFwiLmRlc2NyX19jb250YWluZXJcIikuYW5pbWF0ZWQoXCJmbGlwSW5ZXCIpO1xyXG5cclxuXHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gU2xpZGVyXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGNvbnRyb2xQcmV2ID0gJCgnLm5hdl9fcHJldiAubGluaycpLFxyXG4gICAgICAgIGNvbnRyb2xOZXh0ID0gJCgnLm5hdl9fbmV4dCAubGluaycpO1xyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRBY3RpdmVTbGlkZXMoKSB7XHJcbiAgICAgICAgdmFyIGltZ0FjdGl2ZSA9ICQoJy5pbWdfX2NvbnRhaW5lciAuaW1hZ2UuYWN0aXZlJyksXHJcbiAgICAgICAgICAgIGltZ0FjdGl2ZUluZGV4ID0gaW1nQWN0aXZlLmluZGV4KCksXHJcbiAgICAgICAgICAgIHByZXZUaHVtYiA9ICQoJy5uYXZfX3ByZXYgLnNsaWRlcl9faXRlbScpLFxyXG4gICAgICAgICAgICBuZXh0VGh1bWIgPSAkKCcubmF2X19uZXh0IC5zbGlkZXJfX2l0ZW0nKSxcclxuICAgICAgICAgICAgZGVzY3IgPSAkKCcuZGVzY3JfX2NvbnRhaW5lcicpO1xyXG5cclxuICAgICAgICBwcmV2VGh1bWIucmVtb3ZlQ2xhc3MoJ21vdmVkb3duJyk7XHJcbiAgICAgICAgbmV4dFRodW1iLnJlbW92ZUNsYXNzKCdtb3ZldXAnKTtcclxuXHJcblxyXG4gICAgICAgIGlmIChpbWdBY3RpdmUubmV4dCgpLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIG5leHRUaHVtYi5maXJzdCgpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGltZ0FjdGl2ZS5uZXh0KCkubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgbmV4dFRodW1iLmVxKGltZ0FjdGl2ZUluZGV4ICsgMSkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGltZ0FjdGl2ZS5wcmV2KCkubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgcHJldlRodW1iLmxhc3QoKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpbWdBY3RpdmUucHJldigpLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgIHByZXZUaHVtYi5lcShpbWdBY3RpdmVJbmRleCAtIDEpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkZXNjci5uZXh0KCkubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgZGVzY3IuZmlyc3QoKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkZXNjci5uZXh0KCkubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgZGVzY3IuZXEoaW1nQWN0aXZlSW5kZXgpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QWN0aXZlU2xpZGVzKCk7XHJcblxyXG4gICAgY29udHJvbFByZXYub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBpbWcgPSAkKCcuaW1nX19jb250YWluZXIgLmltYWdlJyksXHJcbiAgICAgICAgICAgIGltZ0FjdGl2ZSA9ICQoJy5pbWdfX2NvbnRhaW5lciAuaW1hZ2UuYWN0aXZlJyksXHJcbiAgICAgICAgICAgIG5hdlByZXZBY3RpdmUgPSAkKCcubmF2X19wcmV2IC5zbGlkZXJfX2l0ZW0uYWN0aXZlJyksXHJcbiAgICAgICAgICAgIG5hdk5leHRBY3RpdmUgPSAkKCcubmF2X19uZXh0IC5zbGlkZXJfX2l0ZW0uYWN0aXZlJyksXHJcbiAgICAgICAgICAgIGRlc2NyID0gJCgnLmRlc2NyX19jb250YWluZXInKTtcclxuXHJcbiAgICAgICAgJCgnLmxpbmsnKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG5cclxuICAgICAgICBpbWdBY3RpdmUucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLnByZXYoKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgZGVzY3IucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGlmIChpbWdBY3RpdmUucHJldigpLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGltZy5sYXN0KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0QWN0aXZlU2xpZGVzKCk7XHJcbiAgICAgICAgbmF2UHJldkFjdGl2ZS5hZGRDbGFzcygnbW92ZWRvd24nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgbmF2TmV4dEFjdGl2ZS5hZGRDbGFzcygnbW92ZXVwJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCcubGluaycpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgICQoJy5zbGlkZXJfX2l0ZW0nKS5yZW1vdmVDbGFzcygnbW92ZXVwIG1vdmVkb3duJyk7XHJcbiAgICAgICAgfSwgNzAwKVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29udHJvbE5leHQub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBpbWcgPSAkKCcuaW1nX19jb250YWluZXIgLmltYWdlJyksXHJcbiAgICAgICAgICAgIGltZ0FjdGl2ZSA9ICQoJy5pbWdfX2NvbnRhaW5lciAuaW1hZ2UuYWN0aXZlJyksXHJcbiAgICAgICAgICAgIG5hdlByZXZBY3RpdmUgPSAkKCcubmF2X19wcmV2IC5zbGlkZXJfX2l0ZW0uYWN0aXZlJyksXHJcbiAgICAgICAgICAgIG5hdk5leHRBY3RpdmUgPSAkKCcubmF2X19uZXh0IC5zbGlkZXJfX2l0ZW0uYWN0aXZlJyksXHJcbiAgICAgICAgICAgIGRlc2NyID0gJCgnLmRlc2NyX19jb250YWluZXInKTtcclxuXHJcbiAgICAgICAgJCgnLmxpbmsnKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG5cclxuICAgICAgICBpbWdBY3RpdmUucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLm5leHQoKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgZGVzY3IucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGlmIChpbWdBY3RpdmUubmV4dCgpLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGltZy5maXJzdCgpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldEFjdGl2ZVNsaWRlcygpO1xyXG4gICAgICAgIG5hdlByZXZBY3RpdmUuYWRkQ2xhc3MoJ21vdmVkb3duJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIG5hdk5leHRBY3RpdmUuYWRkQ2xhc3MoJ21vdmV1cCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJy5saW5rJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgJCgnLnNsaWRlcl9faXRlbScpLnJlbW92ZUNsYXNzKCdtb3ZldXAgbW92ZWRvd24nKTtcclxuICAgICAgICB9LCA3MDApXHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKiovXHJcbi8qKioqKiBwcmVsb2FkZXIgKioqKiovXHJcbi8qKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG52YXIgcHJlbG9hZGVyX3N0YXQgPSAkKFwiI3ByZWxvYWRlci1zdmdfX3BlcmNlbnRhZ2VcIiksXHJcbiAgICBoYXNJbWFnZVByb3BlcnRpZXMgPSBbXCJiYWNrZ3JvdW5kXCIsIFwiYmFja2dyb3VuZEltYWdlXCIsIFwibGlzdFN0eWxlSW1hZ2VcIiwgXCJib3JkZXJJbWFnZVwiLCBcImJvcmRlckNvcm5lckltYWdlXCIsIFwiY3Vyc29yXCJdLFxyXG4gICAgaGFzSW1hZ2VBdHRyaWJ1dGVzID0gW1wic3Jjc2V0XCJdLFxyXG4gICAgbWF0Y2hfdXJsID0gL3VybFxcKFxccyooWydcIl0/KSguKj8pXFwxXFxzKlxcKS9nLFxyXG4gICAgYWxsX2ltYWdlcyA9IFtdLFxyXG4gICAgdG90YWwgPSAwLFxyXG4gICAgY291bnQgPSAwO1xyXG5cclxudmFyIGNpcmNsZV9vID0gJChcIiNwcmVsb2FkZXItc3ZnX19pbWcgLmJhcl9fb3V0ZXJcIiksXHJcbiAgICBjaXJjbGVfYyA9ICQoXCIjcHJlbG9hZGVyLXN2Z19faW1nIC5iYXJfX2NlbnRlclwiKSxcclxuICAgIGNpcmNsZV9pID0gJChcIiNwcmVsb2FkZXItc3ZnX19pbWcgLmJhcl9faW5uZXJcIiksXHJcbiAgICBsZW5ndGhfbyA9IE1hdGguUEkqKGNpcmNsZV9vLmF0dHIoXCJyXCIpICogMiksXHJcbiAgICBsZW5ndGhfYyA9IE1hdGguUEkqKGNpcmNsZV9jLmF0dHIoXCJyXCIpICogMiksXHJcbiAgICBsZW5ndGhfaSA9IE1hdGguUEkqKGNpcmNsZV9pLmF0dHIoXCJyXCIpICogMik7XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIHByZWxvYWRlcigpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBpbWdfbG9hZGVkKCl7XHJcbiAgICAgICAgdmFyIHBlcmNlbnRhZ2UgPSBNYXRoLmNlaWwoIChjb3VudCsxKSAvIHRvdGFsICogMTAwICk7XHJcblxyXG4gICAgICAgIGNvdW50ICs9IDE7XHJcbiAgICAgICAgcGVyY2VudGFnZSA9IHBlcmNlbnRhZ2UgPiAxMDAgPyAxMDAgOiBwZXJjZW50YWdlO1xyXG5cclxuICAgICAgICAvLyBEcmF3IG9mZnNldHNcclxuICAgICAgICAvLyAxc3QgY2lyY2xlXHJcbiAgICAgICAgY2lyY2xlX28uY3NzKHtzdHJva2VEYXNob2Zmc2V0OiAoKDEwMC1wZXJjZW50YWdlKS8xMDApKmxlbmd0aF9vIH0pO1xyXG5cclxuICAgICAgICAvLyB3aGVuIHRvIHN0YXJ0IDJuZCBjaXJjbGVcclxuICAgICAgICBpZihwZXJjZW50YWdlID4gNTApIHtcclxuICAgICAgICAgICAgY2lyY2xlX2MuY3NzKHtzdHJva2VEYXNob2Zmc2V0OiAoKDEwMC1wZXJjZW50YWdlKS8xMDApKmxlbmd0aF9jIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gd2hlbiB0byBzdGFydCAzcmQgY2lyY2xlXHJcbiAgICAgICAgaWYocGVyY2VudGFnZSA9PSAxMDApIHtcclxuICAgICAgICAgICAgY2lyY2xlX2kuY3NzKHtzdHJva2VEYXNob2Zmc2V0OiAoKDEwMC1wZXJjZW50YWdlKS8xMDApKmxlbmd0aF9pIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJlbG9hZGVyX3N0YXQuaHRtbChwZXJjZW50YWdlKTtcclxuXHJcbiAgICAgICAgaWYoY291bnQgPT09IHRvdGFsKXtcclxuICAgICAgICAgICAgcmV0dXJuIGRvbmVfbG9hZGluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkb25lX2xvYWRpbmcoKXtcclxuICAgICAgICBwcmVsb2FkZXJfc3RhdC5jc3Moe1wiYW5pbWF0aW9uXCI6XCJub25lXCJ9KTtcclxuICAgICAgICAkKFwiI3ByZWxvYWRlclwiKS5kZWxheSg3MDApLmZhZGVPdXQoNzAwLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKFwiI3ByZWxvYWRlcl9fcHJvZ3Jlc3NcIikucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICBpZigkKFwiLmZsaXAtY2FyZFwiKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgJChcIi5mbGlwLWNhcmRcIikuYWRkQ2xhc3MoXCJsb2FkZWRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbWFnZXNfbG9vcCAodG90YWwpIHtcclxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgXHR2YXIgdGVzdF9pbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG5cclxuICAgICAgXHR0ZXN0X2ltYWdlLm9ubG9hZCA9IGltZ19sb2FkZWQ7XHJcbiAgICAgICAgXHR0ZXN0X2ltYWdlLm9uZXJyb3IgPSBpbWdfbG9hZGVkO1xyXG5cclxuICAgICBcdGNvbnNvbGUubG9nKFwiQ291bnQ6IFwiICsgY291bnQgKyBcIiBUb3RhbDogXCIgKyB0b3RhbCk7XHJcblxyXG4gICAgICBcdGlmIChjb3VudCA8IHRvdGFsKSB7XHJcbiAgICAgICBcdFx0aWYgKGFsbF9pbWFnZXNbY291bnRdLnNyY3NldCkge1xyXG4gICAgICBcdFx0XHR0ZXN0X2ltYWdlLnNyY3NldCA9IGFsbF9pbWFnZXNbY291bnRdLnNyY3NldDtcclxuICAgICAgXHRcdH1cclxuICAgICBcdHRlc3RfaW1hZ2Uuc3JjID0gYWxsX2ltYWdlc1tjb3VudF0uc3JjO1xyXG5cclxuICAgICAgIFx0XHRpbWFnZXNfbG9vcCh0b3RhbCk7XHJcbiAgICAgIFx0fVxyXG4gICAgICAgfSwgMTApO1xyXG5cclxuICAgICAgICAvLyBGT1IgdmVyc2lvblxyXG4gICAgICAgIGZvcih2YXIgaT0wOyBpPHRvdGFsOyBpKyspe1xyXG4gICAgICAgICAgICB2YXIgdGVzdF9pbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRlc3RfaW1hZ2Uub25sb2FkID0gaW1nX2xvYWRlZDtcclxuICAgICAgICAgICAgdGVzdF9pbWFnZS5vbmVycm9yID0gaW1nX2xvYWRlZDtcclxuXHJcbiAgICAgICAgICAgIGlmIChhbGxfaW1hZ2VzW2ldLnNyY3NldCkge1xyXG4gICAgICAgICAgICAgICAgdGVzdF9pbWFnZS5zcmNzZXQgPSBhbGxfaW1hZ2VzW2ldLnNyY3NldDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGVzdF9pbWFnZS5zcmMgPSBhbGxfaW1hZ2VzW2ldLnNyYztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gR2V0IGFsbCBpbWFnZXNcclxuICAgICQoXCIqXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgaWYgKGVsZW1lbnQuaXMoXCJpbWdcIikgJiYgZWxlbWVudC5hdHRyKFwic3JjXCIpKSB7XHJcbiAgICAgICAgICAgIGFsbF9pbWFnZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBzcmM6IGVsZW1lbnQuYXR0cihcInNyY1wiKSxcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnRbMF1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkLmVhY2goaGFzSW1hZ2VQcm9wZXJ0aWVzLCBmdW5jdGlvbiAoaSwgcHJvcGVydHkpIHtcclxuICAgICAgICAgICAgdmFyIHByb3BlcnR5VmFsdWUgPSBlbGVtZW50LmNzcyhwcm9wZXJ0eSk7XHJcbiAgICAgICAgICAgIHZhciBtYXRjaDtcclxuXHJcbiAgICAgICAgICAgIGlmICghcHJvcGVydHlWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1hdGNoID0gbWF0Y2hfdXJsLmV4ZWMocHJvcGVydHlWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgIGFsbF9pbWFnZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgc3JjOiBtYXRjaFsyXSxcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50WzBdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkLmVhY2goaGFzSW1hZ2VBdHRyaWJ1dGVzLCBmdW5jdGlvbiAoaSwgYXR0cmlidXRlKSB7XHJcbiAgICAgICAgICAgIHZhciBhdHRyaWJ1dGVWYWx1ZSA9IGVsZW1lbnQuYXR0cihhdHRyaWJ1dGUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFhdHRyaWJ1dGVWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFsbF9pbWFnZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBzcmM6IGVsZW1lbnQuYXR0cihcInNyY1wiKSxcclxuICAgICAgICAgICAgICAgIHNyY3NldDogZWxlbWVudC5hdHRyKFwic3Jjc2V0XCIpLFxyXG4gICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudFswXVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRvdGFsID0gYWxsX2ltYWdlcy5sZW5ndGg7XHJcblxyXG4gICAgLy8gU3RhcnQgcHJlbG9hZGVyIG9yIGV4aXRcclxuICAgIGlmICh0b3RhbCA9PT0gMCkge1xyXG4gICAgICAgIGRvbmVfbG9hZGluZygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpbWFnZXNfbG9vcCh0b3RhbCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxucHJlbG9hZGVyKCk7XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gQ29udGFjdCBmb3JtIGJsdXIgYmFzZWQgb24ganNcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbmZ1bmN0aW9uIHNldF9iZygpe1xyXG4gICAgdmFyIHNlY3Rpb24gPSAkKFwiLnRhbGtzXCIpLFxyXG4gICAgICAgIGZvcm0gPSBzZWN0aW9uLmZpbmQoXCIuY29udGFjdC1mb3JtXCIpLFxyXG4gICAgICAgIGZvcm1fYmcgPSBmb3JtLmZpbmQoXCIuY29udGFjdC1mb3JtX19iZ1wiKSxcclxuICAgICAgICBiZ19vZmZzZXQgPSBzZWN0aW9uLm9mZnNldCgpLnRvcCAtIGZvcm1fYmcub2Zmc2V0KCkudG9wO1xyXG5cclxuICAgIGZvcm1fYmcuY3NzKHtcclxuICAgICAgICBcImJhY2tncm91bmQtcG9zaXRpb25cIiA6IFwiY2VudGVyIFwiICsgYmdfb2Zmc2V0ICsgXCJweFwiXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBVcHNjYWxlIFwidGVzdGltb25pYWxzXCIgc2VjdGlvbiBiYWNrZ3JvdW5kIHRvIGZpdCBpdHMgY29udGFpbmVyXHJcbiAgICBpZiggJCh3aW5kb3cpLndpZHRoKCkgPiB3aW5kb3cuaG0ucmVzaXplTGltaXQpe1xyXG4gICAgICAgICQoXCIudGFsa3MsIC5jb250YWN0LWZvcm1fX2JnXCIpLmNzcyhcImJhY2tncm91bmQtc2l6ZVwiLCAkKHdpbmRvdykud2lkdGgoKSArIFwicHhcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmlmKCQoXCIudGFsa3NcIikubGVuZ3RoKXtcclxuICAgICQod2luZG93KS5vbihcImxvYWRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc2V0X2JnKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNldF9iZygpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBCbG9nIEZpeGVkIGFuZCBQbGFzaGthIG1vYmlsZVxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcblxyXG52YXJcclxuICAgIG5hdmlnYXRpb24gPSAkKCcubmF2aWdhdGlvbi1ib3gnKSxcclxuICAgIGJhcl9zaWRlID0gJCgnLmJsb2ctbmF2aWdhdGlvbl9fbGlzdCcpLFxyXG4gICAgc2VjdGlvbnMgPSAkKCcuYXJ0aWNsZXNfX2l0ZW0nKSxcclxuICAgIHdpbmRvd01hcmdpbiA9IDUwO1xyXG5cclxudmFyIG1lbnVGaXhlZCA9ICc8ZGl2IGNsYXNzID0gXCJmaXhlZC1uYXZpZ2F0aW9uXCI+IFxcXHJcbiAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcyA9IFwiY29udGFpbmVyXCI+IFxcXHJcbiAgICA8ZGl2IGNsYXNzID0gXCJmaXhlZC1uYXZpZ2F0aW9uX2xlZnRcIj48L2Rpdj4gXFxcclxuICAgIDxkaXYgY2xhc3MgPSBcImZpeGVkLW5hdmlnYXRpb25fcmlnaHRcIj48L2Rpdj4gXFxcclxuICAgICAgICA8L2Rpdj4gXFxcclxuICAgICAgICA8L2Rpdj4nO1xyXG5cclxuXHJcbi8vIGZ1bmN0aW9uIGZpeGVkTWVudVxyXG5mdW5jdGlvbiBzdGlja2l0KHdTY3JvbGwpIHtcclxuICAgIC8v0LLRi9Cx0L7RgCDQv9C+0LfQuNGG0LjQuFxyXG4gICAgdmFyIHN0aWNrU3RhcnQgPSBuYXZpZ2F0aW9uLm9mZnNldCgpLnRvcCAtIHdpbmRvd01hcmdpbjtcclxuICAgIGlmICh3U2Nyb2xsID49IHN0aWNrU3RhcnQpIHtcclxuICAgICAgICBpZighJCgnLmZpeGVkLW5hdmlnYXRpb24nKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgbmF2aWdhdGlvbi5hcHBlbmQobWVudUZpeGVkKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmaXhlZE1lbnUgPSAkKCcuZml4ZWQtbmF2aWdhdGlvbicpLFxyXG4gICAgICAgICAgICAgICAgbWVudUNvbnRhaW5lciA9IGZpeGVkTWVudS5maW5kKCcuZml4ZWQtbmF2aWdhdGlvbl9sZWZ0JyksXHJcbiAgICAgICAgICAgICAgICBtZW51Q2xvbmUgPSBiYXJfc2lkZS5jbG9uZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyAoJ21lbnVDbG9uZScpO1xyXG4gICAgICAgICAgICBmaXhlZE1lbnUuY3NzKCd0b3AnLCB3aW5kb3dNYXJnaW4pO1xyXG4gICAgICAgICAgICBtZW51Q29udGFpbmVyLmFwcGVuZChtZW51Q2xvbmUpO1xyXG4gICAgICAgICAgICAvL9GB0LrRgNGL0LLQsNC10Lwg0L7RgdC9LtC80LXQvdGOXHJcbiAgICAgICAgICAgIGJhcl9zaWRlLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICAkKCcuZml4ZWQtbmF2aWdhdGlvbicpLnJlbW92ZSgpO1xyXG4gICAgICAgIGJhcl9zaWRlLnNob3coKTtcclxuICAgICAgICBjb25zb2xlLmxvZyAoJ3N0aWNrU3RhcnQnKTtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbi8v0YTRg9C90LrRhtC40Y8g0LTQu9GPINC/0LXRgNC10YXQvtC00LAg0L/QviDQsNGA0YLQuNC60LvRjlxyXG5mdW5jdGlvbiBjbGlja1RvQXJ0aWNsZSgpIHtcclxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCcuYmxvZy1uYXZpZ2F0aW9uX19pdGVtX2xpbmsnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgJGl0ZW0gPSAkdGhpcy5jbG9zZXN0KCcuYmxvZy1uYXZpZ2F0aW9uX19pdGVtJyksXHJcbiAgICAgICAgLy/QvdCw0YXQvtC20YMgINC40L3QtNC10LrRgSDQtdC70LXQvNC10L3RgtCwIDEsMiwzXHJcblxyXG4gICAgICAgICAgICBpbmRleCA9ICRpdGVtLmluZGV4KCksXHJcbiAgICAgICAgICAgIHJlcVNlY3Rpb24gPSBzZWN0aW9ucy5lcShpbmRleCksXHJcbiAgICAgICAgICAgIHNlY3Rpb25PZmZzZXQgPSByZXFTZWN0aW9uLm9mZnNldCgpLnRvcDtcclxuXHJcbiAgICAgICAgJCgnYm9keSwgaHRtbCcpLmFuaW1hdGUgKHtcclxuICAgICAgICAgICAgJ3Njcm9sbFRvcCcgOiBzZWN0aW9uT2Zmc2V0IC0gNTBcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcblxyXG4vL9GE0YPQvdC60YbQuNGPINCw0LrRgtC40LLQvdC+0Lkg0L/Qu9Cw0L3QutC4XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VBY3RpdmUod1Njcm9sbCkge1xyXG4gICAgJC5lYWNoKHNlY3Rpb25zLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXJcclxuICAgICAgICAgICAgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICB3aW5kb3dNYXJnaW4gPSAkKHdpbmRvdykuaGVpZ2h0KCkgLyAyLFxyXG4gICAgICAgICAgICB0b3BFZGdlID0gJHRoaXMub2Zmc2V0KCkudG9wIC0gd2luZG93TWFyZ2luLFxyXG4gICAgICAgICAgICBib3R0b21FZGdlID0gdG9wRWRnZSArICR0aGlzLmhlaWdodCgpO1xyXG5cclxuICAgICAgICBpZih3U2Nyb2xsID4gdG9wRWRnZSAmJiB3U2Nyb2xsIDwgYm90dG9tRWRnZSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gJHRoaXMuaW5kZXgoKTtcclxuXHJcbiAgICAgICAgICAgICQoJy5ibG9nLW5hdmlnYXRpb25fX2xpc3QnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkdGhpcy5maW5kKCcuYmxvZy1uYXZpZ2F0aW9uX19pdGVtJylcclxuICAgICAgICAgICAgICAgICAgICAuZXEoaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC8v0LLRi9Cx0LjRgNCw0LXQvCDRgdC+0YHQtdC00L3QuNC1INC10LvQtdC80LXQvdGC0Ysg0Lgg0YPQtNCw0LvQtdGP0LXQvCDQsNC60YLQuNCyXHJcbiAgICAgICAgICAgICAgICAgICAgLnNpYmxpbmdzKClcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuY2xpY2tUb0FydGljbGUoKTtcclxuXHJcbiQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgd1Njcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgIHN0aWNraXQod1Njcm9sbCk7XHJcbiAgICBjaGFuZ2VBY3RpdmUod1Njcm9sbCk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBQb3BwdXBcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4kKFwiLmNvbnRhY3QtZm9ybVwiKS52YWxpZGF0b3IoKS5vbihcInN1Ym1pdFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGlmIChldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xyXG4gICAgICAgIC8vIGhhbmRsZSB0aGUgaW52YWxpZCBmb3JtLi4uXHJcbiAgICAgICAgc3VibWl0TVNHKGZhbHNlLCBcIkRpZCB5b3UgZmlsbCBpbiB0aGUgZm9ybSBwcm9wZXJseT9cIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIGV2ZXJ5dGhpbmcgbG9va3MgZ29vZCFcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHN1Ym1pdEZvcm0oKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5cclxuZnVuY3Rpb24gc3VibWl0Rm9ybSgpe1xyXG4gICAgLy8gSW5pdGlhdGUgVmFyaWFibGVzIFdpdGggRm9ybSBDb250ZW50XHJcbiAgICB2YXIgbmFtZSA9ICQoXCIjbmFtZVwiKS52YWwoKTtcclxuICAgIHZhciBlbWFpbCA9ICQoXCIjZW1haWxcIikudmFsKCk7XHJcbiAgICB2YXIgbWVzc2FnZSA9ICQoXCIjbWVzc2FnZVwiKS52YWwoKTtcclxuXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgIHVybDogXCJmb3JtLXByb2Nlc3MucGhwXCIsXHJcbiAgICAgICAgZGF0YTogXCJuYW1lPVwiICsgbmFtZSArIFwiJmVtYWlsPVwiICsgZW1haWwgKyBcIiZtZXNzYWdlPVwiICsgbWVzc2FnZSxcclxuICAgICAgICBzdWNjZXNzIDogZnVuY3Rpb24odGV4dCl7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0ID09IFwic3VjY2Vzc1wiKXtcclxuICAgICAgICAgICAgICAgIGZvcm1TdWNjZXNzKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdWJtaXRNU0coZmFsc2UsdGV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZm9ybVN1Y2Nlc3MoKXtcclxuICAgICQoXCIuY29udGFjdC1mb3JtXCIpWzBdLnJlc2V0KCk7XHJcbiAgICBzdWJtaXRNU0codHJ1ZSwgXCJNZXNzYWdlIFN1Ym1pdHRlZCFcIik7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBzdWJtaXRNU0codmFsaWQsIG1zZyl7XHJcbiAgICBpZih2YWxpZCl7XHJcbiAgICAgICAgdmFyIG1zZ0NsYXNzZXMgPSBcImgzIHRleHQtY2VudGVyIHRhZGEgYW5pbWF0ZWQgdGV4dC1zdWNjZXNzXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBtc2dDbGFzc2VzID0gXCJoMyB0ZXh0LWNlbnRlciB0ZXh0LWRhbmdlclwiO1xyXG4gICAgfVxyXG4gICAgJCgnI2Zvcm1Nb2RhbCcpLmZhZGVJbigpO1xyXG4gICAgJChcIiNtc2dTdWJtaXRcIikucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcyhtc2dDbGFzc2VzKS50ZXh0KG1zZyk7XHJcbn1cclxuJCh3aW5kb3cpLm9uKCdjbGljaycsZnVuY3Rpb24gKCkge1xyXG4gICAgJCgnI2Zvcm1Nb2RhbCcpLmZhZGVPdXQoKTtcclxufSk7XHJcblxyXG4iLCJ2YXIgbWFwO1xyXG5mdW5jdGlvbiBpbml0TWFwKCkge1xyXG4gICAgdmFyIHN0eWxlcyA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZVwiLFxyXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuZmlsbFwiLFxyXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNDQ0NDQ0XCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlXCIsXHJcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2YyZjJmMlwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaVwiLFxyXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLFxyXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJzYXR1cmF0aW9uXCI6IC0xMDBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogNDVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsXHJcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5hcnRlcmlhbFwiLFxyXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLmljb25cIixcclxuICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ0cmFuc2l0XCIsXHJcbiAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLFxyXG4gICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM2MWRhYzlcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwic2F0dXJhdGlvblwiOiBcIjBcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgXTtcclxuICAgIHZhciBzdHlsZWRNYXAgPSBuZXcgZ29vZ2xlLm1hcHMuU3R5bGVkTWFwVHlwZShzdHlsZXMsXHJcbiAgICAgICAge25hbWU6IFwiU3R5bGVkIE1hcFwifSk7XHJcblxyXG5cclxuXHJcblxyXG4gICAgdmFyIG1hcE9wdGlvbnMgPSB7XHJcbiAgICAgICAgem9vbTogMTMsXHJcbiAgICAgICAgY2VudGVyOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDQ5LjQzMTE1NTksMzEuOTc4NjY1MSksXHJcbiAgICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxyXG4gICAgICAgIG5hdmlnYXRpb25Db250cm9sOiBmYWxzZSxcclxuICAgICAgICBtYXBUeXBlQ29udHJvbDogZmFsc2UsXHJcbiAgICAgICAgc2NhbGVDb250cm9sOiBmYWxzZSxcclxuICAgICAgICBkcmFnZ2FibGU6IHRydWUsXHJcbiAgICAgICAgZGlzYWJsZURlZmF1bHRVSTogdHJ1ZSxcclxuXHJcbiAgICB9O1xyXG4gICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLG1hcE9wdGlvbnMpO1xyXG4gICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgIHBvc2l0aW9uOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDQ5LjQzMTE1NTksMzEuOTc4NjY1MSksXHJcbiAgICAgICAgbWFwOiBtYXAsXHJcbiAgICAgICAgaWNvbjogJy9hc3NldHMvaW1nL21hcF9tYXJrZXIuc3ZnJ1xyXG4gICAgfSk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
