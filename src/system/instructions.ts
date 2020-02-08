import CPU from './cpu'

export class Operand {
  constructor(public label: string, public bytes: number) {}
  
  static Opcode = new Operand('opcode', 1)
  static Register = new Operand('register', 1)
  static Literal = new Operand('literal', 2)
  static Address = new Operand('address', 2)
}

export interface Instruction {
  label: string
  operands: Operand[]
  operation: (cpu: CPU, operands: number[]) => boolean | void
}

export const instructions: Instruction[] = [
  {
    label: 'nop',
    operands: [],
    operation: () => {}
  },
  {
    label: 'lit',
    operands: [Operand.Literal, Operand.Register],
    operation: (cpu, operands) => {
      const literal = operands[0]
      const register = operands[1]
      cpu.registers.set(register, literal)
    }
  },
  {
    label: 'mov',
    operands: [Operand.Register, Operand.Register],
    operation: (cpu, operands) => {
      const value = cpu.registers.get(operands[0])
      const destination = operands[1]
      cpu.registers.set(destination, value)
    }
  },
  {
    label: 'sto',
    operands: [Operand.Register, Operand.Address],
    operation: (cpu, operands) => {
      const value = cpu.registers.get(operands[0])
      const address = operands[1]
      cpu.memory.writeWord(address, value)
    }
  },
  {
    label: 'lod',
    operands: [Operand.Address, Operand.Register],
    operation: (cpu, operands) => {
      const value = cpu.memory.readWord(operands[0])
      const register = operands[1]
      cpu.registers.set(register, value)
    }
  },
  {
    label: 'psh',
    operands: [Operand.Literal],
    operation: (cpu, operands) => {
      cpu.stack.push(operands[0])
    }
  },
  {
    label: 'psh',
    operands: [Operand.Register],
    operation: (cpu, operands) => {
      const value = cpu.registers.get(operands[0])
      cpu.stack.push(value)
    }
  },
  {
    label: 'pop',
    operands: [Operand.Register],
    operation: (cpu, operands) => {
      const value = cpu.stack.pop()
      cpu.registers.set(operands[0], value)
    }
  },
  {
    label: 'hlt',
    operands: [],
    operation: () => true
  }
]

// export default {
//   0x00: new Instruction('nop', (cpu) => {}),

//   0x01: new Instruction('mov', (cpu) => {
//     const value = cpu.registers.get(cpu.fetchByte())
//     cpu.registers.set(cpu.fetchByte(), value)
//   }),

//   0x02: new Instruction('lit', (cpu) => {
//     const literal = cpu.fetchWord()
//     cpu.registers.set(cpu.fetchByte(), literal)
//   }),

//   0x03: new Instruction('stor', (cpu) => {
//     const value = cpu.registers.get(cpu.fetchByte())
//     const address = cpu.fetchWord()
//     cpu.memory.writeWord(address, value)
//   }),

//   0x04: new Instruction('stol', (cpu) => {
//     const literal = cpu.fetchWord()
//     const address = cpu.fetchWord()
//     cpu.memory.writeWord(address, literal)
//   }),

//   0x05: new Instruction('lod', (cpu) => {
//     const address = cpu.fetchWord()
//     const value = cpu.memory.readWord(address)
//     cpu.registers.set(cpu.fetchByte(), value)
//   }),

//   0x06: new Instruction('add', (cpu) => {
//     const value1 = cpu.registers.get(cpu.fetchByte())
//     const value2 = cpu.registers.get(cpu.fetchByte())
//     console.log(value1 + value2)
//     cpu.registers.acc = value1 + value2
//   }),

//   0xff: new Instruction('hlt', (cpu) => true),
// }

// arg and par
