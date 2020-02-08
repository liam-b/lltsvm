export default class Memory {
  constructor(length) {
    this.arrayBuffer = new ArrayBuffer(length)
    this.dataView = new DataView(this.arrayBuffer)
    this.length = length
  }

  readByte(address) {
    return this.dataView.getUint8(address)
  }

  readWord(address) {
    return this.dataView.getUint16(address)
  }

  writeByte(address, value) {
    this.dataView.setUint8(address, value)
  }

  writeWord(address, value) {
    this.dataView.setUint16(address, value)
  }
}
