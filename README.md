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

## Notes

- The system automatically deduplicates submissions by email, keeping only the latest submission per student
- Late days are calculated from the submission deadline configured in `lib/config.ts`
