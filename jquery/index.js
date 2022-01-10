$("h1").addClass("big-text cursive");
$("input").keypress(function (event) {
  $("h1").text(event.key);
});

$("button").on("click", function(){
  $("h1").slideToggle();
});

$($("button").get(0)).text("hello");
