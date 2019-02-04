import { Command, BARCODE_WIDTH } from '../../command';

export default class iposprintercommand extends Command {
  BARCODE_WIDTH = BARCODE_WIDTH.DOT_750;
  public GS_L(n: number, m: number): number[]  { return  [this.GS, 0x4C, n, m]; } // GS_L n = LEFT, m = HEIGHT
  ESC_d(n: number): number[]  { return  [this.ESC, this.NL, n]; } // ESCdn  
}
