
const Activities = () => {
  const [activities, setActivities] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Activities endpoint:', endpoint);
        console.log('Fetched activities:', results);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [endpoint]);

  const renderTable = () => {
    if (!activities.length) return <tr><td colSpan="100%">No activities found.</td></tr>;
    const keys = Object.keys(activities[0] || {});
    return (
      <>
        <thead className="table-dark">
          <tr>
            {keys.map(key => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, idx) => (
            <tr key={activity.id || idx}>
              {keys.map(key => <td key={key}>{String(activity[key])}</td>)}
            </tr>
          ))}
        </tbody>
      </>
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 display-6">Activities</h2>
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

export default Activities;
