import { google } from "googleapis";

async function getSheetsAuth() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) return null;

  return new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export async function checkEmailExistsInSheets(email: string): Promise<boolean> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const auth = await getSheetsAuth();
  if (!auth || !spreadsheetId) return false; // Fail open if misconfigured

  try {
    const sheets = google.sheets({ version: "v4", auth });
    // Assuming emails are in Column B based on the 5-column schema:
    // A: timestamp, B: email, C: validationStatus, D: promoCodeIssued, E: sourcePage
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1!B:B",
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) return false;

    // Check if the exact (lowercased) email exists in the column
    return rows.some(row => row[0]?.toLowerCase() === email.toLowerCase());
  } catch (error) {
    console.error("Error checking Google Sheets for duplicate:", error);
    return false; // Fail open on API error so we don't accidentally block a real user
  }
}

export async function logEmailToGoogleSheets(
  email: string, 
  status: string, 
  promoCode: string, 
  sourcePage: string
): Promise<boolean> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const auth = await getSheetsAuth();
  
  if (!auth || !spreadsheetId) {
    console.warn("Google Sheets credentials are not fully configured.");
    return false;
  }

  try {
    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:E", 
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            new Date().toISOString(), // timestamp
            email,                    // email
            status,                   // validationStatus (e.g. 'deliverable')
            promoCode,                // promoCodeIssued
            sourcePage                // sourcePage
          ],
        ],
      },
    });

    return response.status === 200;
  } catch (error) {
    console.error("Error writing to Google Sheets:", error);
    return false;
  }
}

