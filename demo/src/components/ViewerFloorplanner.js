import React, { useEffect, useRef } from 'react';
import Blueprint3D from './bp3djs';

const ViewerFloorplanner = () => {
  const canvasWrapperRef = useRef(null);
  const moveRef = useRef(null);
  const removeRef = useRef(null);
  const drawRef = useRef(null);
  const activeStyle = 'btn-primary disabled';
  let floorplanner = null;

  useEffect(() => {
    const blueprint3d = new Blueprint3D();
    floorplanner = blueprint3d.floorplanner;

    const handleWindowResize = () => {
      canvasWrapperRef.current.style.height = `${window.innerHeight - canvasWrapperRef.current.offsetTop}px`;
      floorplanner.resizeView();
    };

    const init = () => {
      window.addEventListener('resize', handleWindowResize);
      handleWindowResize();

      floorplanner.addEventListener(Blueprint3D.EVENT_MODE_RESET, (mode) => {
        drawRef.current.classList.remove(activeStyle);
        removeRef.current.classList.remove(activeStyle);
        moveRef.current.classList.remove(activeStyle);

        if (mode === Blueprint3D.floorplannerModes.MOVE) {
          moveRef.current.classList.add(activeStyle);
        } else if (mode === Blueprint3D.floorplannerModes.DRAW) {
          drawRef.current.classList.add(activeStyle);
        } else if (mode === Blueprint3D.floorplannerModes.DELETE) {
          removeRef.current.classList.add(activeStyle);
        }

        if (mode === Blueprint3D.floorplannerModes.DRAW) {
          document.getElementById('draw-walls-hint').style.display = 'block';
          handleWindowResize();
        } else {
          document.getElementById('draw-walls-hint').style.display = 'none';
        }
      });

      moveRef.current.addEventListener('click', () => {
        floorplanner.setMode(Blueprint3D.floorplannerModes.MOVE);
      });

      drawRef.current.addEventListener('click', () => {
        floorplanner.setMode(Blueprint3D.floorplannerModes.DRAW);
      });

      removeRef.current.addEventListener('click', () => {
        floorplanner.setMode(Blueprint3D.floorplannerModes.DELETE);
      });
    };

    init();

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const updateFloorplanView = () => {
    floorplanner.reset();
  };

  return (
    <div>
      <div ref={canvasWrapperRef} id="floorplanner" />
      <button ref={moveRef} id="move" />
      <button ref={removeRef} id="delete" />
      <button ref={drawRef} id="draw" />
      <div id="draw-walls-hint" />
    </div>
  );
};

export default ViewerFloorplanner;
