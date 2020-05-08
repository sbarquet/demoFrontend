import React, { useState } from 'react';
import data from 'Others/data.json';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const App = () => {
  const [showList, setShowList] = useState(false);
  const handleclick = () => {
    setShowList(!showList);
    console.log('cambio showList', showList);
  };

  return (
    <React.Fragment>
      <Link to="/img">
        <h3>To img --- "react-router"</h3>
      </Link>
      <a href="/img">
        <h3>To img --- "href"</h3>
      </a>
      <Button type="primary" onClick={handleclick}>
        Show Loaders
      </Button>
      {showList && data.loaders.map(elemento => <div>{elemento.name}</div>)}
    </React.Fragment>
  );
};

export default App;
