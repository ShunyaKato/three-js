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
    canvas: document.querySelector('#train05')
  });
  renderer.setSize(width, height)

  // シーンを作成
  const scene = new THREE.Scene()

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height)

  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xffffff)
  directionalLight.position.set(1, 1, 1)
  scene.add(directionalLight)

  // マテリアルを作成
  const material = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('img/earthmap1k.jpg'),
    side: THREE.DoubleSide,
  })

  // 球を作成
  const geometry = new THREE.SphereGeometry(300, 30, 30)
  const earthMesh = new THREE.Mesh(geometry, material)
  scene.add(earthMesh)

  // 星屑を作成します (カメラの動きをわかりやすくするため)
  createStarField()

  /** 星屑を作成します */
  function createStarField() {
    // const createStarField = () => {
    // 頂点情報を作成
    const vertices = []
    for (let i = 0; i < 1000; i++) {
      const x = 3000 * (Math.random() - 0.5)
      const y = 3000 * (Math.random() - 0.5)
      const z = 3000 * (Math.random() - 0.5)

      vertices.push(x, y, z)
    }

    // 形状データを作成
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

    // マテリアルを作成
    const material = new THREE.PointsMaterial({
      size: 10,
      color: 0xffffff,
    })

    // 物体を作成
    const mesh = new THREE.Points(geometry, material)
    scene.add(mesh)
  }

  tick()

  // 毎フレーム時に実行されるループイベントです
  // const tick = () => {
  function tick() {
    rot += 0.5 // 毎フレーム角度を0.5度ずつ足していく
    // ラジアンに変換する
    const radian = (rot * Math.PI) / 180
    // 角度に応じてカメラの位置を設定
    camera.position.x = 1000 * Math.sin(radian)
    camera.position.z = 1000 * Math.cos(radian)
    // 原点方向を見つめる
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    renderer.render(scene, camera) // レンダリング

    requestAnimationFrame(tick)
  }
  // tick()
}