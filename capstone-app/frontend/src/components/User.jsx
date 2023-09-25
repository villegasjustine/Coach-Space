import { Slider } from "@mui/material";


export default function User ({id, name, type, points, avatar}) {
  
  return (
        <div>
       <img src={`https://robohash.org/${name}?size=50x50&set=3`} alt={name}/>
       {avatar}
      <p>{name}</p>  
      <Slider 
      controlled
      value={points} 
      color="secondary"
      aria-label="Points slider"
      max={100}
      />
      
      </div>
    )
}

