song_1="";
song_2="";
lw_X=0;
lw_y=0;
rw_x=0;
rw_y=0;
ScoreLW=0;
ScoreRW=0;
song1_Status="";
song2_Status="";
function preload() {
    song_1=loadSound("Song1.mp3")
    song_2=loadSound("Song2.mp3")
}

function setup() {
    canvas = createCanvas(400, 400)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    poseNet=ml5.poseNet(video,modelLoaded)
    poseNet.on('pose',gotPoses)
}

function draw() {
    image(video,0,0,400,400)

    song1_Status=song_1.isPlaying()
    song2_Status=song_2.isPlaying()
    song_1.setVolume(0.5)
    song_2.setVolume(0.5)
    song_1.rate(1)
    song_2.rate(1)
    fill("lightblue")
    stroke("blue")
    if(ScoreLW>0.2){
        circle(lw_X,lw_y,30)
        song_2.stop()
        if(song1_Status==false){
            song_2.play()
            document.getElementById("song_name").innerHTML="Jai Jai Shiv Shankar"
        }
    }

    if(ScoreRW>0.2){
        circle(rw_X,rw_y,30)
        song_1.stop()
        if(song2_Status==false){
            song_1.play()
            document.getElementById("song_name").innerHTML="Memories"
        }
    }
}

function modelLoaded(){
    console.log("model is loaded")
}

function gotPoses(results){
    if(results.length>0){
        console.log(results)
        lw_X=results[0].pose.leftWrist.x;
        lw_y=results[0].pose.leftWrist.y;
        rw_X=results[0].pose.rightWrist.x;
        rw_y=results[0].pose.rightWrist.y;

        ScoreLW=results[0].pose.keypoints[9].score;
        ScoreRW=results[0].pose.keypoints[10].score;
    }
}