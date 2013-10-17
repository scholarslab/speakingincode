$(document).ready(function() {

  var siteTitle = $("#site-title a");
  siteTitle.html(siteTitle.text().replace(/\S+/g, function(word) { return "<b>" + word + "</b>"}));

  $(".participants > li").on('click', function(i) {
    var popup = $('<div id="popup" />');
    popup.appendTo('body')
         .html($(this).html())
         .bPopup();
  }).css({'cursor' : 'pointer'});

  $("nav a[href*=#]").click(function () {
    var hash = this.hash;
    this.blur();
    $("html,body").animate({
      scrollTop: $(this.hash).offset().top - headerNavHeight
    }, 800, function () {
      location.hash = hash;
    });

    return false;

  });

});

