import { Layer, Rect, Stage } from 'react-konva'
import './App.css'
import React, { useEffect, useRef, useState } from 'react'
import Konva from 'konva'
import { X } from './components/X';
import type { KonvaEventObject, Node, NodeConfig } from 'konva/lib/Node';

function App() {

  const stageRef = useRef<Konva.Stage | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);
  // const pointerRef = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
  const [pointer, setPointer] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number } | null>(null);
  const touchStartRef = useRef<TouchEvent | null>(null);

  useEffect(() => {
    if (!stageRef.current) return;
    const sizes = parentRef.current?.getBoundingClientRect();
    stageRef.current.setAttrs({
      width: sizes?.width,
      height: sizes?.height
    })
  })

  function handleTap(e: KonvaEventObject<TouchEvent, Node<NodeConfig>>) {
    e.evt.preventDefault();
    const point = e.evt.changedTouches[0];
    setPointer({ x: point.clientX, y: point.clientY });
  }
  function handleDblTap(e: KonvaEventObject<TouchEvent, Node<NodeConfig>>) {

  }
  function handleDragStart(e: any) { }
  function handleDragMove(e: any) {
    const point = e.evt.touches[0];
    setPointer({ x: point.clientX, y: point.clientY });
  }
  function handleDragEnd(e: any) { }
  function handleTouchStart(e: KonvaEventObject<TouchEvent, Node<NodeConfig>>) {
    touchStartRef.current = e.evt;
    console.log(touchStartRef.current)
  }
  function handleTouchMove(e: KonvaEventObject<TouchEvent, Node<NodeConfig>>) {
    const point = e.evt.touches[0];
    setPointer({ x: point.clientX, y: point.clientY });
  }
  function handleTouchEnd(e: KonvaEventObject<TouchEvent, Node<NodeConfig>>) {
    if (!touchStartRef.current) return;
    if (e.evt.timeStamp - touchStartRef.current.timeStamp > 400) { //Нужна проверка на позицию
      const point = e.evt.changedTouches[0];
      setContextMenu({ x: point.clientX, y: point.clientY });
    } else {
      setContextMenu(null);
    }
  }

  function handleCreate(e: any) {
    if (!stageRef.current) return;
    const layer = stageRef.current.getChildren()[0];
    layer.add(new Konva.Rect({ x: contextMenu?.x, y: contextMenu?.y, width: 50, height: 50, fill: '#FFFFFF', draggable: true }));
    layer.batchDraw();
    setContextMenu(null);
  }


  return (
    <div ref={parentRef} style={{ position: 'relative', height: '100%', width: '100%', overflow: 'hidden' }}>
      <Stage ref={stageRef} width={0} height={0}
        onTap={handleTap}
        onDblTap={handleDblTap}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Layer>
          <Rect x={10} y={10} width={50} height={50} fill={'#ff0F00'} draggable={true} />
          <X x={pointer.x} y={pointer.y} />
        </Layer>
      </Stage>
      <div style={{ display: contextMenu ? 'flex' : 'none', position: 'absolute', top: contextMenu?.y, left: contextMenu?.x, width: '20vw', height: '20vh', stroke: '#FFFFFF', strokeWidth: 5 }}>
        <ul>
          <li><button onClick={handleCreate}>Создать квадрат</button></li>
          <li>Пункт меню</li>
          <li>Пункт меню</li>
          <li>Пункт меню</li>
          <li>Пункт меню</li>
        </ul>
      </div>
    </div>
  )
}

export default App
