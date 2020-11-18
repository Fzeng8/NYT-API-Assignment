  const app = {
      nyTimesArticles: [],
      searchContent: document.getElementById("searchInput"),
      searchButton: document.getElementById("submitSearch"),
      evenCounter: 0,
      oddCounter: 0,


      initialize: function () {
          app.searchButton.addEventListener('click', () => {
              app.evenCounter = 0;
              app.oddCounter = 0;
              app.getNYTimesData();
          });

      },

      makeHTML: function () {
          var theHTML = '';
          for (var i = 0; i < app.nyTimesArticles.length; i++) {
              theHTML += "<div class='nytArticle'>";
              theHTML += "<h3 class='singleArticle'>" + app.nyTimesArticles[i].headline.main + "</h3>" + "<p> word count:" + app.nyTimesArticles[i].word_count + "</p class='para'>";
              theHTML += "</div>";

              var wordCount = app.nyTimesArticles[i].word_count

              if (wordCount % 2 == 0) {
                  app.evenCounter++;
              } else {
                  app.oddCounter++;
              }

          }
          
          $('.container').html(theHTML);
          if (app.evenCounter > app.oddCounter) {
                  $('.container').css('color', 'orangered');
              } else if (app.evenCounter < app.oddCounter) {
                  $('.container').css('color', 'blue');
              } else {
                  $('.container').css('color', 'saddlebrown');
              }
          
          console.log(app.evenCounter, app.oddCounter);


      },

      getNYTimesData: function () {
          var currentSearchWord = app.searchContent.value;
          var nyTimesURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + currentSearchWord + '&page=0&sort=newest&api-key=';
          var myNYKey = 'S7F6zaK725Ux6PnXjveRXg09GLFwp1Xx';
          var nyTimesReqURL = nyTimesURL + myNYKey;
          console.log(nyTimesReqURL);
          fetch(nyTimesReqURL)
              .then(response => response.json())
              .then(data => {
                  app.nyTimesArticles = data.response.docs;
                  console.log(app.nyTimesArticles);
                  app.makeHTML();
              })
              .catch(error => console.log(error));
      }
  }

  //  document.getElementById("robotLabel").classList.add('redText');
