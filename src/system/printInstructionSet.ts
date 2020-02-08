import { instructions } from './instructions'

for (const [index, instruction] of instructions.entries()) {
  const operandLabels = instruction.operands.map((operand) => operand.label)
  console.log(`0x${index.toString(16).padStart(2, '0')}: ${instruction.label} [${operandLabels.join(', ')}]`)
}
