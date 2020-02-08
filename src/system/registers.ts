import Memory from './memory'

interface Register {
  label: string
  save: boolean
}

const definitions: Register[] = [
  { label: 'ip', save: true },
  { label: 'sp', save: false },
  { label: 'fp', save: false },
  { label: 'flg', save: false },
  { label: 'r0', save: true },
  { label: 'r1', save: true },
  { label: 'r2', save: true },
  { label: 'r3', save: true },
  { label: 'r4', save: true },
  { label: 'r5', save: true },
  { label: 'r6', save: true },
  { label: 'r7', save: true },
]

export default class Registers {
  definitions: Register[] = definitions
  data: Memory
  [key: string]: any

  constructor() {
    this.data = new Memory(definitions.length * 2)
    definitions.forEach((register, index) => {
      Object.defineProperty(this, register.label, {
        get: () => this.data.readWord(index * 2),
        set: (value) => this.data.writeWord(index * 2, value),
      })
    })
  }

  get(index: number): number {
    return this.data.readWord(index * 2)
  }

  set(index: number, value: number): void {
    this.data.writeWord(index * 2, value)
  }
}
