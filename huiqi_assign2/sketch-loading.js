let video;
let pose;
let img;

function preload() {
    nose = loadImage("img/mole.png");
}

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}

function modelLoaded() {
    console.log("modelLoaded function has been called so this work!!!!");
};

function gotPoses(poses) {
    console.log(poses);
    if (poses.length > 0) {
        pose = poses[0].pose;
    }

}

function draw() {
    image("moleface.png");
    if (pose) {
        fill(255, 0, 0);
        image(pose.nose.x, pose.nose.y, 10);
    }

}
