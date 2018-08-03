import React from 'react';
let  _ = require('underscore');
const Stars=(props)=>{
    
    return(
        <div className="col-1">
           { _.range(props.noOfStars).map(i=>
               <i key={i} className="fa fa-star"></i>
           )}
        </div>
    );
}

export default Stars;