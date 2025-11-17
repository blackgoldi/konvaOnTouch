import { Group, Line, Text } from "react-konva";

export function X({ x, y }: { x: number, y: number }) {
    return (
        <Group x={x} y={y}>
            <Line strokeWidth={1} stroke='#FFFFFF' points={[0, -15, 0, 15]} />
            <Line strokeWidth={1} stroke='#FFFFFF' points={[-15, 0, 15, 0]} />
            <Text x={15} y={-15} text={`X:${x} Y:${y}`} fill='#FFFFFF' />
        </Group>
    )
}