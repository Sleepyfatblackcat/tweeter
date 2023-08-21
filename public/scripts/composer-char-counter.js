$(document).ready(function() {
  // DOM manipulation for character counter
  $("#tweet-text").on("input", function() {
    $countdown = 140 - $(this).val().length;
    
    $counter = $(this).closest("form").find(".counter");
    $counter.text($countdown);

    if ($countdown < 0) {
      $counter.css('color', 'red');
    } else {
      $counter.css('color', 'black');
    }
    $(".counter").text($countdown);
  });
});