import './App.css'

import { Section, updateSection } from './api';

import { AppRoot } from '@telegram-apps/telegram-ui'
import NavigationBar from './components/NavigationBar'
import SectionList from './components/SectionList';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
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
