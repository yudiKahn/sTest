import React from 'react'
import { connect } from 'react-redux';

function Popup({Pop}) {
    return Pop ? <Pop/> : null;
}

export default connect(s=>({Pop:s.app.popup}))(Popup);
