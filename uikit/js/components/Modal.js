import { createButton } from "./Button.js";

/**
 * createModal — accessible, reusable Modal component
 *
 * Features:
 *  - Focus trap (Tab cycles inside the modal)
 *  - Closes on Esc key and overlay click
 *  - Returns focus to the trigger element on close
 *  - aria-modal / role="dialog" for screen readers
 *
 * @param {Object}   props
 * @param {string}   props.title
 * @param {string}   props.body
 * @param {string}   [props.variant]       - 'default' | 'danger'
 * @param {string}   [props.confirmText]
 * @param {string}   [props.cancelText]
 * @param {Function} [props.onConfirm]
 * @param {Function} [props.onCancel]
 * @returns {{ open: Function, close: Function }}
 */
export function createModal({
  title = "Modal title",
  body = "",
  variant = "default",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm = null,
  onCancel = null,
} = {}) {
  let lastFocused = null;

  // --- Overlay ---
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.hidden = true;

  // --- Dialog ---
  const dialog = document.createElement("div");
  dialog.className = `modal modal--${variant}`;
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-modal", "true");
  dialog.setAttribute("aria-labelledby", "modal-title");

  const header = document.createElement("div");
  header.className = "modal__header";
  const h2 = document.createElement("h2");
  h2.id = "modal-title";
  h2.textContent = title;

  const closeX = createButton({
    text: "✕",
    variant: "ghost",
    size: "sm",
    onClick: () => close("cancel"),
  });
  closeX.setAttribute("aria-label", "Close modal");
  header.append(h2, closeX);

  const bodyEl = document.createElement("div");
  bodyEl.className = "modal__body";
  bodyEl.textContent = body;

  const footer = document.createElement("div");
  footer.className = "modal__footer";
  const cancelBtn = createButton({
    text: cancelText,
    variant: "secondary",
    onClick: () => close("cancel"),
  });
  const confirmBtn = createButton({
    text: confirmText,
    variant: variant === "danger" ? "danger" : "primary",
    onClick: () => close("confirm"),
  });
  footer.append(cancelBtn, confirmBtn);

  dialog.append(header, bodyEl, footer);
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

  // --- Focus trap ---
  function trapFocus(e) {
    if (e.key !== "Tab") return;
    const focusable = dialog.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function onKeydown(e) {
    if (e.key === "Escape") close("cancel");
    trapFocus(e);
  }

  // --- Public API ---
  function open() {
    lastFocused = document.activeElement;
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add("is-open"));
    document.body.style.overflow = "hidden"; // prevent background scroll
    document.addEventListener("keydown", onKeydown);
    confirmBtn.focus();
  }

  function close(reason = "cancel") {
    overlay.classList.remove("is-open");
    document.removeEventListener("keydown", onKeydown);
    document.body.style.overflow = "";

    setTimeout(() => {
      overlay.hidden = true;
      if (reason === "confirm" && typeof onConfirm === "function") onConfirm();
      if (reason === "cancel" && typeof onCancel === "function") onCancel();
      if (lastFocused) lastFocused.focus(); // return focus to trigger
    }, 200); // matches CSS transition
  }

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close("cancel"); // overlay click closes
  });

  return { open, close };
}
