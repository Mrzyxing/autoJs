auto.waitFor();
requestScreenCapture();


//sleep(16000);
toast("start to capture image");

//captureScreen('./c.png');
var cap = images.read("./c.png");
toast(cap.getWidth()+"'"+cap.getHeight());
sleep(3000);
var clip = images.clip(cap, 7, 5, 100, 600);
images.save(clip, './b.png');
toast("1111111111111111111");




//test();

function test() {
    var p = images.findImage(captureImg, img, {
        thresholds: 0.9
    });
    if (p)
        toast('x:' + p.x + 'y:' + p.y);
    else
        toast('nooooooooooooooooooooooooooooooooooooooooooooooooooooooooo');
}