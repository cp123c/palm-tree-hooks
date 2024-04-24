
import { useRef, useState } from 'react';
import './App.css';
import { useOnClickOutside } from './hooks/use-on-click-outside';

function App() {

  const [activeIndex, setActiveIndex] = useState(true);

  // useEffect(() => {
  //   const handler = (e) => {
  //     if (e.key === "Escape") {
  //       setActiveIndex(null);
  //     }
  //   };
  //   document.addEventListener("keydown", handler);
  //   return () => {
  //     document.removeEventListener("keydown", handler);
  //   };
  // }, []);

  const navRef = useRef(null);
  useOnClickOutside(navRef, () => setActiveIndex(null));

  return (
    <div className="App" ref={navRef}>
      {activeIndex}
    </div>
  );
}

export default App;
