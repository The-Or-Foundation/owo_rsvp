/**
 * OWO RSVP → Google Sheet
 *
 * Paste this into the sheet's Extensions → Apps Script, set SECRET to the
 * same value as RSVP_SHEET_SECRET in Netlify, then Deploy → New deployment
 * → Web app (Execute as: Me, Who has access: Anyone). The web app URL goes
 * into RSVP_SHEET_URL in Netlify. app/api/rsvp/route.ts posts to it.
 *
 * Each RSVP becomes a row in the "RSVPs" tab (created on first use). An
 * email that's already on the list isn't added again, so nobody gets two
 * vouchers. Tick "Voucher sent" as vouchers go out.
 */

const SECRET = "PASTE_THE_SECRET_HERE";
const SHEET_NAME = "RSVPs";
const HEADERS = [
  "Submitted at",
  "First Name",
  "Last Name",
  "Email",
  "Phone",
  "Voucher sent",
];
const EMAIL_COLUMN = 4;

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return json({ ok: false, error: "bad_request" });
  }
  if (data.secret !== SECRET) {
    return json({ ok: false, error: "unauthorized" });
  }

  // One write at a time, so two RSVPs at once can't both pass the duplicate check
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet();
    const email = String(data.email || "").trim().toLowerCase();

    const lastRow = sheet.getLastRow();
    if (email && lastRow > 1) {
      const emails = sheet
        .getRange(2, EMAIL_COLUMN, lastRow - 1, 1)
        .getValues()
        .map((row) => String(row[0]).trim().toLowerCase());
      if (emails.indexOf(email) !== -1) {
        return json({ ok: true, duplicate: true });
      }
    }

    sheet.appendRow([
      new Date(),
      cell(data.firstName),
      cell(data.lastName),
      cell(email),
      // Stored as text so a leading 0 or + isn't dropped
      data.phone ? "'" + String(data.phone).trim() : "",
      false,
    ]);
    // Show "Voucher sent" as a tick box
    sheet.getRange(sheet.getLastRow(), HEADERS.length).insertCheckboxes();

    return json({ ok: true, duplicate: false });
  } finally {
    lock.releaseLock();
  }
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Text from the form; anything that looks like a formula is kept as plain text
function cell(value) {
  const text = String(value || "").trim().slice(0, 200);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
