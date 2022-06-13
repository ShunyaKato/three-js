import * as THREE from 'three'

// ページの読み込みを待つ
window.addEventListener('DOMContentLoaded', init)

function init() {

  // サイズを指定
  const width = 960
  const height = 540
  let rot = 0

  // マウス座標管理用のベクトルを作成
  const mouse = new THREE.Vector2()

  // canvas 要素の参照を取得する
  const canvas = document.querySelector('#particle01')

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)

  // シーンを作成
  const scene = new THREE.Scene()

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height)

  // 星屑を作成します (カメラの動きをわかりやすくするため)
  createStarField()

  function createStarField() {
    // 頂点情報を格納する配列
    const vertices = []

    // 配置する範囲
    const SIZE = 3000
    // 配置する個数
    const LENGTH = 1000

    for (let i = 0; i < LENGTH; i++) {
      const x = SIZE * (Math.random() - 0.5)
      const y = SIZE * (Math.random() - 0.5)
      const z = SIZE * (Math.random() - 0.5)

      vertices.push(x, y, z)
    }

    // 形状データを作成
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

    // マテリアルを作成
    const material = new THREE.PointsMaterial({
      // 一つ一つのサイズ
      size: 10,
      // 色
      color: 0xffffff,
    })

    // 物体を作成
    const mesh = new THREE.Points(geometry, material)
    scene.add(mesh)
  }

  tick()

  // 毎フレーム時に実行されるループイベントです
  function tick() {

    rot += 1
    const radian = (rot * Math.PI) / 180
    camera.position.x = 1000 * Math.sin(radian)
    camera.position.z = 1000 * Math.cos(radian)
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    renderer.render(scene, camera) // レンダリング
    requestAnimationFrame(tick)
  }
}