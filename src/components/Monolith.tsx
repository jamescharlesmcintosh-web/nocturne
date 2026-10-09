import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { accent, clamp01, smoothstep, state, track } from '../lib/state'

const HALF_W = 0.78
const H = 2.75
const D = 0.34
const OVERLAP = 0.03

function makeCoreTexture() {
  const c = document.createElement('canvas')
  c.width = 128
  c.height = 512
  const g = c.getContext('2d')!
  g.clearRect(0, 0, 128, 512)

  const col = g.createLinearGradient(0, 0, 128, 0)
  col.addColorStop(0, 'rgba(255, 190, 134, 0)')
  col.addColorStop(0.32, 'rgba(255, 190, 134, 0.45)')
  col.addColorStop(0.5, 'rgba(255, 236, 214, 1)')
  col.addColorStop(0.68, 'rgba(255, 190, 134, 0.45)')
  col.addColorStop(1, 'rgba(255, 190, 134, 0)')
  g.fillStyle = col
  g.fillRect(0, 0, 128, 512)

  g.globalCompositeOperation = 'destination-in'
  const row = g.createLinearGradient(0, 0, 0, 512)
  row.addColorStop(0, 'rgba(255,255,255,0)')
  row.addColorStop(0.18, 'rgba(255,255,255,0.7)')
  row.addColorStop(0.5, 'rgba(255,255,255,1)')
  row.addColorStop(0.82, 'rgba(255,255,255,0.7)')
  row.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = row
  g.fillRect(0, 0, 128, 512)

  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function makeProductMarkTexture() {
  const c = document.createElement('canvas')
  c.width = 2048
  c.height = 768
  const g = c.getContext('2d')!
  g.clearRect(0, 0, c.width, c.height)

  g.textAlign = 'center'
  g.textBaseline = 'middle'

  // High-resolution, understated product mark — not a screen.
  g.fillStyle = 'rgba(236,229,217,.82)'
  g.font = '600 116px Arial, sans-serif'
  g.fillText('N O C T U R N E', 1024, 290)

  g.fillStyle = 'rgba(236,229,217,.40)'
  g.font = '600 54px Arial, sans-serif'
  g.fillText('NODE 01', 1024, 455)

  g.fillStyle = 'rgba(242,166,90,.82)'
  g.fillRect(740, 565, 568, 5)

  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  tex.needsUpdate = true
  return tex
}

function ServerHardwareDetails({ mark }: { mark: THREE.Texture }) {
  const vents = Array.from({ length: 11 })
  const sideVents = Array.from({ length: 8 })

  return (
    <>
      {/* Slightly inset service plate; almost the same black as the enclosure. */}
      <mesh position={[0.035, -0.18, D / 2 + 0.007]} renderOrder={2}>
        <boxGeometry args={[0.59, 1.92, 0.012]} />
        <meshPhysicalMaterial
          color="#08090c"
          metalness={0.76}
          roughness={0.31}
          clearcoat={0.55}
          clearcoatRoughness={0.24}
          envMapIntensity={0.72}
        />
      </mesh>

      {/* Laser-etched identity */}
      <mesh position={[0.045, 0.67, D / 2 + 0.018]} renderOrder={4}>
        <planeGeometry args={[0.52, 0.195]} />
        <meshBasicMaterial
          map={mark}
          transparent
          opacity={0.9}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Physical status light */}
      <mesh position={[0.04, 0.43, D / 2 + 0.022]} renderOrder={5}>
        <boxGeometry args={[0.235, 0.012, 0.018]} />
        <meshStandardMaterial
          color="#f2a65a"
          emissive="#f2a65a"
          emissiveIntensity={4.5}
          metalness={0.1}
          roughness={0.25}
        />
      </mesh>

      {/* Tiny hardware status LEDs */}
      <mesh position={[-0.075, 0.255, D / 2 + 0.024]} renderOrder={5}>
        <sphereGeometry args={[0.009, 18, 18]} />
        <meshStandardMaterial
          color="#74d38a"
          emissive="#74d38a"
          emissiveIntensity={3.4}
          roughness={0.22}
        />
      </mesh>
      <mesh position={[-0.025, 0.255, D / 2 + 0.024]} renderOrder={5}>
        <sphereGeometry args={[0.009, 18, 18]} />
        <meshStandardMaterial
          color="#f2a65a"
          emissive="#f2a65a"
          emissiveIntensity={2.6}
          roughness={0.22}
        />
      </mesh>
      <mesh position={[0.025, 0.255, D / 2 + 0.024]} renderOrder={5}>
        <sphereGeometry args={[0.009, 18, 18]} />
        <meshStandardMaterial
          color="#17191e"
          emissive="#17191e"
          emissiveIntensity={0.15}
          roughness={0.3}
        />
      </mesh>

      {/* Machined front ventilation — geometry, not a painted texture. */}
      <group position={[0.04, -0.88, D / 2 + 0.022]}>
        {vents.map((_, i) => (
          <mesh key={i} position={[-0.225 + i * 0.045, 0, 0]}>
            <boxGeometry args={[0.017, 0.29, 0.018]} />
            <meshStandardMaterial
              color="#020305"
              metalness={0.38}
              roughness={0.5}
            />
          </mesh>
        ))}
      </group>

      {/* Side ventilation becomes visible as the original object rotates. */}
      <group position={[HALF_W / 2 + 0.008, -0.72, -0.005]} rotation={[0, Math.PI / 2, 0]}>
        {sideVents.map((_, i) => (
          <mesh key={i} position={[0, -0.17 + i * 0.049, 0]}>
            <boxGeometry args={[0.18, 0.014, 0.016]} />
            <meshStandardMaterial
              color="#020305"
              metalness={0.35}
              roughness={0.52}
            />
          </mesh>
        ))}
      </group>

      {/* Four recessed fasteners give the service plate believable scale. */}
      {[
        [-0.245, 0.62],
        [0.315, 0.62],
        [-0.245, -1.08],
        [0.315, -1.08],
      ].map(([x, y], i) => (
        <mesh key={`fastener-${i}`} position={[x, y, D / 2 + 0.021]} renderOrder={5}>
          <cylinderGeometry args={[0.0105, 0.0105, 0.008, 20]} />
          <meshStandardMaterial
            color="#111319"
            metalness={0.82}
            roughness={0.28}
          />
        </mesh>
      ))}
    </>
  )
}

