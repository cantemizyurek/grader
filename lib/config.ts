export const config = {
  grading: {
    submissionDeadline: new Date('7/2/2025 23:59:59'),
    penalties: {
      lateDayPenalty: 4,
    },
    bonuses: {
      discordSharePoints: 1,
      socialSharePoints: 2,
    },
  },
} as const