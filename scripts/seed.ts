import { PrismaClient } from '../app/generated/prisma/index.js'
import { rawLinearData, rawNonLinearData, complexWorkflows } from '../src/data/workflows.js'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Seed workflows
  const linearWorkflows = rawLinearData.map((item, index) => {
    const [title, description, category] = item.split('|')
    const hasAdvanced = !!(complexWorkflows as any)[title]

    return {
      id: `linear-${index}`,
      title,
      description,
      category: category || 'Uncategorized',
      type: 'linear',
      data: hasAdvanced ? (complexWorkflows as any)[title] : { description }
    }
  })

  const nonLinearWorkflows = rawNonLinearData.map((item, index) => {
    const [title, description, category] = item.split('|')
    const hasAdvanced = !!(complexWorkflows as any)[title]

    return {
      id: `nonlinear-${index}`,
      title,
      description,
      category: category || 'Uncategorized',
      type: 'nonlinear',
      data: hasAdvanced ? (complexWorkflows as any)[title] : { description }
    }
  })

  // Clear existing workflows
  await prisma.workflow.deleteMany()

  // Insert workflows
  for (const workflow of [...linearWorkflows, ...nonLinearWorkflows]) {
    await prisma.workflow.create({
      data: workflow
    })
  }

  console.log(`✓ Seeded ${linearWorkflows.length + nonLinearWorkflows.length} workflows`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
