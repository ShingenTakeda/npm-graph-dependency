import * as THREE from "three" 
import { browser } from '$app/environment';
class BS
{
    constructor(fov, near, far)
    {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera()
        this.renderer = new THREE.WebGLRenderer()
    }

    add_entity(entity)
    {
        this.scene.add(entity)
    }

    remove_entity(entity)
    {
        this.scene.remove(entity)
    }

    draw()
    {
        this.renderer.clear()
    }

    update()
    {

    }
}