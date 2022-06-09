import * as THREE from 'three'

// ページの読み込みを待つ
window.addEventListener('DOMContentLoaded', init)

function init() {

  // サイズを指定
  const width = 960
  const height = 540
  let rot = 0

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#world01'),
  });
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)

  // シーンを作成
  const scene = new THREE.Scene()

  // フォグを設定
  scene.fog = new THREE.Fog(0x000000, 50, 2000)

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height)
  camera.position.set(100, 150, 500)
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  // 地面を作成
  const plane2 = new THREE.GridHelper(600)
  scene.add(plane2)
  const plane = new THREE.AxesHelper(300)
  scene.add(plane)

  const group = new THREE.Group()
  scene.add(group)

  let targetMesh = new THREE.Mesh()

  for (let i = 0; i < 10; i++) {
    // 直方体を作成
    const material = i === 0 ? new THREE.MeshNormalMaterial() : new THREE.MeshBasicMaterial()
    const geometry = new THREE.SphereGeometry(30, 30, 30)
    const mesh = new THREE.Mesh(geometry, material)
    const radian = (i / 10) * Math.PI * 2
    mesh.position.set(200 * Math.cos(radian), 30, 200 * Math.sin(radian))
    group.add(mesh)

    if (i === 0) {
      targetMesh = mesh
    }
  }

  // ライン
  const geometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(50, 50, 0)
  ])
  const line = new THREE.Line(geometry, new THREE.LineBasicMaterial())
  scene.add(line)

  tick();

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    group.rotation.x += 0.02
    group.rotation.y += 0.01

    // ワールド座標を取得
    const world = targetMesh.getWorldPosition(new THREE.Vector3())

    // ラインを更新
    const positions = line.geometry.attributes.position.array
    positions[0] = 0
    positions[1] = 0
    positions[2] = 0
    positions[3] = world.x
    positions[4] = world.y
    positions[5] = world.z
    line.geometry.attributes.position.needsUpdate = true

    renderer.render(scene, camera) // レンダリング
    requestAnimationFrame(tick)
  }
}