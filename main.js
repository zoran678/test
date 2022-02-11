status = "";
object = [];

function setup()
{
    canvas = createCanvas(380 ,380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    
    objectdetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Object Detecting";
}
function modelLoaded()
{
    console.log("Model");
    status = true;
}
function gotResult(error ,results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);
    object = results;
}
function draw()
{
    image(video ,0 ,0 ,380 ,380);

    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);

        objectdetector.detect(video ,gotResult);
       for(i = 0;object.length < 0;i++)
       {
           document.getElementById("status").innerHTML = "Status : Object Loaded";
           document.getElementById("number").innerHTML = "Number Of Objects"+object.length;
           fill(r ,g ,b);
           percent = floor(object[i].confidence*100);
           text(object[i].label +" "+ percent + "%" ,object[i].x ,object[i].y)
           noFill();
           stroke(r ,g ,b);
           rect(object[i].x ,object[i].y ,object[i].width ,object[i].height);
       }
    }
}
