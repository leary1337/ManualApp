import './App.css'

import { AppRoot } from '@telegram-apps/telegram-ui'
import NavigationBar from './components/NavigationBar'
import { Section } from './api';
import SectionList from './components/SectionList';
import { useState } from 'react';

function App() {
  const [selectedSection, setSelectedSection] = useState<Section>();
  // const { initDataRaw, initData } = retrieveLaunchParams();
  // console.log(initDataRaw, initData)

  // console.log(initData?.user?.id)
  return (
    <AppRoot>
      <NavigationBar selectedSection={selectedSection} onClick={setSelectedSection} />
      <SectionList
        selectedSection={selectedSection}
        onClick={setSelectedSection}
      />

    </AppRoot>
  )
}

export default App
