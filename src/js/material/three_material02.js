import * as THREE from 'three'

// ページの読み込みを待つ
window.addEventListener('DOMContentLoaded', init)

function init() {

  // サイズを指定
  const width = 960
  const height = 540

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#material02'),
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)

  // シーンを作成
  const scene = new THREE.Scene()

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(0, 0, +1000);

  // ドーナツを作成
  const geometry = new THREE.TorusGeometry(300, 100, 64, 100);
  const material = new THREE.MeshNormalMaterial({ color: 0x6699ff });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  tick();

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera) // レンダリング

    requestAnimationFrame(tick)
  }
}