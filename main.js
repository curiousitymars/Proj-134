objects = [];
img = "";
status = "";
function preload() {
    alarm = loadSound('alarm.mp3');    
}
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

    alarm.play();

    object_detector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    //document.getElementById("number_of_objects").innerHTML = "Number of Detected Objects Are: " + objects.length;
}
function modelLoaded() {
    console.log("Model has been initialized!");
    status = true;
    //object_detector.detect(img, gotResult);
}
function gotResult(error, result) {
    if(error) {
        console.error(error);
    }
    console.log(result);
    objects = result;
}
function draw() {
    image(video, 0, 0, 380, 380);
    if(status!= "") {
        r = random(255);
        g = random(255);
        b = random(255);
        object_detector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++ ) {
            document.getElementById("status").innerHTML = "Baby Found";
            percent = floor(objects[i].confidence * 100);
            fill(r,g,b);
            text(objects[i].label+" " + percent + "%", objects[i].x +15, objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if (status == "Baby Found") {
                alarm.stop();
            }
        }
    }
}