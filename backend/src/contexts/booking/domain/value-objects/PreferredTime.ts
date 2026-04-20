const VALID = ['morning', 'afternoon', 'evening'] as const
export type PreferredTimeValue = typeof VALID[number]

export class PreferredTime {
  private constructor(private readonly value: PreferredTimeValue) {}

  static create(raw: string): PreferredTime {
    if (!(VALID as readonly string[]).includes(raw)) {
      throw new Error(`Invalid preferred time: "${raw}"`)
    }
    return new PreferredTime(raw as PreferredTimeValue)
  }

  toString(): string { return this.value }
}
