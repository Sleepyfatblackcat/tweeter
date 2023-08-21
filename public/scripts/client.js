/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

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
          <div class="tweet">${tweet.content.text}</div>
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
      alert("Tweet is too long!");
    } else if($("#tweet-text").val() === "" || $("#tweet-text").val().length === null) {
      alert("Tweet text is empty!");
    } else {
      $.ajax({
        method: 'POST',
        url: "/tweets",
        data: $(this).serialize()
      })
      .then(function () {
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
      console.log(tweets);
      renderTweets(tweets);
    });
  }

  loadTweets();
});
