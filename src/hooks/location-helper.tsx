export const initializeLocationData = () => {
  // Check if we already have location data
  if (
    !sessionStorage.getItem("latitude") ||
    !sessionStorage.getItem("longitude")
  ) {
    // Get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          sessionStorage.setItem(
            "latitude",
            position.coords.latitude.toString(),
          );
          sessionStorage.setItem(
            "longitude",
            position.coords.longitude.toString(),
          );
        },
        () => {
          // Set default values or handle the error appropriately
          sessionStorage.setItem("latitude", "0");
          sessionStorage.setItem("longitude", "0");
        },
      );
    } else {
      // Set default values
      sessionStorage.setItem("latitude", "0");
      sessionStorage.setItem("longitude", "0");
    }
  }
};
