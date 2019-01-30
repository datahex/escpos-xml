import { BufferBuilder } from "../../buffer-builder";
import  iposprintercommand  from "./iposprintercommand";
import { ALIGNMENT } from "../../command";

export default class IposPrinter extends BufferBuilder {

    command: iposprintercommand;

    constructor() {              
        super(new iposprintercommand());        
    }


    lineFeed(): BufferBuilder {           
        this.buffer.write('\n', 'ascii');        
        return this;
    }

    breakLine(n: number=1): BufferBuilder {
        for(let i=1; i<=n; i++) this.lineFeed();
        return this;
    }

    printText(text: string): BufferBuilder {
        this.buffer.write(text, 'ascii');
        return this;
    }
    
    printTextLine(text: string): BufferBuilder {
        return this.printText(text).breakLine();
    }

    public printBarcode(data: string, barcodeSystem: number, width: number = this.command.BARCODE_WIDTH, height: number = 162, labelFont: number = this.command.BARCODE_LABEL_FONT, labelPosition: number = this.command.BARCODE_LABEL_POSITION, leftSpacing: number = 0): BufferBuilder {        
        /*this.startAlign(ALIGNMENT.CENTER);
        this.buffer.write(this.command.GS_h(100)); // height        
        this.buffer.write(this.command.GS_H(labelPosition)); // HRI font
        barcodeSystem = barcodeSystem = 72 ? 73 : barcodeSystem;
        this.buffer.write(this.command.GS_K(barcodeSystem, data.length)); // data is a string in UTF-8        
        this.buffer.write(data, 'ascii');        
        this.resetAlign();    
        return this;*/
        this.printQRcode(data);
        return this;
      }
    
      public printQRcode(data: string, version: number = 1, errorCorrectionLevel: number = 49, componentTypes: number = 8): BufferBuilder {
        this.buffer.write([0x1D,"(k",data.length+3,0,49,80,48,data]);

		  //error correction function 69
        this.buffer.write([0x1D,"(k",3,0,49,69,errorCorrectionLevel]);

		this.buffer.write([0x1D,"(k",3,0,49,67,componentTypes]);//1<= n <= 16
		  
		  //print function 81
		this.buffer.write([0x1D,"(k",3,0,49,81,48]); //m  
        return this;
      }
}