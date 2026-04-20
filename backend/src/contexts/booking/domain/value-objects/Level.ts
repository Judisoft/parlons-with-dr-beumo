const VALID = ['beginner', 'intermediate', 'advanced'] as const
export type LevelValue = typeof VALID[number]

export class Level {
  private constructor(private readonly value: LevelValue) {}

  static create(raw: string): Level {
    if (!(VALID as readonly string[]).includes(raw)) {
      throw new Error(`Invalid french level: "${raw}"`)
    }
    return new Level(raw as LevelValue)
  }

  toString(): string { return this.value }
}
