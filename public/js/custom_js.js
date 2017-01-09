$('body').on('click', '.menuItem', function (e) {
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
    //do any other button related things
});

$('.navbar-collapse a').click(function(){
    $(".navbar-collapse").collapse('hide');
});