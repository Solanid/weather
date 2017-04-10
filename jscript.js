jQuery(document).ready(function($) {
	var country="";
	var city="";
	var jsonData;

	var listOfCities = {country: [
			{ "name": "Slovakia", "cities":["Bratislava", "Košice", "Prešov", "Žilina", "Banská Bystrica"]},
			{ "name": "Czech Republic", "cities":["Prague", "Brno", "Ostrava", "Plzeň", "Liberec"]},
			{ "name": "Germany", "cities":["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt", "Essen"]},
			{ "name": "Hungary", "cities":["Budapest", "Debrecen", "Szeged", "Miskolc"]},
			{ "name": "Poland", "cities":["Warsaw", "Kraków", "Łódź", "Wrocław", "Poznań", "Gdańsk", "Szczecin"]},
			{ "name": "Ukraine", "cities":["Kyiv", "Kharkiv", "Dnipro", "Odesa", "Donetsk"]},
		]
	};

	for (var i = 0; i < listOfCities.country.length; i++) {
		$("#select-country").append($("<option />)").text(listOfCities.country[i].name));
	}

	$("#select-country").change(function(event) {
		$("#select-city").find('option').not(':first').remove();
		var selected = $("#select-country option:selected").text();
		for (var i = 0; i < listOfCities.country.length; i++) {
			if (listOfCities.country[i].name == selected) {
				for (var j = 0; j < listOfCities.country[i].cities.length; j++) {
					$("#select-city").append($("<option />)").text(listOfCities.country[i].cities[j]));
				}
			}
		}
	});

	//console.log(listOfCities.country[5].name);
	$(document).on('click', '#btn-ok', function(event) {
		event.preventDefault();
		$(".head").remove();
		$(".body").remove();
		$(".message").remove();
		city=$("#select-city option:selected").text().toUpperCase();
	
		if (city!="ENTER CITY") {
			$.ajax({
		        url: "http://api.apixu.com/v1/current.json?key=7f001688eefd446cb4395603170804&q=\""+city+"\"",
		        dataType: "json",
		        method: "GET"
		    }).done(function(data) {
		    		$("<thead/>").addClass('head').appendTo(".weather-table");
						$("<tr/>").appendTo($(".weather-table").children());
							$("<th/>").text(data.location.name).appendTo($(".weather-table").children().children());
							$("<td/>").appendTo($(".weather-table").children().children())
								.append($("<img/>", {
									"src": "http:"+data.current.condition.icon
								}));
					$("<tbody/>").addClass('body').appendTo(".weather-table");
						$("<tr/>").appendTo($(".body"))
							.append($("<td/>").text('Weather condition:'))
							.append($("<td/>").text(data.current.condition.text));
						$("<tr/>").appendTo($(".body"))
							.append($("<td/>").text('Temperature:'))
							.append($("<td/>").text(data.current.temp_c+" °C"));
						$("<tr/>").appendTo($(".body"))
							.append($("<td/>").text('Feels like temp:'))
							.append($("<td/>").text(data.current.feelslike_c+" °C"));
						$("<tr/>").appendTo($(".body"))
							.append($("<td/>").text('Humidity:'))
							.append($("<td/>").text(data.current.humidity+" %"));
						$("<tr/>").appendTo($(".body"))
							.append($("<td/>").text('Wind:'))
							.append($("<td/>").text(data.current.wind_kph+" km/h"));
						$("<tr/>").appendTo($(".body"))
							.append($("<td/>").text('Wind direction:'))
							.append($("<td/>").text(data.current.wind_dir));

		    	}).fail(function(){
		    		console.log("fail");
		    		$("<div/>", {
						"class": "message"
					}).appendTo('.location-selection');
					$("<span/>").text("Can not find selected location.").appendTo('.message');
		    	});
		}
	});

});