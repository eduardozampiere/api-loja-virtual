const nodemailer = require('nodemailer');
const handle = require('nodemailer-express-handlebars');
const {host, port, user, pass} = require('../config/mailer');
const path = require('path');

const transport = nodemailer.createTransport({
	host,
	port,
	auth: {
		user,
		pass
	}
});

transport.use('compile', handle({
	viewEngine: {
		defaultLayout: undefined,
        partialsDir: path.resolve('./src/resources/mail/')
	},
	viewPath: path.resolve('./src/resources/mail/'),
	extName: '.html'
}));

module.exports = transport;