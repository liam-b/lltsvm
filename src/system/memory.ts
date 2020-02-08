export interface Addressable {
  length: number

  readByte(address: number): number
  readWord(address: number): number
  writeByte(address: number, value: number): void
  writeWord(address: number, value: number): void
}

export default class Memory implements Addressable {
  private buffer: ArrayBuffer
  view: DataView

  constructor(public length: number) {
    this.buffer = new ArrayBuffer(length)
    this.view = new DataView(this.buffer)
  }

  readByte(address: number): number {
    return this.view.getUint8(address)
  }

  readWord(address: number): number {
    return this.view.getUint16(address)
  }

  writeByte(address: number, value: number): void {
    this.view.setUint8(address, value)
  }

  writeWord(address: number, value: number): void {
    this.view.setUint16(address, value)
  }
}

// export class RestrictedAddressable implements Addressable {
//   length: number
  
//   constructor(public memory: Addressable, public start: number, public end: number) {
//     this.length = end - start
//   }

//   private isAddressWithinBounds(address: number): boolean {
//     return address >= this.start && address <= this.end
//   }

//   readByte(address: number): number {
//     if (this.isAddressWithinBounds(address)) return this.memory.readByte(address)
//   }

//   readWord(address: number): number {
//     if (this.isAddressWithinBounds(address)) return this.memory.readWord(address)
//   }

//   writeByte(address: number, value: number): void {
//     if (this.isAddressWithinBounds(address)) this.memory.writeByte(address, value)
//   }

//   writeWord(address: number, value: number): void {
//     if (this.isAddressWithinBounds(address)) this.memory.writeWord(address, value)
//   }
// }
