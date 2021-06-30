import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

body {
  -webkit-font-smoothing: antialiased;
}

body, input, button {
  font: 16px Roboto, sans-serif;
}

#root {
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 20px;
}

input{
  margin: 5px;
}

button {
  cursor: pointer;
  padding: 5px 15px 5px 10px;
    border-radius: 6px;
    border:0;
    background: blue;
    color: #fff;
    font-weight: bold;
    margin-left: 600px;
    margin-bottom: 10px
}

input[type=text] {
    height: 38px;
    border-radius: 4px;
    border: 1px solid #ddd;
    padding: 0 20px;
    font-size: 14px;
  }

  div {border-color: coral;}
  table{border-color: coral;}
  tr
{
  text-align: center;
  background-color:green;
  color:black;
}
  

`;
