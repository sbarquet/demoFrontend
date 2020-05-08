import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// Componentes
import CrudDemo from 'Cont/CrudDemo';

const AppContainer = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={CrudDemo} />
    </BrowserRouter>
  );
};

export default AppContainer;
