import * as THREE from 'three'

// ページの読み込みを待つ
window.addEventListener('DOMContentLoaded', init)

function init() {

  // サイズを指定
  const width = 960
  const height = 540

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#material05'),
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
  const material = new THREE.MeshToonMaterial({ color: 0x6699ff });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xffffff)
  directionalLight.position.set(1, 1, 1)
  scene.add(directionalLight)

  // ポイント光源
  const pointLight = new THREE.PointLight(0xffffff, 2, 1000)
  scene.add(pointLight)
  const pointLightHelper = new THREE.PointLightHelper(pointLight, 30)
  scene.add(pointLightHelper)

  tick();

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    // メッシュを回転させる
    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.01
    // ライトを周回させる
    pointLight.position.set(
      500 * Math.sin(Date.now() / 500),
      500 * Math.sin(Date.now() / 1000),
      500 * Math.cos(Date.now() / 500),
    )
    renderer.render(scene, camera) // レンダリング

    requestAnimationFrame(tick)
  }
}