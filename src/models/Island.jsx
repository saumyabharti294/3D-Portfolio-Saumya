import { a } from "@react-spring/three";
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import islandScene from "../assets/3d/island.glb";

export function Island({
  isRotating,
  setIsRotating,
  setCurrentStage,
  currentFocusPoint,
  ...props
}) {
  const islandRef = useRef();
  // Get access to the Three.js renderer and viewport
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(islandScene);

  // Use a ref for the last mouse x position
  const lastX = useRef(0);
  // Use a ref for rotation speed
  const rotationSpeed = useRef(0);
  // Define a damping factor to control rotation damping
  const dampingFactor = 0.95;

  // Handle pointer (mouse or touch) down event
  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);

    // Calculate the clientX based on whether it's a touch event or a mouse event
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;

    // Store the current clientX position for reference
    lastX.current = clientX;
  };

  // Handle pointer (mouse or touch) up event
  const handlePointerUp = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  // Handle pointer (mouse or touch) move event
  const handlePointerMove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      // If rotation is enabled, calculate the change in clientX position
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;

      // calculate the change in the horizontal position of the mouse cursor or touch input,
      // relative to the viewport's width
      const delta = (clientX - lastX.current) / viewport.width;

      // Update the island's rotation based on the mouse/touch movement
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;

      // Update the reference for the last clientX position
      lastX.current = clientX;

      // Update the rotation speed
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  // Handle keydown events
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y += 0.005 * Math.PI;
      rotationSpeed.current = 0.007;
    } else if (event.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y -= 0.005 * Math.PI;
      rotationSpeed.current = -0.007;
    }
  };

  // Handle keyup events
  const handleKeyUp = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  // Touch events for mobile devices
  const handleTouchStart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);
  
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    lastX.current = clientX;
  }
  
  const handleTouchEnd = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  }
  
  const handleTouchMove = (e) => {
    e.stopPropagation();
    e.preventDefault();
  
    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = (clientX - lastX.current) / viewport.width;
  
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  }

  useEffect(() => {
    // Add event listeners for pointer and keyboard events
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchend", handleTouchEnd);
    canvas.addEventListener("touchmove", handleTouchMove);

    // Remove event listeners when component unmounts
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  // This function is called on each frame update
  useFrame(() => {
    // If not rotating, apply damping to slow down the rotation (smoothly)
    if (!isRotating) {
      // Apply damping factor
      rotationSpeed.current *= dampingFactor;

      // Stop rotation when speed is very small
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      islandRef.current.rotation.y += rotationSpeed.current;
    } else {
      // When rotating, determine the current stage based on island's orientation
      const rotation = islandRef.current.rotation.y;

      /**
       * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
       * The goal is to ensure that the rotation value remains within a specific range to
       * prevent potential issues with very large or negative rotation values.
       *  Here's a step-by-step explanation of what this code does:
       *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
       *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
       *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
       *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
       *     This is done to ensure that the value remains positive and within the range of
       *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
       *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
       *     modulo operation to the value obtained in step 2. This step guarantees that the value
       *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
       *     circle in radians.
       */
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

  return (
    <a.group ref={islandRef} {...props}>
      <a.group rotation={[-Math.PI / 2, 0, 0]}>
        <a.group rotation={[Math.PI / 2, 0, 0]}>
          <mesh   
            geometry={nodes.defaultMaterial.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            geometry={nodes.defaultMaterial_1.geometry}
            material={materials.lambert6SG}
          />
          <mesh  
            geometry={nodes.defaultMaterial_2.geometry}
            material={materials.lambert6SG}
          />
          <mesh   
            geometry={nodes.defaultMaterial_3.geometry}
            material={materials.lambert6SG}
          />
          <mesh    
            geometry={nodes.defaultMaterial_4.geometry}
            material={materials.lambert6SG}
          />
          <mesh    
            geometry={nodes.defaultMaterial_5.geometry}
            material={materials.lambert6SG}
          />
          <mesh    
            geometry={nodes.defaultMaterial_6.geometry}
            material={materials.lambert6SG}
          />
          <mesh    
            geometry={nodes.defaultMaterial_7.geometry}
            material={materials.lambert6SG}
          />
          <mesh   
            geometry={nodes.defaultMaterial_8.geometry}
            material={materials.lambert6SG}
          />
          <mesh   
            geometry={nodes.defaultMaterial_9.geometry}
            material={materials.lambert6SG}
          />
          <mesh   
            geometry={nodes.defaultMaterial_10.geometry}
            material={materials.lambert6SG}
          />
          <mesh   
            geometry={nodes.defaultMaterial_11.geometry}
            material={materials.lambert6SG}
          />
          <mesh   
            geometry={nodes.defaultMaterial_12.geometry}
            material={materials.lambert6SG}
          />
          <mesh   
            geometry={nodes.defaultMaterial_13.geometry}
            material={materials.lambert6SG}
          />
          <mesh   
            geometry={nodes.defaultMaterial_14.geometry}
            material={materials.lambert6SG}
          />
          <mesh   
            geometry={nodes.defaultMaterial_15.geometry}
            material={materials.lambert6SG}
          />
          <mesh   
            geometry={nodes.defaultMaterial_16.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            geometry={nodes.defaultMaterial_17.geometry}
            material={materials.lambert6SG}
          />
          <mesh   
            geometry={nodes.defaultMaterial_18.geometry}
            material={materials.lambert6SG}
          />
          <mesh   
            geometry={nodes.defaultMaterial_19.geometry}
            material={materials.lambert6SG}
          />
          <mesh   
            geometry={nodes.defaultMaterial_20.geometry}
            material={materials.lambert6SG}
          />
          <mesh   
            geometry={nodes.defaultMaterial_21.geometry}
            material={materials.lambert6SG}
          />
          <mesh  
            geometry={nodes.defaultMaterial_22.geometry}
            material={materials.lambert6SG}
          />
          <mesh   
            geometry={nodes.defaultMaterial_23.geometry}
            material={materials.lambert6SG}
          />
          <mesh   
            geometry={nodes.defaultMaterial_24.geometry}
            material={materials.lambert6SG}
          />
          <mesh   
            geometry={nodes.defaultMaterial_25.geometry}
            material={materials.lambert6SG}
          />
          <mesh   
            geometry={nodes.defaultMaterial_26.geometry}
            material={materials.lambert6SG}
          />
          <mesh   
            geometry={nodes.defaultMaterial_27.geometry}
            material={materials.lambert6SG}
          />
          <mesh   
            geometry={nodes.defaultMaterial_28.geometry}
            material={materials.lambert6SG}
          />
          <mesh   
            geometry={nodes.defaultMaterial_29.geometry}
            material={materials.lambert6SG}
          />
          <mesh   
            geometry={nodes.defaultMaterial_30.geometry}
            material={materials.lambert6SG}
          />
          <mesh   
            geometry={nodes.defaultMaterial_31.geometry}
            material={materials.lambert6SG}
          />
          <mesh   
            geometry={nodes.defaultMaterial_32.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_33.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_34.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_35.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_36.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_37.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_38.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_39.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_40.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_41.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_42.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_43.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_44.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_45.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_46.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_47.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_48.geometry}
            material={materials.layeredShader1SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_49.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_50.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_51.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_52.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_53.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_54.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_55.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_56.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_57.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_58.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_59.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_60.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_61.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_62.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_63.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_64.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_65.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_66.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_67.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_68.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_69.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_70.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_71.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_72.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_73.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_74.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_75.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_76.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_77.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_78.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_79.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_80.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_81.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_82.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_83.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_84.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_85.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_86.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_87.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_88.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_89.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_90.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_91.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_92.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_93.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_94.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_95.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_96.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_97.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_98.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_99.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_100.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_101.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_102.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_103.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_104.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_105.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_106.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_107.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_108.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_109.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_110.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_111.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_112.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_113.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_114.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_115.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_116.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_117.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_118.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_119.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_120.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_121.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_122.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_123.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_124.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_125.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_126.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_127.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_128.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_129.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_130.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_131.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_132.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_133.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_134.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_135.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_136.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_137.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_138.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_139.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_140.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_141.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_142.geometry}
            material={materials.lambert6SG}
          />
          <mesh
            
            
            geometry={nodes.defaultMaterial_143.geometry}
            material={materials.lambert6SG}
          />
          <mesh   
            geometry={nodes.defaultMaterial_144.geometry}
            material={materials.lambert6SG}
          />
          <mesh   
            geometry={nodes.defaultMaterial_145.geometry}
            material={materials.lambert6SG}
          />
          <mesh    
            geometry={nodes.defaultMaterial_146.geometry}
            material={materials.lambert6SG}
          />
        </a.group>
      </a.group>
    </a.group>
  );
}

export default Island;
