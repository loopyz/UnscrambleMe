$(document).ready(function() {
  pickNextWord();
  $('input').focus();
  $('input').keypress(handleKey);
});

function pickNextWord(wordOverride) {
  var word = $('#word');

  $.getJSON('http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=2&maxLength=5&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5', function(data) {
    //data is the JSON string
    var unscrambled = data["word"];
    var scrambled = shuffleWord(unscrambled);
    document.currWord = {unscrambled: unscrambled, scrambled: scrambled};

    word.text('');
    word.text(document.currWord.scrambled);
    word.fadeIn(100);
  });
  
}

function shuffleWord(word) {
  var scrambled = word.split(""),
      n = word.length;
  for(var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = scrambled[i];
      scrambled[i] = scrambled[j];
      scrambled[j] = tmp;
  }
  return scrambled.join("");
}

function isWordCorrect() {
  var word = $('#word');
  var input = $('input');

  if (input.val().toLowerCase() == document.currWord.unscrambled.toLowerCase()) {
    flashInputColor(word, '#20BB36');
    $('#feedback').text("Yay you were right! Here's some imaginary pizza.");
  } else {
      flashInputColor(word, '#E56B63');
      $('#feedback').text("Wrong! Correct word was " + document.currWord.unscrambled + ". But shake it off and keep going!");
  }

  $('input').val('');
}

function flashInputColor(word, color) {
  word.css({'background-color': color});
  word.animate({'background-color': '#2ba8de'}, 1200);
  pickNextWord();
}

function handleKey(event) {
  var key = event.which;
  if (key == 13) isWordCorrect();
}
