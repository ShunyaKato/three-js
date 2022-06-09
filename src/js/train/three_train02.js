import * as THREE from 'three';

// ページの読み込みを待つ
window.addEventListener('DOMContentLoaded', init);

function init() {

  // サイズを指定
  const width = 960;
  const height = 540;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#train02')
  });
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(0, 0, +1000);

  // 球を作成
  const geometry = new THREE.SphereGeometry(300, 30, 30);
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xffffff)
  directionalLight.position.set(1, 1, 1)
  // シーンに追加
  scene.add(directionalLight)

  tick();

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera); // レンダリング

    requestAnimationFrame(tick);
  }
}