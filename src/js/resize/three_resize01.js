import * as THREE from 'three'

// ページの読み込みを待つ
window.addEventListener('DOMContentLoaded', init)

function init() {
  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#resize01'),
    antialias: true,
  });

  // シーンを作成
  const scene = new THREE.Scene()

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, 1.0)
  camera.position.set(0, 0, +1000)

  const geometry = new THREE.SphereGeometry(300, 30, 30)
  const material = new THREE.MeshBasicMaterial({ wireframe: true })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  tick();

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    renderer.render(scene, camera) // レンダリング
    requestAnimationFrame(tick)
  }

  // 初期化のために実行
  onResize()
  // リサイズイベント発生時に実行
  window.addEventListener('resize', onResize)

  function onResize() {
    // サイズを取得
    const width = window.innerWidth
    const height = window.innerHeight

    // レンダラーのサイズを調整する
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)

    // カメラのアスペクト比を正す
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }
}