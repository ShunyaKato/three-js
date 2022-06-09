import * as THREE from 'three'

// ページの読み込みを待つ
window.addEventListener('DOMContentLoaded', init)

function init() {

  // サイズを指定
  const width = 960
  const height = 540

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#group01'),
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)

  // シーンを作成
  const scene = new THREE.Scene()

  // フォグを設定
  scene.fog = new THREE.Fog(0x000000, 50, 2000)

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height)
  camera.position.set(-100, 150, 500)
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  // 地面を作成
  scene.add(new THREE.GridHelper(600))
  scene.add(new THREE.AxesHelper(300))

  // グループを作成
  const group = new THREE.Group()
  // 3D空間にグループを追加する
  scene.add(group)

  for (let i = 0; i < 10; i++) {
    // 直方体を作成
    const material = new THREE.MeshNormalMaterial()
    const geometry = new THREE.SphereGeometry(30, 30, 30)
    const mesh = new THREE.Mesh(geometry, material)

    // 配置座標を計算
    const radian = (i / 10) * Math.PI * 2
    mesh.position.set(
      200 * Math.cos(radian), // X座標
      30, // Y座標
      200 * Math.sin(radian) // Z座標
    )

    // グループに追加する
    group.add(mesh)
  }

  tick();

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    // グループを回す
    // group.rotateY(0.01)
    group.rotation.y += 0.01
    renderer.render(scene, camera) // レンダリング
    requestAnimationFrame(tick)
  }
}