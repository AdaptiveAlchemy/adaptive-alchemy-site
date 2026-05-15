export const EMAIL_BLOCKLIST: ReadonlyArray<string> = [
  'gmail.com',
  'hotmail.com',
  'yahoo.com',
  'outlook.com',
  'icloud.com'
]

export const isBlockedDomain = (email: string): boolean => {
  const atIndex = email.indexOf('@')
  if (atIndex === -1) {
    return false
  }
  const domain = email.slice(atIndex + 1).toLowerCase()
  return EMAIL_BLOCKLIST.includes(domain)
}
