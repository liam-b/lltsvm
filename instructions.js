class Instruction {
  constructor(name, operation) {
    this.name = name
    this.operation = operation
  }
}

class ExtendedInstruction {
  constructor(name, operands, action) {
    this.name = name
  }
}

export default {
  0x00: new Instruction('nop', (cpu) => {}),

  0x01: new Instruction('mov', (cpu) => {
    const value = cpu.registers.get(cpu.fetchByte())
    cpu.registers.set(cpu.fetchByte(), value)
  }),

  0x02: new Instruction('lit', (cpu) => {
    const literal = cpu.fetchWord()
    cpu.registers.set(cpu.fetchByte(), literal)
  }),

  0x03: new Instruction('stor', (cpu) => {
    const value = cpu.registers.get(cpu.fetchByte())
    const address = cpu.fetchWord()
    cpu.memory.writeWord(address, value)
  }),

  0x04: new Instruction('stol', (cpu) => {
    const literal = cpu.fetchWord()
    const address = cpu.fetchWord()
    cpu.memory.writeWord(address, literal)
  }),

  0x05: new Instruction('lod', (cpu) => {
    const address = cpu.fetchWord()
    const value = cpu.memory.readWord(address)
    cpu.registers.set(cpu.fetchByte(), value)
  }),

  0x06: new Instruction('add', (cpu) => {
    const value1 = cpu.registers.get(cpu.fetchByte())
    const value2 = cpu.registers.get(cpu.fetchByte())
    console.log(value1 + value2)
    cpu.registers.acc = value1 + value2
  }),

  0xff: new Instruction('hlt', (cpu) => true),
}
