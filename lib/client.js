var rest = require('restler');

var parsePagination = function (options) {

};

//TODO once there are error codes returned, we'll want to use the statusCode
//  on('complete', function (result, response) {
//    console.log(response && response.statusCode);
var Client = module.exports = function (options) {
  this.endpoint = options.endpoint;
  this.limit = options.limit || 10;
  this.apiKey = options.apiKey;
};
Client.prototype._pagingQuery = function (options) {
  options = options || {};
  var query = {},
      limit = options.limit || this.limit;
  if (options.page) {
    query.page = options.page;
  }
  if (limit) {
    query.limit = limit;
  }
  return query;
};

/**
 * Accepts an object of search criteria, and returns either an error, or an array of badge classes.
 * Allowable search criteria are:
 * {
 *   search: string,
 *   tags: array
 * }
 * @param criteria object criteria you are search on (search / tags)
 * @param callback function with a signature of (Error, Array)
 * @returns {*}
 */
Client.prototype.search = function (criteria, callback) {
  criteria = criteria || {};
  var tags   = criteria.tags,
      q      = criteria.search,
      paging = this._pagingQuery(criteria),
      query  = {};
  if (tags) {
    query.tags = tags;
  }
  if (name) {
     query.name = name;
   }
   if (issuer) {
     query.issuer = issuer;
   }
  if (q) {
    query.q = q;
  }
  if (!Object.keys(query).length) {
    return callback(new Error('You must supply search criteria in the form of a "tags" array, or "search" string'));
  }
  rest.get(this.endpoint + '/search', { username: this.apiKey, password: '', query: query}).on('complete', function (result, response) {
    if (result instanceof Error || result.code) {
      return callback(result);
    }
    return callback(null, result.data);
  });
};

/**
 * Accepts a url location of the badge class.
 * @param location string url of the badge class
 * @param callback function with a signature of (Error, Object)
 */
Client.prototype.getByLocation = function (location, callback) {
  var encodedLocation = encodeURIComponent(location);
  rest.get(this.endpoint + '/' + encodedLocation, { username: this.apiKey, password: ''  }).on('complete', function (result) {
    if (result instanceof Error || result.code) {
      return callback(result);
    }
    return callback(null, result.data);
  });
};

/**
 * Gets the most recently indexed badges.
 * @param options object allows for pagination information
 * @param callback function with a signature of (Error, Object)
 */
Client.prototype.recent = function (options, callback) {
  var page = (options && options.page) || 0;
  rest.get(this.endpoint + '/recent', { username: this.apiKey, password: '' }).on('complete', function (result) {
    if (result instanceof Error || result.code) {
      return callback(result);
    }
    return callback(null, result.data);
  });
};

/**
 * Gets all tags and count for each tag
 * @param options object allows for pagination information
 * @param callback function with a signature of (Error, Object)
 */
Client.prototype.tags = function (options, callback) {
  var page = (options && options.page) || 0;
  rest.get(this.endpoint + '/tags', { username: this.apiKey, password: '' }).on('complete', function (result) {
    if (result instanceof Error || result.code) {
      return callback(result);
    }
    return callback(null, result.data);
  });
};