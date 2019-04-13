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
	this.errorFunc = (_, res) => { res.end() }
	
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
	
	this.find = function(req, res) {
        const method = req.method 
        const { pathname, query } = parse(req.url, true) 
        const route = this.routes[method].find(rt => validatePath(rt.path, pathname, rt.containsParams))
        req.pathname = pathname
        req.query = query
        if (route) {
            addParams(req, route.path, pathname, route.containsParams)
            return route.func(req, res, err => {
                if (err) this.errorFunc(req, res, err)
            })
        }
        this.errorFunc(req, res, {code: 404, message: 'Resource not found.'})
    }
} 
 
function addRoute(route, pathname, func) {
    const parts = pathname.split('/')
    const containsParams = parts.some(str => str.startsWith(":"))
    const r = {
        'path': pathname, //api/artists/:name
        'containsParams': containsParams, //true
        'func': func  // getArtirtsByName
    }
    route.push(r) 
}

function addParams(req,pathname,path,containsParams){
	if(containsParams){
		const pathnameParts = pathname.split('/')
		const pathParts = path.split('/')
		const pathParams = {}
		pathnameParts.forEach((elem,idx) =>{
			if(elem.startsWith(":"))
				pathParams[elem.substring(1)] = pathParts[idx]
		})
		req.params = pathParams 
	}
}

function validatePath(pathname,path,containsParams){ 
	if(containsParams){
		const pathnameParts = pathname.split('/')
		const pathParts = path.split('/') 
		let sameLength = pathnameParts.length == pathParts.length
		let isOk = true
		pathnameParts.forEach((elem,idx) =>{
			if(!(elem.startsWith(":") || elem == pathParts[idx])){
				isOk = false
			}
		})
		return sameLength && isOk
	}
	return pathname == path
}

module.exports = Router