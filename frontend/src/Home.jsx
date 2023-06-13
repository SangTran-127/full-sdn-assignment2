import { useState } from 'react';
import Promotion from './screen/Promotion';
import Leader from './screen/Leader';
const Home = () => {
    const [activeTab, setActiveTab] = useState('Promotion');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="App">
            <div className="Menu">
                <button className={activeTab === 'Promotion' ? 'active' : ''} onClick={() => handleTabClick('Promotion')}>
                    Promotion
                </button>
                <button className={activeTab === 'Leadership' ? 'active' : ''} onClick={() => handleTabClick('Leadership')}>
                    Leadership
                </button>
            </div>
            <div className="Content" >
                <div style={{ marginTop: '3rem' }}>
                    {activeTab === 'Promotion' && <Promotion />}
                    {activeTab === 'Leadership' && <Leader />}
                </div>
            </div>

        </div>
    );
}

export default Home