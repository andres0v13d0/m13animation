import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/styles/Animation.css";
import { Play, Square, CircleHelp } from 'lucide-react';

function Model({ animationSpeed, repeat, play, setPlay, setCurrentStage }) {
  const { scene, animations } = useGLTF("/model.glb");
  const mixer = useRef(null);
  const actions = useRef([]);

  useEffect(() => {
    if (!scene) return;

    if (animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene);
      actions.current = animations.map((clip) => {
        const action = mixer.current.clipAction(clip);
        action.setLoop(repeat ? THREE.LoopRepeat : THREE.LoopOnce);
        action.setEffectiveTimeScale(animationSpeed);
        return action;
      });
    }
  }, [scene, animations, animationSpeed, repeat]);

  useEffect(() => {
    if (actions.current.length > 0) {
      actions.current.forEach((action) => {
        if (play) {
          action.play();
          setCurrentStage(0);
          setTimeout(() => setCurrentStage(1), 2120);
          setTimeout(() => setCurrentStage(2), 6620);
          setTimeout(() => setCurrentStage(3), 17500);
          setTimeout(() => setCurrentStage(4), 40560);
          setTimeout(() => setPlay(false), 46000);
        } else {
          action.stop();
        }
      });
    }
  }, [play]);

  useFrame((_, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

  return <primitive object={scene} />;
}

export default function Animation() {
  const [play, setPlay] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const speed = 0.2;

  return (
    <>
      <Header showNav={true} currentPage={"animation"} />
      <section className="sec-animation">
        <div className="animation-cont">
          <div className="phage-cont">
            <Canvas camera={{ position: [100, 100, -250], fov: 50 }} style={{ backgroundImage: "url(/fondo.png)" }}>
              <ambientLight intensity={1} />
              <directionalLight position={[2, 2, 2]} intensity={1.5} />
              <Model animationSpeed={speed} play={play} setPlay={setPlay} setCurrentStage={setCurrentStage} />
              
              <OrbitControls />
            </Canvas>
          </div>
          <div className="animation-controls">
            <button id="btn-action" onClick={() => {
              setPlay(!play);
              if (!play) setCurrentStage(0);
            }}>
              {play ? <Square /> : <Play />}
            </button>

            <a id="help"><CircleHelp style={{height: "40px", width: "40px"}}/></a>
          
            <div className="modal-help">
              <h1>Controles</h1>
              <p><b>Rotar modelo: </b> Clic izquierdo</p>
              <p><b>Desplazarse: </b> Clic derecho</p>
              <p><b>Zoom: </b> Rueda del ratón</p>
            </div>
          </div>
        </div>

        <div className="animation-info">
          <h1>Descubre cómo sucede la replicación del Bacteriófago M13</h1>
          <p style={{ opacity: currentStage >= 1 ? 1 : 0 }}><b>Entrada del ADN:</b> El fago M13 inyecta su ADN de cadena simple en la bacteria a través de los pilis sexuales.</p>
          <p style={{ opacity: currentStage >= 2 ? 1 : 0 }}><b>Conversión a ADN de doble hebra:</b> La bacteria replica la cadena simple del ADN viral, formando una versión de doble hebra llamada "replicativo".</p>
          <p style={{ opacity: currentStage >= 3 ? 1 : 0 }}><b>Síntesis y ensamblaje:</b> Se generan nuevas copias de ADN de cadena simple y se ensamblan nuevos fagos en la membrana celular.</p>
          <p style={{ opacity: currentStage >= 4 ? 1 : 0 }}><b>Liberación sin lisis:</b> Los nuevos fagos emergen continuamente de la bacteria sin destruirla, listos para infectar nuevas células.</p>
        </div>
      </section>
      <Footer />
    </>
  );
}
