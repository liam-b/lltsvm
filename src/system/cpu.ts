import { Addressable } from './memory'
import Registers from './registers'
import Stack from './stack'
import { Instruction, instructions } from './instructions'
import { MemoryMapper } from './mapper'

export default class CPU {
  instructions: Instruction[] = instructions
  registers: Registers
  stack: Stack

  constructor(public memory: MemoryMapper, stackMemory: Addressable) {
    this.registers = new Registers()
    this.stack = new Stack(this.registers, stackMemory)
  }

  fetchByte(): number {
    const address = this.registers.ip
    const data = this.memory.readByte(address)
    this.registers.ip += 1
    return data
  }

  fetchWord(): number {
    const address = this.registers.ip
    const data = this.memory.readWord(address)
    this.registers.ip += 2
    return data
  }

  debug(): void {
    console.log('registers:')
    for (const [index, reg] of this.registers.definitions.entries()) {
      console.log(`${(reg.label + ':').padEnd(4, ' ')} 0x${this.registers.get(index).toString(16).padStart(4, '0')}`)
    }
    console.log()
    // console.log('memory:')
    // console.log(this.memory.regions[0].device)
    // console.log()
  }

  execute(opcode: number): boolean {
    const instruction = this.instructions[opcode]
    const operands = instruction.operands.map((operandType): number => {
      if (operandType.bytes == 1) return this.fetchByte()
      else if (operandType.bytes == 2) return this.fetchWord()
    })

    return instruction.operation(this, operands) as boolean
  }

  step(): boolean {
    const instruction = this.fetchByte()
    const halt = this.execute(instruction)
    this.debug()
    return halt
  }

  run(): void {
    const halt = this.step();
    if (!halt) {
      setImmediate(() => this.run());
    }
  }
}
