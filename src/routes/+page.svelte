<script>
	import { browser } from '$app/environment'; 
	import * as THREE from "three"
    import fs from "node:fs"
    import a from "../package_copy.json"

	class vertice
	{
		constructor()
		{
			this.nome = ""
		}
	}

	class aresta
	{
		constructor(c, v, p, n)
		{
			this.comeco = c//vertice
			this.dest = v//vertice destino
			this.peso = p
			this.nome = n
		}
	}

	class grafo
	{
		constructor()
		{
			this.vertices = []
			this.lista_adj = new Map();
		}

		addVertices(v)
		{
			if(v in this.vertices)
			{
				return
			}

			this.vertices.push(v)
			this.lista_adj.set(v, [])
		}

		addAresta(v, u, peso = 0, nome = "")
		{
			if(!(v in this.vertices && u in this.vertices))
			{
				return
			}
			this.lista_adj.get(v).push(new aresta(v, u, peso, nome))
		}

		sao_adjacentes(v, u)
		{
			if(!(v in this.vertices && u in this.vertices))
			{
				return
			}

			this.lista_adj.get(v).forEach(element => {
				if(element === u)
				{
					return true
				}
			})

			return false
		}

		remover_aresta(v, a)
		{
			if(!(v in this.vertices && a in this.vertices.get(v)))
			{
				return
			}

			const indice = this.vertices.get(v).indexOf(a)
			this.vertices.get(v).splice(index, 1)
		}
	}
    
    console.log(a)

	if(browser) {
		let camera
		let scene
		let renderer
		let cube
        

		const init = () => {
			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

			renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

			const geometry = new THREE.BoxGeometry( 1, 1, 1 );
			const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
			cube = new THREE.Mesh( geometry, material );
			scene.add( cube );

			camera.position.z = 5;
		}

		const render = () => {
			renderer.clear()
			renderer.render(scene, camera);
		}

		const animate = () => {
			requestAnimationFrame(animate)

			cube.rotation.x += 0.005
			cube.rotation.y += 0.005

			render()
		}

		init()
		animate()
	}
</script>

<svelte:head>
	<title>SvelteKit + ThreeJS</title>
</svelte:head>

<section>
	Hello World.
</section>