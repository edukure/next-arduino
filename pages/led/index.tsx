import { useState, useEffect } from 'react';
import styled from 'styled-components';

import useInterval from '../../hooks/useInterval';

import LedOn from '../../assets/led-on.svg';

export default function Led() {
    const [color, setColor] = useState('#453ba5');
    const [prevColor, setPrevColor] = useState('');
    const [serverColor, setServerColor] = useState('');

    let currentColor = '';

    //#20b2aa'

    // setInterval(async () => {
    //     const response = await fetch('http://localhost:3000/api/led');
    //     const data = await response.json();
    //     setState(data.state);
    // }, 1000);

    // const interval = setInterval(async () => {
    //     await fetchServerColor();
    //     await postNewColor(color);
    // }, 5000);

    useInterval(async () => {
        await fetchServerColor();

        // if (prevColor !== color) {
        //     await postNewColor(color);
        //     setPrevColor(color);
        // }
    }, 5000);

    // useEffect(() => {
    //     return clearInterval(interval);
    // }, []);

    const fetchServerColor = async () => {
        const response = await fetch('http://localhost:3000/api/rgb');
        const data = await response.json();
        if (serverColor != data.color) {
            setServerColor(data.color);
        }
    };

    const postNewColor = async (color) => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newColor: color }),
        };
        const response = await fetch('http://localhost:3000/api/rgb', options);
        const data = await response.json();
    };

    const handleColorChange = (newColor: string) => {
        setColor(newColor);
    };

    const handleOnClick = () => {
        postNewColor(color);
    }

    return (
        <>
            <Page>
                <Container color={color}>
                    <ImageContainer>
                        <LedOn height="100%" />
                    </ImageContainer>
                    <p>select new color</p>
                    <input
                        type="color"
                        value={color}
                        onChange={(e) => handleColorChange(e.target.value)}
                    ></input>
                    <Button onClick={handleOnClick}>Send</Button>
                </Container>
                <Container color={serverColor}>
                    <ImageContainer>
                        <LedOn height="100%" />
                    </ImageContainer>
                    <p>server current color: {serverColor}</p>
                    
                </Container>
            </Page>
            <Footer>
                <div>
                    Icons made by{' '}
                    <a href="https://smashicons.com/" title="Smashicons">
                        Smashicons
                    </a>{' '}
                    from{' '}
                    <a href="https://www.flaticon.com/" title="Flaticon">
                        www.flaticon.com
                    </a>
                </div>
            </Footer>
        </>
    );
}

const Page = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-evenly;
    height: 97vh;
    position: relative;
`;

const Button = styled.button`
    width: 25%;
    margin-top: 10px;
`

const ImageContainer = styled.div`
    display: flex;
    height: 40%;
    /* margin-top: 10%; */
    margin-bottom: 10%;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60%;
    width: 20%;
    background-color: white;
    border: 2px solid black;
    border-radius: 20px;
    background-color: ${(props) => props.color};
    text-align: center;
    position: relative;
    min-width: 300px;
`;

const NewColorContainer = styled.div`
    background-color: black;
`;

const Footer = styled.div`
    bottom: 0;
    text-align: center;
`;
