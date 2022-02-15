import { Icon, IconButton as MUIIConButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import i18n from "../../../locales";
import styled from "styled-components";

export const Counter: React.FC<CounterProps> = props => {
    const { name, title } = props;

    const counts = JSON.parse(localStorage.getItem("counts") || "{}");

    const currentCount = name in counts ? counts[name] : 0;

    const [count, setCount] = useState(currentCount || 0);

    const updateCounts = (n: number) => {
        counts[name] = n;
        localStorage.setItem("counts", JSON.stringify(counts));
        setCount(n);
    };

    const history = useHistory();

    const increase = () => updateCounts(count + 1);
    const decrease = () => {
        if (count > 0) updateCounts(count - 1);
    };
    const restart = () => updateCounts(0);

    return (
        <React.Fragment>
            {title && (
                <Title>
                    <BackButton
                        onClick={() => history.push("/")}
                        color="secondary"
                        aria-label={i18n.t("Back")}
                        data-test={"page-header-back"}
                    >
                        <Icon color="primary">arrow_back</Icon>
                    </BackButton>
                    Counter for {name}
                </Title>
            )}

            <Subtitle>
                Current count: {count}
                <br />
                <IconButton key="increase" onClick={increase}>
                    <AddIcon />
                </IconButton>
                <IconButton key="decrease" onClick={decrease}>
                    <RemoveIcon />
                </IconButton>
                <IconButton key="restart" onClick={restart}>
                    <AutorenewIcon />
                </IconButton>
            </Subtitle>
        </React.Fragment>
    );
};

interface CounterProps {
    name: string;
    title?: string;
}

const Title = styled.h2`
    color: blue;
`;

const Subtitle = styled.h3`
    text-align: center;
`;

const IconButton = styled(MUIIConButton)`
    margin-bottom: 8px;
`;

const BackButton = styled(IconButton)`
    padding-top: 10px;
    margin-bottom: 5px;
`;
