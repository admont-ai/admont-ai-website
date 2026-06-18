class AdmontSiteHeader extends HTMLElement {
  connectedCallback() {
    if (this.dataset.rendered === "true") {
      return;
    }

    this.ensureStyles();

    const sectionRoot = this.getAttribute("section-root");
    const basePath = this.getAttribute("base-path") || sectionRoot || "./";
    const currentPage = this.getAttribute("current-page") || "";
    const homeUrl = this.getAttribute("home-url") || `${basePath}index.html`;
    const docsUrl = this.getAttribute("docs-url") || `${basePath}docs/`;
    const iconUrl =
      this.getAttribute("icon-url") || `${basePath}assets/admont-ai-icon.png`;
    const openSourceUrl =
      this.getAttribute("open-source-url") || `${basePath}index.html#open-source`;
    const showOpenSource = this.getAttribute("show-open-source") !== "false";
    const actionNodes = Array.from(this.querySelectorAll('[slot="actions"]'));
    const actions = document.createElement("div");
    const navItems = [
      { id: "features", label: "Features", href: `${basePath}features/` },
      {
        id: "how-it-works",
        label: "How It Works",
        href: `${basePath}how-it-works/`,
      },
      {
        id: "architecture",
        label: "Architecture",
        href: `${basePath}architecture/`,
      },
      { id: "security", label: "Security", href: `${basePath}security/` },
      { id: "docs", label: "Docs", href: docsUrl },
    ];
    if (showOpenSource) {
      navItems.splice(4, 0, {
        id: "open-source",
        label: "Open Source",
        href: openSourceUrl,
      });
    }

    actions.className = "site-header-actions";
    for (const node of actionNodes) {
      actions.append(...Array.from(node.childNodes));
      node.remove();
    }

    this.innerHTML = `
      <header class="site-header">
        <a class="brand" href="${homeUrl}" aria-label="Admont AI home">
          <img
            class="brand-mark"
            src="${iconUrl}"
            alt=""
            width="40"
            height="40"
          />
          <span class="brand-text">Admont AI</span>
        </a>
        <nav class="site-nav" aria-label="Primary">
          ${navItems
            .map(
              (item) => `
                <a
                  href="${item.href}"
                  ${item.id === currentPage ? 'aria-current="page"' : ""}
                >
                  ${item.label}
                </a>
              `,
            )
            .join("")}
        </nav>
      </header>
    `;

    if (actions.childNodes.length > 0) {
      this.querySelector(".site-header").append(actions);
    }

    this.dataset.rendered = "true";
  }

  ensureStyles() {
    if (document.getElementById("admont-site-header-styles")) {
      return;
    }

    const styles = document.createElement("style");
    styles.id = "admont-site-header-styles";
    styles.textContent = `
      admont-site-header {
        display: block;
        width: calc(100% - 56px);
        margin: 0 auto;
        padding-top: 28px;
      }

      .site-header {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 13.6px 16px;
        border: 1px solid rgba(31, 35, 33, 0.12);
        border-radius: 999px;
        background: rgba(255, 250, 240, 0.7);
        color: #1f2321;
        font-family: "Avenir Next", Avenir, "Segoe UI", sans-serif;
        font-size: 16px;
        line-height: 1.5;
        backdrop-filter: blur(14px);
        z-index: 4;
      }

      .brand {
        display: inline-flex;
        align-items: center;
        gap: 12.8px;
        color: #1f2321;
        font-weight: 700;
        letter-spacing: -0.48px;
        text-decoration: none;
      }

      .brand:hover,
      .brand:focus {
        color: #1f2321;
      }

      .brand-mark {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 12.8px;
        object-fit: contain;
        box-shadow: 0 8px 24px rgba(19, 78, 74, 0.12);
      }

      .brand-text {
        font-size: 16px;
      }

      .site-nav {
        display: flex;
        flex: 1 1 auto;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: 16px;
        color: #5d645d;
        font-size: 15.2px;
      }

      .site-nav a {
        color: #5d645d;
        text-decoration: none;
      }

      .site-nav a[aria-current="page"] {
        color: #134e4a;
        font-weight: 700;
      }

      .site-nav a:hover,
      .site-nav a:focus {
        color: #134e4a;
      }

      @media (max-width: 640px) {
        admont-site-header {
          width: calc(100% - 16px);
          padding-top: 8px;
        }

        .site-header {
          flex-direction: column;
          align-items: flex-start;
          border-radius: 22.4px;
        }

        .site-nav {
          justify-content: flex-start;
        }
      }
    `;
    document.head.append(styles);
  }
}

customElements.define("admont-site-header", AdmontSiteHeader);
