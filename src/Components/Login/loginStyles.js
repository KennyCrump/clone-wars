import styled from 'styled-components'


export const Button = styled.button `
    cursor: pointer;
  width: 270px;
  height: 60px;
  color: white;
  background: transparent;
  border: solid 1px rgb(177, 38, 38);
  // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  font-size: 26px;
  font-family: Oswald;
  &:hover {
    background: rgb(177, 38, 38);
    color: white;
    transition: all 0.4s ease 0s;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`

export const Container = styled.div `
/* background-color: white; */

width: 100%;
height: 70vh;
display: flex;
justify-content: center;
align-items: center;
align-content: center;
flex-direction: column;

`

export const Img = styled.img `
height: 100px;
width: auto;
margin: 15px;
`

export const Text = styled.h1 `
font-family: Montserrat;
font-size: 24px;
`

export const Header = styled.div `
height: 10vh;
width: 100vw;
display: flex;
margin-left: 60px;
margin-top: 25px;
`