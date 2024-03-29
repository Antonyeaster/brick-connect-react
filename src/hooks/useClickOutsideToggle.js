import { useEffect, useRef, useState } from "react";

  //Custom hook that handles the expanded state

const useClickOutsideToggle = () => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
      /*
        If the click event is triggered then set expanded changes to
        false unless the click was on innerText of Category or Feeds.
     */
    const handleClickOutside = (event) => {
      const element = event.target;
      if (element.innerText === " Category" || element.innerText === " Feeds") {
        return;
      }
      if (ref.current && !ref.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);

  return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle;
