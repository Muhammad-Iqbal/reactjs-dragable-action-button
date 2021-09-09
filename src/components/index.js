import React, { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import '../App.css';

//constants
const buttonWidth = 75;
const buttonHeight = 75;
const baseTop = buttonWidth - 13;
const baseLeft = buttonHeight - 13;
const contextMenuWidth = 150;
const contextMenuHeight = 100;
const DragAbleActionButton = (props) => {
  //states
  const [isStarted, setIsStarted] = useState(false);
  const [isDragged, setIsDragged] = useState(false);
  const [leftPosition, setLeftPosition] = useState(baseLeft);
  const [topPosition, setTopPosition] = useState(baseTop);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const draggableRef = useRef(null);

  //effects
  useEffect(() => {}, [contextMenuVisible]);

  //helper methods
  const onStart = () => {
    setIsStarted(true);
    //console.log('on Start');
  };

  const onDrag = () => {
    setIsDragged(true);
    setContextMenuVisible(false);
    //console.log('on Drag');
  };

  const onStop = () => {
    //console.log('on Stop');
    if (isStarted === true && isDragged === false) {
      //alert('handle click here');
      handleContextMenuVisibilityChange();
      //console.log(draggableRef.current)
    } else {
      setIsStarted(false);
      setIsDragged(false);
    }
  };

  const handleContextMenuVisibilityChange = () => {
    const clickX = draggableRef?.current?.state.x;
    const clickY = draggableRef?.current?.state.y;

    console.log('button position :: x =' + clickX + ' y =' + clickY);

    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    console.log('w =' + screenW + ' h =' + screenH);

    let right = false;

    if (clickX + baseLeft + contextMenuWidth >= screenW) {
      right = true;
    }

    const left = !right;

    let top = false;

    if (clickY + baseTop + contextMenuHeight >= screenH) {
      top = true;
    }
    const bottom = !top;

    if (right) {
      //this.root.style.left = `${clickX + 5}px`;
      setLeftPosition(clickX + 10 - contextMenuWidth);
    }

    if (left) {
      //this.root.style.left = `${clickX - rootW - 5}px`;
      setLeftPosition(clickX + baseLeft);
    }

    if (top) {
      //this.root.style.top = `${clickY + 5}px`;
      setTopPosition(clickY - contextMenuHeight + 10);
    }

    if (bottom) {
      setTopPosition(clickY + baseTop);
      //this.root.style.top = `${clickY - rootH - 5}px`;
    }

    // console.log('right: ' + right + ' left: ' + left + ' top: ' + top + ' bottom:'+bottom)
    // console.log(topPosition,leftPosition)
    setContextMenuVisible(true);
  };

  return (
    <div
      className='draggableParent'
      style={{
        backgroundColor: 'red',
        height: window.innerHeight,
        width: window.innerWidth,
        zIndex: 99,
      }}
    >
      <Draggable
        ref={draggableRef}
        //allowAnyClick='true'
        axis='both'
        handle='.handle'
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        bounds='.draggableParent'
        //grid={[45, 45]}
        scale={1}
        onStart={onStart}
        onDrag={onDrag}
        onStop={onStop}
      >
        <div
          className='handle'
          style={{
            display: 'flex',
            backgroundColor: 'blue',
            height: buttonHeight,
            width: buttonWidth,
            borderRadius: '50%',
            position: 'absolute',
          }}
        ></div>
      </Draggable>
      {contextMenuVisible ? (
        <div
          style={{
            height: 100,
            width: 150,
            backgroundColor: 'white',
            position: 'absolute',
            top: topPosition,
            left: leftPosition,
            borderRadius: '5%',
          }}
        ></div>
      ) : null}
    </div>
  );
};

export default DragAbleActionButton;
