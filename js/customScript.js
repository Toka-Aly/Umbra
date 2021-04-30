$(document).ready(function() {
    // popup
    $('[data-toggle="modal"]').each(function() {
        $(this).on('click', function() {
            const target = `#${$(this).data('target')}`;
            showModal(target);
        });
    });

    $('[data-modal-dismiss]').each(function() {
        $(this).on('click', function() {
            const target = $(this).closest('.popup');
            closeModal(target);
        });
    });

    function showModal(target) {
        $("body").css("overflow", "hidden");
        $('.popup').hide();
        $(target).fadeIn(300);
    }

    function closeModal() {
        $('.popup').hide();
        $("body").css("overflow", "auto");
    }
    //cart
    var cartCountValue = 0;
    var cartCount = $('.cart .count');
    $(cartCount).text(cartCountValue);

    $('.random-btn').on('click', function() {
        $('.cart').offset({
            top: getRndInteger(0, window.innerHeight - 100),
            left: getRndInteger(0, window.innerWidth - 100)
        });
    });

    $('.cart-btn').on('click', function() {
        var cartBtn = this;
        var cartCountPosition = $(cartCount).offset();
        var btnPosition = $(this).offset();
        var leftPos =
            cartCountPosition.left < btnPosition.left ?
            btnPosition.left - (btnPosition.left - cartCountPosition.left) :
            cartCountPosition.left;
        var topPos =
            cartCountPosition.top < btnPosition.top ?
            cartCountPosition.top :
            cartCountPosition.top;
        $(cartBtn)
            .append("<span class='count'>1</span>");

        $(cartBtn).find(".count").each(function(i, count) {
            $(count).offset({
                    left: leftPos,
                    top: topPos
                })
                .animate({
                        opacity: 0
                    },
                    function() {
                        $(this).remove();
                        cartCountValue++;
                        $(cartCount).text(cartCountValue);
                    }
                );
        });
    });

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});

// vertical-tabs
$(".tab_content").hide();
$(".tab_content:first").show();
$("ul.tabs li").click(function() {

    $(".tab_content").hide();
    var activeTab = $(this).attr("rel");
    $("#" + activeTab).fadeIn();

    $("ul.tabs li").removeClass("active");
    $(this).addClass("active");

    $(".tab_drawer_heading").removeClass("d_active");
    $(".tab_drawer_heading[rel^='" + activeTab + "']").addClass("d_active");

});
$(".tab_drawer_heading").click(function() {

    $(".tab_content").hide();
    var d_activeTab = $(this).attr("rel");
    $("#" + d_activeTab).fadeIn();

    $(".tab_drawer_heading").removeClass("d_active");
    $(this).addClass("d_active");

    $("ul.tabs li").removeClass("active");
    $("ul.tabs li[rel^='" + d_activeTab + "']").addClass("active");
});


// vertical-tabs
$(".payment_content").hide();
$(".payment_content:first").show();
$("ul.payment-tabs li").click(function() {

    $(".payment_content").hide();
    var activeTab = $(this).attr("rel");
    $("#" + activeTab).fadeIn();

    $("ul.payment-tabs li").removeClass("active");
    $(this).addClass("active");

    $(".tab_drawer_heading").removeClass("d_active");
    $(".tab_drawer_heading[rel^='" + activeTab + "']").addClass("d_active");

});
$(".tab_drawer_heading").click(function() {

    $(".payment_content").hide();
    var d_activeTab = $(this).attr("rel");
    $("#" + d_activeTab).fadeIn();

    $(".tab_drawer_heading").removeClass("d_active");
    $(this).addClass("d_active");

    $("ul.payment-tabs li").removeClass("active");
    $("ul.payment-tabs li[rel^='" + d_activeTab + "']").addClass("active");
});

// Wizard Steps
const steps = $('.wizard-steps .step');
const progress = $('.wizard-steps .progress');
const bodySections = $('.wizard-body .wizard-tab');

function next(n) {
    if (n > steps.length - 1) {
        return
    }
    $(steps).removeClass('active');
    $(steps[n]).addClass('active');
    $(steps[n]).prevAll().addClass('active');
    $(bodySections).slideUp();
    $(bodySections[n]).slideDown();
    $(progress).css({
        width: (100 / 3) * (n + 1) + '%',
    });
}
next(0);

$('.wizard-next-btn').each(function(i) {
    $(this).click(function() {
        next(i + 1);
    });
});