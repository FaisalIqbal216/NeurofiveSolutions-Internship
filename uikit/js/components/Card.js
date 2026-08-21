import { createButton } from "./Button.js";

/**
 * createCard — reusable Card component
 *
 * @param {Object}   props
 * @param {string}   props.title
 * @param {string}   props.body
 * @param {string}   [props.image]    - Image URL (optional)
 * @param {string}   [props.badge]    - Small status chip (optional)
 * @param {string}   [props.variant]  - 'default' | 'elevated' | 'outlined'
 * @param {Array}    [props.actions]  - Array of Button props for the footer
 * @returns {HTMLElement}
 */
export function createCard({
  title = "Card title",
  body = "",
  image = null,
  badge = null,
  variant = "default",
  actions = [],
} = {}) {
  const card = document.createElement("article");
  card.className = `card card--${variant}`;

  if (image) {
    const media = document.createElement("div");
    media.className = "card__media";
    const img = document.createElement("img");
    img.src = image;
    img.alt = title; // meaningful alt text
    img.loading = "lazy";
    media.appendChild(img);
    card.appendChild(media);
  }

  const content = document.createElement("div");
  content.className = "card__content";

  if (badge) {
    const chip = document.createElement("span");
    chip.className = "card__badge";
    chip.textContent = badge;
    content.appendChild(chip);
  }

  const h3 = document.createElement("h3");
  h3.className = "card__title";
  h3.textContent = title;
  content.appendChild(h3);

  const p = document.createElement("p");
  p.className = "card__body";
  p.textContent = body;
  content.appendChild(p);

  card.appendChild(content);

  if (actions.length > 0) {
    const footer = document.createElement("div");
    footer.className = "card__footer";
    // Composition: the Card reuses the Button component for its actions
    actions.forEach((actionProps) => footer.appendChild(createButton(actionProps)));
    card.appendChild(footer);
  }

  return card;
}
