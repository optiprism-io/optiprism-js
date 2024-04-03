export function UUID(): string {
  return self.crypto.randomUUID()
}
