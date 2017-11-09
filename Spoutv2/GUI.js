function GUI() {
    
}

GUI.prototype.draw = function() {
    if (gameOver) {
        fill(0);
        textSize(25);
        text("rip", player.pos.x*scale, (player.pos.y*scale)+40);
        textSize(50);
        text("Score: " + score, width/2-150, height/2+100);
    } else {
        fill(180);
        rect(1, 1, 70, 33);
        textSize(25);
        fill(0);
        text(score, 10, 25);
    }
}