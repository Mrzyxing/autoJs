auto.waitFor();

// 每2分钟执行一次 45分钟后停止
function schedule() {
    console.log('start a schedule');
    job();
    var id = setInterval(function() {
        console.log('schedule job start');
        job();
    }, 1 * 60 * 1000);

    setTimeout(function() {
            console.log('finish schedule');
            clearInterval(id);
        },
        60 * 60 * 1000);
}

function job() {
    // engines.execScriptFile("./greenBasedOnWidget.js");
    engines.execScriptFile("./greenBasedOnCoordinate.js", {
        loopTimes: 3600,
        delay:1
    });
}


// 模拟锁屏状态下脚本运行状况 需要root
// Power();
sleep(5000);
device.wakeUpIfNeeded();
engines.execScriptFile("./pwd.js");
device.keepScreenOn(45 * 60 * 1000);
job();