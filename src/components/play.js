import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

function Play(props) {
  return (
    <div className="pause icon">  
    <FontAwesomeIcon icon={faPlay}  size="2x" onClick={props.onClick} />
    </div>
    
  );
}
  
export default Play;
  