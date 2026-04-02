<script>
  let { data } = $props();
  // svelte-ignore state_referenced_locally
  const project = data.project;
  // State für das mobile Menü
  let isMenuOpen = $state(false);

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function closeMenu() {
    isMenuOpen = false;
  }
</script>

<button
  class="d-lg-none mobile-nav-toggle shadow"
  onclick={toggleMenu}
  aria-label="Menü öffnen"
>
  {#if isMenuOpen}
    ✕
  {:else}
    ☰
  {/if}
</button>

<div class="container my-5">
  <div class="row">
    <div class="col-lg-9 col-md-8">
      <h1 id="top" class="title mb-4 text-center">
        {project.pageData.fullTitle}
      </h1>

      <div class="row justify-content-center">
        <div class="col-12 col-xl-10">
          <img
            src={project.pageData.heroImage}
            class="img-fluid rounded shadow-sm mb-4"
            alt={project.pageData.fullTitle}
          />

          <div class="intro-box mb-5">
            <h6 class="intro-text">
              {@html project.pageData.intro}
            </h6>
          </div>

          {#each project.pageData.sections as section}
            <div id={section.id} class="abschnitt mb-5">
              <h4 class="section-heading">{section.heading}</h4>

              {#if section.type === "text_list" || section.type === "list"}
                <p>{section.content}</p>
                {#if section.items}
                  <ul class="custom-list">
                    {#each section.items as item}
                      <li>{item}</li>
                    {/each}
                  </ul>
                {/if}
                {#if section.footer}
                  <p class="text-muted small mt-2"><i>{section.footer}</i></p>
                {/if}
              {:else if section.type === "image_link"}
                <p>{section.content}</p>
                <div class="text-center my-3">
                  <img
                    src={section.image}
                    class="img-fluid rounded border shadow-sm"
                    alt={section.heading}
                  />
                  {#if section.link}
                    <div class="mt-3">
                      <a
                        href={section.link}
                        target="_blank"
                        //Link extern als neuen Tab öffnen.
                        rel="noopener noreferrer"
                        //Sicherheitsmechanismus noopener: Ist zuständig für die Kappung von windows.opener auf der externen Seite und verhindert das ungewünschte Weiterleiten auf eine andere Seite durch die aufgerufene Webseite.
                        //noreferrer: verhindet das der Referer-Header mitgesendet wird, also das die Webseite durch diese Webseite aufgerufen wurde. FÜr die aufgerufene Webseite sieht es nach einem Direktaufruf aus.
                        class="btn btn-outline-primary btn-sm"
                      >
                        {section.linkText || "Link öffnen"}
                      </a>
                    </div>
                  {/if}
                </div>
              {:else if section.type === "text"}
                <p>{section.content}</p>

              {:else if section.type === "carousel"}
              {#if section.content}
              <p>{section.content}</p>
              {/if}
                <div id="carousel-{section.id}" class="carousel slide carousel-fad  rounded overflow.hidden" data-bs-ride="carousel">
                  <div class="carousel-indicators">
                   {#each section.images as _,i}
                    <button
                      type="button"
                      data-bs-target="#carousel-{section.id}"
                      data-bs-slide-to="{i}"
                      class={i === 0 ? 'active' : ''}
                      aria-current={i === 0 ? 'true' : 'false'}
                      aria-label="Slide {i+1}"
                    ></button>
                    {/each}
                   
                  </div>

                  <div class="carousel-inner">
                  {#each section.images as img,i}
                    <div class="carousel-item {i === 0 ? 'active' : ''}">
                      <img src="{img.url}" class="d-block custom-carousel-img" alt="{img.title || "Darstellung"}" />
                    </div>
                    {/each}
                  </div>

                  <button
                    class="carousel-control-prev" type="button" data-bs-target="#carousel-{section.id}"data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Zurück</span>
                  </button>
                  
                  <button
                    class="carousel-control-next" type="button" data-bs-target="#carousel-{section.id}" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Weiter</span>
                  </button>
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    </div>

    <div class="col-lg-3 col-md-4">
      <div class="sticky-sidebar {isMenuOpen ? 'active' : ''}">
        <div class="toc-container shadow-sm mb-4">
          <h5 class="sidebar-label">Inhalt</h5>
          <nav class="nav flex-column toc">
            <a class="nav-link py-1" href="#top" onclick={closeMenu}
              ><b>{project.pageData.fullTitle} </b></a
            >
            {#each project.pageData.sections as section}
              {#if section.id != ""}
                <a
                  class="nav-link py-1 text-truncate"
                  href="#{section.id}"
                  onclick={closeMenu}
                >
                  {section.heading}
                </a>
              {/if}
            {/each}
          </nav>
        </div>

        <div class="experience-sidebar shadow-sm">
          <h5 class="sidebar-label">Kenntnisserweiterung</h5>
          <ul class="list-unstyled mt-3">
            {#each project.pageData.skills as skill}
              <li class="skill-badge">{skill}</li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

{#if isMenuOpen}
  <div class="overlay d-lg-none" onclick={closeMenu} aria-hidden="true"></div>
{/if}

<style>
  /* 1. GLOBALE EINSTELLUNGEN & SCROLL-VERHALTEN */
  :global(html) {
    scroll-behavior: smooth; /* Sanftes Gleiten zu Ankern (#id) */
  }

  /* Abstand korrigieren, damit Überschriften nicht unter einer fixen Header-Leiste landen */
  .abschnitt {
    scroll-margin-top: 30px;
  }

  .carousel-control-prev-icon {
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="97.138 0 257.57 451.847" fill="%23808080">   <path d="M97.138,225.919c0-8.095,3.085-16.186,9.262-22.365L300.687,9.269c12.359-12.359,32.396-12.359,44.75,0   c12.354,12.354,12.354,32.389,0,44.748L173.528,225.92l171.914,171.909c12.354,12.354,12.354,32.391,0,44.744   c-12.354,12.365-32.392,12.365-44.75,0L106.404,248.292C100.229,242.115,97.138,234.018,97.138,225.919z"/></svg>') !important;
}

.carousel-control-next-icon {
     background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="97.138 0 257.57 451.847" fill="%23808080"> <path d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744 L278.317,225.92L106.409,54.017c-12.354-12.359-12.354-32.395,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284 c6.177,6.18,9.262,14.271,9.262,22.365C354.708,234.018,351.617,242.115,345.441,248.292z"/></svg>') !important;
}

.carousel-indicators button {
  background-color: grey;
}

.custom-carousel-img {
  height: 500px; /* Deine gewünschte maximale Höhe */
  width: 100%;
  object-fit: contain; /* Zeigt das ganze Bild ohne Beschnitt */
}

/* Optional: Auf Mobilgeräten die Höhe reduzieren */
@media (max-width: 768px) {
  .custom-carousel-img {
    height: 300px;
  }
}

  /* 2. TYPOGRAFIE & LAYOUT */
  .title {
    font-weight: 700;
    color: #2c3e50;
  }

  .intro-box {
    border-left: 5px solid #007bff;
    padding: 10px 20px;
    background-color: #fcfcfc;
  }

  .intro-text {
    line-height: 1.7;
    color: #444;
  }

  .section-heading {
    border-bottom: 2px solid #f0f0f0;
    padding-bottom: 8px;
    margin-bottom: 20px;
    color: #333;
    font-weight: 600;
  }


  /* 3. SIDEBAR (ALLGEMEIN & DESKTOP) */
  .sticky-sidebar {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .toc-container,
  .experience-sidebar {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 12px;
  }

  .sidebar-label {
    font-size: 0.9rem;
    font-weight: bold;
    color: #6c757d;
    margin-bottom: 15px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  /* Inhaltsverzeichnis Links */
  .toc .nav-link {
    color: #495057;
    font-size: 0.9rem;
    padding: 5px 0;
    transition: all 0.2s ease; /* Weicher Übergang bei Hover */
  }

  .toc .nav-link:hover {
    color: #007bff;
    padding-left: 8px; /* Kleiner "Slide"-Effekt beim Drüberfahren */
  }

  /* Kenntnisse (Skill Badges) */
  .skill-badge {
    background: #ffffff;
    border: 1px solid #dee2e6;
    padding: 8px 12px;
    border-radius: 8px;
    margin-bottom: 8px;
    display: block;
    font-size: 0.85rem;
    transition: all 0.2s ease;
  }

  .skill-badge:hover {
    border-color: #007bff;
    color: #007bff;
    transform: translateX(3px); /* Sanfter Schubs nach rechts */
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.05);
  }

  /* 4. MOBILER TOGGLE-BUTTON (FAB) */
  .mobile-nav-toggle {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 2000; /* Ganz oben auf dem Stack */
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background-color: #007bff;
    color: white;
    border: none;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      transform 0.2s,
      background-color 0.2s;
  }

  .mobile-nav-toggle:active {
    transform: scale(0.9); /* Kleiner "Click"-Effekt */
  }

  /* 5. RESPONSIVE LOGIK (BREAKPOINTS) */

  /* DESKTOP Ansicht (ab 992px) */
  @media (min-width: 992px) {
    .sticky-sidebar {
      position: sticky;
      top: 20px;
    }
    .mobile-nav-toggle {
      display: none; /* Auf Desktop nicht nötig */
    }
  }

  /* MOBILE Ansicht (unter 992px) */
  @media (max-width: 991px) {
    .sticky-sidebar {
      position: fixed;
      top: 0;
      right: -320px; /* Komplett aus dem rechten Rand geschoben */
      width: 300px;
      height: 100vh;
      background-color: white;
      z-index: 1500;
      padding: 30px 20px;
      box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
      transition: right 0.3s ease-in-out; /* Der Slide-In Effekt */
      overflow-y: auto; /* Scrollbar falls Inhalt länger als Display */
    }

    /* Diese Klasse wird per Svelte hinzugefügt */
    .sticky-sidebar.active {
      right: 0; /* Schiebt die Sidebar ins Sichtfeld */
    }

    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(2px); /* Moderner Blur-Effekt */
      z-index: 1400;
    }

    .toc-container,
    .experience-sidebar {
      background-color: transparent;
      padding: 0;
      box-shadow: none !important;
    }
  }

  /* Listen-Styling */
  .custom-list {
    padding-left: 1.2rem;
    margin-top: 10px;
  }

  .custom-list li {
    margin-bottom: 8px;
  }
</style>
