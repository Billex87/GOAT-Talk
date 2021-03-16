import React, { useEffect, useRef, useState } from "react";
import { Modal } from "@material-ui/core";
 
import "./shotchart.css";
 
export default function ShotChart(props) {

  if (props.shots["message"] === "NO DATA FOUND!") {
    return <text className="error-message">NO DATA FOUND!</text>;
  }
 

  const { videoUrls } = props.videos.resultSets.Meta;
 
  const [videoUrl, setVideoUrl] = useState(`${videoUrls[40].murl}`);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  // Creates a reference to the videoElement
  const videoElement = useRef();
  console.log(videoElement)
 

  useEffect(() => {
    // We can use that reference to the video element to call .load() every time videoUrl changes
    videoElement.current && videoElement.current.load();
  }, [videoUrl])
 
  const handleShotClick = (shotId) => {
    const url = videoUrls[shotId].murl;
 
    setVideoUrl(url);
    toggleVideoModal();
  };
 

  const toggleVideoModal = () => {
    setVideoModalOpen(isOpen => !isOpen)
  }
 
  // refactored this section
  const renderShots = () => props.shots.resultSets["0"].rowSet.map((shot, index) => {
    const scaledX = shot[17] * 1.523 + 369;
    const scaledY = shot[18] * 1.6 + 62;
 
    const shotWasMade = shot[20] === 1; // easier to understand "shotWasMade"
    const circleFill = shotWasMade ? "green" : "red"; // got rid of repeated code by using a ternary here
 
    return (
      <g
        key={index}
        className="tooltip"
        onClick={() => { 
          handleShotClick(index);
        }}
      >
        <circle
          cx={scaledX}
          cy={scaledY}
          r="4"
          fill={circleFill}
          id="SHOT"
          overflow="visible"
          tabIndex="1"
        >
          <title>
            <text>
              <tspan x={scaledX} dy="1.2em">
                Period: {shot[7]}
              </tspan>
              {"\n"}
 
              <tspan x={scaledX} dy="1.2em">
                Time Remaining: {shot[8]}min {shot[9]}s
              </tspan>
              {"\n"}
 
              <tspan x={scaledX} dy="1.2em">
                Action Type: {shot[11]}
              </tspan>
              {"\n"}
 
              <tspan x={scaledX} dy="1.2em">
                Shot Distance: {shot[16]}ft
              </tspan>
            </text>
          </title>
        </circle>
      </g>
    );
  });
 
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: "15px",
          paddingBottom: "15px",
        }}
      >
        <svg
          className="shot-chart"
          height="705"
          width="750"
          overflow="visible"
          preserveAspectRatio="none"
        >
          <rect
            x="0"
            y="0"
            width="750"
            height="705"
            fill="none"
            stroke="black"
          ></rect>
 
          <image
            href="https://cdn.discordapp.com/attachments/809499216354607190/811438397238411304/court.png"
            preserveAspectRatio="none"
            height="705"
            width="750"
          ></image>
          {renderShots()}
        </svg>
      </div>
 
      <Modal open={videoModalOpen} onBackdropClick={toggleVideoModal} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <video ref={videoElement} width="960" height="540" controls autoplay loop>
          <source src={videoUrl} type="video/mp4" />
        </video>
      </Modal>
    </div >
  );
}