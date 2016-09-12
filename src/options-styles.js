'use strict';

const csjs = require('csjs');

module.exports = csjs`

  .container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 10px;
  }

  .formLabel {
    display: block;
    margin: 10px 0 0;
  }

  .formControl {
    display: block;
    width: 100%;
    height: 40px;
    margin: 15px 0 0;
    padding: 0 10px 0;
    border: 1px solid #c2cfd6;
    line-height: 38px;
    background-color: #fff;
    font-size: 16px;
    border-radius: 4px;
    background-color: #fff;
  }

  .formControl:focus, .formControl:hover {
    border-color: #79b9e7;
  }

  .formControl:focus {
    outline: 0;
  }

`;
