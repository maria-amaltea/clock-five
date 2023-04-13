import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'

function Reset(props) {
  return (
    <div className="pause icon">  
    <FontAwesomeIcon icon={faRotateRight}  size="2x" onClick={props.onClick} />
    </div>
    
  );
}
  
export default Reset;
  