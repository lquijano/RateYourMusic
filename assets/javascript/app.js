$(document).ready(function(){
  $('#artistRateDiv').hide();

  });
  $('button').on('click', function(){
    event.preventDefault();
    $('#artistRateDiv').show();

    var artist = $('#inputBand').val();

    var queryURL = "https://rest.bandsintown.com/artists/" + artist +
    "?app_id=codingbootcamp";

$.ajax({
  url: queryURL,
}).then(function(response) {
    console.log(response);

    var name = response.name;
    var fans = response.tracker_count;
    var poster = response.image_url;
    var image = $('#image').attr({
      'src': poster,
      'width' : '200',
      'height' : '200'
    });

    $('#bandInfo').append(name);
    $('#artistRateDiv').append(image);

    });
  });

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA2vvBDumPn-X8UqCtoyVQASetXVlmRt04",
    authDomain: "bandsrating.firebaseapp.com",
    databaseURL: "https://bandsrating.firebaseio.com",
    projectId: "bandsrating",
    storageBucket: "bandsrating.appspot.com",
    messagingSenderId: "245069074646"
  };
  firebase.initializeApp(config);

  // <-- Create a variable to reference the database -->

  var database = firebase.database();

  $('button').on('click', function(){
      event.preventDefault();

      database.ref().set({
rating: $('select').val()
// review: $('#writtenReview').val()
});
});

database.ref().on("value", function(snapshot) {
$('span').text(snapshot.val().rating);

  });
