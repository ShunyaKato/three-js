import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// ページの読み込みを待つ
window.addEventListener('DOMContentLoaded', init)

function init() {

  // サイズを指定
  const width = 960
  const height = 540

  // レンダラーを作成
  const canvasElement = document.querySelector('#train07')
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement
  });
  renderer.setSize(width, height)

  // シーンを作成
  const scene = new THREE.Scene()

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height)
  // カメラの初期座標を設定
  camera.position.set(0, 0, 1000)

  // カメラコントローラーを作成
  const controls = new OrbitControls(camera, canvasElement)

  // 滑らかにカメラコントローラーを制御する
  controls.enableDamping = true
  controls.dampingFactor = 0.2

  // 形状とマテリアルからメッシュを作成します
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(300, 300, 300),
    new THREE.MeshNormalMaterial()
  )
  scene.add(mesh)

  tick()

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    // カメラコントローラーを更新
    controls.update()
    renderer.render(scene, camera) // レンダリング
    requestAnimationFrame(tick)
  }
}