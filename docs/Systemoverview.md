# System Overview

## Google Sheets Data Entry & Record Management System

This project is a lightweight record-entry system built with **Google Sheets and Google Apps Script**.

It separates the user-facing data-entry interface from the centralized record-storage sheet and uses Apps Script to automate the complete submission workflow.

---

## 1. Purpose

The primary goal of the system is to provide a structured way to enter land-record information without requiring users to directly work inside a large master dataset.

Instead of entering records directly into rows and columns, users interact with a dedicated form-style interface.

The system then:

1. Reads the form values.
2. Validates the submission.
3. Generates a serial number.
4. Maps the form fields to the correct database columns.
5. Adds the record to the Master Sheet.
6. Clears the form.
7. Displays a confirmation message.

---

## 2. High-Level Architecture

The system consists of three logical layers.

```text
┌─────────────────────────────────────┐
│          PRESENTATION LAYER         │
│                                     │
│         Data Entry Form             │
│                                     │
│   User enters structured data       │
└──────────────────┬──────────────────┘
                   │
                   │ Submit
                   ▼
┌─────────────────────────────────────┐
│           LOGIC LAYER               │
│                                     │
│       Google Apps Script            │
│                                     │
│  • Validation                       │
│  • Data extraction                  │
│  • Serial generation                │
│  • Field mapping                    │
│  • Record insertion                 │
│  • Form reset                       │
└──────────────────┬──────────────────┘
                   │
                   │ Store
                   ▼
┌─────────────────────────────────────┐
│             DATA LAYER              │
│                                     │
│           Master Sheet              │
│                                     │
│       Centralized records           │
└─────────────────────────────────────┘
```

---

## 3. Components

### 3.1 Data Entry Form

**Sheet name:**

```text
Data Entry Form
```

This sheet acts as the user interface.

Users enter information into predefined cells instead of directly modifying the Master Sheet.

The form contains fields related to:

* Office file numbers
* Location
* Administrative area
* Deed type
* Khatian information
* Dag information
* Land quantity
* Deed information
* Giver and receiver information
* Intermediary information

---

### 3.2 Master Sheet

**Sheet name:**

```text
Master Sheet
```

The Master Sheet acts as the centralized storage layer.

Each successful form submission creates one new row.

The first column contains an automatically generated serial number.

---

### 3.3 Google Apps Script

The Apps Script project provides the application logic.

The primary functions are:

```javascript
submitData()
```

and

```javascript
clearForm()
```

### `submitData()`

Responsible for:

* Accessing the spreadsheet
* Finding the required sheets
* Generating the serial number
* Reading form values
* Performing basic validation
* Mapping fields
* Appending the record
* Clearing the form
* Displaying feedback

### `clearForm()`

Responsible for clearing only the predefined input cells.

---

## 4. Data Flow

The complete workflow is:

```text
User
 │
 │ enters information
 ▼
Data Entry Form
 │
 │ clicks Submit
 ▼
submitData()
 │
 ├── Find sheets
 │
 ├── Generate serial number
 │
 ├── Read form values
 │
 ├── Validate submission
 │
 ├── Build rowData[]
 │
 ├── appendRow()
 │
 └── clearForm()
 │
 ▼
Master Sheet
 │
 ▼
New record
```

---

## 5. Form-to-Database Mapping

The system does not depend on the visual position of the form fields.

Instead, the script explicitly maps each form field to its destination column.

| Form Cell | Field           | Master Column |
| --------- | --------------- | ------------- |
| D5        | পুরাতন ফাইল নং  | B             |
| D7        | নতুন ফাইল নং    | C             |
| D9        | মৌজা            | D             |
| D11       | থানা            | E             |
| D15       | দলিলের ধরণ      | F             |
| D17       | গ্রহিতা কোঃ নাম | G             |
| H25       | এস.এ খতিয়ান     | H             |
| D25       | আর.এস খতিয়ান    | I             |
| H27       | এস.এ দাগ        | J             |
| D27       | আর.এস দাগ       | K             |
| H29       | দাগে মোট জমি    | L             |
| D29       | ক্রয়কৃত জমি     | M             |
| D19       | দলিল নম্বর      | N             |
| D21       | দলিলের তারিখ    | O             |
| D35       | গ্রহিতার নাম    | P             |
| D33       | দাতার নাম       | Q             |
| D37       | মাধ্যমের নাম    | R             |

This explicit mapping makes the relationship between the interface and the stored dataset easy to understand and maintain.

---

## 6. Serial Number Generation

The system automatically generates the next serial number.

The logic checks the last populated row of the Master Sheet.

Conceptually:

```text
No existing records
       ↓
Serial = 1

Existing records
       ↓
Read last serial number
       ↓
Add 1
       ↓
Use as new serial
```

This removes the need for users to manually enter the record number.

---

## 7. Input Validation

The current implementation contains a basic validation layer.

A submission is rejected when the primary identifying fields are all empty:

```javascript
if (!puratonFile && !notunFile && !dolilNo) {
    ...
}
```

This prevents an entirely empty form from being submitted.

### Current validation scope

The current implementation does not yet perform advanced validation such as:

* Duplicate detection
* Numeric validation
* Date validation
* Required-field validation for every field
* Cross
