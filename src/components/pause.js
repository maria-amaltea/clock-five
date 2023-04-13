import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause } from '@fortawesome/free-solid-svg-icons'

function Pause(props) {
  return (
    <div className="pause icon">  
    <FontAwesomeIcon icon={faPause}  size="2x" onClick={props.onClick} />
    </div>
    
  );
}
  
export default Pause;
  