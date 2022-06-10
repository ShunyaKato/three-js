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
  const canvas = document.querySelector('#raycast01')

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
  // camera.position.set(0, 0, 1000)

  const geometry = new THREE.BoxBufferGeometry(50, 50, 50)

  // マウスとの交差を調べたいものは配列に格納する
  const meshList = []
  for (let i = 0; i < 200; i++) {
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = (Math.random() - 0.5) * 800
    mesh.position.y = (Math.random() - 0.5) * 800
    mesh.position.z = (Math.random() - 0.5) * 800
    mesh.rotation.x = Math.random() * 2 * Math.PI
    mesh.rotation.y = Math.random() * 2 * Math.PI
    mesh.rotation.z = Math.random() * 2 * Math.PI
    scene.add(mesh)

    meshList.push(mesh)
  }

  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xffffff)
  directionalLight.position.set(1, 1, 1)
  scene.add(directionalLight)

  // 環境光源
  const ambientLight = new THREE.AmbientLight(0x333333)
  scene.add(ambientLight)

  // レイキャストを作成
  const raycaster = new THREE.Raycaster()

  canvas.addEventListener('mousemove', handleMouseMove)
  tick();

  // マウスを動かしたときのイベント
  function handleMouseMove(event) {
    const element = event.currentTarget
    // canvas要素上のXY座標
    const x = event.clientX - element.offsetLeft
    const y = event.clientY - element.offsetTop
    // canvas要素の幅・高さ
    const w = element.offsetWidth
    const h = element.offsetHeight

    // -1〜+1の範囲で現在のマウス座標を登録する
    mouse.x = (x / w) * 2 - 1
    mouse.y = -(y / h) * 2 + 1
  }

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    // レイキャスト = マウス位置からまっすぐに伸びる光線ベクトルを生成
    raycaster.setFromCamera(mouse, camera)

    // その光線とぶつかったオブジェクトを得る
    const interesects = raycaster.intersectObjects(meshList)

    meshList.map((mesh) => {
      // 交差しているオブジェクトが1つ以上存在し、
      // 交差しているオブジェクトの1番目(最前面)のものだったら
      if (interesects.length > 0 && mesh === interesects[0].object) {
        // 色を赤くする
        mesh.material.color.setHex(0xff0000)
      } else {
        // それ以外は元の色にする
        mesh.material.color.setHex(0xffffff)
      }
    })

    rot += 0.1
    const radian = (rot * Math.PI) / 180
    camera.position.x = 1000 * Math.sin(radian)
    camera.position.z = 1000 * Math.cos(radian)
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    renderer.render(scene, camera) // レンダリング
    requestAnimationFrame(tick)
  }
}