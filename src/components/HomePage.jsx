import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import pubSub from "../pub-sub/pubSub";

const HomePage = () => {

  const handleReset = (e) => {
    if (e.currentTarget.id == "cake-reset") {
      const customEvent = new CustomEvent("cake-reset", {
        detail: { resetBy: 0 },
      });
      window.dispatchEvent(customEvent);
    } else {
      const customEvent = new CustomEvent("icecream-reset", {
        detail: { resetBy: 0 },
      });
      window.dispatchEvent(customEvent);
    }
  };

  useEffect(()=>{
   pubSub.publish("pending-event","From Container")
  },[])

  return (
    <div>
      <h1>HomePage</h1>
      <div>
        <button id="cake-reset" onClick={handleReset}>
          Reset Cake
        </button>
      </div>
      <div>
        <button id="icecream-reset" onClick={handleReset}>
          Reset Ice Cream
        </button>
      </div>
      <div></div>
      <h3>Product Items</h3>
      <div>
        <Link to="/cake">
          <div>
            <h4>Cake</h4>
          </div>
        </Link>
      </div>
      <div>
        <Link to="/icecream">
          <div>
            <h4>Ice Cream</h4>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
