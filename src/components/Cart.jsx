import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import pubSub from "../pub-sub/pubSub";

const Cart = () => {
  const childMf = useSelector((state) => state.host);

  const [id1, setid1] = useState("");
  const [id2, setid2] = useState("");

  const [cakes, setcakes] = useState(0);
  const [iceCreams, seticeCreams] = useState(0);

  useEffect(() => {
    // Here subscribing to changes in both cake and icecream mf
    let id1 = pubSub.subscribe("cake-bought", (data) => {
      console.log("Data From Cake MF", data);
      setcakes(data);
    });
    let id2 = pubSub.subscribe("iceCream-bought", (data) => {
      console.log("Data From IceCream MF", data);
      seticeCreams(data);
    });

    setid1(id1);
    setid2(id2);

    return () => {
      pubSub.unsubscribe("cake-bought", id1);
      pubSub.unsubscribe("iceCream-bought", id2);
    };
  }, []);

  const unListenCake = () => {
    pubSub.unsubscribe("cake-bought", id1);
  };

  const unListenIceCream = () => {
    pubSub.unsubscribe("iceCream-bought", id2);
  };

  const ListenCake = () => {
    let id = pubSub.subscribe("cake-bought", (data) => {
      console.log("Data From Cake MF", data);
      setcakes(data);
    });
    setid1(id);
  };

  const ListenIceCream = () => {
    let id = pubSub.subscribe("iceCream-bought", (data) => {
      console.log("Data From IceCream MF", data);
      seticeCreams(data);
    });
    setid2(id);
  };

  return (
    <div>
      <h2>Items In The Cart :</h2>
      {/*
      <div>Cake : {childMf["cake-bought"] || 0}</div>
      <div>IceCream : {childMf["iceCream-bought"] || 0}</div>
    */}
      <div>Cake : {cakes}</div>
      <button onClick={unListenCake}>Un-Subscribe Cake</button>
      <button onClick={ListenCake}>Subscribe Cake</button>
      <div>IceCream : {iceCreams}</div>
      <button onClick={unListenIceCream}>Un-Subscribe IceCream</button>
      <button onClick={ListenIceCream}>Subscribe IceCream</button>
    </div>
  );
};

export default Cart;
