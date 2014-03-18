var qid = 0;
var questions = [];
var score = 5;
var happiness;

var currentQuestion;

$(document).ready( function() {
  setThermometer();
});

window.addEventListener('load', function() {
  FastClick.attach(document.body);
}, false);


function panel(p) {

  $('.panel').hide();
  $('#' + p).show();

}


function startGame() {

  moveIn();
  questions = [
    {
      q: 'How old are you?',
      a: [
        {
          text: 'Under 25',
          feedback: 'Ah. <a target="_blank" href="http://www.theguardian.com/business/2014/feb/05/unemployment-statistics-age-divide-recession">Almost 20% of under 25s are unemployed</a>.<br><img src="i/job_centre.jpg" />',
          score: -2
        }, {
          text: 'Over 25',
          feedback: 'Great! Pity about family / friends / <a target="_blank" href="http://www.theguardian.com/business/2014/feb/05/unemployment-statistics-age-divide-recession">anyone you know under 25</a>…<br><img src="i/job_centre.jpg" />',
          score: 0
        }
      ]
    }, {
      q: 'Are you a man?',
      a: [
        {
          text: 'Yes',
          feedback: 'What a relief! Out of every 100 private sector jobs created, <a target="_blank" href="http://www.theguardian.com/business/2014/feb/05/unemployment-statistics-age-divide-recession">only 37 are going to women</a>.',
          score: 0
        }, {
          text: 'No',
          feedback: 'What a shame. <a target="_blank" href="http://www.theguardian.com/business/2013/jul/01/public-sector-austerity-measures-women">Women aren’t faring so well under austerity measures</a>. And it’s <a target="_blank" href="http://www.independent.co.uk/news/uk/politics/exclusive-george-osbornes-tax-and-benefits-changes-hit-women-almost-four-times-harder-than-men-9177533.html">even worse if you’ve got children</a>.',
          score: -1
        }
      ]
    }, {
      q: 'Where do you live?',
      a: [
        {
          text: 'Chelsea',
          feedback: '<img src="i/kensington.jpg" /><br>Fancy buying <a target="_blank" href="http://www.telegraph.co.uk/property/propertynews/10700500/One-London-home-or-25-in-Scotland.html">25 houses in Scotland?</a>',
          score: 1
        }, {
          text: 'Westminster',
          feedback: '<img src="i/kensington.jpg" /><br>Fancy buying <a target="_blank" href="http://www.telegraph.co.uk/property/propertynews/10700500/One-London-home-or-25-in-Scotland.html">25 houses in Scotland?</a>',
          score: 1
        }, {
          text: 'Anywhere else',
          feedback: 'Uh oh! Won’t be long before an oligarch <a target="_blank" href="http://www.telegraph.co.uk/property/propertynews/10700500/One-London-home-or-25-in-Scotland.html">buys up your whole street</a>.',
          score: -1
        }
      ]
    }, {
      q: 'What’s your annual income?',
      a: [
        {
          text: 'Roughly £1.2bn',
          feedback: 'Sounds like your finances will soon be bouncing back!<br><img src="i/green.jpg" /><br>Funnily enough, that’s what <a target="_blank" href="http://www.ukuncut.org.uk/targets/3">tax-avoiding topshop owner Sir Philip Green earned in 2005</a>.',
          score: 5
        }, {
          text: 'Around £142,500',
          feedback: 'Not bad – that’s what <a target="_blank" href="http://www.mirror.co.uk/news/uk-news/uk-average-salary-26500-figures-3002995">the prime minister took home last year</a>.',
          score: 1
        }, {
          text: 'Close to £39,346',
          feedback: 'That’s the <a target="_blank" href="http://www.mirror.co.uk/news/uk-news/uk-average-salary-26500-figures-3002995">average salary of a police officer</a>.',
          score: 1
        }, {
          text: 'Closer to £26,500',
          feedback: 'Oh dear… Well you’re certainly not alone in <a target="_blank" href="http://www.mirror.co.uk/news/uk-news/uk-average-salary-26500-figures-3002995">earning close to the UK average wage</a>, if that’s any consolation.',
          score: -1
        }, {
          text: 'More like £12,873',
          feedback: 'That’s the <a target="_blank" href="http://www.mirror.co.uk/news/uk-news/uk-average-salary-26500-figures-3002995">Minimum Wage as an annual salary</a>.',
          score: -2
        }
      ]
    }, {
      q: 'Where did you go to school?',
      a: [
        {
          text: 'Eton',
          feedback: 'Excellent! Hopefully that means you’re up there with the 1%!',
          score: 0
        }, {
          text: 'Harrow',
          feedback: 'Excellent! Hopefully that means you’re up there with the 1%!',
          score: 0
        }, {
          text: 'Other',
          feedback: 'Ouch! Even Education Secretary Michael Gove admits the number of Old Etonians in David Cameron’s inner circle is <a target="_blank" href="www.theguardian.com/politics/2014/mar/15/michael-gove-old-etonians-conservative-david-cameron">“ridiculous” and “preposterous”</a>.',
          score: -1
        }
      ]
    }, {
      q: 'Could you ever lose your job, be too sick to go to work, or struggle for money?',
      a: [
        {
          text: 'It could happen.',
          feedback: 'Bad news for you. <a target="_blank" href="http://www.bbc.co.uk/news/business-22804563">600,000 could lose incapacity benefits</a>.',
          score: -1
        }, {
          text: 'There is no possible chance of that.',
          feedback: 'That’s the spirit! Best keep it that way, given <a target="_blank" href="http://www.bbc.co.uk/news/business-22804563">600,000 could lose incapacity benefits</a>.',
          score: 0
        }
      ]
    }
  ];
  $('#qtotal').text(questions.length);
  qid = 0;
  score = 5;
  setThermometer();
  loadQuestion();
}

