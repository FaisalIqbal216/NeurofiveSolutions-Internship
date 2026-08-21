/**
 * createButton — reusable Button component (vanilla JS, React-style props)
 *
 * @param {Object}   props
 * @param {string}   props.text      - Button label
 * @param {string}   [props.variant] - 'primary' | 'secondary' | 'ghost' | 'danger'
 * @param {string}   [props.size]    - 'sm' | 'md' | 'lg'
 * @param {string}   [props.icon]    - Emoji / icon character rendered before text
 * @param {boolean}  [props.loading] - Shows spinner, disables interaction
 * @param {boolean}  [props.disabled]
 * @param {Function} [props.onClick]
 * @param {string}   [props.type]    - 'button' | 'submit'
 * @returns {HTMLButtonElement}
 */
export function createButton({
  text = "Button",
  variant = "primary",
  size = "md",
  icon = null,
  loading = false,
  disabled = false,
  onClick = null,
  type = "button",
} = {}) {
  const btn = document.createElement("button");
  btn.type = type;
  btn.className = `btn btn--${variant} btn--${size}`;

  if (icon) {
    const iconEl = document.createElement("span");
    iconEl.className = "btn__icon";
    iconEl.setAttribute("aria-hidden", "true"); // decorative
    iconEl.textContent = icon;
    btn.appendChild(iconEl);
  }

  const label = document.createElement("span");
  label.className = "btn__label";
  label.textContent = text;
  btn.appendChild(label);

  if (loading) {
    btn.classList.add("btn--loading");
    btn.disabled = true;
    btn.setAttribute("aria-busy", "true");
    const spinner = document.createElement("span");
    spinner.className = "btn__spinner";
    spinner.setAttribute("aria-hidden", "true");
    btn.appendChild(spinner);
  }

  if (disabled) {
    btn.disabled = true;
    btn.setAttribute("aria-disabled", "true");
  }

  if (typeof onClick === "function") {
    btn.addEventListener("click", (e) => {
      // Demo: brief pressed -> loading feedback so clicks never feel silent
      if (typeof onClick === "function") onClick(e, btn);
    });
  }

  return btn;
}
