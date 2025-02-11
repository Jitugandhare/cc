import { useState } from 'react';
import './App.css';
import Dialog from './components/Dialog';

function App() {
  const [showDialog, setShowDialog] = useState(false)

  const handleShowDialog = () => {
    setShowDialog(!showDialog)
  }

  const handleCloseDialog = () => {
    setShowDialog(false)
  }
  return (
    <div className="App">
      <button onClick={handleShowDialog} >Show Dialog</button>
      {showDialog && (
        <Dialog onClose={handleCloseDialog} >
          <h1>Title</h1>
          <span>random text</span>
        </Dialog >
      )}
    </div>
  );
}

export default App;
