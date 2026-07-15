"use server";

import { validateEmailWithAbstract } from "@/lib/abstract-api";
import { logEmailToGoogleSheets, checkEmailExistsInSheets } from "@/lib/google-sheets";

export type SubscribeResponse = {
  success: boolean;
  message?: string;
  promoCode?: string;
};

const PROMO_CODE = "KITTY10";

/**
 * Helper to add a timeout to a promise
 */
function withTimeout<T>(promise: Promise<T>, ms: number, timeoutErrorMsg: string): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(timeoutErrorMsg)), ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer));
}

/**
 * Server action to handle email subscriptions for promo codes.
 * 
 * Validates the email against the Abstract API, and if valid, logs it
 * to a configured Google Sheet. Returns the success status and the promo code.
 * 
 * @param email - The email address submitted by the user.
 * @param sourcePage - Where the user submitted the form (e.g. "homepage").
 * @returns A promise that resolves to the SubscribeResponse.
 */
export async function subscribeEmailAction(email: string, sourcePage: string = "homepage"): Promise<SubscribeResponse> {
  const normalizedEmail = email?.trim().toLowerCase();

  // Basic sanity check before external calls
  if (!normalizedEmail || !normalizedEmail.includes("@") || !normalizedEmail.includes(".")) {
    return { success: false, message: "Please provide a valid email address." };
  }

  // 1. Deduplication Check (Sheets read)
  try {
    const isDuplicate = await withTimeout(
      checkEmailExistsInSheets(normalizedEmail),
      2000,
      "Sheets timeout"
    );
    if (isDuplicate) {
      return { success: false, message: "You've already claimed your code — check your inbox." };
    }
  } catch (error) {
    console.warn("Failed deduplication check, proceeding to validate:", error);
    // Proceeding even if duplicate check timed out so we don't punish users for Google API latency
  }

  // 2. Validation (Abstract API)
  let isValid = false;
  try {
    isValid = await withTimeout(
      validateEmailWithAbstract(normalizedEmail),
      6000, // 6s timeout for API (Free tier can be slow)
      "API timeout"
    );
  } catch (error) {
    console.error("Validation API error/timeout:", error);
    return { success: false, message: "We couldn't verify that right now, please try again." };
  }

  if (!isValid) {
    return { success: false, message: "Please provide a valid, active email address." };
  }

  // 3. Log to Google Sheets
  const logged = await logEmailToGoogleSheets(normalizedEmail, "deliverable", PROMO_CODE, sourcePage);
  if (!logged) {
    // We log the failure but still return success to the user so they get the code
    console.error("Failed to log email to Google Sheets, but email was valid:", normalizedEmail);
  }

  // 4. Return success with promo code
  return { 
    success: true, 
    promoCode: PROMO_CODE 
  };
}
