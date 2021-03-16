import React, { PureComponent } from 'react'


export default function Heatmap(props) {
  let zoneId = 0
  if (props.shots["message"] == "NO DATA FOUND!") {
    return (
      <text className="error-message">NO DATA FOUND!</text>
    )
  }
  //counts for radius or color indication
  let zones = [
    'Backcourt',
    'Above the Break 3',
    'In The Paint (Non-RA)',
    'Mid-Range',
    'Left Corner 3',
    'Right Corner 3',
    'Restricted Area'
  ]

  //CREATING COMPONENTS FOR EACH ZONE
  const zoneInfoBoxes = zones.map(zone => {
    let fga = 0
    let fgm = 0;

    //counting all shots data
    props.shots.resultSets['0'].rowSet.map(shot => {
      //check which zone
      if (shot[13] === zone) {
        fga++
        //check if made
        if (shot[20]) {
          fgm++
        }
      }
    })
    // MISTAKE: THIS IS FOR LEAGUE AVERAGES
    // props.shots.resultSets['1'].rowSet.map((currentAverage) => {
    //   if (currentAverage[1] === zone) {
    //     fga += currentAverage[4]
    //   }
    // })
    // props.shots.resultSets['1'].rowSet.map((currentAverage) => {
    //   if (currentAverage[1] === zone || currentAverage[2] === zone) {
    //     fgm += currentAverage[5]
    //   }
    // })

    //Field goal percentage
    let fg_pct = Number.parseFloat((fgm / fga) * 100).toFixed(2)
    if (fga === 0) {
      fg_pct = 0
    }

    zoneId++

    if (zone === "Left Corner 3") {
      return (
        <g key={zoneId}>
          <circle
            cx={70}
            cy={70}
            r="60"
            fill="white"
            opacity="0.7"
            stroke="black"
            id="zone"
            overflow="visible"
          >

          </circle>
          <text x={60} y={30} textLength="300" fill="blue">
            <tspan x={30} dy="1.2em">
              Left Corner 3
            </tspan>
            <tspan x={50} dy="1.2em" fontWeight="bold"> 
              {fgm}/{fga}
            </tspan>
            <tspan x={45} dy="1.2em">
              {fg_pct}%
            </tspan>
            <tspan x={40} dy="1.2em">
              FGA: {fga}
            </tspan>
            <tspan x={40} dy="1.2em">
              FGM: {fgm}
            </tspan>
          </text>
        </g>
      )
    } else if (zone === "Right Corner 3") {
      return (
        <g key={zoneId}>
          <circle
            cx={680}
            cy={70}
            r="60"
            fill="white"
            opacity="0.7"
            stroke="black"
            id="zone"
            overflow="visible"
          >
          </circle>
          <text cx={690} y={30} textLength="300" fill="blue">
            <tspan x={635} dy="1.2em">
              Right Corner 3
            </tspan>
            <tspan x={665} dy="1.2em" fontWeight="bold"> 
              {fgm}/{fga}
            </tspan>
            <tspan x={659} dy="1.2em">
              {fg_pct}%
            </tspan>
            <tspan x={650} dy="1.2em">
              FGA: {fga}
            </tspan>
            <tspan x={650} dy="1.2em">
              FGM: {fgm}
            </tspan>
          </text>
        </g>
      )
    } else if (zone === "Backcourt") {
      return (
        <g key={zoneId}>
          <circle
            cx={375}
            cy={635}
            r="60"
            fill="white"
            opacity="0.7"
            stroke="black"
            id="zone"
            overflow="visible"
          >

          </circle>
          <text x={325} y={590} textLength="300" fill="blue">
            <tspan x={345} dy="1.2em">
              Backcourt
            </tspan>
            <tspan x={365} dy="1.2em" fontWeight="bold"> 
              {fgm}/{fga}
            </tspan>
            <tspan x={357} dy="1.2em">
              {fg_pct}%
            </tspan>
            <tspan x={350} dy="1.2em">
              FGA: {fga}
            </tspan>
            <tspan x={350} dy="1.2em">
              FGM: {fgm}
            </tspan>
          </text>
        </g>
      )
    } else if (zone === "Above the Break 3") {
      return (
        <g key={zoneId}>
          <circle
            cx={375}
            cy={500}
            r="70"
            fill="white"
            opacity="0.7"
            stroke="black"
            id="zone"
            overflow="visible"
          >

          </circle>
          <text x={325} y={460} textLength="300" fill="blue">
            <tspan x={315} dy="1.2em">
              Above the Break 3
            </tspan>
            <tspan x={350} dy="1.2em" fontWeight="bold"> 
              {fgm}/{fga}
            </tspan>
            <tspan x={355} dy="1.2em">
              {fg_pct}%
            </tspan>
            <tspan x={343} dy="1.2em">
              FGA: {fga}
            </tspan>
            <tspan x={343} dy="1.2em">
              FGM: {fgm}
            </tspan>
          </text>
        </g>
      )
    } else if (zone === "Mid-Range") {
      return (
        <g key={zoneId}>
          <circle
            cx={220}
            cy={340}
            r="60"
            fill="white"
            opacity="0.7"
            stroke="black"
            id="zone"
            overflow="visible"
          >

          </circle>
          <text x={250} y={295} textLength="300" fill="blue">
            <tspan x={190} dy="1.2em">
              Mid-Range
            </tspan>
            <tspan x={203} dy="1.2em" fontWeight="bold"> 
              {fgm}/{fga}
            </tspan>
            <tspan x={199} dy="1.2em">
              {fg_pct}%
            </tspan>
            <tspan x={195} dy="1.2em">
              FGA: {fga}
            </tspan>
            <tspan x={195} dy="1.2em">
              FGM: {fgm}
            </tspan>
          </text>
        </g>
      )
    } else if (zone === "In The Paint (Non-RA)") {
      return (
        <g key={zoneId}>
          <circle
            cx={375}
            cy={250}
            r="60"
            fill="white"
            opacity="0.7"
            stroke="black"
            id="zone"
            overflow="visible"
          >

          </circle>
          <text x={325} y={210} textLength="300" fill="blue">
            <tspan x={338} dy="1.2em">
              In The Paint
            </tspan>
            <tspan x={355} dy="1.2em" fontWeight="bold"> 
              {fgm}/{fga}
            </tspan>
            <tspan x={353} dy="1.2em">
              {fg_pct}%
            </tspan>
            <tspan x={345} dy="1.2em">
              FGA: {fga}
            </tspan>
            <tspan x={345} dy="1.2em">
              FGM: {fgm}
            </tspan>
          </text>
        </g>
      )
    } else if (zone === "Restricted Area") {
      return (
        <g key={zoneId}>
          <circle
            cx={375}
            cy={100}
            r="60"
            fill="white"
            opacity="0.7"
            stroke="black"
            id="zone"
            overflow="visible"
          >

          </circle>
          <text x={325} y={60} textLength="300" fill="blue">
            <tspan x={325} dy="1.2em">
              Restricted Area
            </tspan>
            <tspan x={353} dy="1.2em" fontWeight="bold"> 
              {fgm}/{fga}
            </tspan>
            <tspan x={352} dy="1.2em">
              {fg_pct}%
            </tspan>
            <tspan x={345} dy="1.2em">
              FGA: {fga}
            </tspan>
            <tspan x={345} dy="1.2em">
              FGM: {fgm}
            </tspan>
          </text>
        </g>
      )
    } else {
      return
    }
  })


  return (
    <div style={{display: 'flex', flexDirection: "column", justifyContent: 'center', paddingTop: '15px', paddingBottom: '15px'}}>
    <svg
      className="zone-chart"
      height="705"
      width="750"
      overflow="visible"

      // preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 750 705"
    >
      <rect x="0" y="0" width="750" height="705" fill="none" stroke="black"></rect>

      <image href="https://cdn.discordapp.com/attachments/809499216354607190/811438397238411304/court.png" preserveAspectRatio="none" height="705" width="750"></image>

      {zoneInfoBoxes}
    </svg>
    </div>
  )
}
