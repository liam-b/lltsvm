import CPU from './cpu'
import Memory from './memory'
import instructions from './instructions'

const memory = new Memory(256)
const cpu = new CPU(memory, instructions)

// memory.writeByte(0, 0x01)
// memory.writeByte(1, 0x12)
// memory.writeByte(2, 0x34)
// memory.writeByte(3, 0x03)

// memory.writeByte(4, 0x02)
// memory.writeByte(5, 0x00)
// memory.writeByte(6, 0x01)

memory.writeByte(7, 0xff)

cpu.step()
cpu.debug()
cpu.step()
cpu.debug()
cpu.step()
cpu.debug()
cpu.step()
cpu.debug()
cpu.step()
cpu.debug()
cpu.step()
cpu.debug()
cpu.step()
cpu.debug()
cpu.step()
cpu.debug()
cpu.step()
cpu.debug()

// console.log(cpu.instructions[255].operation(cpu))
