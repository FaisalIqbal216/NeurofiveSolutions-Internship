/* ============================================================
   DEMO PAGE — every component below is created from props only.
   No component is hardcoded in HTML.
   ============================================================ */
import { createButton } from "./components/Button.js";
import { createCard } from "./components/Card.js";
import { createModal } from "./components/Modal.js";
import { toast } from "./components/Toast.js";

const $ = (sel) => document.querySelector(sel);

/* ---------------- THEME TOGGLE (a Button with props!) ---------------- */
const themeBtn = createButton({
  text: "🌙",
  variant: "ghost",
  size: "sm",
  onClick: (_, btn) => {
    const html = document.documentElement;
    const dark = html.dataset.theme === "dark";
    html.dataset.theme = dark ? "light" : "dark";
    btn.querySelector(".btn__label").textContent = dark ? "🌙" : "☀️";
    toast({ message: `${dark ? "Light" : "Dark"} mode enabled`, type: "info", duration: 2000 });
  },
});
themeBtn.setAttribute("aria-label", "Toggle dark mode");
$("#themeToggleMount").appendChild(themeBtn);

/* ---------------- HERO ---------------- */
const heroActions = $("#heroActions");
heroActions.append(
  createButton({
    text: "Open Modal",
    size: "lg",
    icon: "🔲",
    onClick: () => demoModal.open(),
  }),
  createButton({
    text: "Fire a Toast",
    variant: "secondary",
    size: "lg",
    icon: "🔔",
    onClick: () => toast({ message: "Hello from the hero! 👋", type: "success" }),
  })
);

/* ---------------- BUTTON SHOWCASE ---------------- */
$("#btnVariants").append(
  createButton({ text: "Primary", variant: "primary", onClick: () => toast({ message: "Primary clicked", type: "info" }) }),
  createButton({ text: "Secondary", variant: "secondary", onClick: () => toast({ message: "Secondary clicked", type: "info" }) }),
  createButton({ text: "Ghost", variant: "ghost", onClick: () => toast({ message: "Ghost clicked", type: "info" }) }),
  createButton({ text: "Delete", variant: "danger", onClick: () => confirmModal.open() })
);

$("#btnSizes").append(
  createButton({ text: "Small", size: "sm", variant: "secondary" }),
  createButton({ text: "Medium", size: "md", variant: "secondary" }),
  createButton({ text: "Large", size: "lg", variant: "secondary" }),
  createButton({ text: "Download", icon: "⬇️", onClick: () => toast({ message: "Download started…", type: "success" }) })
);

const loadingBtn = createButton({ text: "Save changes", icon: "💾" });
loadingBtn.addEventListener("click", () => {
  loadingBtn.classList.add("btn--loading");
  loadingBtn.disabled = true;
  const spinner = document.createElement("span");
  spinner.className = "btn__spinner";
  loadingBtn.appendChild(spinner);
  setTimeout(() => {
    loadingBtn.classList.remove("btn--loading");
    loadingBtn.disabled = false;
    spinner.remove();
    toast({ message: "Changes saved successfully!", type: "success" });
  }, 1800);
});
$("#btnStates").append(
  loadingBtn,
  createButton({ text: "Disabled", variant: "secondary", disabled: true })
);

/* ---------------- CARD SHOWCASE ---------------- */
$("#cardGrid").append(
  createCard({
    title: "Getting Started",
    body: "Cards compose the Button component for their footer actions — one source of truth for button styling.",
    image: "https://picsum.photos/seed/nebula1/640/360",
    badge: "New",
    actions: [
      { text: "Read docs", size: "sm", onClick: () => toast({ message: "Opening docs…", type: "info" }) },
      { text: "Share", size: "sm", variant: "ghost", icon: "🔗", onClick: () => toast({ message: "Link copied!", type: "success" }) },
    ],
  }),
  createCard({
    title: "Design Tokens",
    body: "Spacing, radius, and type scales are CSS variables — so every component stays consistent automatically.",
    image: "https://picsum.photos/seed/nebula2/640/360",
    badge: "System",
    variant: "elevated",
    actions: [
      { text: "View tokens", size: "sm", variant: "secondary", onClick: () => toast({ message: "Tokens panel opened", type: "info" }) },
    ],
  }),
  createCard({
    title: "No-Image Card",
    body: "Image is just another prop — omit it and the card adapts. Same function, different data.",
    variant: "outlined",
    actions: [
      { text: "Try it", size: "sm", onClick: () => toast({ message: "Nice one! 🎉", type: "success" }) },
    ],
  })
);

/* ---------------- MODALS ---------------- */
const demoModal = createModal({
  title: "Welcome to Nebula UI ✨",
  body: "This modal is focus-trapped, closes on Esc or overlay click, and returns focus to the button that opened it. Try pressing Tab — focus never escapes.",
  confirmText: "Awesome",
  onConfirm: () => toast({ message: "Modal confirmed!", type: "success" }),
  onCancel: () => toast({ message: "Modal dismissed", type: "info" }),
});

const confirmModal = createModal({
  title: "Delete this item?",
  body: "This action is permanent and cannot be undone. We confirm before destructive actions to prevent mistakes.",
  variant: "danger",
  confirmText: "Yes, delete",
  onConfirm: () => toast({ message: "Item deleted.", type: "error" }),
});

$("#modalTriggers").append(
  createButton({ text: "Open info modal", icon: "🔲", onClick: () => demoModal.open() }),
  createButton({ text: "Destructive action", variant: "danger", icon: "🗑️", onClick: () => confirmModal.open() })
);

/* ---------------- TOAST TRIGGERS ---------------- */
$("#toastTriggers").append(
  createButton({ text: "Success", variant: "secondary", icon: "✅", onClick: () => toast({ message: "Profile updated successfully!", type: "success" }) }),
  createButton({ text: "Error", variant: "secondary", icon: "⛔", onClick: () => toast({ message: "Payment failed. Please try again.", type: "error" }) }),
  createButton({ text: "Warning", variant: "secondary", icon: "⚠️", onClick: () => toast({ message: "Storage almost full (92%).", type: "warning" }) }),
  createButton({ text: "Info", variant: "secondary", icon: "ℹ️", onClick: () => toast({ message: "New version available.", type: "info" }) }),
  createButton({
    text: "Stack ×3",
    icon: "🥞",
    onClick: () => {
      toast({ message: "First toast in the stack", type: "info", duration: 6000 });
      setTimeout(() => toast({ message: "Second toast joins in", type: "success", duration: 6000 }), 350);
      setTimeout(() => toast({ message: "Third one stacks neatly", type: "warning", duration: 6000 }), 700);
    },
  })
);
