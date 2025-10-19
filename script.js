// Dark Mode - robust script
(function () {
  const toggleBtn = document.getElementById("theme-toggle");
  const body = document.body;
  const storageKey = "theme";

  // Util: setea el estado visual y atributos ARIA
  function applyTheme(theme) {
    if (theme === "dark") {
      body.setAttribute("data-theme", "dark");
      toggleBtn.textContent = "Cambiar a modo claro";
      toggleBtn.setAttribute("aria-pressed", "true");
    } else {
      body.removeAttribute("data-theme");
      toggleBtn.textContent = "Cambiar a modo oscuro";
      toggleBtn.setAttribute("aria-pressed", "false");
    }
  }

  // Intentar leer localStorage de forma segura
  function readSavedTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch (e) {
      // localStorage bloqueado (modo incógnito estricto o política) -> null
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (e) {
      // si falla el guardado, no hacemos nada (no fatal)
    }
  }

  // Detectar preferencia del sistema si no hay guardado
  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  // Inicialización
  (function init() {
    const saved = readSavedTheme();
    if (saved) {
      applyTheme(saved);
    } else if (systemPrefersDark()) {
      applyTheme("dark");
    } else {
      applyTheme("light");
    }
  })();

  // Manejador del clic
  toggleBtn.addEventListener("click", function () {
    const current = body.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    saveTheme(next);
  });

  // Soporte por teclado: Enter o espacio cuando el botón está enfocado
  toggleBtn.addEventListener("keyup", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleBtn.click();
    }
  });
})();
