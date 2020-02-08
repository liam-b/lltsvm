import Registers from './registers'
import { Addressable } from './memory';

export default class Stack {
  frameSize: number = 0

  constructor(public registers: Registers, public memory: Addressable) {
    registers.sp = memory.length - 1 - 2
    registers.fp = memory.length - 1 - 2
  }

  push(value: number): void {
    this.memory.writeWord(this.registers.sp, value)
    this.registers.sp -= 2
    this.frameSize += 2;
  }

  pop(): number {
    this.registers.sp += 2
    this.frameSize -= 2;
    return this.memory.readWord(this.registers.sp)
  }

  pushFrame(): void {
    this.registers.definitions.forEach((register, index) => {
      if (register.save) this.push(this.registers.get(index))
    })

    this.push(this.frameSize + 2)
    this.registers.fp = this.registers.sp
    this.frameSize = 0
  }

  popFrame(): void {
    const frameAddress = this.registers.fp
    this.registers.sp = frameAddress
    const stackFrameSize = this.pop()

    this.registers.definitions.forEach((register, index) => {
      if (register.save) this.registers.set(index, this.pop())
    })

    const args = this.pop()
    this.registers.sp += 2 * args
    this.frameSize -= 2 * args
    this.registers.fp = frameAddress + stackFrameSize
  }
}
