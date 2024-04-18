<script>
	import { browser } from '$app/environment'; 
	import * as THREE from "three"
    import fs from "node:fs"
    import a from "../package_copy.json"
	import "../js/dfs"
    import { create_graph_from_json } from '../js/dfs';


    let b = new Map(Object.entries( a["packages"]))

	let g = create_graph_from_json(b)
	// console.log(g.lista_adj)

	// for(let [key, value] of g.lista_adj)
	// {
	// 	console.log(g.lista_adj.get(key))
	// }

	g.dfs()

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