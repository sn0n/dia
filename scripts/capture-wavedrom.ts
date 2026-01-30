import { chromium } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'

const failingWaveDromDiagrams = [
    {
        name: 'WaveDrom Timing Diagram 1',
        code: '{ signal: [{ name: "Alfa", wave: "01.zx=ud.23.456789" }] }'
    },
    {
        name: 'WaveDrom Timing Diagram 2',
        code: '{ signal: [\n  { name: "pclk", wave: \'p.......\' },\n  { name: "Pclk", wave: \'P.......\' },\n  { name: "nclk", wave: \'n.......\' },\n  { name: "Nclk", wave: \'N.......\' },\n  {},\n  { name: \'clk0\', wave: \'phnlPHNL\' },\n  { name: \'clk1\', wave: \'xhlhLHl.\' },\n  { name: \'clk2\', wave: \'hpHplnLn\' },\n  { name: \'clk3\', wave: \'nhNhplPl\' },\n  { name: \'clk4\', wave: \'xlh.L.Hx\' },\n]}'
    },
    {
        name: 'WaveDrom Timing Diagram 3',
        code: '{ signal: [\n  { name: "clk",  wave: "P......" },\n  { name: "bus",  wave: "x.==.=x", data: ["head", "body", "tail", "data"] },\n  { name: "wire", wave: "0.1..0." }\n]}'
    },
    {
        name: 'WaveDrom Timing Diagram 4',
        code: '{ signal: [\n  { name: "clk",         wave: "p.....|..." },\n  { name: "Data",        wave: "x.345x|=.x", data: ["head", "body", "tail", "data"] },\n  { name: "Request",     wave: "0.1..0|1.0" },\n  {},\n  { name: "Acknowledge", wave: "1.....|01." }\n]}'
    },
    {
        name: 'WaveDrom Timing Diagram 5',
        code: '{ signal: [\n  {    name: \'clk\',   wave: \'p..Pp..P\'},\n  [\'Master\',\n    [\'ctrl\',\n      {name: \'write\', wave: \'01.0....\'},\n      {name: \'read\',  wave: \'0...1..0\'}\n    ],\n    {  name: \'addr\',  wave: \'x3.x4..x\', data: \'A1 A2\'},\n    {  name: \'wdata\', wave: \'x3.x....\', data: \'D1\'   },\n  ],\n  {},\n  [\'Slave\',\n    [\'ctrl\',\n      {name: \'ack\',   wave: \'x01x0.1x\'},\n    ],\n    {  name: \'rdata\', wave: \'x.....4x\', data: \'Q2\'},\n  ]\n]}'
    },
    {
        name: 'WaveDrom Timing Diagram 6',
        code: '{ signal: [\n  { name: "CK",   wave: "P.......",                                              period: 2  },\n  { name: "CMD",  wave: "x.3x=x4x=x=x=x=x", data: "RAS NOP CAS NOP NOP NOP NOP", phase: 0.5 },\n  { name: "ADDR", wave: "x.=x..=x........", data: "ROW COL",                     phase: 0.5 },\n  { name: "DQS",  wave: "z.......0.1010z." },\n  { name: "DQ",   wave: "z.........5555z.", data: "D0 D1 D2 D3" }\n]}'
    },
    {
        name: 'WaveDrom Timing Diagram 7',
        code: '{ signal: [\n  { name: "clk",     wave: "p....." },\n  { name: "Data",    wave: "x345x",  data: ["head", "body", "tail"] },\n  { name: "Request", wave: "01..0" }\n  ],\n  config: { hscale: 1 }\n}'
    },
    {
        name: 'WaveDrom Timing Diagram 10',
        code: '{signal: [\n  {name:\'clk\',         wave: \'p....\' },\n  {name:\'Data\',        wave: \'x345x\', data: \'a b c\' },\n  {name:\'Request\',     wave: \'01..0\' }\n],\n head:{\n   text:\'WaveDrom example\',\n   tick:0,\n   every:2\n },\n foot:{\n   text:\'Figure 100\',\n   tock:9\n },\n}'
    }
]

async function captureWaveDromDiagrams() {
    console.log('🎨 Capturing WaveDrom diagrams...\n')

    const browser = await chromium.launch({ headless: true })
    const context = await browser.newContext()
    const page = await context.newPage()

    // Create output directory
    const outputDir = path.join(process.cwd(), 'public', 'wavedrom-diagrams')
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
    }

    for (let i = 0; i < failingWaveDromDiagrams.length; i++) {
        const diagram = failingWaveDromDiagrams[i]
        console.log(`  Rendering: ${diagram.name}`)

        try {
            // Create HTML page with WaveDrom
            const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <script src="https://wavedrom.com/skins/default.js" type="text/javascript"></script>
          <script src="https://wavedrom.com/wavedrom.min.js" type="text/javascript"></script>
        </head>
        <body style="margin: 20px; background: white;">
          <div id="wave"></div>
          <script type="text/javascript">
            const waveData = ${diagram.code};
            WaveDrom.RenderWaveForm(0, waveData, "wave");
          </script>
        </body>
        </html>
      `

            await page.setContent(html)
            await page.waitForTimeout(2000) // Wait for WaveDrom to render

            // Get the SVG element
            const svgElement = await page.locator('#wave svg').first()

            if (await svgElement.count() > 0) {
                // Take screenshot of the SVG
                const filename = `wavedrom-${i + 1}.png`
                await svgElement.screenshot({
                    path: path.join(outputDir, filename),
                    omitBackground: true
                })
                console.log(`    ✅ Saved: ${filename}`)
            } else {
                console.log(`    ❌ Failed to render diagram`)
            }
        } catch (error) {
            console.log(`    ❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
    }

    await browser.close()

    console.log(`\n✅ WaveDrom diagrams captured to ${outputDir}`)
    console.log('\nNow update scraped-diagrams.ts to use image URLs instead of code.')
}

captureWaveDromDiagrams().catch(console.error)
