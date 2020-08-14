$(document).ready(function() {
  //Selects the textarea for the form inside the .new-tweet section

  $('#tweet-text').on('keyup', function() {
    const counter = document.querySelector('.counter');
    const maxChars = 140;
    const charCount = $('#tweet-text').val().length;
    const remainingChars = maxChars - Number(charCount);
    counter.innerHTML = remainingChars;

    console.log(remainingChars);

    //change colour of character counter
    if (remainingChars < 0) {
      console.log('this works');
      counter.style.color = 'red';
    } else {
      counter.style.color = 'black';
    }
  });
});