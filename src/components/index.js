import React from 'react';
import Draggable from 'react-draggable';
import '../App.css';
const DragAbleActionButton = () => {
  return (
    <div
      className='draggableParent'
      style={{
        backgroundColor: 'red',
        height: window.innerHeight,
        width: window.innerWidth,
        zIndex:99
      }}
    >
      <Draggable
        //allowAnyClick='true'
        axis='both'
        handle='.handle'
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        bounds='.draggableParent'
        // grid={[25, 25]}
        scale={1}
        //onMouseDown={()=>{alert('hello')}}
        onStart={() => {
          console.log('on Start');
        }}
        onDrag={() => {
          console.log('on Drag');
        }}
        onStop={() => {
          console.log('on Stop');
        }}
      >
        <div
          className='handle'
          style={{
            display: 'flex',
            backgroundColor: 'blue',
            height: 100,
            width: 100,
            borderRadius: '50%',
            position:'absolute',
          }}
        >
                <div style={{height:100,width:100,margin:75,backgroundColor:'white', position:'absolute',left:10,top:10}}>

</div>
        </div>
      </Draggable>


    </div>
  );
};

export default DragAbleActionButton;
