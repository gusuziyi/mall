module.exports=(function() {
	const path = require('path');
	const config = require('./jsonserver-config');
	const jsonServer = require('json-server');
			// const rules = require('./routes');
			const dbfile = require(config.DB_FILE);
			const jsonCors=require('./rediect-json-server');
			jsonCors();
			const ip = config.SERVER;
			const port = config.PORT;

			const server = jsonServer.create();
			const router = jsonServer.router(dbfile());
			const middlewares = jsonServer.defaults();


			server.use(jsonServer.bodyParser);

			// Set default middlewares (logger, static, cors and no-cache)
			server.use(middlewares);


			server.use((req, res, next) => {
				res.header('X-Hello', 'World');
				next();
			})


			router.render = (req, res) => {
				res.jsonp({
					body: res.locals.data,
					code: 0
				})
			}

			server.use(router);



			server.use("/api",router);

			// server.use(jsonServer.rewriter(rules));

			server.use(router);

			server.listen({
				host: ip,
				port: port,
			}, function() {
				console.log(JSON.stringify(jsonServer));
				console.log(`JSON Server is running in http://${ip}:${port}`);
			});

		})()

