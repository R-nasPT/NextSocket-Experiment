import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1920}
    height={600}
    viewBox="0 0 1920 600"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="12" y="30" rx="0" ry="0" width="115" height="50" /> {/* head */}
    <rect x="1083" y="25" rx="0" ry="0" width="70" height="40" /> {/* button */}
    <rect x="1005" y="25" rx="0" ry="0" width="70" height="40" /> {/* button */}
    <rect x="13" y="90" rx="0" ry="0" width="1140" height="55" /> {/* bar */}
    {/* solid */}
    <rect x="16" y="178" rx="3" ry="3" width="1000" height="7" /> 
    <rect x="20" y="255" rx="3" ry="3" width="1000" height="7" /> 
    <rect x="22" y="340" rx="3" ry="3" width="1000" height="7" /> 
    <rect x="22" y="430" rx="3" ry="3" width="1000" height="7" /> 
    <rect x="25" y="505" rx="3" ry="3" width="1000" height="7" /> 
    {/* circle rigth*/}
    <circle cx="1120" cy="184" r="23" /> 
    <circle cx="1120" cy="260" r="23" /> 
    <circle cx="1120" cy="345" r="23" /> 
    <circle cx="1120" cy="430" r="23" /> 
    <circle cx="1120" cy="510" r="23" /> 
    {/* circle left*/}
    <circle cx="1060" cy="184" r="23" /> 
    <circle cx="1060" cy="260" r="23" /> 
    <circle cx="1060" cy="345" r="23" /> 
    <circle cx="1060" cy="430" r="23" /> 
    <circle cx="1060" cy="510" r="23" /> 
  </ContentLoader>
)

export default MyLoader

