"use strict"
const through = require("through2");
const PluginError = require("plugin-error");
const ngjsTsClassAnnotate = require("angularjs-ts-class-annotate");

const PLUGIN_NAME = "gulp-angularjs-ts-class-annotate";

function ngTsClassAnnotate() {

	return through.obj(function (file, enc, callback) {
		if (file.isNull()) {
			return callback(null, file);
		}

		if (file.isStream()) {
			this.emit("error", new PluginError(PLUGIN_NAME, "Streams not supported!"));
			return callback();
		}

		if (file.isBuffer()) {
			try {
				let content = file.contents.toString();
				content = ngjsTsClassAnnotate(content);
				file.contents = Buffer.from(content);
			} catch (error) {
				this.emit("error", new PluginError(PLUGIN_NAME, `Class annotation of "${file.path}" failed with: ${error}`));
				return callback();
			}
		}

		callback(null, file);

	});
}

module.exports = ngTsClassAnnotate;
