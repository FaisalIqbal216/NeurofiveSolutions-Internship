/**
 * toast — reusable Toast notification system
 *
 * Features:
 *  - Auto-dismiss with animated progress bar
 *  - Pause timer on hover, resume on leave
 *  - Manual close button
 *  - Vertical stacking (multiple toasts queue on screen)
 *  - Types: success | error | info | warning
 *
 * Usage: toast({ message, type, duration })
 */

// One shared stack container for the whole app (created lazily)
function getStack() {
  let stack = document.querySelector(".toast-stack");
  if (!stack) {
    stack = document.createElement("div");
    stack.className = "toast-stack";
    stack.setAttribute("aria-live", "polite"); // screen-reader announcements
    document.body.appendChild(stack);
  }
  return stack;
}

const ICONS = { success: "✓", error: "✕", info: "ℹ", warning: "⚠" };

export function toast({
  message = "Something happened",
  type = "info",
  duration = 4000,
} = {}) {
  const stack = getStack();

  const el = document.createElement("div");
  el.className = `toast toast--${type}`;
  el.setAttribute("role", "status");

  const icon = document.createElement("span");
  icon.className = "toast__icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = ICONS[type] || ICONS.info;

  const text = document.createElement("p");
  text.className = "toast__message";
  text.textContent = message;

  const closeBtn = document.createElement("button");
  closeBtn.className = "toast__close";
  closeBtn.setAttribute("aria-label", "Dismiss notification");
  closeBtn.textContent = "✕";

  const progress = document.createElement("div");
  progress.className = "toast__progress";

  el.append(icon, text, closeBtn, progress);
  stack.appendChild(el);

  // Entrance animation
  requestAnimationFrame(() => el.classList.add("is-visible"));

  // --- Auto-dismiss timer with pause-on-hover ---
  let remaining = duration;
  let start = Date.now();
  let timer = setTimeout(dismiss, remaining);

  progress.style.transitionDuration = `${duration}ms`;
  requestAnimationFrame(() => (progress.style.transform = "scaleX(0)"));

  el.addEventListener("mouseenter", () => {
    clearTimeout(timer);
    remaining -= Date.now() - start;
    progress.style.transitionDuration = "0ms";
    progress.style.transform = `scaleX(${remaining / duration})`;
  });

  el.addEventListener("mouseleave", () => {
    start = Date.now();
    timer = setTimeout(dismiss, remaining);
    progress.style.transitionDuration = `${remaining}ms`;
    progress.style.transform = "scaleX(0)";
  });

  closeBtn.addEventListener("click", () => {
    clearTimeout(timer);
    dismiss();
  });

  function dismiss() {
    el.classList.remove("is-visible");
    el.classList.add("is-leaving");
    setTimeout(() => el.remove(), 250); // matches CSS exit transition
  }

  return { dismiss };
}
