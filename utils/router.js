'use strict'

const parse = require('url').parse

function Router() {
	
	this.routes = { 
        'GET': [],
        'POST': [],
        'PUT' : [],
        'DELETE': [],
        'USE': null
    }
	
	this.get = function(path,func) {
		addRoute(this.routes.GET, path, func)
	}
	this.put = function(path,func) {
		addRoute(this.routes.PUT, path, func)
	}
	this.post = function(path,func) {
		addRoute(this.routes.POST, path, func)
	}
	this.delete = function(path,func) {
		addRoute(this.routes.DELETE, path, func)
	}
	this.use = function(func){
        this.routes.USE = func
    }
	// get /api/artists/:name
	this.router = function(req,res) {
		let {pathname, query} = parse(req.url, true)
		console.log(pathname)
		console.log(query)
		let route = this.routes[req.method]
		let found = route.some( r => {
			let slashSplit = r.path.split('/')
			
			
		}
	} 
}

function addRoute(route, path, func){
	    let r = { 
        'path': path, //          /api/artists/:name
        'regexPathElems': [],
        'query': null,
        'func': func
    }
}

module.exports = Router