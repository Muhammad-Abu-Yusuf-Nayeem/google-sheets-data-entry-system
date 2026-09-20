# Setup Guide

## Google Sheets Data Entry & Record Management System

This guide explains how to recreate and configure the project from scratch.

---

# 1. Requirements

Before starting, you need:

* A Google account
* Google Sheets
* Google Apps Script
* Basic knowledge of Google Sheets

No external server or database is required.

---

# 2. Create the Spreadsheet

Create a new Google Spreadsheet.

Give it a meaningful name, for example:

```text
Land Record Data Entry System
```

Create two sheet tabs:

```text
Data Entry Form
Master Sheet
```

The names must match the Apps Script configuration.

---

# 3. Configure the Master Sheet

Open the `Master Sheet`.

Add the following headers to Row 1:

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

The resulting structure is:

```text
A  ক্রমিক নং
B  পুরাতন অফিস ফাইল নং
C  নতুন অফিস ফাইল নং
D  মৌজা
E  থানা
F  দলিলের ধরণ
G  গ্রহিতা কোঃ নাম
H  এস.এ খতিয়ান
I  আর.এস খতিয়ান
J  এস.এ দাগ
K  আর.এস দাগ
L  দাগে মোট জমি
M  ক্রয়কৃত জমি (শতাংশ)
N  দলিল নম্বর
O  দলিলের তারিখ
P  গ্রহিতার নাম
Q  দাতার নাম
R  মাধ্যমের নাম
```

---

# 4. Design the Data Entry Form

Open:

```text
Data Entry Form
```

Create the form according to the following cell locations.

| Cell | Field                |
| ---- | -------------------- |
| D5   | পুরাতন ফাইল নং       |
| D7   | নতুন ফাইল নং         |
| D9   | মৌজা                 |
| D11  | থানা                 |
| D15  | দলিলের ধরণ           |
| D17  | গ্রহিতা কোঃ নাম      |
| D19  | দলিল নম্বর           |
| D21  | দলিলের তারিখ         |
| D25  | আর.এস খতিয়ান         |
| H25  | এস.এ খতিয়ান          |
| D27  | আর.এস দাগ            |
| H27  | এস.এ দাগ             |
| D29  | ক্রয়কৃত জমি (শতাংশ)  |
| H29  | দাগে মোট জমি (শতাংশ) |
| D33  | দাতার নাম            |
| D35  | গ্রহিতার নাম         |
| D37  | মাধ্যমের নাম         |

The exact visual design is flexible.

You can add:

* Borders
* Background colors
* Section headers
* Dropdowns
* Data validation
* Number formatting
* Date formatting
* Instructions

However, the input cell locations must remain consistent with the script.

---

# 5. Add Google Apps Script

From the spreadsheet menu, open:

```text
Extensions → Apps Script
```

Delete the default function if necessary.

Create or open:

```text
Code.gs
```

Copy the contents of:

```text
src/Code.gs
```

from this repository into the Apps Script editor.

Save the project.

---

# 6. Verify Configuration

At the top of the script, verify:

```javascript
const FORM_SHEET = "Data Entry Form";
const DATA_SHEET = "Master Sheet";
```

These values must exactly match the spreadsheet tab names.

For example:

```text
Data Entry Form
```

is different from:

```text
Data entry form
```

because capitalization and spelling matter.

---

# 7. Create the Submit Button

Return to:

```text
Data Entry Form
```

Create a button using Google Sheets Drawing.

Go to:

```text
Insert → Drawing
```

Create a simple button.

Example:

```text
┌─────────────────────┐
│     SUBMIT DATA     │
└─────────────────────┘
```

Save and insert the drawing into the sheet.

---

# 8. Assign the Script

Select the button.

Open its menu:

```text
Three dots → Assign script
```

Enter:

```text
submitData
```

Do not enter:

```text
submitData()
```

Use only the function name.

---

# 9. Authorize the Script

The first time the script is executed, Google may request authorization.

Follow the Google authorization flow.

The script requires access to the spreadsheet because it needs to:

* Read form values
* Write records
* Clear form fields
* Display spreadsheet UI messages

Review the permissions before granting access.

---

# 10. Test the System

Enter dummy data into the form.

For example:

```text
পুরাতন ফাইল নং: OLD-001
নতুন ফাইল নং: NEW-001
মৌজা: Demo Mouza
থানা: Demo Thana
দলিল নম্বর: DOC-001
```

Fill several other fields as required.

Then click:

```text
SUBMIT DATA
```

---

# 11. Verify the Result

Open:

```text
Master Sheet
```

A new row should appear.

The first record should receive:

```text
ক্রমিক নং = 1
```

