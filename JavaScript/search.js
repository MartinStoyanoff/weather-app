$(document).ready(function () {
    var city = $("#city").val();

    open_weather(city);
});
$(document).ready(function () {
    $('#city').bind('keyup blur', function () {
        var node = $(this);
        node.val(node.val());
    });
    $("#clk").on('click',function () {
        var city = $("#city").val();
        open_weather(city);
    });



});

function open_weather(city) {

    $('.weather-temperature').openWeather({
        key: '13637fc49e69ecb7364b52deebe17422',
        city: city,
        descriptionTarget: '.weather-description',
        windSpeedTarget: '.weather-wind-speed',
        pressureTarget: '.weather-pressure',
        humidityTarget: '.weather-humidity',
        sunriseTarget: '.weather-sunrise',
        cloudsTarget: '.weather-clouds',
        sunsetTarget: '.weather-sunset',
        placeTarget: '.weather-place',
        iconTarget: '.icon-target',
        success: function () {
            $('.weather-wrapper').fadeIn(800);

        },
        error: function (message) {
            console.log(message);
            $('.weather-wrapper').fadeOut(1000)
            alert("Enter City Name Properly.");
        }
    });
}
