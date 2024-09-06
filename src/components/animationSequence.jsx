'use client'

// components/AnimationSequence.js
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SplitType from 'split-type';
// import { SplitText } from 'gsap/SplitText';

// // Register the SplitText plugin
// gsap.registerPlugin(SplitText);

const AnimationSequence = () => {
  const [count, setCount] = useState(1);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate the loader dots (orbiting circles)
    gsap.to(".circle1", {
      duration: 3,
      rotate: 360,
      ease: "none",
      repeat: -1, // Infinite loop
      transformOrigin: "50% 100px", // Orbit around the loader's center
    });

    gsap.to(".circle2", {
      duration: 3,
      rotate: -360,
      ease: "none",
      repeat: -1, // Infinite loop
      transformOrigin: "50% -100px", // Orbit in the opposite direction
    });

    // Loader counting from 1 to 100
    gsap.to({}, {
      duration: 3, // Duration for counting
      onUpdate: function () {
        setCount((prev) => (prev < 100 ? prev + 1 : 100)); // Increment counter
      },
    });

    // Step 1: Loader fades out and triangle becomes visible
    tl.to(".loader-container", {
      duration: 2,
      delay: 2, // Adjust delay as needed
      opacity: 0,
      scale: 0.5, // Shrink the loader if needed
      ease: "power2.inOut",
      onComplete: () => {
        // Ensure triangle is visible after loader animation completes
        gsap.set(".animated-shape", { display: "block" });
      },
    });

    // Step 2: Show triangle first
    tl.to(".animated-shape", {
      duration: 0.5,
      width: "10vw",
      height: "10vh",
      borderLeft: "5vw solid transparent",
      borderRight: "5vw solid transparent",
      borderBottom: "13vh solid transparent",
      top: "50%",
      left: "50%",
      ease: "power2.inOut",
      borderRadius: "5vw",
      rotate: "45deg",
      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)", // Clip the image to the triangle shape
    });

    // Step 3: Wait for a few seconds before transitioning to square
    tl.to({}, { duration: 0.6 }); // Pause for 2 seconds

    // Step 4: Transition from triangle to full-screen square
    tl.to(".animated-shape", {
      duration: 0.6,
      width: "100vw",
      height: "100vh",
      borderLeft: "0px",
      borderRight: "0px",
      borderBottom: "100vh solid transparent",
      borderRadius: "10%", // Start with rounded corners and end with sharp corners
      top: "0",
      left: "0",
      transform: "none",
      ease: "power2.inOut",
      onUpdate: function () {
        // Gradually change border-radius to create smooth transition
        const progress = tl.progress(); // Get the progress of the timeline
        const borderRadiusValue = progress < 0.5 ? 50 * (2 * progress) : 0; // Smooth transition
        gsap.set(".animated-shape", {
          borderRadius: `${borderRadiusValue}%`,
        });
      },
      clipPath: "",
      onComplete: () => {
        // Split the text and animate
        new SplitType(textRef.current, { types: 'lines, chars' });

        gsap.fromTo('.welcome-text .char', {
          y: '100%',
          opacity: 0,
        }, {
          duration: 0.6,
          y: '0%',
          opacity: 1,
          stagger: 0.1,
          ease: 'power2.out',
        });
      },

      // onComplete: () => {
      //   // Reveal the text after the full-page transition
      //   gsap.to('.a', {
      //     duration: 1,
      //     opacity: 1,
      //     scale: 1,
      //     ease: 'power2.out',
      //     onComplete: () => {
      //       // Animate the text after revealing
      //       gsap.fromTo(
      //         '.welcome-text span',
      //         {
      //           y: '100%',
      //           opacity: 0,
      //         },
      //         {
      //           duration: 0.6,
      //           y: '0%',
      //           opacity: 1,
      //           stagger: 0.1,
      //           ease: 'power2.out',
      //         }
      //       );
      //     },
      //   });
      // }
    });

      // Step 5: Fade in, scale up, and reveal "Meet Pabbel" text with animation
    // tl.from('.welcome-text', {
    //   // duration: 1.5,
    //   opacity: 1,
    //   // scale: 1,
    //   // ease: 'power2.out',
    //   // y: 0,
    //   // stagger: 0.1,
    //   onComplete: () => {
    //     gsap.fromTo('.welcome-text span', {
    //       y: '100%',
    //       opacity: 0,
    //     }, {
    //       duration: 0.6,
    //       y: '0%',
    //       opacity: 1,
    //       stagger: 0.1,
    //       ease: 'power2.out',
    //     });
    //   },
    // }, "-=0.5"); // Start this animation slightly before the end of the square transition

  }, []);

  return (
    <div
      className="border-2 border-[orange] h-full"
      style={{ position: "relative", width: "100vw", overflow: "hidden" }}
    >
      {/* Custom Loader Animation */}
      <div
        className="loader-container"
        style={{
          position: "relative",
          width: "150px",
          height: "150px",
          // border: '2px solid #ccc', // Thin border
          borderRadius: "50%",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        }}
      >
        {/* Logo in the center */}
        <div
          className="logo p-5"
          style={{
            position: "absolute",
            fontSize: "1.5em",
            color: "#333",
            zIndex: 2,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)", // Ensure logo is centered
          }}
        >
          LOGO {/* Replace with your logo */}
        </div>

        {/* Orbiting Circles */}
        <div
          className="orbit-container"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        >
          {/* Circle 1 */}
          <div
            className="circle1"
            style={{
              position: "absolute",
              width: "15px",
              height: "15px",
              backgroundColor: "#D7D1C6", // Circle color
              borderRadius: "50%",
              top: "0", // Position at the top of the loader
              left: "50%",
              transform: "translateX(-50%)",
            }}
          ></div>

          {/* Circle 2 */}
          <div
            className="circle2"
            style={{
              position: "absolute",
              width: "15px",
              height: "15px",
              backgroundColor: "#D7D1C6", // Circle color
              borderRadius: "50%",
              bottom: "0", // Position at the bottom of the loader
              left: "50%",
              transform: "translateX(-50%)",
            }}
          ></div>
        </div>

        {/* Loader Counting */}
        <div
          className="loader-counter"
          style={{
            position: "absolute",
            top: "20rem", // Position below the loader
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "0.8em",
            color: "#666",
          }}
        >
          {count}/100
        </div>
      </div>

      {/* Triangle to Square Animation */}
      <div
        className="animated-shape overflow--hidden"
        style={{
          position: "absolute",
          width: "0",
          height: "0",
          borderLeft: "0px solid transparent",
          borderRight: "0px solid transparent",
          borderBottom: "0px solid transparent",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "none", // Initially hidden
          zIndex: 0,
          // overflow: 'hidden', // Ensure content stays within bounds
          backgroundImage: "url(/bg.jpg)",
        }}
      >
        <div className="border--2 border-[red] bg-transparent w-full h-[100vh] relative">
          <img
            className="absolute bottom--0 top--[-10rem] left-0 object-cover w-full h-full"
            src="/bg-2.png"
            alt="alt"
          />
        </div>
      </div>
      
        {/* Welcome Text */}
      <div className="welcome-text font-bold text-center leading-[12rem] lowercase" style={{
        fontSize: '15rem',
        color: '#fff',
        opacity: 0, // Initially hidden
        scale: 0.8, // Start with scaled down
        zIndex: 2,
        willChange: 'opacity, transform', // For smoother animation
      }}
      ref={textRef} // Attach ref here
      >
        {/* Wrap each word in a block element */}
        <div>
          {Array.from('Meet').map((char, index) => (
            <span key={index} className="char" style={{ display: 'inline-block' }}>{char}</span>
          ))}
        </div>
        <div>
          {Array.from('Pabbel').map((char, index) => (
            <span key={index} className="char" style={{ display: 'inline-block' }}>{char}</span>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AnimationSequence;

{
  /* <img className='absolute bottom--0 top--[-10rem] left-0 object-cover w-full h--full' src="/bg-2.png" alt="alt" /> */
}

{
  /* Content inside the triangle */
}
{
  /* <div className="content border-2 border-[olive] w-full w--[10rem] h-screen" style={{
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  // transform: 'translate(-50%, -50%)',
    color: 'white',
    textAlign: 'center',
    padding: '1em',
    fontSize: '1.5em',
    zIndex: 1,
  }}>
    Your Content Here
  </div> */
}

// import { motion } from 'framer-motion';
// import { useState, useEffect } from 'react';

// const AnimationSequence = () => {
//     const [loadingComplete, setLoadingComplete] = useState(false);

//     // Simulate loading completion after 3 seconds
//     useEffect(() => {
//       const timer = setTimeout(() => {
//         setLoadingComplete(true); // Start transition to zoom-in animation
//       }, 3000); // 3 seconds loading duration

//       return () => clearTimeout(timer); // Cleanup the timer when component unmounts
//     }, []);

//   return (
//     <div style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden' }}>
//     {/* Loader Animation */}
//     {!loadingComplete && (
//       <motion.div
//         initial={{ opacity: 1 }}
//         animate={{ opacity: loadingComplete ? 0 : 1 }}
//         transition={{ duration: 0.5 }} // Fade out duration
//         style={{
//           width: '150px',
//           height: '150px',
//           border: '10px solid #ccc',
//           borderTop: '10px solid blue',
//           borderRadius: '50%',
//           margin: 'auto',
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//         }}
//       />
//     )}

//     {/* Triangle Zoom Animation */}
//     {loadingComplete && (
//       <motion.div
//         initial={{ scale: 0 }}
//         animate={{ scale: 1 }}
//         transition={{
//           duration: 1.5,
//           ease: [0.42, 0, 0.58, 1], // Slow start and smooth finish
//         }}
//         className='border-2 border-[green]'
//         style={{
//           width: 0,
//           height: 0,
//           borderLeft: '50vw solid transparent',
//           borderRight: '50vw solid transparent',
//           borderBottom: '100vh solid blue', // Full height triangle
//           margin: 'auto',
//           position: 'absolute',
//           top: 0,
//           left: 0,
//         }}
//       />
//     )}
//   </div>
//   );
// };

// export default AnimationSequence;

// // import { motion } from 'framer-motion';
// // import { useState, useEffect } from 'react';

// // const AnimationSequence = () => {
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [showTriangle, setShowTriangle] = useState(false);
// //   const [showCursor, setShowCursor] = useState(false);

// //    // Simulate loading completion after 3 seconds
// //    useEffect(() => {
// //     const timer = setTimeout(() => {
// //       setIsLoading(false); // Hide the loader after 3 seconds
// //       setShowTriangle(true); // Show triangle zoom-in animation
// //     }, 3000); // 3 seconds loading duration

// //     return () => clearTimeout(timer); // Cleanup the timer when component unmounts
// //   }, []);

// //   // Hide the cursor initially, and show after animations
// //   useEffect(() => {
// //     if (showCursor) {
// //       document.body.style.cursor = 'default'; // Show cursor
// //     } else {
// //       document.body.style.cursor = 'none'; // Hide cursor
// //     }
// //   }, [showCursor]);

// //   // Handle triangle zoom animation completion
// //   const handleZoomComplete = () => {
// //     setShowCursor(true); // Show cursor when zoom animation is done
// //   };

// //   return (
// //     <div>
// //       {/* Loader Animation */}
// //       {isLoading && (
// //         <motion.div
// //           initial={{ opacity: 1 }}
// //           animate={{ rotate: 360 }}
// //           transition={{
// //             duration: 2,
// //             repeat: Infinity,
// //             ease: 'linear',
// //           }}
// //         //   onAnimationComplete={handleLoadingComplete} // After the loading animation ends
// //           style={{
// //             width: '150px',
// //             height: '150px',
// //             border: '10px solid #ccc',
// //             borderTop: '10px solid blue',
// //             borderRadius: '50%',
// //             margin: 'auto',
// //             position: 'relative',
// //             top: '30vh',
// //           }}
// //         />
// //       )}

// //       {/* Triangle Zoom Animation */}
// //       {showTriangle && (
// //         <motion.div
// //           initial={{ scale: 0 }}
// //           animate={{ scale: 1 }}
// //           transition={{
// //             duration: 1.5,
// //             ease: [0.42, 0, 0.58, 1], // Slow start and smooth finish
// //           }}
// //           onAnimationComplete={handleZoomComplete}
// //           style={{
// //             width: 0,
// //             height: 0,
// //             borderLeft: '100px solid transparent',
// //             borderRight: '100px solid transparent',
// //             borderBottom: '200px solid blue',
// //             margin: 'auto',
// //             position: 'relative',
// //             top: '20vh',
// //           }}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default AnimationSequence;
