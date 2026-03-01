# API Documentation

## Base URL

```
https://dev.api.alehra.com/
https://dev.app.alehra.com/
https://dev.chabot.alehra.com/
```

## Endpoints

### 1. Create Organization Account

**POST** `/api/auth/register`

#### Description:

Creates a new organization account.

#### Request Body:

```json
{
  "email": "string",
  "password": "string"
}
```

#### Responses:

- **201 Created**:

```json
{
  "success": true,
  "message": "User created successfully. Please check your email for verification code.",
  "data": {
    "email": "string",
    "isVerified": false
  }
}
```

- **400 Bad Request**:
  - Missing email or password.
  - Invalid email format.
- **409 Conflict**:
  - Email already exists.
- **500 Internal Server Error**:
  - Unexpected error during user creation.

---

### 2. Login

**POST** `/api/auth/login`

#### Description:

Logs in a user and generates a JWT token.

#### Request Body:

```json
{
  "email": "string",
  "password": "string"
}
```

#### Responses:

- **200 OK**:

```json
{
  "success": true,
  "message": "Login successful.",
  "token": "string"
}
```

- **400 Bad Request**:
  - Missing email or password.
  - Invalid email format.
- **401 Unauthorized**:
  - Invalid password.
- **403 Forbidden**:
  - Email not verified.
- **404 Not Found**:
  - Email not registered.
- **500 Internal Server Error**:
  - Unexpected error during login.

---

### 3. Google Sign-In

**POST** `/api/auth/google-auth`

#### Description:

Handles Google authentication for users.

#### Request Body:

```json
{
  "token": "string"
}
```

#### Responses:

- **200 OK**:

```json
{
  "success": true,
  "message": "Google sign-in successful.",
  "token": "string"
}
```

- **400 Bad Request**:
  - Missing Google token.
  - Invalid Google token.
- **500 Internal Server Error**:
  - Unexpected error during Google sign-in.

---

### 4. Verify OTP

**POST** `/api/auth/verify-otp`

#### Description:

Verifies the OTP sent to the user's email.

#### Request Body:

```json
{
  "email": "string",
  "otp": "string"
}
```

#### Responses:

- **200 OK**:

```json
{
  "success": true,
  "message": "Email verified successfully.",
  "token": "string"
}
```

- **400 Bad Request**:
  - Missing email or OTP.
- **401 Unauthorized**:
  - Invalid or expired OTP.
- **500 Internal Server Error**:
  - Unexpected error during OTP verification.

---

### 5. Update Organization Details

**PUT** `/api/organizations/profile`

#### Description:

Updates the organization’s profile. Requires authentication.

#### Headers:

```
Authorization: Bearer <token>
```

#### Request Body:

```json
{
  "name": "string",
  "location": "string",
  "state": "string",
  "description": "string",
  "business_type": "string",
  "business_number": "string"
}
```

#### Responses:

- **200 OK**:

```json
{
  "success": true,
  "message": "Organization details updated successfully."
}
```

- **400 Bad Request**:
  - Missing required fields.
- **404 Not Found**:
  - Organization not found.
- **500 Internal Server Error**:
  - Unexpected error during update.

---

### 6. Get Organization Profile

**GET** `/api/organizations/profile`

#### Description:

Fetches the profile details of the authenticated organization.

#### Headers:

```
Authorization: Bearer <token>
```

#### Responses:

- **200 OK**:

```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "location": "string",
    "state": "string",
    "description": "string",
    "business_type": "string",
    "business_number": "string"
  }
}
```

- **401 Unauthorized**:
  - Missing or invalid token.
- **404 Not Found**:
  - Organization not found.
- **500 Internal Server Error**:
  - Unexpected error during fetch.

---

## Notes:

- All authenticated routes require a valid JWT token in the `Authorization` header.
- OTPs expire 10 minutes after generation.
- Use the `/api/auth/register` endpoint to create a user and receive an OTP for email verification.
- Ensure to secure sensitive data such as JWT secrets and database credentials.

