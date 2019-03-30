'use strict'

const http = require('http')
const express = require('express')

http
    .createServer()
    .listen(3000, () => console.log('HTTP Server running on port 3000'))