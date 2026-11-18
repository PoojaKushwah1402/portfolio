// Cloudflare Pages Function: POST /api/contact → Slack chat.postMessage
// Secrets (Cloudflare Pages → Settings → Variables and Secrets): SLACK_BOT_TOKEN, SLACK_CHANNEL_ID

interface Env {
  SLACK_BOT_TOKEN?: string
  SLACK_CHANNEL_ID?: string
}

interface ContactPayload {
  message?: unknown
  email?: unknown
  company?: unknown
}

const MAX_MESSAGE_LENGTH = 2000
const MAX_EMAIL_LENGTH = 200
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })

const asTrimmedString = (value: unknown) => (typeof value === 'string' ? value.trim() : '')

const escapeSlack = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const buildSlackText = (message: string, email: string, country: string | null) => {
  const quoted = escapeSlack(message).split('\n').map((line) => `>${line}`).join('\n')
  const replyTo = email ? `<mailto:${email}|${escapeSlack(email)}>` : '_no email left_'
  const origin = country ? ` · ${country}` : ''
  return `:wave: *New message from poojakushwah.com*${origin}\n*Reply to:* ${replyTo}\n${quoted}`
}

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  if (!env.SLACK_BOT_TOKEN || !env.SLACK_CHANNEL_ID) return json(500, { error: 'not_configured' })

  let payload: ContactPayload
  try {
    payload = await request.json()
  } catch {
    return json(400, { error: 'invalid_json' })
  }

  // honeypot filled → pretend success so bots move on
  if (asTrimmedString(payload.company)) return json(200, { ok: true })

  const message = asTrimmedString(payload.message)
  const email = asTrimmedString(payload.email)
  if (!message || message.length > MAX_MESSAGE_LENGTH) return json(400, { error: 'invalid_message' })
  if (email && (email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email))) return json(400, { error: 'invalid_email' })

  const slackRes = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8', authorization: `Bearer ${env.SLACK_BOT_TOKEN}` },
    body: JSON.stringify({
      channel: env.SLACK_CHANNEL_ID,
      text: buildSlackText(message, email, request.headers.get('cf-ipcountry')),
      unfurl_links: false,
    }),
  })
  const result = (await slackRes.json()) as { ok: boolean; error?: string }
  if (!result.ok) {
    console.error('slack_post_failed', result.error)
    return json(502, { error: 'delivery_failed' })
  }
  return json(200, { ok: true })
}
