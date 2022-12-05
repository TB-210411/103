Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
Webcam.attach("#camera");
console.log("ml5 version:",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/LBPOIHN_d/model.json",modelLoaded);

function modelLoaded(){
    console.log("Model is Loaded!");
}
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_img"src="'+data_uri+'"/>';

    });
}
function check(){
    img=document.getElementById("captured_img");
    classifier.classify(img,got_result);

}
function got_result(error,results){
    if(error){
        console.log(error);

    }
    else{
        console.log(results);
        document.getElementById("object_name").innerHTML=results[0].label;
        document.getElementById("object_accuracy").innerHTML=(results[0].confidence*100).toFixed(2)+"%";
    }
}