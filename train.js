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

// Take user data from form
$('#addTrain').on('click', function(event){
	event.preventDefault();

	var trainName = $('#trainName').val().trim();
	var destination = $('#destination').val().trim();
	var firstTrainTime = moment($('#firstTrainTime').val().trim(), 'hh:mm').format('HH:mm');
	var frequency = $('#frequency').val().trim();

	// Hardest part, ensure compared time comes before first train time
	var refPoint = moment(firstTrainTime, 'hh:mm').subtract(1, 'years');

	// Math logic
	// current time - first train time = time since first train
	// time since first train % frequency = time into current route
	// frequency - time into current route = minutes away
	// current time + minutes away = next arrival
	var minutesAway = frequency - ((moment().diff(moment(refPoint), 'minutes')) % frequency);
	var nextArrivalMinutes = moment().add(minutesAway, 'minutes');
	var nextArrival = moment(nextArrivalMinutes).format('hh:mm');

	// Push data to firebase
	database.ref().push({
		trainName: trainName,
		destination: destination,
		frequency: frequency,		
		nextArrival: nextArrival,
		minutesAway: minutesAway
	});

	// After button press operations, clear the form fields
	$('.form-control').val('');
	
}); // End of onclick event handler

database.ref().on('child_added', function(snapshot){
	console.log(snapshot.val());
	function addTrainRow(){
		var newRow = $('<tr>')
		newRow.attr('class', 'newRowColor');
		newRow.attr('id', 'newRow')
		var a = $('<td>');
		a.html(snapshot.val().trainName);
		a.attr('id', 'showTrainName');
		newRow.append(a);
		var b = $('<td>');
		b.html(snapshot.val().destination);
		b.attr('id', 'showDestination');
		newRow.append(b);
		var c = $('<td>');
		c.html(snapshot.val().frequency);
		c.attr('id', 'showFrequency');
		newRow.append(c);
		var d = $('<td>');
		d.html(snapshot.val().nextArrival);
		d.attr('id', 'showNextArrival');
		newRow.append(d);
		var e = $('<td>');
		e.html(snapshot.val().minutesAway);
		e.attr('id', 'showMinutesAway');
		newRow.append(e);
		$('#theTable tr:last').after(newRow);
	}

addTrainRow();
})