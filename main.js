music1 = null;
music2 = null;
leftX = 0;
leftY = 0;
rightX = 0;
rightY = 0;
score1 = 0;
score2 = 0;
song1 = "";
song2 = "";

/*Commit*/
function preload(){
    music1 = loadSound("music2.mp3");
    music2 = loadSound('music.mp3');
}

function setup(){
canvas = createCanvas(600,400);
video  = createCapture(VIDEO);
video.hide();
posenet = ml5.poseNet(video,modelLoaded);
posenet.on('pose',gotPoses);
}

function draw(){
    image(video,0,0,600,400)
    fill('red')
    strokeWeight(4);
    stroke('black');
    song1 = music1.isPlaying();
    song2 = music2.isPlaying();

    if (score1 > 0.2){
        arc(leftX,leftY,30,30,0,2 * Math.PI);
        music2.stop();

        if (!song1){
            music1.play();
            document.getElementById("song_name").innerHTML = "Song Name - " + "Peter Pan";
        }
    }

    if (score2 > 0.2){
        fill('yellow');
        arc(rightX,rightY,30,30,0,2 * Math.PI);
        music1.stop();

        if (!song2){
            music2.play();
            document.getElementById("song_name").innerHTML = "Song Name - " + "Harry Potter Theme Song";
        }
    }

}

function gotPoses(results){
    if (results.length > 0){
        leftX = results[0].pose.leftWrist.x;
        leftY = results[0].pose.leftWrist.y;
        rightX = results[0].pose.rightWrist.x;
        rightY = results[0].pose.rightWrist.y;
        score1 = results[0].pose.keypoints[9].score;
        score2 = results[0].pose.keypoints[10].score;
    }
}

function modelLoaded(){
    console.log("ml5 model loaded with versione - " + " " + ml5.version);
}