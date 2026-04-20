const VALID = ['tef-prep', 'tcf-prep', 'delf-dalf-prep', 'general', 'conversation'] as const
export type SessionGoalValue = typeof VALID[number]

export class SessionGoal {
  private constructor(private readonly value: SessionGoalValue) {}

  static create(raw: string): SessionGoal {
    if (!(VALID as readonly string[]).includes(raw)) {
      throw new Error(`Invalid session goal: "${raw}"`)
    }
    return new SessionGoal(raw as SessionGoalValue)
  }

  toString(): string { return this.value }
}
