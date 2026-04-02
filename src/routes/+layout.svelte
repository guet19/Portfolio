<script>
  import favicon from "$lib/assets/favicon.svg";
  let { children } = $props();
  </script>

<header>
  <div class="px-3 py-2 text-bg-dark border-bottom">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
      >
        <a
          href="/"
          class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
        >
          <svg
            class="bi me-2"
            width="40"
            height="32"
            role="img"
            aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg
          >
        </a>
        <ul
          class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small"
        >
          <li>
            <a href="/" class="nav-link text-white">
              <svg
                class="bi d-block mx-auto mb-1"
                width="24"
                height="24"
                aria-hidden="true"><use xlink:href="#"></use></svg
              >
              Home
            </a>
          </li>
        
          <li>
            <a href="/projekte" class="nav-link text-white">
              <svg
                class="bi d-block mx-auto mb-1"
                width="24"
                height="24"
                aria-hidden="true"><use xlink:href="#"></use></svg
              >
              Projekte
            </a>
          </li>
          <li>
            <a href="/ueber-mich" class="nav-link text-white">
              <svg
                class="bi d-block mx-auto mb-1"
                width="24"
                height="24"
                aria-hidden="true"><use xlink:href="#people-circle"></use></svg
              >
              Über mich
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</header>

{@render children()}
