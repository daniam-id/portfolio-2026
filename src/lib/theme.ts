export type Theme = "light" | "dark";

const STORAGE_KEY = "portfolio-theme";
const THEME_COLORS: Record<Theme, string> = {
  light: "#f4f1ea",
  dark: "#23221f",
};

const listeners = new Set<(theme: Theme) => void>();

let currentTheme: Theme = "light";
let initialized = false;
let manualOverride = false;
let colorSchemePreference: MediaQueryList | null = null;
let colorSchemeListener: ((event: MediaQueryListEvent) => void) | null = null;

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (themeColor) themeColor.content = THEME_COLORS[theme];
}

function updateTheme(theme: Theme, applyWhenUnchanged = false): void {
  if (theme === currentTheme) {
    if (applyWhenUnchanged) applyTheme(theme);
    return;
  }

  currentTheme = theme;
  applyTheme(theme);
  listeners.forEach((listener) => listener(currentTheme));
}

function stopFollowingSystemPreference(): void {
  if (colorSchemePreference && colorSchemeListener) {
    colorSchemePreference.removeEventListener("change", colorSchemeListener);
  }
  colorSchemePreference = null;
  colorSchemeListener = null;
}

export function initializeTheme(): void {
  if (initialized || typeof document === "undefined" || typeof window === "undefined") return;
  initialized = true;

  let savedTheme: string | null = null;
  try {
    savedTheme = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // Storage can be unavailable in private or restricted browsing contexts.
  }

  if (isTheme(savedTheme)) {
    manualOverride = true;
    updateTheme(savedTheme, true);
    return;
  }

  if (typeof window.matchMedia === "function") {
    try {
      colorSchemePreference = window.matchMedia("(prefers-color-scheme: dark)");
      updateTheme(colorSchemePreference.matches ? "dark" : "light", true);

      colorSchemeListener = () => {
        if (!manualOverride && colorSchemePreference) {
          updateTheme(colorSchemePreference.matches ? "dark" : "light");
        }
      };
      colorSchemePreference.addEventListener("change", colorSchemeListener);
      return;
    } catch {
      colorSchemePreference = null;
      colorSchemeListener = null;
    }
  }

  updateTheme("light", true);
}

export function setTheme(theme: Theme): void {
  manualOverride = true;
  stopFollowingSystemPreference();
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Keep the manual choice active for this page even when it cannot be persisted.
  }
  updateTheme(theme);
}

export function toggleTheme(): void {
  setTheme(currentTheme === "light" ? "dark" : "light");
}

export function getTheme(): Theme {
  return currentTheme;
}

export function onThemeChange(listener: (theme: Theme) => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
