import { chromium, Browser, Page } from '@playwright/test'
import * as fs from 'fs'

interface DiagramTest {
  type: 'linear' | 'non-linear' | 'ai'
  title: string
  url: string
  hasAdvanced: boolean
  error?: string
  screenshot?: string
}

async function testAllDiagrams() {
  const browser: Browser = await chromium.launch({ headless: false })
  const context = await browser.newContext()
  const page: Page = await context.newPage()

  const results: DiagramTest[] = []
  const baseUrl = 'http://localhost:5173'

  console.log('🚀 Starting comprehensive diagram test...\n')

  // Test Linear workflows
  console.log('📊 Testing Linear Workflows...')
  await page.goto(`${baseUrl}/linear`)
  await page.waitForTimeout(2000)

  const linearWorkflows = await page.$$eval('main section > div > div', (cards) => {
    return cards.map((card) => {
      const titleEl = card.querySelector('h3')
      return titleEl?.textContent?.trim() || ''
    }).filter(Boolean)
  })

  console.log(`Found ${linearWorkflows.length} linear workflows\n`)

  for (const title of linearWorkflows) {
    console.log(`  Testing: ${title}`)
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    const url = `/linear/${slug}-diagram`

    try {
      await page.goto(`${baseUrl}${url}`)
      await page.waitForTimeout(1500)

      // Check for errors
      const hasError = await page.locator('.bg-red-50, .text-red-700').count() > 0

      // Check for advanced view
      const hasAdvanced = await page.locator('[data-advanced="true"]').count() > 0

      results.push({
        type: 'linear',
        title,
        url,
        hasAdvanced,
        error: hasError ? 'Rendering error detected' : undefined
      })

      if (hasError) {
        console.log(`    ❌ ERROR rendering diagram`)
      } else {
        console.log(`    ✅ OK`)
      }
    } catch (err) {
      results.push({
        type: 'linear',
        title,
        url,
        hasAdvanced: false,
        error: err instanceof Error ? err.message : 'Unknown error'
      })
      console.log(`    ❌ FAILED: ${err}`)
    }
  }

  // Test Non-linear workflows
  console.log('\n📊 Testing Non-Linear Workflows...')
  await page.goto(`${baseUrl}/non-linear`)
  await page.waitForTimeout(2000)

  const nonLinearWorkflows = await page.$$eval('main section > div > div', (cards) => {
    return cards.map((card) => {
      const titleEl = card.querySelector('h3')
      return titleEl?.textContent?.trim() || ''
    }).filter(Boolean)
  })

  console.log(`Found ${nonLinearWorkflows.length} non-linear workflows\n`)

  for (const title of nonLinearWorkflows) {
    console.log(`  Testing: ${title}`)
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    const url = `/non-linear/${slug}-diagram`

    try {
      await page.goto(`${baseUrl}${url}`)
      await page.waitForTimeout(1500)

      // Check for errors
      const hasError = await page.locator('.bg-red-50, .text-red-700, [class*="error"]').count() > 0

      // Check for advanced view
      const hasAdvanced = await page.locator('[data-advanced="true"]').count() > 0

      results.push({
        type: 'non-linear',
        title,
        url,
        hasAdvanced,
        error: hasError ? 'Rendering error detected' : undefined
      })

      if (hasError) {
        console.log(`    ❌ ERROR rendering diagram`)
      } else {
        console.log(`    ✅ OK`)
      }
    } catch (err) {
      results.push({
        type: 'non-linear',
        title,
        url,
        hasAdvanced: false,
        error: err instanceof Error ? err.message : 'Unknown error'
      })
      console.log(`    ❌ FAILED: ${err}`)
    }
  }

  // Test AI Workflows
  console.log('\n🧠 Testing AI Workflows Page...')
  await page.goto(`${baseUrl}/ai-workflows`)
  await page.waitForTimeout(2000)

  const aiWorkflows = await page.$$eval('main section > div > div', (cards) => {
    return cards.map((card) => {
      const titleEl = card.querySelector('h3')
      return titleEl?.textContent?.trim() || ''
    }).filter(Boolean)
  })

  console.log(`Found ${aiWorkflows.length} AI workflows\n`)

  for (const title of aiWorkflows) {
    console.log(`  Testing: ${title}`)

    try {
      // AI workflows are displayed on the same page, just check for errors
      const hasError = await page.locator('.bg-red-50, .text-red-700, [class*="error"]').count() > 0

      results.push({
        type: 'ai',
        title,
        url: `/ai-workflows`,
        hasAdvanced: false,
        error: hasError ? 'Rendering error detected' : undefined
      })

      if (hasError) {
        console.log(`    ❌ ERROR rendering diagram`)
      } else {
        console.log(`    ✅ OK`)
      }
    } catch (err) {
      results.push({
        type: 'ai',
        title,
        url: `/ai-workflows`,
        hasAdvanced: false,
        error: err instanceof Error ? err.message : 'Unknown error'
      })
      console.log(`    ❌ FAILED: ${err}`)
    }
  }

  await browser.close()

  // Generate report
  console.log('\n\n📋 TEST SUMMARY')
  console.log('='.repeat(60))

  const totalTests = results.length
  const failedTests = results.filter(r => r.error).length
  const passedTests = totalTests - failedTests

  console.log(`Total: ${totalTests}`)
  console.log(`Passed: ${passedTests}`)
  console.log(`Failed: ${failedTests}`)
  console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`)

  if (failedTests > 0) {
    console.log('\n❌ FAILED TESTS:')
    results.filter(r => r.error).forEach(r => {
      console.log(`  - ${r.title} (${r.type})`)
      console.log(`    ${r.error}`)
    })
  }

  // Save results to JSON
  fs.writeFileSync(
    'test-results.json',
    JSON.stringify(results, null, 2)
  )

  console.log('\n💾 Results saved to test-results.json')

  return results
}

testAllDiagrams().catch(console.error)
