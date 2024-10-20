let gamepads = navigator.getGamepads()

window.addEventListener('gamepadconnected', e => {
    gamepads = navigator.getGamepads()
})
window.addEventListener('gamepaddisconnected', e => {
    gamepads = navigator.getGamepads()
})

function detectBrowser() {
    const userAgent = navigator.userAgent;
  
    if (userAgent.match(/chrome|chromium|crios/i)) {
      return "Chrome";
    } else if (userAgent.match(/firefox|fxios/i)) {
      return "Firefox";
    } else if (userAgent.match(/safari/i)) {
      return "Safari";
    } else if (userAgent.match(/msie|trident/i)) {
      return "Internet Explorer";
    } else if (userAgent.match(/edge\/\d+/i)) {
      return "Microsoft Edge";
    } else if (userAgent.match(/opera|opr/i)) {
      return "Opera";
    } else {
      return "Unknown";
    }
  }
  

/**
 * 
 * @param {Gamepad} gamepad 
 * @returns 
 */
const getButtonObjectFromGamepad = (gamepad) => {
    return {
        x: gamepad.buttons[3].value,
        y: gamepad.buttons[2].value,
        a: gamepad.buttons[0].value,
        b: gamepad.buttons[1].value,
        lt: gamepad.buttons[6].value,
        rt: gamepad.buttons[7].value,
        lb: gamepad.buttons[4].value,
        rb: gamepad.buttons[5].value,
        dd: gamepad.buttons[13].value,
        du: gamepad.buttons[12].value,
        dr: gamepad.buttons[15].value,
        dl: gamepad.buttons[14].value,
        l3: gamepad.buttons[10].value,
        r3: gamepad.buttons[11].value,
        back: gamepad.buttons[8].value,
        start: gamepad.buttons[9].value,
    }
}

const getLeftStickFromGamepad = (gamepad) => {
    return {
        x: gamepad.axes[0],
        y: -gamepad.axes[1]
    }
}

const getRightStickFromGamepad = (gamepad) => {
    return {
        x: gamepad.axes[2],
        y: -gamepad.axes[3]
    }
}

function vibrate(time, index = 0) {
    // would throw error if used outside chrome
    const browser = detectBrowser()
    switch (browser) {
        case 'Chrome':
        case 'Microsoft Edge':
            return gamepads[index].vibrationActuator.playEffect("dual-rumble", {
                startDelay: 0,
                duration: time,
                weakMagnitude: 1.0,
                strongMagnitude: 1.0,
            });
        default:
            console.error('Vibration not supported in used browser')
            return { errMsg: 'Vibration not supported in used browser' }
    }
}
vibrate(1000);

const gamepadText = document.getElementById('gamepad-text')

const intervalTime = 30

function getGamepadState(index = 0) {
    return {
            leftStick: getLeftStickFromGamepad(gamepads[index]),
            rightStick: getRightStickFromGamepad(gamepads[index]),
            buttons: getButtonObjectFromGamepad(gamepads[index])
        } 
}

setInterval(() => {

    gamepads = navigator.getGamepads()

    if (gamepads[0] != null) {
        const output = {
            leftStick: getLeftStickFromGamepad(gamepads[0]),
            rightStick: getRightStickFromGamepad(gamepads[0]),
            buttons: getButtonObjectFromGamepad(gamepads[0])
        } // when we get out output method, we can send this object to it

        gamepadText.textContent = JSON.stringify(output, 2)
        console.log(JSON.stringify(output))
    }
}, intervalTime)

// export { getGamepadState }