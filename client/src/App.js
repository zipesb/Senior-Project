// We use Route in order to define the different routes of our application
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from './Components/Home';
import SecurityReport from './Components/SecurityReport';

// We import all the components we need in our app

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/report" element={<SecurityReport/>} />
            </Routes>
        </Router>
 );
}

export default App;