function restartGame() {
  setGeorge();
  startGame();
}

function loadQuestion() {
  panel('questions');

  if(questions.length > 0 && score > 0) {
    qid++;
    currentQuestion = questions.shift();
    $('#question-text').html(currentQuestion.q);
    var num_answers = currentQuestion.a.length;
    $('.answer_buttons').html('');
    $(currentQuestion.a).each(function(index, value) {
      $('.answer_buttons').append('<button id="go" style="width: ' + (100/num_answers) + '%" onClick="answer(' + index + ')">' + value.text + '</button>');
    });
    $('#question-text').html(currentQuestion.q);
    $('#qid').text(qid);

  } else {
    getResults();
  }

}

function setThermometer() {

  $('#grade-bar').animate({ width: (score*20).toString() + '%' },1000);
  $('.grade').removeClass('yes');
  $('.grade:eq(' + (score-1) + ')').addClass('yes');


}

function setGeorge(success) {
  if (success === true) {
    pic = 'happy' + (Math.floor(Math.random() * 3) + 1) + '.png';
  } else if(success === false) {
    pic = 'sad' + (Math.floor(Math.random() * 5) + 1) + '.png';
  } else {
    pic = 'briefcase.png';
  }

  $('#george').animate({left: '100%'},500, function() {
    $(this).css('backgroundImage', 'url(i/' + pic + ')');
    $(this).animate({left: '10%'}, 500);
  });
}

function answer(id) {
  $('#feedback p').html(currentQuestion.a[id].feedback);
  panel('feedback');

  points = currentQuestion.a[id].score;
  score += points;
  if (score > 5) { score = 5; }

  setThermometer();
  setGeorge(points >= 0);
}

function getResults() {
  $('#feedback').hide();
  moveOut();
  result = (score < 1) ? 'SURVIVING' : $('.grade:eq(' + (score-1) + ')').text().toUpperCase();
  $('#result').text(result);
  panel('results');

}


function tweet() {

  var tweet_url = 'https://twitter.com/intent/tweet?related=usvsth3m&text=';

  tweet_url += encodeURIComponent("The results are in, and I'm " + $('#result').text().toLowerCase() + "! How's your economic recovery going?");
  tweet_url += '&url=' + window.location.href;

  window.open(tweet_url,'_blank');

}

function facebook() {

  FB.ui({
  method: 'feed',
  link: window.location.href,
  picture: 'http://toys.usvsth3m.com/are-you-hated-by-the-daily-mail/intro.jpg',
  name: "How Much Are You Hated By The Daily Mail?",
  description: "The results are in, and I'm " + $('.grade:eq(' + score + ')').text().toLowerCase() + " by the Daily Mail! How about you?"
  }, function(response){});

}

function moveOut() {

$('#george').animate({left: '-10%'});
$('#thermo').animate({left: '-90%', right: '110%'},1000);

}

function moveIn() {

$('#george').animate({left: '10%'});
$('#thermo').animate({left: '10%', right: '10%'},1000);

}
