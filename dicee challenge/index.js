var p1 = Math.floor(Math.random()*6+1);
var p2 = Math.floor(Math.random()*6+1);

document.querySelector(".img1").setAttribute("src", "images/dice"+p1+".png");
document.querySelector(".img2").setAttribute("src", "images/dice"+p2+".png");

if(p1>p2){
    document.querySelector("h1").textContent = "Player1 Wins";
}else if(p2>p1){
    document.querySelector("h1").textContent = "Player2 Wins";
}else if(p1 === p2){
    document.querySelector("h1").textContent = "It's a draw";
}

