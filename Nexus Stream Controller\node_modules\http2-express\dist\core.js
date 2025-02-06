"use strict";

/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
var EventEmitter = require('events');
var createHttp2Request = require('./http2Request');
var createHttp2Response = require('./http2Response');
var initHttp2Express = require('./initHttp2Express');
var createHttp2Express = function createHttp2Express(express) {
  var application = express.application,
    request = express.request,
    response = express.response,
    Router = express.Router,
    query = express.query;
  application.lazyrouter = function lazyrouter() {
    if (!this._router) {
      this._router = new Router({
        caseSensitive: this.enabled('case sensitive routing'),
        strict: this.enabled('strict routing')
      });
      this._router.use(query(this.get('query parser fn')));
      this._router.use(initHttp2Express(this));
    }
  };
  var _app = function app(req, res, next) {
    _app.handle(req, res, next);
  };

  // Copying properties and descriptors from EventEmitter.prototype to app.
  Object.getOwnPropertyNames(EventEmitter.prototype).forEach(function (key) {
    var descriptor = Object.getOwnPropertyDescriptor(EventEmitter.prototype, key);
    if (descriptor) {
      Object.defineProperty(_app, key, descriptor);
    }
  });

  // Copy symbols from EventEmitter.prototype to app.
  Object.getOwnPropertySymbols(EventEmitter.prototype).forEach(function (symbol) {
    var descriptor = Object.getOwnPropertyDescriptor(EventEmitter.prototype, symbol);
    if (descriptor) {
      Object.defineProperty(_app, symbol, descriptor);
    }
  });

  // Copying properties from application to app.
  Object.getOwnPropertyNames(application).forEach(function (key) {
    var descriptor = Object.getOwnPropertyDescriptor(application, key);
    if (descriptor) {
      Object.defineProperty(_app, key, descriptor);
    }
  });

  // Copy symbols from application to app.
  Object.getOwnPropertySymbols(application).forEach(function (symbol) {
    var descriptor = Object.getOwnPropertyDescriptor(application, symbol);
    if (descriptor) {
      Object.defineProperty(_app, symbol, descriptor);
    }
  });
  response.push = function () {};

  // Expose the prototype that will get set on requests.
  _app.request = Object.create(request, {
    app: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: _app
    }
  });

  // Expose the prototype that will get set on responses.
  _app.response = Object.create(response, {
    app: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: _app
    }
  });
  var http2Request = createHttp2Request(request);
  var http2Response = createHttp2Response(response);
  _app.http2Request = Object.create(http2Request, {
    app: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: _app
    }
  });
  _app.http2Response = Object.create(http2Response, {
    app: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: _app
    }
  });
  _app.init();
  return _app;
};
module.exports = createHttp2Express;