import './App.css';
import React, { useState } from 'react';
import CustomerInfoComponent from './components/customerInfo';
import ButtonComponent from './components/buttonComponent';

import { BUTTON_LIST, CUSTOMER_INFO, MAPPED_KEYS } from './constants';

const App = () => {

  const [stringInfo, setStringInfo] = useState(CUSTOMER_INFO);
  const [customerInfoDtl, setCustomerInfoDtl] = useState([]);
  const [contractIds, setContracIds] = useState({});
  const [btnTitle, setTitle] = useState('');

  const handleClick = (e) => {
    const customerInfo = []
    const splited = stringInfo.split('\n')
    splited.forEach(item => {
      const userDetails = {};
      item.split(',').forEach((userDtls, index) => {
        userDetails[MAPPED_KEYS[index]] = userDtls
      })
      customerInfo.push({ ...userDetails });
    });
    setCustomerInfoDtl(customerInfo)
  }

  const handleInputs = (e, type) => {
    setTitle(type);
    switch (type) {
      case 'contractId':
        let uniqCustomers = {}
        customerInfoDtl.forEach(element => {
          (uniqCustomers[element.contractId]) ? uniqCustomers[element.contractId].push(element.customerId) : uniqCustomers[element.contractId] = [element.customerId]
        });

        setContracIds(uniqCustomers)
        break;

      case 'average':
        let zoneData = {};
        let averageInfo = {}
        customerInfoDtl.forEach(element => {
           (zoneData[element.geozone]) ? zoneData[element.geozone].push(element.buildduration) : zoneData[element.geozone] = [element.buildduration]
        });
        Object.keys(zoneData).forEach(item => {
          const total = zoneData[item].reduce((total, num) => {
            return total + Math.round(parseInt(num));
          }, 0);
          averageInfo[item] = [`${(total / zoneData[item].length)}s`]
        })
        setContracIds(averageInfo)
        break;

      case 'geozone':
      case 'unique':
      default:
        let uniqForZone = {};
        let uniqCounter = {}
        customerInfoDtl.forEach(element => {
           (uniqForZone[element.geozone]) ? uniqForZone[element.geozone].push(element.customerId) : uniqForZone[element.geozone] = [element.customerId]
        });

        if (type === 'geozone') {
          Object.keys(uniqForZone).forEach(item => {
            uniqCounter[item] = [`${uniqForZone[item].length}`]
          });
          setContracIds(uniqCounter)
        } else setContracIds(uniqForZone)
        break;
    }
  }

  return (
    <div className="app">

      <div>
        <div className='fromContainer'>
          <div >
            <h3>Cutomer Data Analyser</h3>
            <textarea rows="8" cols="60" value={stringInfo} onChange={e => setStringInfo(e.target.value)}> </textarea>
          </div>

          <button onClick={handleClick}>Analyse</button>
        </div>
        {customerInfoDtl.length ?
          <div className='btnContainer'>
            {BUTTON_LIST.map(item => <ButtonComponent key={item.id} className={item.title === btnTitle ? 'active' : ''} handleInputs={handleInputs} title={item.title} desc={item.desc} />)}
          </div> : <></>
        }

        <div>
          <CustomerInfoComponent contractIds={contractIds} />
        </div>

      </div>
    </div>
  );
}

export default App;
