export type AbstractValidationResult = {
  is_valid_format: { value: boolean };
  is_free_email: { value: boolean };
  is_disposable_email: { value: boolean };
  is_role_email: { value: boolean };
  is_catchall_email: { value: boolean };
  is_mx_found: { value: boolean };
  is_smtp_valid: { value: boolean };
  autocorrect: string;
};

export async function validateEmailWithAbstract(email: string): Promise<boolean> {
  const apiKey = process.env.ABSTRACT_API_KEY;
  
  if (!apiKey) {
    console.warn("ABSTRACT_API_KEY is not configured.");
    // In production without key, we should probably fail closed, but for dev we might fail open or mock.
    // Assuming strict requirement:
    return false;
  }

  try {
    const response = await fetch(
      `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${encodeURIComponent(email)}`,
      { next: { revalidate: 0 } }
    );

    if (!response.ok) {
      console.error(`Abstract API error: ${response.status} ${response.statusText}`);
      
      // Fallback: If the API key is unauthorized while testing locally, we bypass the block
      // so you can still test the UI and Google Sheets integration without getting stuck.
      if (response.status === 401 && process.env.NODE_ENV === "development") {
        console.warn("Abstract API key is invalid. Bypassing validation for local development.");
        return true;
      }
      
      return false;
    }

    const data = await response.json() as AbstractValidationResult;

    // 1. Must be valid format
    if (!data.is_valid_format.value) return false;
    
    // 2. Must not be a disposable domain
    if (data.is_disposable_email.value) return false;

    // 3. Must not have an autocorrect suggestion (blocks common typos like gamil.co)
    if (data.autocorrect && data.autocorrect.length > 0) return false;

    // 4. Must have a valid SMTP/MX record if checking is conclusive
    // We check explicitly for false since it can be unknown
    if (data.is_smtp_valid.value === false) return false;

    return true;
  } catch (error) {
    console.error("Error validating email with Abstract API:", error);
    return false;
  }
}
