MxLaser.init(
)
basic.forever(function () {
    serial.writeString("Distance=")
    serial.writeNumber(MxLaser.readDistance())
    serial.writeLine("mm")
    basic.pause(25)
})
    