The next record should receive:

```text
ক্রমিক নং = 2
```

and so on.

---

# 12. Verify Form Reset

After successful submission, return to:

```text
Data Entry Form
```

The configured input cells should be empty.

The labels, formatting, and other non-input cells should remain unchanged.

---

# 13. Troubleshooting

## Error: Sheet tab names do not match

Check these lines:

```javascript
const FORM_SHEET = "Data Entry Form";
const DATA_SHEET = "Master Sheet";
```

Make sure the spreadsheet contains exactly those two tabs.

---

## Button does nothing

Check that the button is assigned to:

```text
submitData
```

and not:

```text
submitData()
```

---

## Data appears in the wrong column

Check the `rowData` array in `submitData()`.

The order of values in the array determines the destination columns:

```text
Array item 1 → Column A
Array item 2 → Column B
Array item 3 → Column C
...
Array item 18 → Column R
```

---

## Form does not clear

Check the `INPUT_CELLS` configuration:

```javascript
const INPUT_CELLS = [
  ...
];
```

Every input cell that should be cleared must be included in this array.

---

## Serial number is incorrect

Check the first column of the Master Sheet.

The application expects the previous serial number to be stored in Column A.

---

# 14. Recommended Formatting

For a clean implementation, consider applying:

### Data Entry Form

* Clearly separated sections
* Large input cells
* Consistent borders
* Dropdown validation where appropriate
* Date formatting
* Numeric formatting for land quantities
* A visually prominent submit button

### Master Sheet

* Freeze the header row
* Enable filters
* Use consistent date formatting
* Use appropriate column widths
* Keep headers descriptive
* Avoid unnecessary merged cells

---

# 15. Demo Data

For a public GitHub repository, use fictional or anonymized information.

Example:

```text
OLD-001
NEW-001
Demo Mouza
Demo Thana
Demo Receiver
Demo Giver
DOC-001
```

Do not use real confidential records in the public repository.

---

# 16. Screenshots

Take screenshots of at least two states.

### Screenshot 1 — Data Entry Form

Recommended filename:

```text
screenshots/data-entry-form.png
```

Show:

* Form layout
* Input fields
* Submit button
* Dummy data

Avoid showing confidential information.

### Screenshot 2 — Master Sheet

Recommended filename:

```text
screenshots/master-sheet.png
```

Show:

* Header row
* Several dummy records
* Automatically generated serial numbers
* Structured columns

---

# 17. Optional Third Screenshot

A useful additional screenshot is:

```text
screenshots/submission-result.png
```

This can show the completed workflow:

```text
Data Entry Form
      ↓
SUBMIT DATA
      ↓
Success message
      ↓
Master Sheet updated
```

---

# 18. Updating the System

When adding a new form field, update both:

### Form-reading section

Add the corresponding `getRange()` call.

### Master Sheet mapping

Add the value to `rowData` in the correct column position.

Also update:

* `INPUT_CELLS`
* Master Sheet headers
* `system-overview.md`
* `README.md`

Keeping these synchronized prevents future mapping errors.

---

# 19. Recommended Development Workflow

When modifying the project:

```text
1. Modify form
       ↓
2. Update INPUT_CELLS
       ↓
3. Update form-reading logic
       ↓
4. Update rowData mapping
       ↓
5. Update Master Sheet headers
       ↓
6. Test with dummy data
       ↓
7. Verify stored record
       ↓
8. Update documentation
       ↓
9. Update screenshots
       ↓
10. Commit changes
```

---

# 20. GitHub Deployment

After testing the Google Sheet:

```text
google-sheets-data-entry-system/
```

should contain:

```text
README.md
LICENSE
.gitignore

src/
└── Code.gs

docs/
├── system-overview.md
└── setup-guide.md

screenshots/
├── data-entry-form.png
├── master-sheet.png
└── submission-result.png
```

Commit the project with a meaningful message.

Example:

```text
feat: add automated Google Sheets data entry system
```

Future changes can use commits such as:

```text
feat: add duplicate record validation
fix: correct serial number generation
docs: improve setup instructions
style: update form interface
feat: add record search
```

---

## Final Verification Checklist

Before publishing the repository:

* [ ] Spreadsheet structure works
* [ ] Form input cells are correct
* [ ] Master Sheet headers are correct
* [ ] `submitData()` works
* [ ] Serial number generation works
* [ ] Form reset works
* [ ] Button is correctly assigned
* [ ] Dummy data is used
* [ ] No private data is included
* [ ] Screenshots are anonymized
* [ ] README is updated
* [ ] Documentation is updated
* [ ] `.gitignore` is present
* [ ] LICENSE is present

The repository is then ready to publish.
