<script>
    let{project} =$props();
</script>

<div class="card m-2 h-100" style="width: 18rem;">
  <img src="{project.cardData.thumbnail}" class="card-img-top" alt="{project.projectName}">
  <div class="card-body d-flex flex-column">
    <h5 class="card-title">{project.cardData.title}</h5>
    <p class="card-text">{project.cardData.shortDescription}</p>
    <a href="/projekte/{project.slug}" class="btn btn-primary mt-auto">Zum Projekt</a>
  </div>
</div>

