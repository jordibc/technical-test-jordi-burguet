import React from "react";
import styled from "styled-components";

export const Example: React.FC<ExampleProps> = props => {
    const { name } = props;

    return (
        <React.Fragment>
            <Title>Hello {name}!</Title>
        </React.Fragment>
    );
};
const Title = styled.h2`
    color: blue;
`;

interface ExampleProps {
    name: string;
}
