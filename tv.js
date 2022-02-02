img="";
status="";
objects=[];
function preload() 
{
    img=loadImage("tv.jpeg");
}

function setup()
{
    canvas=createCanvas(640,420);
    canvas.center();
    objectdetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="status:detecting objects";
}

function modelLoaded() 
{
console.log("model loaded!");
status=true;
objectdetector.detect(img,gotResult);
}

function gotResult(error,results) 
{
if(error)
{
    console.error(error);
}
console.log(results);
objects=results;
}

function draw()
{
    image(img,0,0,640,420);
    if(status != "")
    {
        r=random(255);
        g=random(255);
        b=random(255);
        for(i=0; i<objects.length; i++) 
        {
            document.getElementById("status").innerHTML="status:object detected";
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}