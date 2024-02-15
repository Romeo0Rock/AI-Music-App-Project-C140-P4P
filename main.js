song = "";
leftWristX = 0;
leftWristY = 0;
rightWrist = 0;
rightWrist = 0;


function preload () {
    song = loadSound("music.mp3")
    song = loadSound("music2.mp3")
}


function setup() {
    canvas = createCanvas(600, 500)
    canvas.center();

    video = createCanvas(VIDEO);
    canvas.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}

function modelLoaded() {
    console.log('PoseNet Is Initialized')
}

function draw() {
    Image(video, 0, 0, 600, 500);

    fill("#8CEEB");
  stroke("#8CEEB");
  
  if(scoreLeftWrist > 0.2)
  {
   circle(leftWristX, leftWristY,20);
   song_variable.stop("music.mp3")
   song.setVolume(volume);
  }

  if(scoreRightWrist < 0.2)
  {
   circle(rightWristX, rightWristY,20);
   song_variable.stop("music2.mp3")
   song.setVolume(volume);
  }

   if(scoreRightWrist > 0.2)
  {
    circle(rigthWristX, rightWristY, 20);

    if(rightWristY >0 && rightWristY <= 100)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY >100 && rightWristY <= 200)
    {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }
    else if(rightWristY >200 && rightWristY <= 300)
    {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWristY >300 && rightWristY <= 400)
    {
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    else if(rightWristY >400 && rightWristY <= 500)
    {
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
  }

}




function gotPoses(results)

{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +"leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +"rightWristY = "+ rightWristY);

        
    }
}