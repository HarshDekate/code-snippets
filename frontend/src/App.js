import React from 'react';
import Form from './components/Form'; // Adjust the import path for Form
import Table from './components/Table'; // Adjust the import path for Table

function App() {
  return (
    <div className="container">
      <h1>Code Snippet Manager</h1>
      <Form /> {/* Include the Form component */}
      <Table /> {/* Include the Table component */}
    </div>
  );
}

export default App;
