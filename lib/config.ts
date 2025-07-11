export const config = {
  assignmentId: '2',
  assignmentName: 'Pythonic RAG',
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
  googleSheets: {
    spreadsheetId: '1MieWoYNk00Vn7_DtSzThPdD2vnI_1NWSRcTjqap2AAs' as string,
    spreadsheetName: 'Student Grading Data',
    graderName: 'Can Temizyurek',
  },
} as const
