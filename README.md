# Google Sheets Data Entry System

A structured data-entry and record-management system built with **Google Sheets and Google Apps Script**.

The system uses one sheet as a user-friendly data entry form and another sheet as a centralized master database. A custom Apps Script function processes the submitted form data, generates a serial number, stores the record in the correct column sequence, and clears the form for the next entry.

---

## Overview

Traditional spreadsheet data entry can become difficult to manage when users directly enter records into a large master sheet.

This project separates the **data-entry interface** from the **data-storage layer**.

```text
┌───────────────────────┐
│   Data Entry Form     │
│                       │
│  User enters record   │
└───────────┬───────────┘
            │
            │ Submit
            ▼
┌───────────────────────┐
│   Google Apps Script  │
│                       │
│ • Read form values    │
│ • Validate input      │
│ • Generate serial no. │
│ • Map fields          │
│ • Store record        │
│ • Clear form          │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│     Master Sheet      │
│                       │
│ Centralized records   │
└───────────────────────┘
```

---

## Key Features

* Dedicated data-entry interface
* Centralized master data storage
* Google Apps Script automation
* Automatic serial number generation
* Form input validation
* Structured field-to-column mapping
* One-click data submission
* Automatic form reset after submission
* Error handling for incorrect sheet names
* Reusable configuration through constants
* Supports Bengali land-record terminology

---

## Technology Stack

| Technology         | Purpose                         |
| ------------------ | ------------------------------- |
| Google Sheets      | User interface and data storage |
| Google Apps Script | Automation and business logic   |
| JavaScript         | Apps Script programming         |
| Google Workspace   | Platform                        |

---

## System Architecture

The project follows a simple two-layer architecture.

### 1. Data Entry Layer

**Sheet:** `Data Entry Form`

Users enter information into predefined cells.

Example input fields include:

* পুরাতন অফিস ফাইল নং
* নতুন অফিস ফাইল নং
* মৌজা
* থানা
* দলিলের ধরণ
* গ্রহিতা কোঃ নাম
* দলিল নম্বর
* দলিলের তারিখ
* এস.এ খতিয়ান
* আর.এস খতিয়ান
* এস.এ দাগ
* আর.এস দাগ
* দাগে মোট জমি
* ক্রয়কৃত জমি
* দাতার নাম
* গ্রহিতার নাম
* মাধ্যমের নাম

---

### 2. Data Storage Layer

**Sheet:** `Master Sheet`

Submitted records are stored as rows.

The system maps the form fields into the required database column sequence instead of relying on the physical order of the form.

---

## Data Flow

```text
User Input
    │
    ▼
Data Entry Form
    │
    ▼
submitData()
    │
    ├── Check required input
    │
    ├── Generate serial number
    │
    ├── Read form fields
    │
    ├── Map fields to database columns
    │
    ├── Append new row
    │
    └── Clear form
    │
    ▼
Master Sheet
```

---

## Master Sheet Structure

The generated record follows this column sequence:

| Column | Field               |
| ------ | ------------------- |
| A      | ক্রমিক নং           |
| B      | পুরাতন অফিস ফাইল নং |
| C      | নতুন অফিস ফাইল নং   |
| D      | মৌজা                |
| E      | থানা                |
| F      | দলিলের ধরণ          |
| G      | গ্রহিতা কোঃ নাম     |
| H      | এস.এ খতিয়ান         |
| I      | আর.এস খতিয়ান        |
| J      | এস.এ দাগ            |
| K      | আর.এস দাগ           |
| L      | দাগে মোট জমি        |
| M      | ক্রয়কৃত জমি (শতাংশ) |
| N      | দলিল নম্বর          |
| O      | দলিলের তারিখ        |
| P      | গ্রহিতার নাম        |
| Q      | দাতার নাম           |
| R      | মাধ্যমের নাম        |

---

## Apps Script Workflow

The main function is:

```javascript
submitData()
```

It performs the following operations:

1. Opens the active spreadsheet.
2. Locates the `Data Entry Form` sheet.
3. Locates the `Master Sheet`.
4. Generates the next serial number.
5. Reads values from the form.
6. Performs a basic validation check.
7. Creates an ordered data array.
8. Appends the data to the master sheet.
9. Clears the input fields.
10. Displays a success message.

---

## Form Reset

The input cells are maintained in a centralized array:

```javascript
const INPUT_CELLS = [
  "D5",
  "D7",
  "D9",
  "D11",
  "D15",
  "D17",
  "D19",
  "D21",
  "D25",
  "H25",
  "D27",
  "H27",
  "D29",
  "H29",
  "D33",
  "D35",
  "D37"
];
```

