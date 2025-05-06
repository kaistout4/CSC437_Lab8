import { toHtmlElement } from './toHtmlElement.mjs';

const navLinks = [
  { href: "", text: "Home" },
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

function createDarkModeToggle() {
  const toggleHtml = `
    <label class="dark-mode-toggle">
      <input type="checkbox" autocomplete="off" id="dark-mode-checkbox" />
      Dark mode
    </label>
  `;
  
  return toHtmlElement(toggleHtml).firstElementChild;
}

function createHeader(title) {
  const headerHtml = `
    <header>
      <h1>${title}</h1>
    </header>
  `;
  
  const header = toHtmlElement(headerHtml).firstElementChild;
  const nav = createNavigation();
  const darkModeToggle = createDarkModeToggle();
  const menuButton = createMenuButton();
  
  header.appendChild(nav);
  header.appendChild(darkModeToggle);
  header.appendChild(menuButton);
  
  menuButton.addEventListener('click', () => {
    console.log('Menu button clicked');
    nav.classList.toggle('visible');
  });

  document.body.addEventListener('click', (event) => {
    if (nav.classList.contains('visible') && !header.contains(event.target)) {
      nav.classList.remove('visible');
    }
  });
  
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
  
  const darkModeCheckbox = document.getElementById('dark-mode-checkbox');
  
  const loadDarkModeState = () => {
    const darkModeEnabled = localStorage.getItem('darkModeEnabled');
    
    if (darkModeEnabled !== null) {
      const isDarkMode = darkModeEnabled === "true";
      
      darkModeCheckbox.checked = isDarkMode;
      
      if (isDarkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
  };
  
  loadDarkModeState();
  
  darkModeCheckbox.addEventListener('change', () => {
    const isDarkMode = darkModeCheckbox.checked;
    console.log(`Dark mode toggled}`);
    
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    
    localStorage.setItem('darkModeEnabled', isDarkMode.toString());
  });
});