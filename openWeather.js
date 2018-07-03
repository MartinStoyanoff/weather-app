(function ($) {
	$.fn.openWeather = function (options) {
		if (!this.length) {
			return this;
		}
		//define default parameters
		var defaults = {
			descriptionTarget: null,
			pressureTarget: null,
			cloudsTarget: null,
			windSpeedTarget: null,
			humidityTarget: null,
			sunriseTarget: null,
			sunsetTarget: null,
			placeTarget: null,
			iconTarget: null,
			customIcons: null,
			units: 'c',
			city: null,
			lat: null,
			lng: null,
			key: null,
			lang: 'en',
			success: function () {},
			error: function (message) {}
		}

		//define plugin
		var plugin = this;

		//define element
		var el = $(this);

		//api URL
		var apiURL;

		//define settings
		plugin.settings = {}

		//merge defaults and options
		plugin.settings = $.extend({}, defaults, options);

		//define settings namespace
		var s = plugin.settings;

		//define basic api endpoint
		apiURL = 'http://api.openweathermap.org/data/2.5/weather?lang=' + s.lang;

		//if city isn't null
		if (s.city != null) {

			//define API url using city (and remove any spaces in city)
			apiURL += '&q=' + s.city.replace(' ', '+');

		}

		//if api key was supplied
		if (s.key != null) {

			//append api key paramater
			apiURL += '&appid=' + s.key;

		}

		//format time function
		var formatTime = function (unixTimestamp) {

			//define milliseconds using unix time stamp
			var milliseconds = unixTimestamp * 1000;

			//create a new date using milliseconds
			var date = new Date(milliseconds);

			//define hours
			var hours = date.getHours();

			//convert hours to a string
			hours = hours.toString();

			//if hours has less than 2 characters
			if (hours.length < 2) {

				//add a 0 to hours
				hours = 0 + hours;
			}

			//define minutes
			var minutes = date.getMinutes();

			//convert minutes to a string
			minutes = minutes.toString();

			//if minutes has less than 2 characters
			if (minutes.length < 2) {

				//add a 0 to minutes
				minutes = 0 + minutes;
			}

			//construct time using hours and minutes
			var time = hours + ':' + minutes;

			return time;
		}

		$.ajax({
			type: 'GET',
			url: apiURL,
			dataType: 'jsonp',
			success: function (data) {

				//define temperature as celsius
				var temperature = Math.round(data.main.temp - 273.15) + '°C';

				//set temperature
				el.html(temperature);

				//set weather description
				$(s.descriptionTarget).text(data.weather[0].description);


				//define the default icon name
				var defaultIconFileName = data.weather[0].icon;


				//if icon is clear sky
				if (defaultIconFileName == '01d' || defaultIconFileName == '01n') {
					var iconURL = '01.png';
				}

				//if icon is clouds || broken clouds
				if (defaultIconFileName == '02d' || defaultIconFileName == '02n' || defaultIconFileName == '04d' || defaultIconFileName == '04n') {
					var iconURL = '02.png';
				}

				//if icon is scattered
				if (defaultIconFileName == '03d' || defaultIconFileName == '03n') {
					var iconURL = '03.png';
				}

				//if icon is light rain
				if (defaultIconFileName == '09d' || defaultIconFileName == '09n') {
					var iconURL = '10.png';
				}

				//if icon is rain
				if (defaultIconFileName === '10d' || defaultIconFileName === '10n') {
					var iconURL = '10.png';
				}

				//if icon is thunderstorm
				if (defaultIconFileName == '11d' || defaultIconFileName == '11n') {
					var iconURL = '11.png';
				}

				//if icon is snow
				if (defaultIconFileName == '13d' || defaultIconFileName == '13n') {
					var iconURL = '13.png';
				}

				//if icon is mist
				if (defaultIconFileName == '50d' || defaultIconFileName == '50n') {
					var iconURL = '50.png';
				}

				//set iconTarget src attribute as iconURL
				$(s.iconTarget).attr('src', iconURL);


				//if placeTarget isn't null
				if (s.placeTarget != null) {

					//set humidity
					$(s.placeTarget).text(data.name + ', ' + data.sys.country);
				}

				//if windSpeedTarget isn't null
				if (s.windSpeedTarget != null) {

					//set wind speed
					$(s.windSpeedTarget).text(Math.round(data.wind.speed) + ' m/s');
				}
				if (s.pressureTarget != null) {

					//set pressure
					$(s.pressureTarget).text(Math.round(data.main.pressure) + ' hPa');
				}

				if (s.cloudsTarget != null) {

					//set clouds
					$(s.cloudsTarget).text(Math.round(data.clouds.all) + ' %');
				}

				//if humidityTarget isn't null
				if (s.humidityTarget != null) {

					//set humidity
					$(s.humidityTarget).text(data.main.humidity + ' %');
				}

				//if sunriseTarget isn't null
				if (s.sunriseTarget != null) {

					var sunrise = formatTime(data.sys.sunrise);

					//set humidity
					$(s.sunriseTarget).text(sunrise);
				}

				//if sunriseTarget isn't null
				if (s.sunsetTarget != null) {

					var sunset = formatTime(data.sys.sunset);

					//set humidity
					$(s.sunsetTarget).text(sunset);
				}

				//var err = data.weather[0].icon;

				//run success callback
				s.success.call(this);

			},

			error: function (jqXHR, textStatus, errorThrown) {

				//run error callback
				s.error.call(this, textStatus);
			}

		}); //ajax

	} //fn


})

(jQuery);