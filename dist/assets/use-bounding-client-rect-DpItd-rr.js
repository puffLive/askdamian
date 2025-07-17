import{a as e}from"./vendor-Dm0w3PnF.js";function n(n){const[t,r]=e.useState(null),s=e.useCallback(()=>{if(n.current){const e=n.current.getBoundingClientRect();r(e)}},[n]);return e.useEffect(()=>(window.addEventListener("resize",s),s(),()=>window.removeEventListener("resize",s)),[s]),t}export{n as u};
//# sourceMappingURL=use-bounding-client-rect-DpItd-rr.js.map
