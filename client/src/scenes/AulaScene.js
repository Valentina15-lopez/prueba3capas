// client/src/scenes/AulaScene.js
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const AulaScene = () => {
  const sceneRef = useRef();

  useEffect(() => {
    // Configurar escena Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();

    // Añadir objetos, luces, etc.
    // ...

    sceneRef.current.appendChild(renderer.domElement);

    // Animación/render loop
    const animate = () => {
      // Actualizar lógica del metaverso
      // ...

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Limpieza
    return () => {
      // Realizar acciones de limpieza (si es necesario)
      // ...
    };
  }, []);

  return <div ref={sceneRef} />;
};

export default AulaScene;
