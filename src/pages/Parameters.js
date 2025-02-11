import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/styles/Parameters.css';
import { Play } from "lucide-react"

const Parameters = () => {
    const [range1, setRange1] = useState(1);
    const [range2, setRange2] = useState(1);
    const videoRef = useRef(null);
    const [showButton, setShowButton] = useState(true);
    const [showControls, setShowControls] = useState(false);

    const getVideoSource = (r1, r2) => {
        if (r1 === 0 && r2 === 0) {
            return null; 
        }
        return `/videos/video${(r2 - 1) * 3 + r1}.mp4`;
    };

    const handlePlay = () => {
        if (videoRef.current) {
            videoRef.current.play();
            videoRef.current.playbackRate = 0.25;
            setShowButton(false);
            setShowControls(true);
        }
    };

    const handlePause = () => {
        setShowButton(true);
        setShowControls(false);
    };

    useEffect(() => {
        setShowButton(true);
        setShowControls(false);
    }, [range1, range2]);

    return (
        <>
            <Header showNav={true} currentPage='parameters' />
            <section className='param-cont'>
                <div className='param-text'>
                    <div className='param-inputs'>
                        <h1>Configura tus propios parametros de simulación</h1>
                        <label>Cantidad de bacteriofagos</label>
                        <input 
                            type="range" 
                            min="0" 
                            max="3" 
                            value={range1} 
                            onChange={(e) => setRange1(Number(e.target.value))} 
                        />
                        <label>Cantidad de bacterias</label>
                        <input 
                            type="range" 
                            min="0" 
                            max="3" 
                            value={range2} 
                            onChange={(e) => setRange2(Number(e.target.value))} 
                        />
                    </div>
                    {range1 !== 0 || range2 !== 0 ? (
                        <div className="video">
                            <video 
                                key={getVideoSource(range1, range2)}
                                ref={videoRef}
                                onPause={handlePause}
                                controls={showControls}
                            >
                                <source src={getVideoSource(range1, range2)} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            {showButton && <button onClick={handlePlay}><Play /></button>}
                        </div>
                    ) : null}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Parameters;
