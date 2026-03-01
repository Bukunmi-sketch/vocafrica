export const shortenOrigin = (origin: string) => {
    switch (origin) {
      case "unlocked":
        return "unlocked";
      case "returned_for_changes":
        return "returned";
      default:
        return origin.slice(0, 8);
    }
  };
  
 export const formatDraftOrigin = (origin: string) => {
    switch (origin) {
      case "initial":
        return "Originally created as draft / submitted";
      case "unlocked":
        return "Previously signed → Unlocked for editing";
      case "returned_for_changes":
        return "Signed → Changes requested → Returned to draft";
      default:
        return origin;
    }
  };


 export const getDraftOriginTooltip = (origin?: string, status?: string) => {
    if (!origin || origin === "initial") {
      return "This note was originally created in this status.";
    }
  
    if (origin === "unlocked") {
      return "This note was previously signed & locked, but has been unlocked for further editing.";
    }
  
    if (origin === "returned_for_changes") {
      return "This note was previously signed, but changes were requested and it was returned to draft.";
    }
  
    return `Draft origin: ${origin}`;
  };