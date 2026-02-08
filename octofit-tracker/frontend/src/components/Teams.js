
import { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Teams endpoint:', endpoint);
        console.log('Fetched teams:', results);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, [endpoint]);

  const renderTable = () => {
    if (!teams.length) return <tr><td colSpan="100%">No teams found.</td></tr>;
    const keys = Object.keys(teams[0] || {});
    return (
      <>
        <thead className="table-dark">
          <tr>
            {keys.map(key => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {teams.map((team, idx) => (
            <tr key={team.id || idx}>
              {keys.map(key => <td key={key}>{String(team[key])}</td>)}
            </tr>
          ))}
        </tbody>
      </>
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 display-6">Teams</h2>
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

export default Teams;
