export interface ValidationErrors {
  [key: string]: string
}

// Step 1 Validation
export const validateStep1 = (data: {
  service_id: string
  location_id: string
  provider_id: string
  language_pref: string
  delivery_mode: string
}): ValidationErrors => {
  const errors: ValidationErrors = {}

  if (!data.service_id || data.service_id.trim() === "") {
    errors.service_id = "Please select a service"
  }

  if (!data.location_id || data.location_id.trim() === "") {
    errors.location_id = "Please select a location"
  }

  if (!data.provider_id || data.provider_id.trim() === "") {
    errors.provider_id = "Please select a provider preference"
  }

  if (!data.language_pref || data.language_pref.trim() === "") {
    errors.language_pref = "Please select a language preference"
  }

  if (!data.delivery_mode || data.delivery_mode.trim() === "") {
    errors.delivery_mode = "Please select a delivery mode"
  }

  return errors
}

// Step 2 Validation
export const validateStep2 = (data: {
  selectedDate: string | null
  selectedTime: string | null
}): ValidationErrors => {
  const errors: ValidationErrors = {}

  if (data.selectedDate === null || data.selectedDate === undefined) {
    errors.date = "Please select a date for your appointment"
  }

  if (!data.selectedTime || data.selectedTime.trim() === "") {
    errors.time = "Please select a time for your appointment"
  }

  return errors
}

// Step 3 Validation
export const validateStep3 = (data: {
  first_name: string
  last_name: string
  email: string
  phone: string
  preferred_contact: string
  is_patient_or_guardian: string
  patient_first_name?: string
  patient_last_name?: string
  patient_dob: string
  agree_to_policies: boolean
}): ValidationErrors => {
  const errors: ValidationErrors = {}

  // Personal Info
  if (!data.first_name || data.first_name.trim() === "") {
    errors.first_name = "First name is required"
  }

  if (!data.last_name || data.last_name.trim() === "") {
    errors.last_name = "Last name is required"
  }

  // Email validation
  if (!data.email || data.email.trim() === "") {
    errors.email = "Email address is required"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address"
  }

  // Phone validation (required if SMS is preferred contact)
  if (data.preferred_contact === "sms") {
    if (!data.phone || data.phone.trim() === "") {
      errors.phone = "Phone number is required for SMS contact"
    } else if (!/^[0-9\s\-+$$$$]{10,}$/.test(data.phone.replace(/\s/g, ""))) {
      errors.phone = "Please enter a valid phone number"
    }
  }

  // Patient or Guardian
  if (!data.is_patient_or_guardian) {
    errors.is_patient_or_guardian = "Please select if you are booking for yourself or someone else"
  }

  // Guardian fields
  if (data.is_patient_or_guardian === "guardian") {
    if (!data.patient_first_name || data.patient_first_name.trim() === "") {
      errors.patient_first_name = "Patient first name is required"
    }

    if (!data.patient_last_name || data.patient_last_name.trim() === "") {
      errors.patient_last_name = "Patient last name is required"
    }
  }

  // DOB validation
  if (!data.patient_dob || data.patient_dob.trim() === "") {
    errors.patient_dob = "Date of birth is required"
  }

  // Policies agreement
  if (!data.agree_to_policies) {
    errors.agree_to_policies = "You must agree to the terms and privacy policy"
  }

  return errors
}

export const hasErrors = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length > 0
}
