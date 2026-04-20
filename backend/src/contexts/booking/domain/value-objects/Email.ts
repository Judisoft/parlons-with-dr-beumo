export class Email {
  private constructor(private readonly value: string) {}

  static create(raw: string): Email {
    const trimmed = raw.trim().toLowerCase()
    if (!/^\S+@\S+\.\S+$/.test(trimmed)) throw new Error(`Invalid email address: "${raw}"`)
    return new Email(trimmed)
  }

  toString(): string { return this.value }
}
