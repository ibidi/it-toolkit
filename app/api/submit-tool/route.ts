import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, category, description, language, code, usage, features } = body

    // Validation
    if (!name || !category || !description || !language || !code) {
      return NextResponse.json(
        { error: 'Tüm zorunlu alanları doldurun' },
        { status: 400 }
      )
    }

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Telegram credentials missing')
      return NextResponse.json(
        { error: 'Sistem yapılandırması eksik' },
        { status: 500 }
      )
    }

    // Format message for Telegram
    const message = `
🆕 *Yeni Araç İsteği*

📝 *İsim:* ${name}
📂 *Kategori:* ${category}
💬 *Açıklama:* ${description}
💻 *Dil:* ${language}
🔧 *Kullanım:* ${usage || 'Belirtilmedi'}

✨ *Özellikler:*
${features ? features.split('\n').map((f: string) => `• ${f}`).join('\n') : 'Belirtilmedi'}

📄 *Kod:*
\`\`\`${language}
${code.substring(0, 500)}${code.length > 500 ? '...' : ''}
\`\`\`

_Tam kodu görmek için web paneline bakın_
    `.trim()

    // Send to Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [
                { text: '✅ Onayla', callback_data: `approve_${Date.now()}` },
                { text: '❌ Reddet', callback_data: `reject_${Date.now()}` },
              ],
            ],
          },
        }),
      }
    )

    if (!telegramResponse.ok) {
      throw new Error('Telegram API hatası')
    }

    return NextResponse.json({
      success: true,
      message: 'İsteğiniz başarıyla gönderildi! En kısa sürede değerlendirilecektir.',
    })
  } catch (error) {
    console.error('Submit tool error:', error)
    return NextResponse.json(
      { error: 'Bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    )
  }
}
