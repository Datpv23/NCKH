// js/components.js

class VkuHeader extends HTMLElement {
  connectedCallback() {
    const currentPath = window.location.pathname;
    const menuIcon = `<svg viewBox="0 0 24 24" id="hamburger-icon" style="width:28px; height:28px; fill:none; stroke:currentColor; stroke-width:2; stroke-linecap:round; stroke-linejoin:round;"><path d="M3 12h18M3 6h18M3 18h18"/></svg>`;

    this.innerHTML = `
            <header>
                <a href="index.html" class="logo">
    <span class="vku-letter red">V</span>
    <span class="vku-letter blue">K</span>
    <span class="vku-letter gold">U</span>
    <span class="ar-tag">AR</span>
    DrawRoom
</a>
                <button class="menu-toggle" onclick="toggleMenu()">${menuIcon}</button>
                <ul class="nav-links" id="navLinks">
                    <li><a href="index.html" class="${currentPath.includes("index.html") || currentPath.endsWith("/") ? "active" : ""}">Trang chủ</a></li>
                    <li><a href="gioi-thieu.html" class="${currentPath.includes("gioi-thieu.html") ? "active" : ""}">Giới thiệu</a></li>
                    <li><a href="mo-hinh.html" class="${currentPath.includes("mo-hinh.html") ? "active" : ""}">Mô hình 3D</a></li>
                    <li><a href="demo-ar.html" class="${currentPath.includes("demo-ar.html") ? "active" : ""}">Demo AR</a></li>
                    <li><a href="tai-lieu.html" class="${currentPath.includes("tai-lieu.html") ? "active" : ""}">Tài liệu</a></li>
                </ul>
            </header>
        `;
  }
}

class VkuFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <footer>
                <p>Mô phỏng Không gian Phòng học Thực hành Vẽ <span>VKU</span></p>
                <p>&copy; 2026 - Dự án nghiên cứu khoa học WebAR</p>
            </footer>
        `;
  }
}

customElements.define("vku-header", VkuHeader);
customElements.define("vku-footer", VkuFooter);

window.toggleMenu = function () {
  const navLinks = document.getElementById("navLinks");
  const iconPath = document.querySelector("#hamburger-icon path");
  navLinks.classList.toggle("show");
  if (navLinks.classList.contains("show")) {
    iconPath.setAttribute("d", "M6 18L18 6M6 6l12 12");
  } else {
    iconPath.setAttribute("d", "M3 12h18M3 6h18M3 18h18");
  }
};

// LOGIC HIỆU ỨNG TẢI TRANG & CUSTOM CURSOR
document.addEventListener("DOMContentLoaded", () => {
  // 1. Tắt Splash Screen sau 1.5s
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 1500);

  // 2. Custom Cursor Radar
  if (window.matchMedia("(pointer: fine)").matches) {
    const dot = document.createElement("div");
    dot.classList.add("custom-cursor-dot");
    const ring = document.createElement("div");
    ring.classList.add("custom-cursor-ring");
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = 0,
      mouseY = 0,
      ringX = 0,
      ringY = 0;
    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
    });

    function renderCursor() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";
      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    setTimeout(() => {
      const interactables = document.querySelectorAll(
        "a, button, .menu-toggle, model-viewer",
      );
      interactables.forEach((el) => {
        el.addEventListener("mouseenter", () => ring.classList.add("hovered"));
        el.addEventListener("mouseleave", () =>
          ring.classList.remove("hovered"),
        );
      });
    }, 800);
  }
});
