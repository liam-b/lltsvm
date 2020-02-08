import Memory from './memory'

export default class Registers {
  constructor(names) {
    this.names = names
    this.data = new Memory(names.length * 2)

    for (const [index, name] of names.entries()) {
      Object.defineProperty(this, name, {
        get: () => this.data.readWord(index * 2),
        set: (value) => this.data.writeWord(index * 2, value)
      })
    }
  }

  get(index) {
    return this.data.readWord(index * 2)
  }

  set(index, value) {
    this.data.writeWord(index * 2, value)
  }
}
