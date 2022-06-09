import * as THREE from 'three';

// ページの読み込みを待つ
window.addEventListener('DOMContentLoaded', init);

function init() {

  // サイズを指定
  const width = 960;
  const height = 540;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#light06'),
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // 照明に関するレンダラーの設定
  renderer.gammaInput = true
  renderer.gammaOutput = true

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(20, 20, 20);
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  // 床を作成
  const meshFloor = new THREE.Mesh(
    new THREE.BoxGeometry(2000, 0.1, 2000),
    new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 1.0 })
  )
  scene.add(meshFloor)

  // オブジェクトを作成
  const meshKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(3, 1, 100, 16),
    new THREE.MeshStandardMaterial({ color: 0xaa0000, roughness: 1.0 })
  )
  meshKnot.position.set(0, 5, 0)
  scene.add(meshKnot)

  // 矩形光源を作成
  // new THREE.RectAreaLight(色, 光の強さ, 幅, 高さ)
  const light = new THREE.RectAreaLight(0xffffff, 5, 10, 10)
  scene.add(light)

  tick();

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    renderer.render(scene, camera); // レンダリング

    // 照明の位置を更新
    const t = Date.now() / 1000
    const r = 10.0
    const lx = r * Math.cos(t)
    const lz = r * Math.sin(t)
    const ly = 5.0 + 5.0 * Math.sin(t / 3.0)
    light.position.set(lx, ly, lz)
    light.lookAt(new THREE.Vector3(0, 0, 0))

    requestAnimationFrame(tick);
  }
}