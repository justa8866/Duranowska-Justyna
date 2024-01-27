import styled from "styled-components";

export const Brand = styled.div`
    font-family: "Raleway";
    font-style: normal;
    margin: 15px 0;
    font-size: ${(props) => (props.small ? "18px" : "30px")};
    font-weight: ${(props) => (props.small ? "300" : "400")};
`;

export const LeftColumn = styled.div``;

export const Name = styled.div`
    font-family: "Raleway";
    font-style: normal;
    font-size: ${(props) => (props.small ? "18px" : "30px")};
    font-weight: ${(props) => (props.small ? "300" : "600")};
`;

export const Price = styled.div`
    font-family: "Raleway";
    font-style: normal;
    font-size: ${(props) => (props.small ? "16px" : "24px")};
    font-weight: ${(props) => (props.small ? "600" : "700")};
`;

export const Arrow = styled.button`
    padding: 5px;
    line-height: 24px;
    text-align: center;
    font-size: 26px;
    margin-left: 10px;
    border: none;
    color: var(--basicWhite);
    background: var(--arrow);
    background: rgba(0, 0, 0, 0.73);
    &:hover {
        cursor: pointer;
    }
`;

export const InfinityRow = styled.div`
    width: 100%;
    font-family: Raleway;
    display: grid;
    padding-bottom: 20px;
    grid-auto-rows: 1fr;
    grid-template-columns: ${(props) =>
        props.small ? "50% 10% 40%" : "80% 5% 15%"};
    border-bottom: ${(props) => (props.small ? "0px" : "1px solid var(--hr)")};
    margin-top: ${(props) => (props.small ? "25px" : "50px")};
    padding-bottom: ${(props) => (props.small ? "20px" : "30px")};
    @media (max-width: 1250px) {
        grid-template-columns: 68% 12% 20%; 
    }
`;

export const ThirdColumn = styled.div`
    display: grid;
    align-items: center;
    justify-content: space-between;

    & > *:last-child {
        align-self: flex-end;
        margin-bottom: 0px;
    }
    & > *:first-child {
        align-self: flex-start;
        margin-bottom: 0px;
    }
    width: ${(props) => (props.small ? "20px" : "40px")};
`;

export const Sign = styled.button`
    display: block;
    text-align: center;
    background: var(--basicWhite);
    border: 1.5px solid var(--black);
    font-weight: 200;
    font-size: 40px;
    text-transform: uppercase;
    &:hover {
        background: var(--black);
        color: var(--basicWhite);
        cursor: pointer;
    }
    font-size: ${(props) => (props.small ? "20px" : "40px")};
    padding: ${(props) => (props.small ? "0px 5px" : "0px 15px")};
    margin: 0px;
`;

export const Number = styled.div`
    font-family: "Raleway";
    font-style: normal;
    font-weight: 600;
    width: 100%;
    text-align: center;
    font-size: ${(props) => (props.small ? "16px" : "24px")};
`;

export const RightColumn = styled.div`
    display: flex;
    align-items: flex-end;
`;

export const Space = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 15px;
    margin-left: auto;
`;

export const ImageContainer = styled.div`
    background-image: url("${(props) => props.image}");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: flex-end;
    &:not(:last-of-type) {
        margin-bottom: 35px;
    }
    max-height: ${(props) => (props.small ? "190px" : "288px")};
`;

export const ImageSmall = styled.img`
    max-height: 288px;
    width: 100%;
    margin-bottom: 35px;
    &:not(:last-of-type) {
        margin-bottom: 35px;
    }
`;
