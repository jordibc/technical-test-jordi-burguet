import React from "react";
import { Box, Grid, Button as MUIButton } from "@material-ui/core";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Card, CardGrid } from "../../components/card-grid/CardGrid";

export const LandingPage: React.FC = () => {
    const history = useHistory();

    const cards: Card[] = [
        {
            title: "Section",
            key: "main",
            children: [
                {
                    name: "John",
                    description: "Entry point 1",
                    listAction: () => history.push("/counter/John"),
                },
                {
                    name: "Mary",
                    description: "Entry point 2",
                    listAction: () => history.push("/counter/Mary"),
                },
            ],
        },
    ];

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Button variant="contained" href="#/organisations">
                        Organisations
                    </Button>
                </Grid>
                <Grid item xs={10}>
                    <CardGrid cards={cards} />
                </Grid>
            </Grid>
        </Box>
    );
};

const Button = styled(MUIButton)`
    left: 1rem;
    top: 1rem;
    padding: 1rem;
    height: auto;
`;
