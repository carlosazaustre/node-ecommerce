const boom = require('boom')
const Sentry = require('@sentry/node')
const { config } = require('../../config')
const isRequestAjaxOrApi = require('../isRequestAjaxOrApi')

Sentry.init({ dsn: `https://${config.sentryDsn}@sentry.io/${config.sentryId}` })

function withErrorStack(err, stack) {
  if (config.dev) {
    return { ...err, stack } // Object.assign({}, err, stack)
  }
}

function logError (err, req, res, next) {
  Sentry.captureException(err)
  console.log(err.stack)
  next(err)
}

function wrapErrors (err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err))
  }

  next(err)
}

function clientErrorHandler (err, req, res, next) {
  const {
    output: { statusCode, payload }
  } = err

  // catch errors from AJAX request or if an error ocurss while streaming
  if (isRequestAjaxOrApi(req) || res.headersSent) {
    res.status(statusCode).json(withErrorStack(payload, err.stack))
  } else {
    next(err)
  }
}

function errorHandler (err, req, res, next) {
  const {
    output: { statusCode, payload }
  } = err

  res.status(statusCode)
  res.render('error', withErrorStack(payload, err.stack))
}

module.exports = {
  logError,
  wrapErrors,
  clientErrorHandler,
  errorHandler
}
