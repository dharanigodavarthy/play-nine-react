import React from 'react';

const DoneStatus=(props)=>{
    
    return(
        <div className="text-center">
           <h2>{props.doneStatus}</h2>
           <button onClick={props.resetGame}>Play again</button>
        </div>
    );
}

export default DoneStatus;