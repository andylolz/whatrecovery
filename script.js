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
          feedback: 'Ah. Unlucky for you, <a target="_blank" href="http://www.theguardian.com/business/2014/feb/05/unemployment-statistics-age-divide-recession">almost 20% of under 25s are unemployed</a>.<br><img src="i/job_centre.jpg" />',
          score: -2
        }, {
          text: 'Over 25',
          feedback: 'Well at least you’re doing better than <a target="_blank" href="http://www.theguardian.com/business/2014/feb/05/unemployment-statistics-age-divide-recession">any friends or family members under 25</a>…<br><img src="i/job_centre.jpg" />',
          score: 0
        }
      ]
    }, {
      q: 'Are you a man?',
      a: [
        {
          text: 'Yes',
          feedback: 'What a relief! Out of every 100 private sector jobs created, <a target="_blank" href="http://www.theguardian.com/society/2013/sep/21/spending-cuts-women-report">only 37 are going to women</a>.',
          score: 0
        }, {
          text: 'No',
          feedback: 'What a shame. <a target="_blank" href="http://www.theguardian.com/business/2013/jul/01/public-sector-austerity-measures-women">Women aren’t doing so well under austerity measures</a>. And out of every 100 private sector jobs created, <a target="_blank" href="http://www.theguardian.com/society/2013/sep/21/spending-cuts-women-report">only 37 are going to women</a>.',
          score: -1
        }
      ]
    }, {
      q: 'Where do you live?',
      a: [
        {
          text: 'Chelsea',
          feedback: 'Oh that’s lovely for you. <a target="_blank" href="http://www.zoopla.co.uk/home-values/browse/london/sw3/chelsea-brompton/?q=SW3&search_source=home-values">The average property in Chelsea is worth almost £4 million.</a>',
          score: 1
        }, {
          text: 'Westminster',
          feedback: 'Oh that’s lovely for you. <a target="_blank" href="http://www.zoopla.co.uk/home-values/london/whitehall/">The average property in Westminster is worth almost £6.5 million.</a>',
          score: 1
        }, {
          text: 'Anywhere else',
          feedback: 'Oh dear… your house won’t be worth quite as much as in <a target="_blank" href="http://www.zoopla.co.uk/home-values/browse/london/sw3/chelsea-brompton/?q=SW3&search_source=home-values">Chelsea (average £4 million)</a> or <a target="_blank" href="http://www.zoopla.co.uk/home-values/london/whitehall/">Westminster (average £6.5 million)</a> then…',
          score: -1
        }
      ]
    }, {
      q: 'How much do you earn?',
      a: [
        {
          text: 'Roughly &nbsp;&nbsp;£1.2bn&nbsp;&nbsp;',
          feedback: 'Sounds like your finances will soon be bouncing back!<br><img src="i/green.jpg" /><br>Funnily enough, that’s what <a target="_blank" href="http://www.ukuncut.org.uk/targets/3">tax-avoiding topshop owner Sir Philip Green earned in 2005!</a>',
          score: 5
        }, {
          text: 'Around £142,500',
          feedback: 'Not bad – that’s what <a target="_blank" href="http://www.mirror.co.uk/news/uk-news/uk-average-salary-26500-figures-3002995">the Prime Minister took home last year</a>. But still almost 9000 times less than <a target="_blank" href="http://www.ukuncut.org.uk/targets/3">the £1.2 billion tax-avoiding Topshop owner Sir Philip Green earned in 2005</a>.<br><img src="i/green.jpg" />',
          score: 1
        }, {
          text: 'Close to £39,346',
          feedback: 'That’s the <a target="_blank" href="http://www.mirror.co.uk/news/uk-news/uk-average-salary-26500-figures-3002995">average salary of a police officer</a>. But over 30,000 times less than <a target="_blank" href="http://www.ukuncut.org.uk/targets/3">the £1.2 billion tax-avoiding Topshop owner Sir Philip Green earned in 2005</a>.<br><img src="i/green.jpg" />',
          score: -1
        }, {
          text: 'Closer to £26,500',
          feedback: 'Hmm… That’s the <a target="_blank" href="http://www.mirror.co.uk/news/uk-news/uk-average-salary-26500-figures-3002995">average annual salary</a>. But almost 50,000 times less than <a target="_blank" href="http://www.ukuncut.org.uk/targets/3">the £1.2 billion tax-avoiding Topshop owner Sir Philip Green earned in 2005</a>.<br><img src="i/green.jpg" />',
          score: -1
        }, {
          text: 'More like £13,124',
          feedback: 'Sorry to hear that. <a target="_blank" href="http://www.mirror.co.uk/news/uk-news/uk-average-salary-26500-figures-3002995">That’s the Minimum Wage as an annual salary.</a> That’s almost 100,000 times less than <a target="_blank" href="http://www.ukuncut.org.uk/targets/3">the £1.2 billion tax-avoiding Topshop owner Sir Philip Green earned in 2005</a>.<br><img src="i/green.jpg" />',
          score: -2
        }
      ]
    }, {
      q: 'Where did you go to school?',
      a: [
        {
          text: 'Eton',
          feedback: 'Good for you old chap. Although even <a target="_blank" href="http://www.theguardian.com/politics/2014/mar/15/michael-gove-old-etonians-conservative-david-cameron">Education Secretary Michael Gove seems to think it’s “ridiculous” and “preposterous” that your old classmates are still running the show.</a>',
          score: 0
        }, {
          text: 'Other',
          feedback: 'One of those other schools? Well even <a target="_blank" href="http://www.theguardian.com/politics/2014/mar/15/michael-gove-old-etonians-conservative-david-cameron">Education Secretary Michael Gove admits the number of Old Etonians at the top of the government is “ridiculous” and “preposterous”</a>.',
          score: -1
        }
      ]
    }, {
      q: 'Could you ever lose your job, be too sick to go to work, or struggle for money?',
      a: [
        {
          text: 'It could happen.',
          feedback: 'Bad news for you. <a target="_blank" href="http://www.bbc.co.uk/news/uk-politics-25617844">George Osborne is planning to make another £25 billion worth of cuts to the welfare budget!</a>',
          score: -1
        }, {
          text: 'There is no possible chance of that.',
          feedback: 'That’s the spirit! Best keep it that way <a target="_blank" href="http://www.bbc.co.uk/news/uk-politics-25617844">given George Osborne is planning to make another £25 billion worth of cuts to the welfare budget.</a>',
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
  $('#feedback button').text('Next question');
  setGeorge();
  startGame();
}

function loadQuestion() {
  panel('questions');

  if(questions.length > 0) {
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
  if (score > 0) {
    $('.grade:eq(' + (score-1) + ')').addClass('yes');
  }
}

function setGeorge(success) {
  if (success === true) {
    pic = 'happy' + (Math.floor(Math.random() * 3) + 1) + '.png';
  } else if(success === false) {
    pic = 'sad' + (Math.floor(Math.random() * 6) + 1) + '.png';
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
  if (questions.length === 0) {
    $('#feedback button').text('See your results');
  }
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
  result = (score < 1) ? 'SCROUNGING' : $('.grade:eq(' + (score-1) + ')').text().toUpperCase();
  $('#result').text(result);
  panel('results');

}


function tweet() {

  var tweet_url = 'https://twitter.com/intent/tweet?related=usvsth3m&text=';

  tweet_url += encodeURIComponent("How's your economic recovery going? According to @George_Osborne I'm " + $('#result').text().toLowerCase() + "! Find out how you're doing at:");
  tweet_url += '&url=' + window.location.href;

  window.open(tweet_url,'_blank');

}

function facebook() {

  FB.ui({
  method: 'feed',
  link: window.location.href,
  picture: 'http://www.whatrecovery.co.uk/i/screenshot.jpg',
  name: "How's your economic recovery going?",
  description: "According to George Osborne I'm " + $('#result').text().toLowerCase() + "! Find out how you're doing at http://www.whatrecovery.co.uk/"
  }, function(response){});

}

function moveOut() {

$('#george').animate({left: '-10%'});
$('#thermo').animate({left: '-90%', right: '110%'},1000, function() {
  $('#credits').animate({top: '90%'});
});

}

function moveIn() {

$('#george').animate({left: '10%'});
$('#thermo').animate({left: '10%', right: '10%'},1000);
$('#credits').animate({top: '100%'});

}
