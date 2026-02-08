
const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Workouts endpoint:', endpoint);
        console.log('Fetched workouts:', results);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, [endpoint]);

  const renderTable = () => {
    if (!workouts.length) return <tr><td colSpan="100%">No workouts found.</td></tr>;
    const keys = Object.keys(workouts[0] || {});
    return (
      <>
        <thead className="table-dark">
          <tr>
            {keys.map(key => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout, idx) => (
            <tr key={workout.id || idx}>
              {keys.map(key => <td key={key}>{String(workout[key])}</td>)}
            </tr>
          ))}
        </tbody>
      </>
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 display-6">Workouts</h2>
      <div className="card shadow">
        <div className="card-body">
          <table className="table table-striped table-hover">
            {renderTable()}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
