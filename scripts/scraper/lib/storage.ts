import { PrismaClient } from '../../../app/generated/prisma/index.js'
import type { DiagramExample } from '../types'

const prisma = new PrismaClient()

export async function saveDiagrams(examples: DiagramExample[]): Promise<number> {
  let saved = 0

  for (const example of examples) {
    try {
      await prisma.diagram.upsert({
        where: {
          // Composite unique key based on source and title
          id: `${example.source}-${example.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
        },
        update: {
          title: example.title,
          description: example.description,
          category: example.category,
          type: example.type,
          imageUrl: example.imageUrl,
          code: example.code,
          tags: example.tags,
        },
        create: {
          id: `${example.source}-${example.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
          title: example.title,
          description: example.description,
          source: example.source,
          category: example.category,
          type: example.type,
          imageUrl: example.imageUrl,
          code: example.code,
          tags: example.tags,
        }
      })
      saved++
    } catch (error) {
      console.error(`Failed to save diagram "${example.title}":`, error)
    }
  }

  return saved
}

export async function getDiagramCount(): Promise<number> {
  return await prisma.diagram.count()
}

export async function getDiagramsBySource(source: string) {
  return await prisma.diagram.findMany({
    where: { source }
  })
}

export { prisma }
