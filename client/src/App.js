import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';
import Form from './components/Form/Form.jsx';
import Details from './components/Details/Details.jsx';

function App() {
  return (
    <BrowserRouter>
       <div> 
        <Route exact path='/' component={LandingPage} />
        <Route path='/home' component={Home} />
        <Route path='/create' component={Form} />
        <Route path='/videogame/:id' component={Details} /> 
      </div>
    </BrowserRouter>
  );
};

export default App;