This allows the form to be cleared without repeatedly writing individual `clearContent()` statements.

The reset function is:

```javascript
clearForm()
```

---

## Installation

### Step 1 — Create the Google Spreadsheet

Create a Google Spreadsheet containing two tabs:

```text
Data Entry Form
Master Sheet
```

The sheet names must match the names defined in the Apps Script.

---

### Step 2 — Create the Master Sheet

Create the header row according to the following sequence:

```text
ক্রমিক নং
পুরাতন অফিস ফাইল নং
নতুন অফিস ফাইল নং
মৌজা
থানা
দলিলের ধরণ
গ্রহিতা কোঃ নাম
এস.এ খতিয়ান
আর.এস খতিয়ান
এস.এ দাগ
আর.এস দাগ
দাগে মোট জমি
ক্রয়কৃত জমি (শতাংশ)
দলিল নম্বর
দলিলের তারিখ
গ্রহিতার নাম
দাতার নাম
মাধ্যমের নাম
```

---

### Step 3 — Add Apps Script

Open:

```text
Extensions → Apps Script
```

Copy the code from:

```text
src/Code.gs
```

into the Apps Script editor.

---

### Step 4 — Save the Project

Save the Apps Script project.

The spreadsheet and Apps Script project are connected automatically when the script is created from the spreadsheet.

---

### Step 5 — Create a Button

In the `Data Entry Form` sheet:

```text
Insert → Drawing
```

Create a button such as:

```text
SUBMIT DATA
```

After inserting the drawing:

```text
Three dots → Assign script
```

Enter:

```text
submitData
```

Do not include:

```text
()
```

---

## Usage

### Enter Data

Fill in the required fields on:

```text
Data Entry Form
```

### Submit

Click the:

```text
SUBMIT DATA
```

button.

### Result

The system will:

```text
Form
  ↓
Apps Script
  ↓
Validation
  ↓
Serial Number
  ↓
Master Sheet
  ↓
Form Reset
```

The submitted record will appear as a new row in the `Master Sheet`.

---

## Important Configuration

The following constants control the sheet names:

```javascript
const FORM_SHEET = "Data Entry Form";
const DATA_SHEET = "Master Sheet";
```

If the spreadsheet uses different tab names, update these values accordingly.

---

## Project Logic

The application intentionally separates:

### Interface

```text
Data Entry Form
```

from:

### Storage

```text
Master Sheet
```

and:

### Business Logic

```text
Google Apps Script
```

This separation makes the spreadsheet easier to use and reduces the need for users to directly interact with the database-style master sheet.

---

## Current Validation

The current implementation performs a basic submission check:

```javascript
if (!puratonFile && !notunFile && !dolilNo) {
  ...
}
```

This prevents completely empty submissions based on the defined fields.

For production use, the validation layer can be extended to validate:

* Required fields
* Numeric fields
* Dates
* Duplicate records
* Invalid values
* Data formats
* Field dependencies

---

## Possible Future Improvements

The current system provides a foundation for a more complete spreadsheet-based information system.

Potential improvements include:

* Duplicate record detection
* Advanced validation
* Edit existing records
* Search records
* Update records
* Delete/archive records
* Automatic timestamps
* User identification
* Audit logging
* Unique record IDs
* Search dashboard
* PDF generation
* Email notifications
* Role-based access
* Data validation dropdowns
* Automated reports
* Power BI integration
* Google Drive document linking

---

## Learning Outcomes

This project demonstrates practical experience with:

* Google Apps Script
* JavaScript functions
* Constants
* Arrays
* Spreadsheet APIs
* `getSheetByName()`
* `getRange()`
* `getValue()`
* `appendRow()`
* `clearContent()`
* Basic validation
* Data mapping
* Spreadsheet automation
* Form-to-database workflows

---

## Project Use Case

This architecture is suitable for structured record-entry workflows where users should enter information through a controlled interface while maintaining a centralized master dataset.

The concept can be adapted to:

* Land records
* Inventory management
* Customer records
* Employee records
* Sales records
* Project tracking
* Asset management
* Administrative databases

---

## Security & Privacy

This repository should contain only the **code and documentation**.

Do not publish:

* Real land records
* Personal identification information
* NID numbers
* Phone numbers
* Private documents
* Real customer information
* Confidential company data
* Private Google Sheet links

Use screenshots with anonymized or dummy data.

---

## License

This project is provided under the MIT License.

See [`LICENSE`](LICENSE) for details.

---

## Author

**Yusuf Khan**

Built as a practical Google Sheets automation project demonstrating spreadsheet engineering, data management, and Google Apps Script development.
