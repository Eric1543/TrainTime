// Initialize Firebase
var config = {
apiKey: "AIzaSyBAxTMqyOI-UnsVJ--wCjCSLynyn33jFzc",
authDomain: "traintime-e84c2.firebaseapp.com",
databaseURL: "https://traintime-e84c2.firebaseio.com",
projectId: "traintime-e84c2",
storageBucket: "traintime-e84c2.appspot.com",
messagingSenderId: "835683358818"
};
firebase.initializeApp(config);


var database = firebase.database();

$('#addTrain').on('click', function(event){
	event.preventDefault();

	var trainName = $('#trainName').val().trim();
	var destination = $('#destination').val().trim();
	var firstTrainTime = moment($('#firstTrainTime').val().trim(), "HH:mm").format("HH:mm");
	var frequency = $('#frequency').val().trim();

	// var freq
	var nextArrival = 0;

	var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

	var minutesAway = moment();

	database.ref().set({
		trainName: trainName,
		destination: destination,
		firstTrainTime: firstTrainTime,
		frequency: frequency
	});

	$('.form-control').val('');
		
	function addTrainRow(){
		var newRow = $('<tr>')
		newRow.attr('class', 'newRowColor');
		var a = $('<td>');
		a.html(trainName);
		newRow.append(a);
		var b = $('<td>');
		b.html(destination);
		newRow.append(b);
		var c = $('<td>');
		c.html(frequency);
		newRow.append(c);
		var d = $('<td>');
		d.html(nextArrival);
		newRow.append(d);
		var e = $('<td>');
		e.html(minutesAway);
		$('#theTable tr:last').after(newRow);
	}
	console.log(firstTrainTime);
	addTrainRow();

});

	      