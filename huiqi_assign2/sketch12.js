let video;
let pose;
let skeleton;
let angle = 0;
let history = [];

function setup() {

    frameRate(10);
    createCanvas(640, 480);
    noStroke();
    video = createCapture(VIDEO);
    video.size(width, height);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
    video.hide();

    rectMode(CENTER);
    angleMode(DEGREES);

}

function modelLoaded() {
    console.log("modelLoaded function has been called so this work!!!!");
};

function gotPoses(poses) {
    if (poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }

}

function draw() {

    image(video, 0, 0, width, height);

    filter(THRESHOLD, 1);

    if (pose) {
        noFill();
        stroke(0, 175, 255);

        let d = dist(pose.leftEye.x, pose.leftEye.y, pose.rightEye.x, pose.rightEye.y);

        ellipse(pose.nose.x, pose.nose.y, d * 3);

        let v = createVector(pose.nose.x, pose.nose.y);
        history.push(v);

        let head = history[history.length - 1].copy();
        history.push(head);
        history.shift();

        for (let i = 0; i < history.length - 1; i++) {
            drawHeadSpace(history[i].x, history[i].y);

        }

        for (let i = 0; i < pose.keypoints.length; i++) {
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;


            rect(x, y, 50, 50);

            for (let i = 0; i < skeleton.length; i++) {
                let a = skeleton[i][0];
                let b = skeleton[i][1];
                strokeWeight(2);
                stroke(255, 0, 192);
                line(a.position.x, a.position.y, b.position.x, b.position.y);
                fill('D0D0D0');

            }
        }
    }


}

function drawHeadSpace(x, y) {

    fill('FCA7E7');
    ellipse(x, y, 150);
    if (history.length > 20) {
        console.log("more than 20");
        history.splice(0, 1);
    }
}
