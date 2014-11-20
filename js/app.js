/*
    app.js
    our application code

    Alternative fuel locations in Chicago dataset:
    https://data.cityofchicago.org/resource/alternative-fuel-locations.json

    Chicago coordinates:
    lat: 41.8369
    lng: -87.6847
 */

 //how to do : cameralabel n json file
 //type in: i-5, figure out which you want to show 
 // iterate over the array with .forEach
 // check .indexOf. will tell if substring appears within other string
 // .toLowerCase both strings, compare them against each other.
 //call setmap, pass null. markers is a different array. markers and item in stations array have the same index.
 // forEach(function(station, itemIndex) {})
//use the itemIndex to catch that event for typing into it. 
//iterate over traffics cameras array, does it satisfy? yes, leave it alone. else, corresponding marker, setPath = null;
//setMap passing actual map value, reappears. only one info window you need.
//type in, remove markers from the map when their correspondign object does not match search criteria
//keyOf, Search, can bass both in jquery called 'bind' in the spec.

"use strict";

$(document).ready(function() {
	var mapElem = document.getElementById('map');
	var center = {
		lat: 41.8369,
    	lng: -87.6847
	};

	var map = new google.maps.Map(mapElem, {
		center: center,
		zoom: 12
	});

	var infoWindow = new google.maps.InfoWindow();


	var stations;
	var markers = [];

	$.getJSON('https://data.cityofchicago.org/resource/alternative-fuel-locations.json')
		.done(function(data) {
			stations = data;

			data.forEach(function(station) {
				var marker = new google.maps.Marker({ 
					position: {
						lat: Number(station.location.latitude),
						lng: Number(station.location.longitude)
					},
					 map: map
				});
				markers.push(marker);
				google.maps.event.addListener(marker, 'click', function() {
					var html = '<h2>' + station.station_name + '</h2>';
					html+= '<p>' + station.street_address + '</p>';

					infoWindow.setContent(html);
					infoWindow.open(map, this);
				});
			});
		})
		.fail(function(error) {
			console.log(error);
		})
		.always(function() {
			$('#ajax-loader').fadeOut();
		});


});