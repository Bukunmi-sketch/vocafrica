import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const PortalTooltip = ({
  anchorRef,
  children,
  open,
}: {
  anchorRef: React.RefObject<HTMLElement>;
  children: React.ReactNode;
  open: boolean;
}) => {
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (!open || !anchorRef.current) return;

    const rect = anchorRef.current.getBoundingClientRect();

    setStyle({
      position: "fixed",
      top: rect.top - 8,
      left: rect.left + rect.width / 2,
      transform: "translate(-50%, -100%)",
      zIndex: 99999,
    });
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div style={style} className="pointer-events-none">
      {children}
    </div>,
    document.body,
  );
};
