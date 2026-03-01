import { describe, it, expect } from "vitest";
import {
  validateStep1,
  validateStep2,
  validateStep3,
  hasErrors,
  type ValidationErrors,
} from "@/pages/utils/validation";

describe("validation utils", () => {
  describe("validateStep1", () => {
    it("returns no errors when all fields are valid", () => {
      const result = validateStep1({
        service_id: "s1",
        location_id: "l1",
        provider_id: "p1",
        language_pref: "en",
        delivery_mode: "video",
      });
      expect(result).toEqual({});
    });

    it("returns error when service_id is empty", () => {
      const result = validateStep1({
        service_id: "",
        location_id: "l1",
        provider_id: "p1",
        language_pref: "en",
        delivery_mode: "video",
      });
      expect(result.service_id).toBe("Please select a service");
    });

    it("returns error when location_id is empty", () => {
      const result = validateStep1({
        service_id: "s1",
        location_id: "   ",
        provider_id: "p1",
        language_pref: "en",
        delivery_mode: "video",
      });
      expect(result.location_id).toBe("Please select a location");
    });

    it("returns multiple errors when multiple fields are empty", () => {
      const result = validateStep1({
        service_id: "",
        location_id: "",
        provider_id: "",
        language_pref: "",
        delivery_mode: "",
      });
      expect(Object.keys(result)).toHaveLength(5);
    });
  });

  describe("validateStep2", () => {
    it("returns no errors when date and time are provided", () => {
      const result = validateStep2({
        selectedDate: "2025-01-15",
        selectedTime: "10:00",
      });
      expect(result).toEqual({});
    });

    it("returns error when selectedDate is null", () => {
      const result = validateStep2({
        selectedDate: null,
        selectedTime: "10:00",
      });
      expect(result.date).toBe("Please select a date for your appointment");
    });

    it("returns error when selectedTime is empty", () => {
      const result = validateStep2({
        selectedDate: "2025-01-15",
        selectedTime: "",
      });
      expect(result.time).toBe("Please select a time for your appointment");
    });
  });

  describe("validateStep3", () => {
    const validData = {
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      phone: "1234567890",
      preferred_contact: "email",
      is_patient_or_guardian: "patient",
      patient_dob: "1990-01-01",
      agree_to_policies: true,
    };

    it("returns no errors when all required fields are valid", () => {
      const result = validateStep3(validData);
      expect(result).toEqual({});
    });

    it("returns error when email is invalid", () => {
      const result = validateStep3({
        ...validData,
        email: "not-an-email",
      });
      expect(result.email).toBe("Please enter a valid email address");
    });

    it("returns error when first_name is empty", () => {
      const result = validateStep3({
        ...validData,
        first_name: "",
      });
      expect(result.first_name).toBe("First name is required");
    });

    it("returns error when agree_to_policies is false", () => {
      const result = validateStep3({
        ...validData,
        agree_to_policies: false,
      });
      expect(result.agree_to_policies).toBe(
        "You must agree to the terms and privacy policy"
      );
    });

    it("requires phone when preferred_contact is sms", () => {
      const result = validateStep3({
        ...validData,
        preferred_contact: "sms",
        phone: "",
      });
      expect(result.phone).toBe("Phone number is required for SMS contact");
    });

    it("requires patient names when is_patient_or_guardian is guardian", () => {
      const result = validateStep3({
        ...validData,
        is_patient_or_guardian: "guardian",
        patient_first_name: "",
        patient_last_name: "",
      });
      expect(result.patient_first_name).toBe("Patient first name is required");
      expect(result.patient_last_name).toBe("Patient last name is required");
    });
  });

  describe("hasErrors", () => {
    it("returns true when errors object has keys", () => {
      const errors: ValidationErrors = { email: "Invalid" };
      expect(hasErrors(errors)).toBe(true);
    });

    it("returns false when errors object is empty", () => {
      expect(hasErrors({})).toBe(false);
    });
  });
});
