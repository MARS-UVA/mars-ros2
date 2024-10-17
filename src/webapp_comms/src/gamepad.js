let gamepads = navigator.getGamepads()

window.addEventListener('gamepadconnected', e => {
    gamepads = navigator.getGamepads()
})
window.addEventListener('gamepaddisconnected', e => {
    gamepads = navigator.getGamepads()
})

/**
 * 
 * @param {Gamepad} gamepad 
 * @returns 
 */
const getButtonObjectFromGamepad = (gamepad) => {
    return {
        x: gamepad.buttons[2].value,
        y: gamepad.buttons[3].value
    }
}

const getLeftStickFromGamepad = (gamepad) => {
    return {
        x: gamepad.axes[0],
        y: gamepad.axes[1]
    }
}

const getRighttickFromGamepad = (gamepad) => {
    return {
        x: gamepad.axes[2],
        y: -gamepad.axes[3]
    }
}

const intervalTime = 30

setInterval(() => {


    const output = {
        leftStick: getLeftStickFromGamepad(gamepads[0]),
        rightStick: getRighttickFromGamepad(gamepads[0]),
        buttons: getButtonObjectFromGamepad(gamepads[0])
    } // when we get out output method, we can send this object to it
}, intervalTime)