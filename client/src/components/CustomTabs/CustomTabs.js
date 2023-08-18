import React, { useState } from "react";
import { Content, Tab, Tabs } from "./styles";

function CustomTabs({ tabNames, tabContent }) {
  console.log({ tabContent });
  const [active, setActive] = useState(0);
  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };
  return (
    <div>
      <Tabs>
        {tabNames?.map((name, index) => (
          <Tab onClick={handleClick} active={active === index} id={index}>
            {name}
          </Tab>
        ))}
      </Tabs>
      <>
        {tabContent?.map((content, index) => (
          <Content active={active === index}>{content}</Content>
        ))}
      </>
    </div>
  );
}

export default CustomTabs;
