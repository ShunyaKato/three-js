import * as THREE from 'three';

// ページの読み込みを待つ
window.addEventListener('DOMContentLoaded', init);

function init() {

  // サイズを指定
  const width = 960;
  const height = 540;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#light01'),
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(20, 20, 20);
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  // 床を作成
  const meshFloor = new THREE.Mesh(
    new THREE.BoxGeometry(2000, 0.1, 2000),
    new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.0 })
  )
  scene.add(meshFloor)

  // オブジェクトを作成
  const meshKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(3, 1, 100, 16),
    new THREE.MeshStandardMaterial({ color: 0xaa0000, roughness: 0.0 })
  )
  meshKnot.position.set(0, 5, 0)
  scene.add(meshKnot)

  // 環境光源を作成
  // new THREE.AmbientLight(色, 光の強さ)
  const light = new THREE.AmbientLight(0xffffff, 1.0)
  scene.add(light)

  tick();

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    renderer.render(scene, camera); // レンダリング

    requestAnimationFrame(tick);
  }
}