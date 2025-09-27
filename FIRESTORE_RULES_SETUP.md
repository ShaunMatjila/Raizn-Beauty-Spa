# Firestore Security Rules Setup

## Issue
The current Firestore rules are causing "Missing or insufficient permissions" errors when trying to authenticate admin users.

## Solution
You need to update your Firestore security rules in the Firebase Console.

## Steps to Fix:

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: spa-business
3. **Navigate to Firestore Database**
4. **Click on "Rules" tab**
5. **Replace the current rules with the following:**

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Allow authenticated users to read their own admin profile
    match /admins/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow checking admin status by email (for login verification)
    match /admins/{document=**} {
      allow read: if request.auth != null;
    }
    
    // Public collections that can be read by anyone
    match /services/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /bookings/{document} {
      allow read, write: if request.auth != null;
    }
    
    match /appointments/{document} {
      allow read, write: if request.auth != null;
    }
    
    match /clients/{document} {
      allow read, write: if request.auth != null;
    }
    
    // Allow public read access to certain collections
    match /settings/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Default rule - deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

6. **Click "Publish"**

## What These Rules Do:

- **Admin Authentication**: Allows authenticated users to check if they're admins
- **Admin Profile Access**: Admins can read/write their own profiles
- **Public Services**: Services can be read by anyone (for public display)
- **Protected Collections**: Bookings, appointments, and clients require authentication
- **Secure by Default**: All other collections are denied access

## Testing:
After updating the rules, try logging in again with:
- Email: `admin@raiznbeauty.co.za`
- Password: [your password]

The authentication should now work properly!
