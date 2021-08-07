import React from 'react';
import './components/nav/nav.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/home/home';
import About from './components/about/about';
import QuestionsAnswers from './components/QuestionsAndAnswers/QuestionsAnswers';
import Shop from './components/shop/shoping/shop';
import Nav from './components/nav/Nav';
import Payment from './components/shop/payment/payment';
import Finish from './components/shop/finish/finish'
import Opinion from './components/opinion/opinion'
import './App.css'

function App() {
  return (
    <div>
    <Router>
    <Nav/>
     <Switch>
         <Route path="/" exact component={Home} />
         
         <Route path="/QuestionsAnswers" exact component={QuestionsAnswers} />
         <Route path="/shop"  exact component={Shop} />
         <Route path="/Opinion"  exact component={Opinion} />
         <Route path="/about">
           <About></About>
         </Route>
          <Route path="/payment">
           <Payment></Payment>
         </Route> 
         <Route path="/finish">
           <Finish></Finish>
         </Route> 
      </Switch>
    </Router> 
     </div>
  );
}

export default App;
