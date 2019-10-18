import { BufferBuilder } from "../../buffer-builder";
import innerprintercommand from "./innerprintercommand";

export default class InnerPrinter extends BufferBuilder {
    command: innerprintercommand;

    constructor() {
        super(new innerprintercommand());
    }

    printBarcode(data: string, barcodeSystem: number, width: number = this.command.BARCODE_WIDTH, height: number = 162, labelFont: number = this.command.BARCODE_LABEL_FONT, labelPosition: number = this.command.BARCODE_LABEL_POSITION, leftSpacing: number = 0): InnerPrinter {
        this.buffer.write(this.command.GS_w(width)); // width
        this.buffer.write(this.command.GS_h(100)); // height
        this.buffer.write(this.command.GS_L(60, 0)); // left spacing
        this.buffer.write(this.command.GS_f(labelFont)); // HRI font
        this.buffer.write(this.command.GS_H(labelPosition)); // HRI font
        this.buffer.write(this.command.GS_K(barcodeSystem, data.length)); // data is a string in UTF-8
        this.buffer.write(data, 'ascii');
        this.lineFeed();
        this.buffer.write(this.command.GS_L(0, 0)); // left spacing
        return this;
    }

    printQRcode(data: string, version: number = 1, errorCorrectionLevel: number = this.command.QR_EC_LEVEL, componentTypes: number = 8): BufferBuilder {

        this.buffer.write([  0x1B , 0x61 , 0x01 ,
                        0x1D , 0x28 , 0x6B , 0x03 , 0x00 , 0x31 , 0x43 , 0x09 ,
                        0x1D , 0x28 , 0x6B , 0x03 , 0x00 , 0x31 , 0x45 , 0x31 ,
                        0x1D , 0x28 , 0x6B , data.length+3 , 0x00, 0x31 , 0x50 , 0x30]);
        this.buffer.write(data, 'ascii');
        this.buffer.write([0x1D , 0x28 , 0x6B , 0x03 , 0x00 , 0x31 , 0x51 , 0x30 , 0x0A ,0x1B , 0x61 , 0x00]);

        return this;
    }
}