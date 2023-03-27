music1 = null;
music2 = null;
leftX = 0;
leftY = 0;
rightX = 0;
rightY = 0;

/*Commit*/
function preload(){
    music1 = loadSound('music.mp3');
    music2 = loadSound('music2.mp3');
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
}

function gotPoses(results){
    if (results.length > 0){
        leftX = results[0].pose.leftWrist.x;
        leftY = results[0].pose.leftWrist.y;
        rightX = results[0].pose.rightWrist.x;
        rightY = results[0].pose.rightWrist.y;
    }
}

function modelLoaded(){
    console.log("ml5 model loaded with versione - " + " " + ml5.version);
}