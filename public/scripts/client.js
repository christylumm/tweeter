/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


//use an escape function to prevent XSS 
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = function(tweet) {
  const name = tweet.user.name;
  const avatar = tweet.user.avatars;
  const handle = tweet.user.handle;
  const tweetContent = tweet.content.text;
  const createdAt = tweet.created_at;

  //calculate time/days since posted
  const timePosted = moment(createdAt).fromNow()

  const newTweet = 
    ` <article class ="tweet">
    <header>
      <div class="profile-pic">
        <img src="${avatar} alt="Avatar" class="avatar">&nbsp&nbsp
        <p class ="name">${name}</p>
      </div>
      <div class="handle">
        <p>${handle}</p>
      </div>
    </header>
   
    <main class="posted-tweet">
      <p class="tweet-content">${escape(tweetContent)}</p>
    </main>
   
    <footer>
      <p class="timestamp">${timePosted}</p>
      <span class="icons">
        <i class="fas fa-flag"></i>&nbsp&nbsp
        <i class="fas fa-retweet"></i>&nbsp&nbsp
        <i class="fas fa-heart"></i>
      </span>  
    </footer>
   </article>`
  
  return $(newTweet);
}

const renderTweets = function(tweets) {
  //empty tweet container before starting the loop
  $('.tweet-container').empty();
  //loop through tweets
  tweets.forEach((tweet) => {
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    $('.tweet-container').prepend(createTweetElement(tweet));
  });
}

const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET'})
    .then((data) => {
      console.log(data)
      renderTweets(data)
    })
};


 $(document).ready(function() {

  loadTweets();
  
  //Submit tweets using the form
  $form = $('#submit-tweet');
  $form.on('submit', (event) => {
    event.preventDefault();

    //Form validation
    let tweetLength = $('#tweet-text').val().length;

    //If tweet form left empty
    if (tweetLength === 0) {

      $('.new-tweet-error').text("Ooops! Looks like there's nothing here to post. Please write something!").slideDown(500);
    
    //If tweet is over 140 characters
    } else if (tweetLength > 140) {
      $('.new-tweet-error').text('Your tweet is too long! Try shortening it a bit.').slideDown(500);
    
    } else {
      
      const serialized = $('#submit-tweet').serialize(600);
      console.log(serialized);
  
      $.ajax({
        type: 'POST', 
        url: '/tweets',
        data: serialized,
        complete: function() {
          console.log('request is complete');
          loadTweets();
        }
      })
      //.then(() => {
        //Reset counter
        $('.counter').text(140);
        //Reset input field 
        $('#tweet-text').val("");
        $('.new-tweet-error').text('');
      //})
    }
  })
  
 });




