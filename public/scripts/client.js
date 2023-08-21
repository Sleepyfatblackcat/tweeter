/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escaper = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = function(tweets) {
  for(let i = 0; i < tweets.length; i++) {
    let $tweet = createTweetElement(tweets[i]);
    $('.tweet-container').prepend($tweet);
  }
}

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
        </article>`
  return $tweet;
}

$(document).ready( () => {
  $("#tweet-form").on("submit", function(event) {
    event.preventDefault();
    if($("#tweet-text").val().length > 140) {
      $("#error").text("⚠️Tweet is too long. Please keep within 140 character limit.⚠️").slideDown('slow').addClass("active");;
    } else if($("#tweet-text").val() === "" || $("#tweet-text").val().length === null) {
      $("#error").text("⚠️Tweet text is empty!⚠️").slideDown('slow').addClass("active");;
    } else {
      $.ajax({
        method: 'POST',
        url: "/tweets",
        data: $(this).serialize()
      })
      .then(function () {
        $("#error").slideUp('slow').removeClass("active");;
        loadTweets();
      });
    }
  });

  const loadTweets = function() {
    $.ajax({
      method: 'GET',
      url: "/tweets"
    })
    .then(function (tweets) {
      renderTweets(tweets);
    });
  }

  loadTweets();
});
