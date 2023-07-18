import Dagre from "@dagrejs/dagre";
import React, { useCallback, useEffect, useState, useMemo, useRef } from "react";
import ReactFlow, { ReactFlowProvider, Panel, useNodesState, useEdgesState, useReactFlow, Controls, MarkerType } from "reactflow";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

import artists from "./assets/data/artists.json";
import { initialNodes, initialEdges, createFeaturedArtistsList } from "./components/nodes-edges.jsx";

import "reactflow/dist/style.css";

const getLayoutedElements = (nodes, edges, options) => {
    const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
    g.setGraph({ rankdir: options.direction });

    edges.forEach((edge) => g.setEdge(edge.source, edge.target));
    nodes.forEach((node) => g.setNode(node.id, node));

    Dagre.layout(g);

    return {
        nodes: nodes.map((node) => {
            const { x, y } = g.node(node.id);

            return { ...node, position: { x, y } };
        }),
        edges,
    };
};

const LayoutFlow = () => {
    const { fitView } = useReactFlow();
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const [toggled, setToggled] = useState(false);

    const onLayout = useCallback(
        (direction) => {
            const layouted = getLayoutedElements(nodes, edges, { direction });

            setNodes([...layouted.nodes]);
            setEdges([...layouted.edges]);
        },
        [nodes, edges]
    );

    useEffect(() => {
        fitView();
    }, [nodes, edges, fitView]);

    const updateNodesAndEdges = (artistId) => {
        const featuredArtistsList = createFeaturedArtistsList(artists, artistId, 2);
        const nodes = featuredArtistsList.map((artist, index) => ({
            id: artist.id.toString(),
            data: { label: artist.name },
            position: { x: index * 200, y: 0 },
        }));
        const edges = featuredArtistsList
            .map((artist) =>
                artist.features.map((feature) => ({
                    id: `e${artist.id}-${feature}`,
                    source: artist.id.toString(),
                    target: feature.toString(),
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                        color: "#FDE047",
                    },
                }))
            )
            .flat();

        setNodes(nodes);
        setEdges(edges);

        setToggled(false);

        window.setTimeout(() => fitView(), 100);
    };

    const createMenuItem = (artists) => {
        return artists.map((artist) => (
            <MenuItem key={artist.id} component={<div onClick={() => updateNodesAndEdges(artist.id)}></div>}>
                {artist.name}
            </MenuItem>
        ));
    };

    return (
        <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} fitView>
            <div>
                <Sidebar style={{ zIndex: 100 }} onBackdropClick={() => setToggled(false)} toggled={toggled} breakPoint='all'>
                    <Menu>{createMenuItem(artists)}</Menu>
                </Sidebar>
            </div>
            <Panel position='top-right'>
                <button onClick={() => onLayout("TB")}>top bottom layout</button>
                <button onClick={() => onLayout("LR")}>left right layout</button>
                <button onClick={() => onLayout("BT")}>bottom top layout</button>
                <button onClick={() => setToggled(!toggled)}>Choose Artist</button>
            </Panel>
            <Panel position='bottom-center'>
                <a href='https://katsuyukiikeda.com/' target='_blank'>
                    <p>&copy; 2023 Katsuyuki Ikeda</p>
                </a>
            </Panel>
            <Controls />
        </ReactFlow>
    );
};

export default function () {
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <ReactFlowProvider>
                <LayoutFlow />
            </ReactFlowProvider>
        </div>
    );
}
