import React from 'react';
import styled from 'styled-components';

const ArrowStyle = styled.div<{rotation: string}> `
  border: solid;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(${p=>p.rotation});
  -webkit-transform: rotate(${p=>p.rotation});
`

const arrowRotation = {
  right: '-45deg',
  left: '135deg',
  up:'-135deg',
  down: '45deg'
}

export const Arrow=({
  up = false,
  right=true,
  down= false,
  left = false
})=>(
  <ArrowStyle rotation={getArrowRotation(left, up, down)}/>
)

function getArrowRotation(left, up, down){
  if(left){
    return arrowRotation.left
  }else if(up){
    return arrowRotation.up
  }else if(down){
    return arrowRotation.down
  }
  return arrowRotation.right
}