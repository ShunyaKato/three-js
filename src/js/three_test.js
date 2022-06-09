
import * as THREE from 'three'
// キューブ回転
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('test1').appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

camera.position.z = 5

function animate() {
  requestAnimationFrame(animate)
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  renderer.render(scene, camera)
}
animate()


// 線を引く
const renderer2 = new THREE.WebGLRenderer()
renderer2.setSize(window.innerWidth, window.innerHeight)
document.getElementById('test2').appendChild(renderer2.domElement)

const camera2 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500)
camera2.position.set(0, 0, 100)
camera2.lookAt(0, 0, 0)

const scene2 = new THREE.Scene()

//create a blue LineBasicMaterial
const material2 = new THREE.LineBasicMaterial({ color: 0x0000ff });

const points2 = []
points2.push(new THREE.Vector3(-10, 0, 0))
points2.push(new THREE.Vector3(0, 10, 0))
points2.push(new THREE.Vector3(10, 0, 0))

const geometry2 = new THREE.BufferGeometry().setFromPoints(points2)

const line2 = new THREE.Line(geometry2, material2)

scene2.add(line2)
renderer2.render(scene2, camera2)

// 回転させる
// scene.add(line)
// function animate() {
//   requestAnimationFrame(animate)
//   line.rotation.x += 0.01
//   line.rotation.y += 0.01
//   renderer.render(scene, camera)
// }
// animate()


