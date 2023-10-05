import { Slider } from "@mui/material";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';


export default function User ({id, name, points, avatar}) {
  console.log(points)

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 30,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: 'brown',
    },
  }));
  
  return (
        <div>
       <img src={`https://robohash.org/${name}?size=50x50&set=3`} alt={name}/>
       {avatar}
      <p>{name}</p> 

      <BorderLinearProgress
      variant="determinate"
      value={points}
      />

      <Slider 
      disabled
      value={points} 
      color="secondary"
      aria-label="Points slider"
      max={100}
      />
      
      </div>
    )
}

