'use strict'

function Router() {

    this.routes = []
    this.mw = []

    this.use = function(func){
        this.mw.push(func)
    }
    this.get = function(path, func){
        addRoute(this.routes, path, func)
    }
    this.router = function(path) {

        let p = path.split('?')
        let pathname = p[0]
        let query = p[1]

        let func
        let route = this.routes
        let params = {
            'params': {},
            'query': {}
        }
        let found = route.some(r => {
            if(path.replace('?', " ").match(r.regexPath)){ //found correct route
                //extract params to params.params
                let rPathElems = r.path.split('/')
                let pathnameElems = pathname.split('/')
                r.regexPathElems.forEach((elem, idx) => {
                    if(elem == PARAM_REGEX) {
                        let paramName = rPathElems[idx].replace(':', '')
                        params.params[paramName] = pathnameElems[idx]
                    }
                })
                func = r.cmd
                route = r
                return true
            }
            return false
        })

        if(!found)
            return this.mw.forEach(cmd => cmd())

        if(route.query){
            let queryParams = {}
            query.split('&').forEach(elem => {
                let e = elem.split('=')
                queryParams[e[0]] = e[1]
            })
            //extract query-string params to params.query
            route.query.split('&').forEach(elem =>{
                let param = elem.split('=')
                let paramName = param[0]
                params.query[paramName] = queryParams[paramName]
            })
        }
        func(params)
    }
}

const PARAM_REGEX = '[%a-zA-Z0-9/ _-]*'

function addRoute(route, path, func){
    let r = { 
        'path': path, 
        'regexPath': '',
        'regexPathElems': [], 
        'query': null,
        'cmd': func
    }

    let pathname = path.split('?')
    let pathElems = pathname[0].split('/')
    r.query = pathname[1]

    pathElems.forEach(elem => {
        if(elem.includes(':')){
            r.regexPathElems.push(PARAM_REGEX)
            r.regexPath += PARAM_REGEX + '/'
        }
        else {
            r.regexPathElems.push(elem)
            r.regexPath += elem + '/'
        }
    })
    r.regexPath = r.regexPath.slice(0, -1) //remove last '/'
    if(r.query) {
        let queryElems = r.query.split('&')
        r.regexPath += ' ' //not '?' because of match in router func
        queryElems.forEach(elem => { 
            let paramName = elem.split('=')[0]
            r.regexPath += paramName + "=" + PARAM_REGEX + '&'
        })
        r.regexPath = r.regexPath.slice(0, -1) //remove last '&'
    }
    r.regexPath += '$'
    route.push(r)
}

module.exports = Router