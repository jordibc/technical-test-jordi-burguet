import React, { useState } from "react";
import TreeView from "@material-ui/lab/TreeView";
import {
    Box as MUIBox,
    Grid,
    Button,
    TextField,
    Card as MUICard,
    CardHeader,
    CardActions as MUICardActions,
    CardContent as MUICardContent,
} from "@material-ui/core";
import { IndeterminateCheckBoxOutlined as ExpandIcon, AddBoxOutlined as CompressIcon } from "@material-ui/icons";
import TreeItem from "@material-ui/lab/TreeItem";
import styled from "styled-components";
import data from "../../../data/stubs/OrganisationUnits.json";

export const OrgUnitsSelector: React.FC<OrgUnitsSelectorProps> = props => {
    const rootIds = props.rootIds ?? []; // or try ["uo3srkbSp70", "uo3srkbSp61"];

    const [changed, setChanged] = useState(false);
    const [currentSelection, setCurrentSelection] = useState("");

    const [unitsObj, root] = getTree();

    const trees = rootIds.length > 0 ? rootIds.map(id => unitsObj[id]) : [root];

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TreeView
                        aria-label="organisation units navigator"
                        defaultCollapseIcon={<ExpandIcon />}
                        defaultExpandIcon={<CompressIcon />}
                        onNodeSelect={(_: any, nodeId: string) => setCurrentSelection(nodeId)}
                    >
                        {trees.map(toTreeItem)}
                    </TreeView>
                </Grid>
                <Grid item xs={8}>
                    <Card>
                        <CardHeader title={"Organisation unit"} />
                        <Content>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Name"
                                        type="text"
                                        variant="standard"
                                        onChange={() => setChanged(true)}
                                        value={currentSelection ? unitsObj[currentSelection].name : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="opening"
                                        label="Opening Date"
                                        type="text"
                                        variant="standard"
                                        onChange={() => setChanged(true)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="code"
                                        label="Code"
                                        type="text"
                                        variant="standard"
                                        onChange={() => setChanged(true)}
                                    />
                                </Grid>
                            </Grid>
                        </Content>
                        {changed && (
                            <Actions>
                                <Button variant="contained" onClick={() => undefined}>
                                    Save
                                </Button>
                                <Button variant="contained" color="secondary" onClick={() => undefined}>
                                    Clear Form
                                </Button>
                            </Actions>
                        )}
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

const toTreeItem = (node: { id: string; name: string; children: [any] }) => {
    const childrenItems = node.children.map(toTreeItem);

    return (
        <TreeItem key={node.id} nodeId={node.id} label={node.name}>
            {childrenItems}
        </TreeItem>
    );
};

const getTree = () => {
    const units = data["organisationUnits"];

    const unitsObj: { [id: string]: any } = {};
    for (const unit of units) {
        unitsObj[unit.id] = {
            id: unit.id,
            name: unit.name,
            parent: unit.parent ? unit.parent.id : "",
            children: [],
        };
    }

    let root;
    for (const [_, unit] of Object.entries(unitsObj)) {
        if (unit.parent) {
            unitsObj[unit.parent].children.push(unit);
        } else {
            root = unit;
        }
    }

    return [unitsObj, root];
};

interface OrgUnitsSelectorProps {
    rootIds?: [string];
}

const Box = styled(MUIBox)`
    left: 1rem;
    top: 1rem;
    padding: 1rem;
    height: auto;
`;

const Card = styled(MUICard)`
    padding: 0;
    margin: 0.5rem;
    float: left;
`;

const Content = styled(MUICardContent)`
    padding: 0.5rem 1rem;
    font-size: 14px;
`;

const Actions = styled(MUICardActions)`
    margin-left: auto;
`;
