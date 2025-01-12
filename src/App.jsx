import { useState } from 'react'
import { RouterProvider } from 'react-router-dom';
import RouteList from './RouteList.jsx';
import { Provider } from 'react-redux';
import Store from './redux/Store';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Provider store={Store}>
      <RouterProvider router={RouteList} />
    </Provider>
  )
}

export default App
