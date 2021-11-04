import React, { useState } from 'react'

function CornerCircle() {
    const [toShow, toggle] = useState(false);
    return (<div className="fixed-bottom m-3 row">
        <i 
        onClick={()=>toggle(!toShow)}
        className="bg-dark text-light bi bi-arrow-right" 
        style={{display:'grid',placeContent:'center',width:40,height:40}}></i>
        &nbsp;
        {
            toShow && <div className="bg-dark text-light px-4" style={{display:'grid',placeContent:'center',height:40}}>
                <i class="bi bi-check2-circle"></i>
            </div>
        }
    </div>
    )
}

export default CornerCircle
