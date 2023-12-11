import { mount } from "cake/cakeApp";
import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fromChild } from "../rtk/hostSlice";
import pubSub from "../pub-sub/pubSub";

export default () => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      onNavigate: ({ pathname: nextPathname }) => {
        if (history.location.pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      initialPath: history.location.pathname,
      fromCakeMF: (childInfo) => {
        dispatch(
          fromChild({
            name: childInfo.name,
            data: childInfo.data,
          })
        );
      },
      pubSub
    });

    history.listen(onParentNavigate);
  }, []);

  return <diV ref={ref} id="cake-mf"></diV>;
};
