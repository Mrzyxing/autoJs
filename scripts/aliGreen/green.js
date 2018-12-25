auto.waitFor();
requestScreenCapture();
sleep(000);
// 模拟锁屏状态下脚本运行状况 需要root
// Power();
// unlockUsePsw('314159');
home();
sleep(3000);
startGreenApp();
if (text('蚂蚁森林').findOne(15000)) {
    // 确保已经进入了鸡窝
    stealGreen();
    back();
    back();
    back();
}
toast('Job done');

function findTextWithTimeout(title, seconds, func) {
    for (var i = 0; i < seconds; ++i) {
        sleep(1000);
        var btn = desc(title).findOnce();
        if (btn) {
            console.log(title + 'founds in ' + i + ' seconds');
            return btn;
        }
        if (typeof(func) == 'function') {
            func();
        }
    }
    return null;
}

function rightSlide() {
    swipe(500, 950, 1000, 950, 100);
}

function upSlide() {
    swipe(950, 1100, 950, 0, 100);
}

// 无密码解锁
function unlockNoPsw() {
    device.wakeUpIfNeeded();
    sleep(500);
    rightSlide();
}
// 使用混合密码和数字密码解锁
function unlockUsePsw(password) {
    unlockNoPsw();
    sleep(500);
    inputPsw(password);
}
//输入密码
function inputPsw(password) {
    for (var i = 0; i < password.length; ++i) {
        var ch = password.charAt(i);
        switchKeyboardViaWord(ch);
        clickButtonWithStr(ch);
    }
}

// 根据需要点击的按键来判断此时是否需要切换到字母以及大小写
function switchKeyboardViaWord(ch) {
    if (new RegExp("[A-Z,a-z]").test(ch)) {
        // 字母
        if (text("ABC").find().empty()) {
            // 如果是数字状态需要切换到字母状态
            clickButtonWithStr("ABC");
        }
        if (text(ch).find().empty()) {
            // 切换caps
            className("TextView").idEndsWith("btn_caps_lock").findOnce().click();
        }
    } else if (text("123").find()) {
        clickButtonWithStr("123");
    }
}

// 延迟0.5秒点击包含字符串string的控件
function clickButtonWithStr(string, time) {
    if (time) {
        sleep(time);
    } else {
        sleep(500);
    }
    click(string);
    // text(string).find().click();
}

function startGreenApp() {
    // intent方式打开鸡窝
    app.startActivity({
        action: "VIEW",
        data: "alipays://platformapi/startapp?appId=60000002"
    });
}

function collect() {
    var greenBalls = idContains("protective_cover").find();
    console.log('Green balls:' + greenBalls.size());
    if (greenBalls.nonEmpty()) {
        greenBalls.each(function(greenBall) {
            console.log('process one green ball');
            clickViaLocation(greenBall);
            if (idContains('chat_msg_edit').findOnce()) {
                // 聊天室和能量球用的同一个id
                // 点进去后得返回
                conslole.log('back chat room');
                back();
            }
            sleep(2000);
        });
    }

}

function lookFriends() {
    // 通过好友列表右边的已拥有能量值来判断多少好友
    // 注意自己不能点 但是click竟然返回true
    var allFriends = descEndsWith('kg').clickable().find();
    if (allFriends.nonEmpty()) {
        console.log(allFriends.size() + ' found!');
        allFriends.each(function(friend) {
            console.log(friend.desc());
            friend.parent().click();
            // clickViaLocation(friend);
            sleep(2000);
            collect();
            back();
        });
    }
}

function clickViaLocation(UIObj) {
    var bounds = UIObj.bounds();
    click(bounds.centerX(), bounds.centerY());
}

function stealGreen() {
    var btn = findTextWithTimeout('查看更多好友', 8, upSlide);
    if (btn && btn.click()) {
        while (!id('J_rank_list_more').findOnce()) {
            sleep(1000);
            lookFriends();
            upSlide();
        }
    }
}