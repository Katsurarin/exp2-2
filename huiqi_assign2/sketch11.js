let video;
let poseNet;
let poses = [];

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(width, height);

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

function mousePressed() {
    console.log(JSON.stringify(poses))
}

function draw() {
    image(video, 0, 0, width, height);
    strokeWeight(2);

    if (poses.length > 0) {
        const pose = poses[0].pose;
        console.log(pose);

        //nose
        fill(0);
        const nose = pose.nose;
        ellipse(nose.x, nose.y, 60, 100);

        // right eye
        fill('FFFFFF');
        const rightEye = pose.rightEye;
        ellipse(rightEye.x, rightEye.y, 60, 40);

        //left eye
        fill('FFFFFF');
        const leftEye = pose.leftEye;
        ellipse(leftEye.x, leftEye.y, 60, 40);

        fill(0, 255, 0);
        const rightShoulder = pose.rightShoulder;
        ellipse(rightShoulder.x, rightShoulder.y, 20, 20);
    }
}
