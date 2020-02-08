import Registers from './registers'

export default class CPU {
  constructor(memory, instructions) {
    this.memory = memory
    this.instructions = instructions
    this.registers = new Registers([
      'ip', 'sp', 'fp', 'flg',
      'r0', 'r1', 'r2', 'r3',
      'r4', 'r5', 'r6', 'r7'
    ])
  }

  fetchByte() {
    const address = this.registers.ip
    const data = this.memory.readByte(address)
    this.registers.ip += 1
    return data
  }

  fetchWord() {
    return this.fetchByte() << 8 | this.fetchByte()
  }

  debug() {
    for (const index in this.registers.names) {
      console.log(`${(this.registers.names[index] + ':').padEnd(4, ' ')} 0x${this.registers.get(index).toString(16).padStart(4, '0')}`)
    }
    console.log()
  }

  execute(instruction) {
    return this.instructions[instruction].operation(this)
  }

  step() {
    const instruction = this.fetchByte()
    console.log('got instruction byte:', instruction)
    return this.execute(instruction)
  }

  run() {
    const halt = this.step();
    if (!halt) {
      setImmediate(() => this.run());
    }
  }
}
