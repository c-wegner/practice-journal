import React, { useEffect } from "react";
import styled from "styled-components";
import { common } from "../../globals";

const Styles = {
  Panel: styled.div<{ width: string }>`
    width: ${p => p.width};
    max-width: 100%;
    position: absolute;
    transition: width 0.25s;
    background-color: white;
    top: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    z-index: 2;
    min-height: 100vh;
    box-shadow: ${p => (p.width === "0" ? "none" : common.values.shadow.hover)};
  `,

  ExitBar: styled.div`
    display: flex;
    justify-content: flex-end;
  `,

  ExitButton: styled.div`
    cursor: pointer;
  `,

  Content: styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem;
  `
};

export const Panel = ({
  id,
  current,
  children,
  width = "900px",
  onExit = () => {}
}) => {
  useEffect(() => {}, [current]);
  const getWidth = () => {
    if (id === current) return width;
    return "0";
  };
  return (
    <Styles.Panel width={getWidth()}>
      <Styles.Content>
        <Exit onClick={onExit} />
        {children}
      </Styles.Content>
    </Styles.Panel>
  );
};

const Exit = ({ onClick }) => (
  <Styles.ExitBar>
    <Styles.ExitButton onClick={() => onClick()}>X</Styles.ExitButton>
  </Styles.ExitBar>
);

