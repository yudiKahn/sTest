import React, { useEffect, useState } from 'react';

function ToggleTheme() {

    const [htmlEl, setHtmlEl] = useState(null);
    const [isDark, setIsDark] = useState(false);
    const toggle = () => {
      htmlEl?.classList?.toggle('dark');
      setIsDark(!isDark);
    }

    useEffect(()=>{
      setHtmlEl(document.querySelector('html'));
    },[]);

    return (htmlEl && isDark !== null) && (<div 
      className="cursor-pointer grid content-center text-center shadow-2xl dark:text-yellow-300 text-gray-800 mx-4" 
      onClick={toggle}
    >
      <i className={`fas fa-${isDark ? 'sun' : 'moon'}`} style={{fontSize:20}}></i>
    </div>)
}

export default ToggleTheme;
