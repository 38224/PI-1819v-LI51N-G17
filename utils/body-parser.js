module.exports = (request, cb) => {
    let body = [];
	request.on('data', (chunk) => {
		body.push(chunk);
	}).on('end', () => {
		cb(JSON.parse(Buffer.concat(body).toString()))
	})
} 