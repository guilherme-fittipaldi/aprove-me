import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SummaryPage from './components/SummaryPage';
import FormPage from './components/FormPage';
import AssignorPage from './components/AssignorPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={FormPage} />
        <Route path="/summary" component={SummaryPage} />
        <Route path="/assignor" component={AssignorPage} />
      </Switch>
    </Router>
  );
}

export default App;
