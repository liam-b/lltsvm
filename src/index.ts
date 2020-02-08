import CPU from './system/cpu'
import Memory from './system/memory'
import { MemoryMapper } from './system/mapper'

const mapper = new MemoryMapper(0xff)
const memory = new Memory(0xff)
mapper.map(memory, 0x00, 0xff)

const stack = mapper.restricted(0x80, 0xff)
const cpu = new CPU(mapper, stack)

let i = 0
memory.writeByte(i++, 0x01)
memory.writeByte(i++, 0x12)
memory.writeByte(i++, 0x34)
memory.writeByte(i++, 0x04)

memory.writeByte(i++, 0x01)
memory.writeByte(i++, 0x56)
memory.writeByte(i++, 0x78)
memory.writeByte(i++, 0x05)

memory.writeByte(i++, 0x06)
memory.writeByte(i++, 0x04)

memory.writeByte(i++, 0x06)
memory.writeByte(i++, 0x05)

memory.writeByte(i++, 0x07)
memory.writeByte(i++, 0x04)

memory.writeByte(i++, 0x07)
memory.writeByte(i++, 0x05)

// memory.writeByte(i++, 0x02)
// memory.writeByte(i++, 0x05)
// memory.writeByte(i++, 0x06)

// memory.writeByte(i++, 0x02)
// memory.writeByte(i++, 0x05)
// memory.writeByte(i++, 0x07)

memory.writeByte(i++, 0x08)

cpu.step()
console.log(memory.view.buffer.slice(-16, -1))
cpu.step()
console.log(memory.view.buffer.slice(-16, -1))
cpu.step()
console.log(memory.view.buffer.slice(-16, -1))
cpu.step()
console.log(memory.view.buffer.slice(-16, -1))
cpu.step()
console.log(memory.view.buffer.slice(-16, -1))
cpu.step()
console.log(memory.view.buffer.slice(-16, -1))
cpu.step()
console.log(memory.view.buffer.slice(-16, -1))
