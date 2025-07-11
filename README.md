# Grader Setup Guide

## Prerequisites

- Node.js (latest LTS version recommended)
- pnpm package manager

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd grader
```

2. Install dependencies:

```bash
pnpm install
```

## Required Data File

The system requires a CSV file with the following structure:

### CSV File Location

Place your CSV file at: `data/data.csv`

### CSV Format

The CSV file must contain these columns:

- `name` - Student's name
- `email` - Student's email address
- `timestamp` - Submission timestamp
- `notebook` - Notebook submission link/content
- `loom` - Loom video link
- `learned` - What the student learned
- `not-learned` - What the student didn't learn
- `questions` - Student's questions
- `share` - Sharing information

## Configuration

The grading configuration is set in `lib/config.ts`:

- **Submission Deadline**: July 2, 2025 at 11:59:59 PM
- **Late Penalty**: 4 points per day late
- **Bonus Points**:
  - Discord Share: 1 point
  - Social Share: 2 points
- **Google Sheets**:
  - `spreadsheetId`: Leave empty to create a new spreadsheet, or specify an existing spreadsheet ID
  - `spreadsheetName`: Name for new spreadsheets (only used if spreadsheetId is empty)
  - `graderName`: The grader's name that will be inserted in B2 when exporting to sheets

## Running the Application

### Development Mode

To run the application in development mode with hot-reloading:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

### Production Build

To build the application for production:

```bash
pnpm build
```

To run the production build:

```bash
pnpm start
```

## Running the Converter

To convert the CSV data to JSON format:

```bash
pnpm run convert
```

Or directly:

```bash
tsx data/convert.ts
```

This will:

1. Read the CSV file from `data/data.csv`
2. Process the submissions
3. Calculate late days based on the configured deadline
4. Keep only the latest submission per student (by email)
5. Generate `data/data.json` with the processed data

## Output

The converter generates a JSON file at `data/data.json` with the following structure for each student:

- All original CSV fields
- Calculated late days
- Initial score structure for grading (activities, questions, presentation, bonuses)

## Google Sheets Integration

The application includes Google Sheets integration to export student data. To set this up:

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API for your project

### 2. Create OAuth 2.0 Credentials

1. Go to APIs & Services > Credentials
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Web application" as the application type
4. Add `http://localhost:3000/api/auth/callback` to Authorized redirect URIs

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

2. Add your Google credentials to `.env.local`:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URL=http://localhost:3000/api/auth/callback
```

### 4. Using the Google Sheets Export

1. Navigate to a student's grading page
2. Click the "Save to Sheets" button
3. If not authenticated, you'll be redirected to Google OAuth
4. After authentication, the system will:
   - Check if a sheet with the student's name already exists
   - If it doesn't exist: duplicate the first sheet and rename it with the student's name
   - If it does exist: use the existing sheet
   - Update the student's the data in the sheet

#### Specifying a Spreadsheet

You can configure which spreadsheet to use in `lib/config.ts`:

```typescript
googleSheets: {
  // Option 1: Leave empty to create a new spreadsheet
  spreadsheetId: '',

  // Option 2: Use an existing spreadsheet by ID
  spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
}
```

To find a spreadsheet ID: Open the spreadsheet in Google Sheets and copy the ID from the URL:
`https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit`

**Important**: Make sure your spreadsheet has at least one sheet that will serve as the template. This first sheet will be duplicated for each student.
