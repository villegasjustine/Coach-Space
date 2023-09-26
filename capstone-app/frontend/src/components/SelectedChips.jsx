
export default function ShoppingCart () {
    const [selectedExercises, setSelectedExercises] = useState([]);
  
    const addToUser = (exercise) => {
      setSelectedExercises([...selectedExercises, exercise]);
    };
  
    return (
      <div>
        <h2>Selected Exercises</h2>
        <ul>
          {exercise.map((exercise) => (
            <li key={exercise.id}>
              {exercise.name}
            </li>
          ))}
        </ul>
      </div>
    );
  };