function makeEnvTexture() {
  const c = document.createElement('canvas')
  c.width = 512
  c.height = 256
  const g = c.getContext('2d')!

  const sky = g.createLinearGradient(0, 0, 0, 256)
  sky.addColorStop(0, '#0a0c12')
  sky.addColorStop(0.48, '#171b24')
  sky.addColorStop(1, '#050508')
  g.fillStyle = sky
  g.fillRect(0, 0, 512, 256)

      const warm = g.createRadialGradient(150, 64, 0, 150, 64, 110)
      warm.addColorStop(0, 'rgba(255, 190, 134, 0.7)')
      warm.addColorStop(0.35, 'rgba(242, 166, 90, 0.4)')
      warm.addColorStop(1, 'rgba(242, 166, 90, 0)')
      g.fillStyle = warm
      g.fillRect(0, 0, 512, 256)

  const cool = g.createRadialGradient(390, 88, 0, 390, 88, 120)
  cool.addColorStop(0, 'rgba(159, 192, 255, 0.65)')
  cool.addColorStop(0.4, 'rgba(126, 182, 255, 0.3)')
  cool.addColorStop(1, 'rgba(126, 182, 255, 0)')
  g.fillStyle = cool
  g.fillRect(0, 0, 512, 256)

  const band = g.createLinearGradient(0, 190, 0, 256)
  band.addColorStop(0, 'rgba(0,0,0,0)')
  band.addColorStop(1, 'rgba(0,0,0,0.9)')
  g.fillStyle = band
  g.fillRect(0, 190, 512, 66)

  const tex = new THREE.CanvasTexture(c)
  tex.mapping = THREE.EquirectangularReflectionMapping
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function Environment() {
  const gl = useThree((s) => s.gl)
  const scene = useThree((s) => s.scene)

  useEffect(() => {
    const tex = makeEnvTexture()
    const pmrem = new THREE.PMREMGenerator(gl)
    const rt = pmrem.fromEquirectangular(tex)
    scene.environment = rt.texture
    tex.dispose()
    pmrem.dispose()
    return () => {
      scene.environment = null
      rt.dispose()
    }
  }, [gl, scene])

  return null
}

function Rig({ reduced }: { reduced: boolean }) {
  const camera = useThree((s) => s.camera)
  useFrame(() => {
    const k = reduced ? 1 : 0.05
    camera.position.x += (state.sx * 0.28 - camera.position.x) * k
    camera.position.y += (state.sy * 0.18 - camera.position.y) * k
    camera.lookAt(0, 0, 0)
  })
  return null
}

function Monolith({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null)
  const left = useRef<THREE.Group>(null)
  const right = useRef<THREE.Group>(null)
  const core = useRef<THREE.Mesh>(null)
  const key = useRef<THREE.PointLight>(null)
  const rim = useRef<THREE.DirectionalLight>(null)
  const sepRef = useRef(0)

  const geometry = useMemo(() => new RoundedBoxGeometry(HALF_W, H, D, 3, 0.018), [])
  const coreTexture = useMemo(() => makeCoreTexture(), [])
  const productMark = useMemo(() => makeProductMarkTexture(), [])
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#07070a'),
        metalness: 0.9,
        roughness: 0.255,
        clearcoat: 0.9,
        clearcoatRoughness: 0.18,
        envMapIntensity: 0.88,
        emissive: new THREE.Color('#ffbe86'),
        emissiveIntensity: 0,
      }),
    [],
  )
  const lightColor = useMemo(() => new THREE.Color('#f2a65a'), [])

  useEffect(() => {
    return () => {
      geometry.dispose()
      coreTexture.dispose()
      productMark.dispose()
      material.dispose()
    }
  }, [geometry, coreTexture, productMark, material])

  useFrame((st, dt) => {
    const g = group.current
    if (!g) return

    const step = reduced ? 1 : Math.min(1, dt * 6)
    state.sx += (state.pointerX - state.sx) * step
    state.sy += (state.pointerY - state.sy) * step

    const p = state.p
    const b = state.bounds
    const aspect = st.viewport.aspect || 1.78
    const fitX = clamp01_range(aspect / 1.2, 0.48, 1)
    const posXFit = clamp01_range(aspect / 1.78, 0.2, 1)

    const gateStart = b.gateStart
    const gateEnd = Math.max(b.gateEnd, gateStart + 0.004)
    const gate = clamp01((p - gateStart) / (gateEnd - gateStart))
    const turn = smoothstep(0, 0.3, gate)
    const open = smoothstep(0.22, 1, gate)

    const bladeDenom = Math.max(1e-4, (gateStart - b.manifesto) * 0.45)
    const blade = clamp01((p - b.manifesto) / bladeDenom)

    const contactFrom = Math.max(gateEnd + 0.008, b.contact - 0.05)
    const contactT = clamp01((p - contactFrom) / Math.max(1e-4, 1 - contactFrom))

    let posX = 0
    let posY = 0
    let posZ = 0
    let scale = 1
    let rotY = 0
    let rotZ = 0
    let thin = 1
    let sepTarget = 0
    let coreTarget = 0

    if (p <= gateEnd) {
      const preX = track(p, [
        [0, 0.92],
        [Math.max(1e-4, b.manifesto * 0.55), 0.42],
        [b.manifesto, 0],
      ])
      const slide = (1 - posXFit) * 3 * blade
      posX = (preX * posXFit) * (1 - blade) + slide
      const recenter = smoothstep(0, 0.28, gate)
      posX *= 1 - recenter

      posY = track(p, [
        [0, -0.05],
        [b.manifesto, 0],
      ])
      posZ = track(p, [
        [0, 0],
        [b.manifesto, -0.35],
        [gateStart, -0.2],
      ])
      scale = track(p, [
        [0, 1],
        [b.manifesto, 1.04],
      ])
      rotY =
        (state.sx * 0.16 * (1 - blade) + blade * (Math.PI * 0.5)) * (1 - turn)
      rotZ = 0
      posZ += open * 3.4
      scale += open * 0.4
      posY += open * 0.04
      sepTarget = open * 2.4
      coreTarget = smoothstep(0.03, 0.18, gate) * (1 - smoothstep(0.86, 1, gate))
    } else if (p < Math.max(b.work, gateEnd + 0.004)) {
      const t = clamp01((p - gateEnd) / Math.max(1e-4, Math.max(0.004, b.work - gateEnd)))
      const e = t * t * (3 - 2 * t)
      posX = 0
      posY = 0.04 * e
      posZ = 3.4 + e * 10
      scale = 1.4 - e * 0.35
      rotY = 0
      rotZ = 0
      thin = 1
      sepTarget = 2.4 * (1 - e * 0.35)
      coreTarget = (1 - smoothstep(0.15, 0.95, t)) * 0.85
    } else if (contactT <= 0) {
      posX = 2.6
      posY = -1.4
      posZ = -70
      scale = 0.001
      rotY = 0
      rotZ = 0
      thin = 1
      sepTarget = 0
      coreTarget = 0
    } else {
      const e = contactT * contactT * (3 - 2 * contactT)
      posX = 2.6 * (1 - e) + 0.55 * e
      posY = -1.4 * (1 - e) + -0.12 * e
      posZ = -70 * (1 - e) + -1.6 * e
      scale = 0.001 * (1 - e) + 1.0 * e
      rotY = state.sx * 0.18 * e
      rotZ = 0
      thin = 1 - 0.965 * smoothstep(0.3, 0.85, contactT)
      sepTarget = 0
      coreTarget = 0
    }

    sepRef.current += (sepTarget - sepRef.current) * step
    const sep = sepRef.current

    const time = reduced ? 0 : st.clock.elapsedTime
    const idle = Math.sin(time * 0.32) * 0.045
    const intro = state.reveal

    g.position.x += (posX - g.position.x) * step
    g.position.y += (posY + idle * (contactT > 0 ? 0.35 : 1) - g.position.y) * step
    g.position.z += (posZ - g.position.z) * step

    const targetScale = scale * (0.86 + 0.14 * intro)
    g.scale.x += (targetScale * thin * fitX - g.scale.x) * step
    g.scale.y += (targetScale - g.scale.y) * step
    g.scale.z += (targetScale - g.scale.z) * step
    g.rotation.y += (rotY - g.rotation.y) * step
    g.rotation.z += (rotZ - g.rotation.z) * step
    g.rotation.x += (state.sy * 0.1 * (p <= gateEnd ? 1 : 0.3) - g.rotation.x) * step
    g.visible = intro > 0.02

    if (left.current) left.current.position.x = -HALF_W / 2 + OVERLAP / 2 - sep
    if (right.current) right.current.position.x = HALF_W / 2 - OVERLAP / 2 + sep

    if (core.current) {
      const m = core.current.material as THREE.MeshBasicMaterial
      m.opacity = coreTarget * intro * (0.72 + Math.sin(time * 0.9) * 0.08)
      const gap = Math.max(0.08, sep * 2 - OVERLAP)
      core.current.scale.x = gap * 1.15 + 0.12
      core.current.visible = m.opacity > 0.012
    }

    material.emissiveIntensity = contactT * (0.35 + (1 - thin) * 1.7) * intro

    lightColor.setRGB(
      accent.r / 255,
      accent.g / 255,
      accent.b / 255,
      THREE.SRGBColorSpace,
    )

    if (key.current) {
      key.current.color.copy(lightColor)
      key.current.position.x = state.sx * 4.2
      key.current.position.y = state.sy * 2.6 + 0.6
      key.current.position.z = 4.1
      key.current.intensity = (5.5 + coreTarget * 22 + contactT * 14) * intro
    }
    if (rim.current) rim.current.intensity = (1.7 + contactT * 1.4) * intro
  })

  return (
    <>
      <Environment />
      <ambientLight intensity={0.16} />
      <directionalLight
        ref={rim}
        position={[-3.4, 3.6, -4.2]}
        intensity={1.7}
        color="#9fc0ff"
      />
      <directionalLight position={[4, -2, 2.5]} intensity={0.5} color="#ffd9ad" />
      <pointLight
        ref={key}
        position={[0, 0.6, 4.1]}
        intensity={5.5}
        distance={22}
        decay={2}
        color="#f2a65a"
      />
      <Rig reduced={reduced} />

      <group ref={group} position={[0.9, -0.05, 0]}>
        <mesh ref={core} position={[0, 0, -0.55]} renderOrder={-1}>
          <planeGeometry args={[1, H * 1.35]} />
          <meshBasicMaterial
            map={coreTexture}
            color="#ffffff"
            transparent
            opacity={0}
            depthWrite={false}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        <group ref={left} position={[-HALF_W / 2 + OVERLAP / 2, 0, 0]}>
          <mesh geometry={geometry} material={material} />
        </group>

        <group ref={right} position={[HALF_W / 2 - OVERLAP / 2, 0, 0]}>
          <mesh geometry={geometry} material={material} />
          <ServerHardwareDetails mark={productMark} />
        </group>
      </group>
    </>
  )
}

function clamp01_range(v: number, min: number, max: number) {
  return v < min ? min : v > max ? max : v
}

export default function MonolithCanvas({ reduced }: { reduced: boolean }) {
  const [dpr, setDpr] = useState(1.5)

  useEffect(() => {
    setDpr(Math.min(window.devicePixelRatio || 1, 2.25))
  }, [])

  return (
    <div className="monolith-canvas" aria-hidden="true">
      <Canvas
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ fov: 35, position: [0, 0, 6.2], near: 0.1, far: 80 }}
        frameloop="always"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <Monolith reduced={reduced} />
      </Canvas>
    </div>
  )
}
