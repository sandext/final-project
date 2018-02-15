/*
  Please add all Javascript code to this file.
*/

(function(){
  $( document ).ready(function() {
    getData("country=us");
  });


  var getData = function(id) {
    $.ajax({
      url: `${BASE_URI}${id}&apiKey=${API_KEY}`,
    })
    .done(function(data, textStatus, jqXHR) {
      var object = data.articles;
      console.log(object);
      var template = object.map((el, key) =>
        `
        <article class="article">
          <section class="featuredImage">
            <img src=${el.urlToImage} alt="">
          </section>
          <section class="articleContent">
              <a href="" class="article-title"><h3>${el.title}</h3></a>
              <h6>${el.source.name}</h6>
          </section>
          <section class="impressions">
            526
          </section>
          <div class="clearfix">
          </div>
          <div class="article-content">
            <div class="toggle-container">
              <div>${el.description}</div>
              <br/><br/>
              <div class="text-right">
                <a href=${el.url} target="_blank"><button class="btn">🔗</button></a>&nbsp;&nbsp;&nbsp;
                <span><strong>${el.author}</strong></span>
                <span><em>${el.publishedAt}</em></span>
              </div>
            </div>
          </div>
        </article>
        `
      )

      $('#main').html(template);
    })
    .fail(function(data, textStatus, jqXHR) {
      console.log("error");
    });
  }

  const BASE_URI = "https://newsapi.org/v2/top-headlines?";
  var API_KEY = config.API;


  $('body').on('click', '.dropdown', function(e){
    e.preventDefault();
    var domId = $(this).attr('id');
    getData(domId);
  })

  $("#main").on('click', '.article-title', function (e) {
        e.preventDefault();
        $(this).closest('.article').find('.article-content').toggle(300);
        $(this).closest('.article').toggleClass('active');
    });

  $('#home').on('click', function(){location.reload();})

  $('#search > input').on('keyup', function(evt){
    console.log('here');
    $.each(($('.article > .articleContent > a > h3')), function(i, el) {
      // console.log($(el)[0].innerText)
      // if( $(el)[0].innerText == $('#search-text').val()){
      var input = $('#search > input').val();
      var record = $(el)[0].innerText;
      var regex = new RegExp(input, "i")
      $(this).parent().parent().parent().hide();
      if(record.match(regex)){
          $(this).parent().parent().parent().show();
      } else {
        $(this).parent().parent().parent().hide();
      }
    })
  });
})($)
