import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';
import { OrbitControls, Environment, useGLTF, Bounds } from '@react-three/drei';
import Header from '../components/Header';
import '../assets/styles/Home.css';
import Footer from '../components/Footer';
import { Pencil, Clock9, Award } from "lucide-react"

function M13Model() {
  const { scene } = useGLTF('/m13model.glb');

  return <primitive object={scene} />;
}

function Home() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/animation'); 
  };

  return (
    <>
      <Header showNav={false}/>
      <section>
        <div className='message-cont'>
          <h1>Descubre cómo sucede la <b>replicación</b> del <b>Bacteriófago M13</b></h1>
          <p>La animación que podrás ver muestra las distintas etapas que sigue el bacteriófago M13 para replicarse dentro de una bacteria.</p>
          <button onClick={handleButtonClick}>Ver animación</button>
        </div>
        <div className='circle-cont'></div>
        <div className='rect-cont'></div>

        <div className='model-cont'>
          <Canvas camera={{ position: [90, -200, -70]}} style={{ background: 'transparent' }}>
            <ambientLight intensity={1.5} />
            <Environment preset="sunset" />

            <Bounds fit clip observe>
              <M13Model />
            </Bounds>

            <OrbitControls enableZoom={false} enablePan={false}/>
          </Canvas>
        </div>
      </section>
      <section className='param-info'>
        <img src='/param.png' alt='M13' />
        <div className='param-text'>
          <h1>Configura tus propios parametros de simulación</h1>
          <p>Podrás modificar la cantidad de bacteriófagos y bacterias para ver como va creciendo la cantidad de M13.</p>
          <button>Configurar</button>
        </div>
      </section>
      <section className='last-section'>
        <h1>Descarga nuestro modelo</h1>
        <p>Obtén gratis el modelo en Blender y configura lo que tu quieras. Lo puedes descargar en este <a href='https://drive.google.com/file/d/1xvfSKAHhx1bFA75SOkITtmZRoxzZPaKn/view?usp=sharing'>enlace</a>.</p>
        <div className='features-cont'>
          <div className='feature'>
            <Pencil className='ico'/>
            <p>Personaliza las texturas</p>
          </div>
          <div className='feature'>
            <Clock9 className='ico'/>
            <p>Aumenta el tiempo de animación</p>
          </div>
          <div className='feature'>
            <Award className='ico'/>
            <p>Mejora la calidad gráfica</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
