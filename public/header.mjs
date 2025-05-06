import { toHtmlElement } from './toHtmlElement.mjs';

const navLinks = [
  { href: "index.html", text: "Home" },
  { href: "projects.html", text: "Projects" },
  { href: "hobbies.html", text: "Hobbies" }
];

function createNavigation() {
  const navHtml = `
    <nav aria-label="Main navigation">
      ${navLinks.map(link => `<a href="${link.href}">${link.text}</a>`).join('\n      ')}
    </nav>
  `;
  
  return toHtmlElement(navHtml).firstElementChild;
}

function createMenuButton() {
  const buttonHtml = `
    <button class="menu-button" aria-label="Toggle menu">
      Menu
    </button>
  `;
  
  return toHtmlElement(buttonHtml).firstElementChild;
}

function createHeader(title) {
  const headerHtml = `
    <header>
      <h1>${title}</h1>
    </header>
  `;
  
  const header = toHtmlElement(headerHtml).firstElementChild;
  header.appendChild(createNavigation());
  header.appendChild(createMenuButton());
  
  return header;
}

function getCurrentPageTitle() {
  const path = window.location.pathname;
  const filename = path.substring(path.lastIndexOf('/') + 1);
  
  if (filename === '' || filename === 'index.html') {
    return 'Kai Stout';
  } else if (filename === 'projects.html') {
    return 'Projects';
  } else if (filename === 'hobbies.html') {
    return 'Hobbies';
  } else {
    return 'My Website';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const title = getCurrentPageTitle();
  const header = createHeader(title);
  
  document.body.prepend(header);
});