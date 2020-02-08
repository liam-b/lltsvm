import { Addressable } from './memory';

interface Region {
  device: Addressable,
  start: number,
  end: number,
  remap: boolean
}

export class MemoryMapper implements Addressable {
  constructor(public length: number, public start: number = 0, public end: number = 0, public regions: Region[] = []) {
    if (end == 0) this.end = length
  }

  map(device: Addressable, start: number, end: number, remap: boolean = false) {
    this.regions.unshift({
      device, start, end, remap
    })

    return device
  }

  restricted(start: number, end: number): MemoryMapper {
    return new MemoryMapper(this.length, start, this.end, this.regions)
  }

  private findRegion(address: number): Region {
    const region = this.regions.find(region => address >= region.start && address < region.end)
    if (!region) throw new Error(`No memory region found for address ${address}`)
    return region
  }

  private mapAddress(region: Region, address: number): number {
    if (region.remap) address -= region.start
    if (address >= this.start && address < this.end) return address
  }

  readByte(address: number): number {
    const region = this.findRegion(address);
    return region.device.readByte(this.mapAddress(region, address))
  }

  readWord(address: number): number {
    const region = this.findRegion(address);
    return region.device.readWord(this.mapAddress(region, address))
  }

  writeByte(address: number, value: number): void {
    const region = this.findRegion(address);
    return region.device.writeByte(this.mapAddress(region, address), value);
  }

  writeWord(address: number, value: number): void {
    const region = this.findRegion(address);
    return region.device.writeWord(this.mapAddress(region, address), value);
  }
}
