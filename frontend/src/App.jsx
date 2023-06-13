import { Route, Routes } from 'react-router-dom';

import './App.css'

import Home from './Home';
import PromotionDetail from './component/PromotionDetail';
import LeaderDetail from './component/LeaderDetail';

function App() {




  return (
    <div >

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/promotion/:promotionId" element={<PromotionDetail />} />
        <Route path="/leadership/:leaderId" element={<LeaderDetail />} />
      </Routes>
    </div>
  );
}



export default App
