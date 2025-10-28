import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Telegram callback query
    if (body.callback_query) {
      const callbackData = body.callback_query.data
      const messageText = body.callback_query.message.text

      // Parse tool data from message
      const toolData = parseToolFromMessage(messageText)

      if (callbackData.startsWith('approve_')) {
        // Add to pending tools
        await addPendingTool(toolData)

        // Reply to Telegram
        await sendTelegramMessage(
          body.callback_query.message.chat.id,
          '✅ Araç onaylandı ve önizleme olarak eklendi!'
        )
      } else if (callbackData.startsWith('reject_')) {
        await sendTelegramMessage(
          body.callback_query.message.chat.id,
          '❌ Araç reddedildi.'
        )
      }
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
  }
}

function parseToolFromMessage(text: string) {
  const lines = text.split('\n')
  const data: Record<string, string | string[] | boolean> = {}

  lines.forEach(line => {
    if (line.includes('*İsim:*')) data.name = line.split('*İsim:*')[1].trim()
    if (line.includes('*Kategori:*')) data.category = line.split('*Kategori:*')[1].trim().toLowerCase()
    if (line.includes('*Açıklama:*')) data.description = line.split('*Açıklama:*')[1].trim()
    if (line.includes('*Dil:*')) data.language = line.split('*Dil:*')[1].trim().toLowerCase()
    if (line.includes('*Kullanım:*')) data.usage = line.split('*Kullanım:*')[1].trim()
  })

  // Generate ID
  data.id = (data.name as string)?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'tool-' + Date.now()
  data.fileName = `${data.id}.${data.language === 'python' ? 'py' : 'bat'}`
  data.features = ['Önizleme aracı', 'Topluluk katkısı']
  data.code = '# Kod yakında eklenecek'
  data.example = '# Örnek çıktı yakında eklenecek'
  data.isPending = true

  return data
}

async function addPendingTool(toolData: Record<string, string | string[] | boolean>) {
  const filePath = path.join(process.cwd(), 'lib', 'pending-tools.json')
  let pendingTools = []

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    pendingTools = JSON.parse(fileContent)
  } catch {
    // File doesn't exist or is empty
  }

  pendingTools.push(toolData)
  fs.writeFileSync(filePath, JSON.stringify(pendingTools, null, 2))
}

async function sendTelegramMessage(chatId: string, text: string) {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN

  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  })
}
