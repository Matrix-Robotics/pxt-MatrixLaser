//% weight=20 color=#31CE13 icon="\uf030" block="MxLaser"
namespace MxLaser{

    const MxLaser_ADDR = 0x26

    enum LaserReg
    {
        Device_ID = 1,
        Device_CONFIG,
		Distance_H,
		Distance_L
    }

    /**
     *start up the Laser sensor
    */
    //%block="start up the Laser sensor"
    //%weight=194 inlineInputMode="external" %blockID="MxLaser_init"
    export function init(): void {
        if(i2cRead(LaserReg.Device_ID) == 0x47){
            i2cWrite(LaserReg.Device_CONFIG, 0x04); // reset
            basic.pause(500);
            i2cWrite(LaserReg.Device_CONFIG, 0x02); // enable
        }
    }  

    /**
     *read distance from sensor
    */
    //%block="read distance from sensor"
    //%weight=191 %blockID="MxLaser_distance"
    export function readDistance(): number {
        if(((i2cRead(LaserReg.Device_CONFIG) & 0x01) == 0)){
            return (i2cRead(LaserReg.Distance_H) << 8) + i2cRead(LaserReg.Distance_L)
        }
        else{
            return 8191;
        }
    }

    function i2cWrite(reg: number, value: number): void {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(MxLaser_ADDR, buf)
    }  
    
    function i2cRead(reg: number): number {
        pins.i2cWriteNumber(MxLaser_ADDR, reg, NumberFormat.UInt8LE)
        return pins.i2cReadNumber(MxLaser_ADDR, NumberFormat.UInt8LE, false)
    }
}