# Team Endpoints Documentation

## 1. **Onboard Team Members**

### Endpoint

**POST** `/api/team/onboard`

### Description

Onboard multiple team members to an organization by providing their details in the request body.

### Request Body

```json
{
  "organization_id": "12345",
  "members": [
    {
      "first_name": "John",
      "last_name": "Doe",
      "email": "johndoe@example.com",
      "role": "Manager"
    },
    {
      "first_name": "Jane",
      "last_name": "Smith",
      "email": "janesmith@example.com",
      "role": "Developer"
    }
  ]
}
```

### Responses

- **200 OK**
  ```json
  {
    "success": true,
    "message": "Team member(s) onboarding processed",
    "data": {
      "successful": 2,
      "failed": 0,
      "successfulMembers": [
        {
          "first_name": "John",
          "last_name": "Doe",
          "email": "johndoe@example.com",
          "role": "Manager"
        },
        {
          "first_name": "Jane",
          "last_name": "Smith",
          "email": "janesmith@example.com",
          "role": "Developer"
        }
      ],
      "failedMembers": []
    }
  }
  ```
- **400 Bad Request**
  ```json
  {
    "success": false,
    "message": "Invalid payload. Organization ID and at least one team member are required."
  }
  ```

---

## 2. **Onboard Team Members from CSV**

### Endpoint

**POST** `/api/team/onboard/csv`

### Description

Onboard multiple team members by uploading a CSV file containing their details.

### Request Parameters

- **organization_id**: The ID of the organization (required).
- **file**: A CSV file containing team member details with the following columns:
  - `first_name`
  - `last_name`
  - `email`
  - `role`

### Responses

- **200 OK**
  ```json
  {
    "success": true,
    "message": "CSV processing completed",
    "data": {
      "successful": 3,
      "failed": 1,
      "successfulMembers": [
        {
          "first_name": "Alice",
          "last_name": "Brown",
          "email": "alice@example.com",
          "role": "Designer"
        },
        {
          "first_name": "Bob",
          "last_name": "White",
          "email": "bob@example.com",
          "role": "Tester"
        }
      ],
      "failedMembers": [{ "row": 4, "reason": "Invalid email format" }]
    }
  }
  ```
- **400 Bad Request**
  ```json
  {
    "success": false,
    "message": "No CSV file provided"
  }
  ```

---

## 3. **Get Team Members**

### Endpoint

**GET** `/api/team/members`

### Description

Retrieve all team members for the organization associated with the authenticated user.

### Responses

- **200 OK**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@example.com",
        "role": "Manager"
      },
      {
        "id": 2,
        "first_name": "Jane",
        "last_name": "Smith",
        "email": "janesmith@example.com",
        "role": "Developer"
      }
    ]
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "success": false,
    "message": "Failed to fetch team members"
  }
  ```

---

## 4. **Update Team Member Details**

### Endpoint

**PATCH** `/api/team/member`

### Description

Update the details of an existing team member.

### Request Body

```json
{
  "id": 1,
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "role": "Team Lead",
  "password": "newsecurepassword",
  "profile_picture": "<base64_image_string>"
}
```

### Responses

- **200 OK**
  ```json
  {
    "success": true,
    "message": "Team member details updated successfully"
  }
  ```
- **400 Bad Request**
  ```json
  {
    "success": false,
    "message": "Team member ID is required"
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "success": false,
    "message": "Failed to update team member details"
  }
  ```

---

## 5. **Upload Profile Picture**

### Description

Utility function used for uploading team member profile pictures to Cloudinary.

### Usage

**Internal**: Automatically invoked when a `profile_picture` is included in the payload for updating team member details.

---

## Notes

- Ensure `organization_id` is provided and valid for endpoints requiring it.
- For CSV uploads, ensure the file format and data integrity meet requirements.
