<script>
let {data} = $props();
import ComponentProjectCard from '$lib/components/ComponentProjectCard.svelte';
</script>


<div class = "container justify-content-center">
<div class="mt-4 mb-2">
   <h1>Meine Projekte</h1> 
</div>

    
<div class="row">
{#each data.projects as project}
<div class = "col-12 col-sm-6 col-lg-4 col-xl-3 d-flex align-items-stretch">
<ComponentProjectCard project = {project}/>
</div>
{/each}
</div>
</div>
