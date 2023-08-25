/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Escape for preventing XSS
const escaper = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Function to render tweets to main page
const renderTweets = function(tweets) {
  $('.tweet-container').empty();
  for (let i = 0; i < tweets.length; i++) {
    let $tweet = createTweetElement(tweets[i]);
    $('.tweet-container').prepend($tweet);
  }
};

// Function to create tweet element
const createTweetElement = function(tweet) {
  let $tweet = `<article>
          <header>
            <div>
              <img src="${tweet.user.avatars}">
              <h3>${tweet.user.name}</h3>
            </div>
            <span>${tweet.user.handle}</span>
          </header>
          <div class="tweet">${escaper(tweet.content.text)}</div>
          <footer>
            <span>${timeago.format(tweet.created_at)}</span>
            <div class="options">
              <span><i class="fa fa-flag"></i></span>
              <span><i class="fa fa-retweet"></i></span>
              <span><i class="fa fa-heart"></i></span>
            </div>
          </footer>
        </article>`;
  return $tweet;
};

// Function to make to load tweet from database using Ajax GET request
const loadTweets = function() {
  $.ajax({
    method: 'GET',
    url: "/tweets"
  })
  .then(function(tweets) {
    renderTweets(tweets);
  },
  function () {
    alert("Ajax GET request failed.");
  });
};

$(document).ready(() => {
  // Event listener for submitting form
  $("#tweet-form").on("submit", function(event) {
    event.preventDefault();
    // Tweet text validation
    if ($("#tweet-text").val().length > 140) {
      $("#error").text("⚠️Tweet is too long. Please keep within 140 character limit.⚠️").slideDown('slow').addClass("active");
    } else if ($("#tweet-text").val().trim() === "" || $("#tweet-text").val().length === null) {
      $("#error").text("⚠️Tweet text is empty!⚠️").slideDown('slow').addClass("active");
    } else {
      // Ajax POST request to send tweet to database
      $.ajax({
        method: 'POST',
        url: "/tweets",
        data: $(this).serialize()
      })
      .then(function() {
        $("#error").slideUp('slow').removeClass("active");
        $("#tweet-text").val("");
        $(".counter").text(140);
        loadTweets();
      },
      function () {
        alert("Ajax POST request failed.");
      });
    }
  });
  loadTweets();
});
