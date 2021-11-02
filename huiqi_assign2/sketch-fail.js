//with unknown reason this code can not load the model

let vedio;
let poseNet;
let pose;

//creat posenet
function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);

    poseNet = ml5.poseNet(video, {
        outputStride: 8,
        quantBytes: 4
    }, modelReady);
    poseNet.on('pose', function (results) {
        poses = results;
    });
    video.hide();
}

function modelReady() {
    select('#status').html('Model Loaded');
}

function gotPoses(poses) {
    if (poses.length > 0) {
        pose = poses[0].pose;
    }
}

function draw() {
    //get pose
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);

    //outer eye
    fill(0);
    ellipse(eyeR.x, eyeR.y, d / 1.5, (d / 2.5));
    ellipse(eyeL.x, eyeL.y, d / 1.5, (d / 2.5));

    //eye ball
    fill('#86dd21');
    ellipse(eyeR.x - 1, eyeR.y, d / 10, d / 4);
    ellipse(eyeL.x - 1, eyeL.y, d / 10, d / 4);

    //nose
    fill(0);
    triangle(pose.nose.x - (d / 3), pose.nose.y - (d / 10), pose.nose.x + (d / 3), pose.nose.y - (d / 10), pose.nose.x, pose.nose.y + (d / 3));
}
