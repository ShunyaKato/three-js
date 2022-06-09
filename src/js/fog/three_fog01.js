import * as THREE from 'three'

// ページの読み込みを待つ
window.addEventListener('DOMContentLoaded', init)

function init() {

  // サイズを指定
  const width = 960
  const height = 540

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#fog01'),
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)
  // レンダラー：シャドウを有効に
  renderer.shadowMap.enabled = true

  // シーンを作成
  const scene = new THREE.Scene()

  // フォグを設定
  scene.fog = new THREE.Fog(0x000000, 50, 2000)

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height)
  camera.position.set(0, 0, +1000)

  // グループを作成
  const group = new THREE.Group()
  scene.add(group)
  const geometry = new THREE.BoxBufferGeometry(50, 50, 50)
  const material = new THREE.MeshStandardMaterial()

  for (let i = 0; i < 1000; i++) {
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = (Math.random() - 0.5) * 2000
    mesh.position.y = (Math.random() - 0.5) * 2000
    mesh.position.z = (Math.random() - 0.5) * 2000
    mesh.rotation.x = Math.random() * 2 * Math.PI
    mesh.rotation.y = Math.random() * 2 * Math.PI
    mesh.rotation.z = Math.random() * 2 * Math.PI
    // グループに格納する
    group.add(mesh)
  }

  // 光源
  scene.add(new THREE.DirectionalLight(0xff0000, 2))
  scene.add(new THREE.AmbientLight(0x00ffff))

  tick();

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    // グループを回す
    group.rotateY(0.01)
    renderer.render(scene, camera) // レンダリング
    requestAnimationFrame(tick)
  }
}