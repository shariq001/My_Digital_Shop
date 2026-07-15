# Interface Contract: Email Subscribe Action

## Server Action Contract

This contract defines the interface for the Next.js Server Action that handles the email subscription.

**Function signature**:
```typescript
export async function subscribeEmailAction(email: string): Promise<SubscribeResponse>
```

**Request Payload (implicit in args)**:
- `email` (string): The email address submitted by the user. Must be a valid email format before sending to Abstract API.

**Response Payload (`SubscribeResponse`)**:
```typescript
type SubscribeResponse = {
  success: boolean;
  message?: string; // Error message if success is false
  promoCode?: string; // Provided if success is true
}
```

**Behavioral Contract**:
- On Success: Returns `{ success: true, promoCode: "DISCOUNT10" }`
- On Invalid Email: Returns `{ success: false, message: "Please provide a valid, active email address." }`
- On Rate Limit / Server Error: Returns `{ success: false, message: "Validation service temporarily unavailable. Please try again." }`
