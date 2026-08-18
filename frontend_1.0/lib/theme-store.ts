import {
  applyTheme,
  getStoredTheme,
  THEME_STORAGE_KEY,
  type ThemePreference,
} from "@/lib/theme";

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribeTheme(listener: () => void) {
  listeners.add(listener);
  applyTheme(getStoredTheme());
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onChange = () => {
    if (getStoredTheme() === "system") {
      applyTheme("system");
      emit();
    }
  };
  media.addEventListener("change", onChange);
  return () => {
    listeners.delete(listener);
    media.removeEventListener("change", onChange);
  };
}

export function getThemeSnapshot(): ThemePreference {
  return getStoredTheme();
}

export function getThemeServerSnapshot(): ThemePreference {
  return "system";
}

export function setThemePreference(preference: ThemePreference) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // Private mode / blocked storage — still apply in-memory theme.
  }
  applyTheme(preference);
  emit();
}
